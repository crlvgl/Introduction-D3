function _1(md){return(
md`# Learn D3: Joins (7/9)

> _Disclaimer:_<br>
> _Dieses Notebook ist ein Fork von [Mike Bostock](https://observablehq.com/user/@mbostock)s "[Learn D3](https://observablehq.com/@d3/learn-d3-animation?collection=@d3/learn-d3)" Notebook-Serie._ <br>
> _Ich habe nur den Inhalt des Notebooks aktualisiert und geändert, um es besser an unseren Anwendungsfall anzupassen._ <br>
> _Dies ist die deutsche Übersetzung der Serie. Die Übersetzung wurde teils automatisiert erstellt. Keine Garantie auf Funktion, dafür bitte die [englische Version](/Notebooks/en7/index.html) verwenden. Alles sollte aber dennoch funktionieren._

Wenn ihr mit D3 vertraut ward, als ihr mit diesem Tutorial angefangen habt, werdet ihr vielleicht überrascht sein, wie wenig D3-Auswahlen erwähnt wurden.

Das liegt daran, dass ihr sie vielleicht gar nicht braucht!`
)}

function _2(md){return(
md`D3-Auswahlen füllen eine bestimmte Nische: schnelle, inkrementelle Aktualisierungen von dynamischen Grafiken. Wenn euer Schwerpunkt auf statischen Grafiken liegt oder auf Grafiken, die bei jedem Frame von Grund auf neu gezeichnet werden können, bevorzugt ihr vielleicht eine andere Abstraktion. Wenn ihr hingegen animierte Übergänge wünscht oder die beste Leistung aus modernen Browsern herausholen wollt, sind Auswahlen genau das Richtige für euch.`
)}

function _3(md){return(
md`(Auch wenn ihr euch entscheidet, keine Auswahlen zu verwenden, solltet ihr bedenken, dass D3 über unzählige andere nützliche Werkzeuge für die Visualisierung verfügt. Skalen, Formen, Interpolatoren, Farben, Kartenprojektionen und viele andere Funktionen können mit Canvas, WebGL oder anderen DOM-Abstraktionen wie dem HTML-Tagged Template Literal von Observable, React oder Svelte verwendet werden. Und D3 kann bei der Datenbereinigung und -analyse helfen, mit Methoden für Statistik, Gruppierung und Aggregation, Zeitreihen und Parsing).`
)}

function _4(md){return(
md`Im Kern spezifizieren D3-Auswahlen eher die *Transformation* als die *Darstellung*. Anstatt den gewünschten Zustand der Grafik (das DOM) auszudrücken, gebt ihr die Änderungen (Einfügungen, Aktualisierungen und Löschungen) an, die erforderlich sind, um den aktuellen Zustand in den gewünschten Zustand zu verwandeln. Dies ist manchmal mühsam, ermöglicht aber die Animation von Übergängen und die Minimierung von Änderungen am DOM, was die Leistung verbessert.

Schauen wir uns das an.`
)}

function _5(md){return(
md`Angenommen, wir wollen die Buchstaben des Alphabets darstellen. Das ist zwar keine großartige Visualisierung, aber wir werden die Dinge einfach halten, um uns auf die Technik zu konzentrieren. (Beispiele aus der Praxis findet ihr in den Bereichen Animation und Interaktion in der [D3-Galerie](/@d3/gallery)).`
)}

function _alphabet(){return(
[..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]
)}

function _chart1(d3,width,alphabet)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, 33])
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .style("display", "block");

  svg.selectAll("text")
    .data(alphabet)
    .join("text")
      .attr("x", (d, i) => i * 17)
      .attr("y", 17)
      .attr("dy", "0.35em")
      .text(d => d);

  return svg.node();
}


function _8(md){return(
md`Diese Grafik ist statisch in dem Sinne, dass sie jedes Mal, wenn die Zelle ausgeführt wird, von Grund auf neu erstellt wird, wodurch der D3-Code im Geiste einem HTML-Literal entspricht.`
)}

function _9(htl,width,alphabet){return(
htl.html`<svg viewBox="0 0 ${width} 33" font-family="sans-serif" font-size="10" style="display: block;">
  ${alphabet.map((d, i) => htl.svg`<text x="${i * 17}" y="17" dy="0.35em">${d}</text>`)}
</svg>`
)}

function _10(md){return(
md`Warum sollte man sich also die Mühe machen, eine Auswahl zu treffen? Nun, bei einer statischen Grafik gibt es dafür kaum einen Grund.

Aber nehmen wir an, ihr möchtet dieses Diagramm als Reaktion auf sich ändernde Daten aktualisieren. Und ihr wollt es *nicht* von Grund auf neu zeichnen, sondern nur ein Minimum an Aktualisierungen vornehmen, um die neuen Daten zu berücksichtigen. Ihr möchtet vorhandene Elemente wiederverwenden, indem ihr hinzufügt, was ihr benötigt, und entfernt, was ihr nicht benötigt. Indem ihr den obigen Code in eine Methode verschiebt, die aufgerufen wird, wenn sich die Daten ändern, erhaltet ihr leistungsfähige inkrementelle Aktualisierungen!`
)}

async function* _randomLetters(d3,alphabet,Promises)
{
  while (true) {
    yield d3.shuffle(alphabet.slice())
      .slice(Math.floor(Math.random() * 10) + 5)
      .sort(d3.ascending);
    await Promises.delay(3000);
  }
}


function _chart2(d3,width)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, 33])
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .style("display", "block");

  let text = svg.selectAll("text");

  return Object.assign(svg.node(), {
    update(letters) {
      text = text
        .data(letters)
        .join("text")
          .attr("x", (d, i) => i * 17)
          .attr("y", 17)
          .attr("dy", "0.35em")
          .text(d => d);
    }
  });
}


function _13(chart2,randomLetters){return(
chart2.update(randomLetters)
)}

function _14(md){return(
md`Schauen wir uns den Code an.

*text* ist eine Auswahl von Textelementen, die zunächst leer sind und deren übergeordnetes Element das SVG-Element ist. Dieses übergeordnete Element legt fest, wo die eingegebenen Textelemente später angehängt werden sollen.

Durch den Aufruf von *selection*.data wird *text* an ein neues Array von Daten, Buchstaben, gebunden. Auf diese Weise werden drei disjunkte Teilmengen der *Text*auswahl berechnet: die *Eingabe*auswahl *(enter)*, die neue Daten repräsentiert, für die es kein bestehendes Element gibt; die *Aktualisierung*sauswahl *(update)*, die bestehende Elemente repräsentiert, für die es neue Daten gibt; und die *Ausgabe*auswahl *(exit)*, die bestehende Elemente repräsentiert, für die es keine neuen Daten gibt.

Als Venn-Diagramm:`
)}

function _15(md){return(
md`<figure>
  <svg viewBox="-200 -128 400 240" style="font: 10px sans-serif;">
    <g transform="translate(-50,0)">
      <circle r="110" fill="#377eb8" fill-opacity="0.7" style="mix-blend-mode: multiply;" stroke="black"></circle>
      <text x="-5" y="-120" dy="0.35em" text-anchor="middle">New Data</text>
      <text x="-70" dy="0.35em" text-anchor="middle">Enter</text>
    </g>
    <g transform="translate(50,0)">
      <circle r="110" fill="#e41a1c" fill-opacity="0.7" style="mix-blend-mode: multiply;" stroke="black"></circle>
      <text x="5" y="-120" dy="0.35em" text-anchor="middle">Existing Elements</text>
      <text x="70" dy="0.35em" text-anchor="middle">Exit</text>
    </g>
    <text x="0" dy=".35em" text-anchor="middle" fill="white">Update</text>
  </svg>
  <figcaption>Die drei von <i>selection</i>.data berechneten Auswahlen.</figcaption>
</figure>`
)}

function _16(md){return(
md`(Diese Auswahlen sind im Code versteckt: *selection*.data gibt die *Aktualisierung*sauswahl (*update*) zurück, von der aus ihr *selection*.enter oder *selection*.exit aufrufen könnt, um auf die anderen zuzugreifen).`
)}

function _17(md){return(
md`Wir könnten diese drei Fälle manuell behandeln, aber [*selection*.join](/@d3/selection-join) bietet bequeme Standardwerte. Die Auswahl *enter* wird angehängt, die Auswahl *exit* wird entfernt, und schließlich werden die Auswahlen *update* und *enter* zusammengeführt, geordnet und zurückgegeben. Anschließend können wir diesen Eingabe- oder Aktualisierungselementen Attribute und Text zuweisen.`
)}

function _18(md){return(
md`Wir können sogar noch effizienter sein, wenn wir bedenken, dass wir einige Attribute und Textinhalte bei der Aktualisierung von Elementen nicht neu zuweisen müssen, solange die Assoziation zwischen Buchstabe und Textelement konstant bleibt. Um diese Assoziation zu erhalten, benötigt *selection*.data eine Schlüsselfunktion; und für präzise Operationen bei *enter*, *update* und *exit* benötigt *selection*.join entsprechende Funktionen. Wenn Aktualisierungen häufiger vorkommen als Eingaben und Ausgänge, kann dies die Leistung erheblich verbessern!`
)}

function _chart3(d3,width)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, 33])
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .style("display", "block");

  let text = svg.selectAll("text");

  return Object.assign(svg.node(), {
    update(letters) {
      text = text
        .data(letters, d => d)
        .join(
          enter => enter.append("text")
            .attr("y", 17)
            .attr("dy", "0.35em")
            .text(d => d),
          update => update,
          exit => exit.remove()
        )
          .attr("x", (d, i) => i * 17);
    }
  });
}


function _20(chart3,randomLetters){return(
chart3.update(randomLetters)
)}

function _21(md){return(
md`Wie zuvor gibt *selection*.join die zusammengeführten Auswahlen *enter* und *update* zurück, so dass wir Code gemeinsam nutzen können, der für beide gilt, z. B. das Setzen des Attributs *x*.`
)}

function _22(md){return(
md`Die Schlüsselfunktion, die an *selection*.data übergeben wird, wird verwendet, um einen (String-)Schlüssel für jedes neue Datum und das alte Datum jedes ausgewählten Elements zu berechnen und zu bestimmen, welches Datum an welches Element gebunden ist: Wenn ein Element und ein Datum denselben Schlüssel haben, wird dieses Datum an das Element gebunden und das Element in die *Aktualisierung*sauswahl *(update)* aufgenommen. Buchstaben eignen sich gut als Schlüssel, so dass die Identitätsfunktion (d => d) hier angemessen ist.`
)}

function _23(md){return(
md`(Wenn keine Schlüsselfunktion angegeben wird, werden die Daten nach Index gebunden: das erste Datum wird an das erste Element gebunden usw. Versucht zu Übungszwecken, den obigen Code so umzuschreiben, dass er nach dem Index verknüpft wird. Ihr solltet auch das Setzen des *x*-Attributs mit dem Setzen des Textinhalts vertauschen).`
)}

function _24(md){return(
md`Die Übergänge sind jedoch das Highlight der Auswahl! ✨

Im Folgenden werden die Buchstaben von oben eingegeben, bei der Aktualisierung horizontal verschoben und unten wieder ausgegeben. Dies ist viel einfacher zu interpretieren als die sofortigen Schnitte oben.`
)}

function _chart4(d3,width)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, 33])
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .style("display", "block");

  let text = svg.selectAll("text");

  return Object.assign(svg.node(), {
    update(letters) {
      const t = svg.transition().duration(750);

      text = text
        .data(letters, d => d)
        .join(
          enter => enter.append("text")
            .attr("y", -7)
            .attr("dy", "0.35em")
            .attr("x", (d, i) => i * 17)
            .text(d => d),
          update => update,
          exit => exit
            .call(text => text.transition(t).remove()
              .attr("y", 41))
        )
          .call(text => text.transition(t)
            .attr("y", 17)
            .attr("x", (d, i) => i * 17));
    }
  });
}


function _26(chart4,randomLetters){return(
chart4.update(randomLetters)
)}

function _27(md){return(
md`Gute Übergänge lassen eine Grafik nicht nur "tanzen", um Aufmerksamkeit zu erregen; sie helfen dem Betrachter durch die Bewegung zu verstehen, *wie sich die Daten verändern*.

Gute Übergänge bewahren die [*Objektkonstanz*](https://bost.ocks.org/mike/constancy/): Ein grafisches Element, das *vor* dem Übergang eine bestimmte Sache darstellt (z. B. den Buchstaben C), sollte *während* und *nach* dem Übergang dieselbe Sache darstellen, so dass der Betrachter es kontinuierlich verfolgen kann. Würde sich stattdessen die Bedeutung eines bestimmten Elements während des Übergangs ändern, wäre die Bewegung bedeutungslos.`
)}

function _28(md){return(
md`Wie wäre es mit einem praktischeren Beispiel?

Das folgende Diagramm zeigt die zehn wichtigsten Bundesstaaten (und D.C., den städtischen Ausreißer) nach dem prozentualen Anteil der Bevölkerung in einer bestimmten Altersgruppe. Sie zeigt, dass Utahs Bevölkerung überproportional jung ist, was darauf zurückzuführen ist, dass die LDS-Kirche den Schwerpunkt auf die Familiengründung legt. In Florida dagegen leben viele Rentner, viele von ihnen in den Siebzigern oder älter.`
)}

function _29(md){return(
md`Wenn ihr die ausgewählte Altersgruppe ändert, könnt ihr beobachten, wie die Balken neu angeordnet werden, um die Änderung der Rangfolge widerzuspiegeln. Die *x*-Achse wird gleichzeitig skaliert, um sich den neuen Daten anzupassen.`
)}

function _agedata(Inputs,data,d3){return(
Inputs.select(new Map(data.ages.map(age => [age, data.filter(d => d.age === age).sort((a, b) => d3.descending(a.value, b.value))])), {label: "Age group"})
)}

function _chart(d3,width,height,$0,margin,data,xAxis,yAxis)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  // For the initial render, reference the current age non-reactively.
  const agedata = $0.value;

  const x = d3.scaleLinear()
      .domain([0, d3.max(agedata, d => d.value)])
      .rangeRound([margin.left, width - margin.right]);

  const y = d3.scaleBand()
      .domain(agedata.map(d => d.name))
      .rangeRound([margin.top, margin.top + 20 * data.names.length]);

  let bar = svg.append("g")
      .attr("fill", "steelblue")
    .selectAll("rect")
    .data(agedata, d => d.name)
    .join("rect")
      .style("mix-blend-mode", "multiply")
      .attr("x", x(0))
      .attr("y", d => y(d.name))  
      .attr("width", d => x(d.value) - x(0))
      .attr("height", y.bandwidth() - 1);

  const gx = svg.append("g")
      .call(xAxis, x);

  const gy = svg.append("g")
      .call(yAxis, y);

  return Object.assign(svg.node(), {
    update(agedata) {
      const t = svg.transition().duration(750);

      gx.transition(t)
          .call(xAxis, x.domain([0, d3.max(agedata, d => d.value)]));

      gy.transition(t)
          .call(yAxis, y.domain(agedata.map(d => d.name)));

      bar = bar
        .data(agedata, d => d.name)
        .call(bar => bar.transition(t)
          .attr("width", d => x(d.value) - x(0))
          .attr("y", d => y(d.name)));
    }
  });
}


function _32(chart,agedata){return(
chart.update(agedata)
)}

function _33(md){return(
md`Nur die obersten 10 Balken sind sichtbar, da die übrigen Balken unterhalb des Diagramms verborgen sind. Daher wird *selection*.join nicht benötigt: Es treten keine Balken ein oder aus; sie werden nur aktualisiert. Dies vereinfacht nicht nur den Code, sondern macht die Übergänge auch sinnvoller, da die Geschwindigkeit der ein- oder austretenden Balken nun auf ihre Position außerhalb des Bildschirms hinweist.`
)}

function _34(md){return(
md`Animierte Übergänge werden oft dadurch ausgelöst, dass der Leser auf der Suche nach Antworten herumstochert oder stochert. Als Nächstes wollen wir sehen, wie wir Diagramme dazu bringen können, auf solche Fragen zu reagieren.

<a title="Learn D3: Interaction" style="display: inline-flex; align-items: center; font: 600 14px var(--sans-serif);" href="/Notebooks/de8/index.html">Weiter<svg width="8" height="16" fill="none" stroke-width="1.8" style="margin-left: 0.25em; padding-top: 0.25em;"><path d="M2.75 11.25L5.25 8.25L2.75 5.25" stroke="currentColor"></path></svg></a>`
)}

function _35(md){return(
md`---

## Anhang`
)}

async function _data(FileAttachment,d3)
{
  const data = await FileAttachment("us-population-state-age.csv").csv();
  const ages = data.columns.slice(1);
  const totals = new Map(data.map(d => [d.name, d3.sum(ages, age => d[age])]));
  return Object.assign(d3.cross(data, ages).map(([d, age]) => ({name: d.name, age, value: +d[age] / totals.get(d.name)})), {names: data.map(d => d.name), ages});
}


function _xAxis(margin,d3,width){return(
(g, x) => g
    .attr("transform", `translate(0,${margin.top})`)
    .call(d3.axisTop(x).ticks(width / 80, "%"))
    .call(g => (g.selection ? g.selection() : g).select(".domain").remove())
)}

function _yAxis(margin,d3){return(
(g, y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSizeOuter(0))
)}

function _height(margin){return(
margin.top + 20 * 10
)}

function _margin(){return(
{top: 30, right: 20, bottom: 0, left: 30}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["us-population-state-age.csv", {url: new URL("./files/3ea96de39eb40936da1c5e7bf932e124861c50b9e45569cb17e694e9b9ed462c79684b2ede7266422ee880930d43408010a4741695709c094f9f6827c62534db.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("alphabet")).define("alphabet", _alphabet);
  main.variable(observer("chart1")).define("chart1", ["d3","width","alphabet"], _chart1);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["htl","width","alphabet"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("randomLetters")).define("randomLetters", ["d3","alphabet","Promises"], _randomLetters);
  main.variable(observer("chart2")).define("chart2", ["d3","width"], _chart2);
  main.variable(observer()).define(["chart2","randomLetters"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("chart3")).define("chart3", ["d3","width"], _chart3);
  main.variable(observer()).define(["chart3","randomLetters"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("chart4")).define("chart4", ["d3","width"], _chart4);
  main.variable(observer()).define(["chart4","randomLetters"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("viewof agedata")).define("viewof agedata", ["Inputs","data","d3"], _agedata);
  main.variable(observer("agedata")).define("agedata", ["Generators", "viewof agedata"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","width","height","viewof agedata","margin","data","xAxis","yAxis"], _chart);
  main.variable(observer()).define(["chart","agedata"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer("data")).define("data", ["FileAttachment","d3"], _data);
  main.variable(observer("xAxis")).define("xAxis", ["margin","d3","width"], _xAxis);
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3"], _yAxis);
  main.variable(observer("height")).define("height", ["margin"], _height);
  main.variable(observer("margin")).define("margin", _margin);
  return main;
}
