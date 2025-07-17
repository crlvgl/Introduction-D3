function _1(md){return(
md`# Learn D3: Interaktion (8/9)

> _Disclaimer:_<br>
> _Dieses Notebook ist ein Fork von [Mike Bostock](https://observablehq.com/user/@mbostock)s "[Learn D3](https://observablehq.com/@d3/learn-d3-animation?collection=@d3/learn-d3)" Notebook-Serie._ <br>
> _Ich habe nur den Inhalt des Notebooks aktualisiert und geändert, um es besser an unseren Anwendungsfall anzupassen._ <br>
> _Dies ist die deutsche Übersetzung der Serie. Die Übersetzung wurde teils automatisiert erstellt. Keine Garantie auf Funktion, dafür bitte die [englische Version](/Notebooks/en8/index.html) verwenden. Alles sollte aber dennoch funktionieren._ <br><br>
> _Dieses Notizbuch enthält mehrere Zellen und Beschreibungen speziell für Observable-Notebooks, nicht für das klassische D3. Ich habe sie jedoch aufgrund der Art und Weise, wie Mike Bostock dieses Notebook eingerichtet hat, beibehalten. Einige Zellen hätten sonst nicht funktioniert. Dies ist schließlich nur eine Bearbeitung von Mike Bostocks Arbeit._ <br>
> _Alle betroffenen Zellen sind entsprechend gekennzeichnet._

Es gibt fast immer zu viele Informationen, als dass sie vernünftigerweise in eine Grafik "passen". Beim Design geht es also nicht nur darum, zu entscheiden, wie etwas dargestellt werden soll, sondern auch darum, was gezeigt und was nicht gezeigt werden soll, je nachdem, was unserer Meinung nach für den imaginären Leser wichtig ist.`
)}

function _2(md){return(
md`Und dank der Computer kann der *tatsächliche* Leser selbst mitbestimmen: Die Grafik kann auf Wunsch auf die Interessen des Lesers zugeschnitten werden.`
)}

function _3(md){return(
md`Doch diese Macht ist ein zweischneidiges Schwert. Interaktivität ermöglicht es dem Leser, mehr Informationen zu erhalten, zwingt ihn aber auch, dafür zu arbeiten. Wenn wir nicht aufpassen, können wir wichtige Erkenntnisse hinter Bedienelementen verstecken, die die Leser nie anklicken.`
)}

function _4(md){return(
md`Wenn unsere Absicht darin besteht, etwas Bekanntes zu vermitteln, sollten wir eine effektive statische Grafik entwerfen, bevor wir an Interaktion denken. Wenn wir hingegen das Unbekannte erforschen wollen, dann kann Interaktion schneller sein als die Programmierung einer neuen Grafik (aber denkt auch an Visualisierungsgrammatiken für die Erkundung, wie [Vega-Lite](https://vega.github.io/vega-lite/))!`
)}

function _5(md){return(
md`Ein guter Leitfaden für die Interaktion ist das [information-seeking mantra](https://www.cs.umd.edu/~ben/papers/Shneiderman1996eyes.pdf) von Ben Shneiderman:

> *Overview first,* <br>
> *zoom and filter,* <br>
> *then details on demand.*

Zu deutsch:
> *Zuerst Überblick,* <br>
> *zoomen und filtern,* <br>
> *dann Details auf Anfrage.*`
)}

function _6(md){return(
md`Die *Übersicht* ist die Ausgangsform der Grafik. Ihr Ziel ist es nicht, alles zu zeigen (das ist unmöglich), sondern eine "Makro"-Sicht auf alle Daten zu geben. Die Übersicht ist eine Karte, die den Leser bei seiner Erkundung leitet.`
)}

function _7(md){return(
md`*Zoomen* und *Filtern* sind Methoden zur Einschränkung der Anzeige, um sich auf ein bestimmtes Thema zu konzentrieren. Wir haben bereits die Steuerelemente zum Zuschneiden des Diagramms auf einzelne Jahre gesehen; es gibt auch die Möglichkeit, [frei zu zoomen](/@d3/zoomable-area-chart), zu [schwenken](/@d3/pannable-chart) und zu [fokussieren + Kontext](/@d3/focus-context). Wenn wir viele Zeitreihen vergleichen, könnten wir eine Filterung wie im [Beispiel des Mehrzeilendiagramms](/@d3/multi-line-chart) wünschen. Siehe auch die [streichbare Scatterplot-Matrix](/@d3/brushable-scatterplot-matrix).`
)}

function _8(md){return(
md`*Details auf Anfrage* ermöglichen es dem Leser, genaue Werte aus dem Diagramm zu extrahieren, anstatt sich auf visuelle Annäherungen zu beschränken. Dies kann so einfach sein wie Tooltips.`
)}

function _9(md){return(
md`Ein Ansatz für Tooltips ist die großzügige Einstreuung von Titelelementen in SVG. Fahren Sie mit der Maus darüber (und warten Sie kurz), um den Apple-Aktienkurs für einen bestimmten Tag unten zu sehen.`
)}

function _10(htl,width,height,line,data,d3,x,formatDate,formatClose,xAxis,yAxis){return(
htl.html`<svg viewBox="0 0 ${width} ${height}">
  <path d="${line(data)}" fill="none" stroke="steelblue" stroke-width="1.5" stroke-miterlimit="1"></path>
  <g fill="none" pointer-events="all">
    ${d3.pairs(data, (d, b) => htl.svg`<rect x="${x(d.date)}" height="${height}" width="${x(b.date) - x(d.date)}">
      <title>${formatDate(d.date)}
${formatClose(d.close)}</title>
    </rect>`)}
  </g>
  ${d3.select(htl.svg`<g>`).call(xAxis).node()}
  ${d3.select(htl.svg`<g>`).call(yAxis).node()}
</svg>`
)}

function _11(data,md){return(
md`Oben überspannen ${(data.length - 1).toLocaleString("de")} unsichtbare Rect-Elemente vertikal das Diagramm und horizontal benachbarte Datenpunkte (berechnet mit [d3.pairs](https://d3js.org/d3-array/transform#pairs)). Wenn die Maus über ein Rect schwebt, wird der Text des untergeordneten Titelelements angezeigt. Der angezeigte Tooltip ist also eine Funktion der *x*-Position der Maus, was für Zeitreihendiagramme, bei denen *y* die abhängige Variable ist, am besten geeignet ist.`
)}

function _12(md){return(
md`Ein allgemeinerer Ansatz ist ein [Voronoi-Overlay](https://d3js.org/d3-delaunay), bei dem der Datenpunkt, der der Maus am nächsten liegt, den Tooltip bestimmt. (Das Voronoi-Diagramm ist der Übersichtlichkeit halber unten eingezeichnet... und weil es cool aussieht. Normalerweise würde man es nicht zeigen.) <br>
_[Mit anderen Worten: Verwendet zwei Diagramme übereinander, aber zeigt nur das „saubere“, lasst das Voronoi-Overlay unsichtbar.]_`
)}

function _voronoi(d3,data,x,y,width,height){return(
d3.Delaunay
  .from(data, d => x(d.date), d => y(d.close))
  .voronoi([0, 0, width, height])
)}

function _14(htl,width,height,line,data,voronoi,formatDate,formatClose,d3,xAxis,yAxis){return(
htl.html`<svg viewBox="0 0 ${width} ${height}">
  <path d="${line(data)}" fill="none" stroke="steelblue" stroke-width="1.5" stroke-miterlimit="1"></path>
  <g fill="none" pointer-events="all" stroke="red" stroke-width="0.5">
    ${data.map((d, i) => htl.svg`<path d="${voronoi.renderCell(i)}">
      <title>${formatDate(d.date)}
${formatClose(d.close)}</title>
    </path>`)}
  </g>
  ${d3.select(htl.svg`<g>`).call(xAxis).node()}
  ${d3.select(htl.svg`<g>`).call(yAxis).node()}
</svg>`
)}

function _15(md){return(
md`Native Tooltips haben mehrere Nachteile: Sie können nur langsam angezeigt werden, mobile Browser unterstützen sie nicht, und es ist nicht immer offensichtlich, welcher Datenpunkt mit dem Tooltip verknüpft ist, insbesondere bei Verwendung eines Voronoi-Diagramms.

Mit ein wenig mehr Arbeit können wir jedoch benutzerdefinierte Tooltips erstellen.`
)}

function _16(Tooltip,htl,width,height,line,data,d3,xAxis,yAxis,x)
{
  const tooltip = new Tooltip();
  return htl.html`<svg viewBox="0 0 ${width} ${height}">
  <path d="${line(data)}" fill="none" stroke="steelblue" stroke-width="1.5" stroke-miterlimit="1"></path>
  ${d3.select(htl.svg`<g>`).call(xAxis).node()}
  ${d3.select(htl.svg`<g>`).call(yAxis).node()}
  <g fill="none" pointer-events="all">
    ${d3.pairs(data, (a, b) => htl.svg`<rect x="${x(a.date)}" height="${height}" width="${x(b.date) - x(a.date)}" onmouseover=${() => tooltip.show(a)} onmouseout=${() => tooltip.hide()}></rect>`)}
  </g>
  ${tooltip.node}
</svg>`;
}


function _17(md){return(
md`Die Reihenfolge der Elemente ist hier wichtig: SVG unterstützt keine *z*-Reihenfolge. Um den Tooltip über der Linie und den Achsen zu zeichnen, muss er also an letzter Stelle stehen.`
)}

function _18(md){return(
md`Während native Tooltips automatisch erscheinen, benötigen benutzerdefinierte Tooltips in der Regel Ereignis-Listener. Diese Funktionen werden vom Browser aufgerufen, wenn der Benutzer eine Aktion ausführt, z. B. wenn er die Maus über ein Element bewegt. Die obigen Listener erfassen Daten (*a* und *b*) in einer Closure, um zu wissen, was angezeigt werden soll, wenn das Ereignis ausgelöst wird.`
)}

function _19(md){return(
md`Der benutzerdefinierte Tooltip ist in der folgenden Klasse implementiert. Sie stellt eine *tooltip*.node-Eigenschaft (ein SVG g-Element) zum Einbetten sowie *tooltip*.show- und *tooltip*.hide-Methoden zur Verfügung, um den Tooltip nach Bedarf zu aktualisieren. Dies ermöglicht eine gewisse Flexibilität bei der Auslösung des Tooltips.`
)}

function _Tooltip(htl,x,y,formatDate,formatClose){return(
class Tooltip {
  constructor() {
    this._date = htl.svg`<text y="-22"></text>`;
    this._close = htl.svg`<text y="-12"></text>`;
    this.node = htl.svg`<g pointer-events="none" display="none" font-family="sans-serif" font-size="10" text-anchor="middle">
  <rect x="-27" width="54" y="-30" height="20" fill="white"></rect>
  ${this._date}
  ${this._close}
  <circle r="2.5"></circle>
</g>`;
  }
  show(d) {
    this.node.removeAttribute("display");
    this.node.setAttribute("transform", `translate(${x(d.date)},${y(d.close)})`);
    this._date.textContent = formatDate(d.date);
    this._close.textContent = formatClose(d.close);
  }
  hide() {
    this.node.setAttribute("display", "none");
  }
}
)}

function _21(md){return(
md`Das obige Diagramm verwendet [Hypertext-Literal](/@observablehq/htl), aber wir können ein identisches Diagramm im D3-Stil implementieren. Verwenden Sie das, was Sie bevorzugen! _[Der hier. Ihr wollt den benutzen, trust me bro.]_`
)}

function _22(Tooltip,d3,width,height,line,data,xAxis,yAxis,x)
{
  const tooltip = new Tooltip();

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-miterlimit", 1)
      .attr("d", line(data));

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  svg.append("g")
      .attr("fill", "none")
      .attr("pointer-events", "all")
    .selectAll("rect")
    .data(d3.pairs(data))
    .join("rect")
      .attr("x", ([a, b]) => x(a.date))
      .attr("height", height)
      .attr("width", ([a, b]) => x(b.date) - x(a.date))
      .on("mouseover", (event, [a]) => tooltip.show(a))
      .on("mouseout", () => tooltip.hide());

  svg.append(() => tooltip.node);

  return svg.node();
}


function _23(md){return(
md`Tooltips, die durch *Mouseover*-Ereignisse ausgelöst werden, können teuer sein: Sie erfordern ein eigenes Element für jeden schwebenden Bereich des Diagramms. Bei komplexen Diagrammen könnt ihr die Leistung verbessern, indem ihr bei Bedarf berechnet, worüber der Mauszeiger bewegt wird.

Ein besonders effizienter Ansatz für Daten, die nach einer Dimension sortiert sind, wie z. B. unsere Zeitreihendaten hier, ist die [Halbierung](https://observablehq.com/@d3/d3-bisect) bei *Mausbewegung* ([Bisection](https://observablehq.com/@d3/d3-bisect) on *mousemove*).`
)}

function _24(Tooltip,htl,width,height,bisect,data,x,line,d3,xAxis,yAxis)
{
  const tooltip = new Tooltip();
  return htl.html`<svg viewBox="0 0 ${width} ${height}" onmousemove=${event => tooltip.show(bisect(data, x.invert(event.offsetX)))} onmouseleave=${() => tooltip.hide()}>
  <path d="${line(data)}" fill="none" stroke="steelblue" stroke-width="1.5" stroke-miterlimit="1"></path>
  ${d3.select(htl.svg`<g>`).call(xAxis).node()}
  ${d3.select(htl.svg`<g>`).call(yAxis).node()}
  ${tooltip.node}
</svg>`;
}


function _25(md){return(
md`Bisection findet den Wert, der der Maus am nächsten ist (entlang *x*). Die folgende Funktion berechnet zunächst den Index des Datenpunkts, der dem angegebenen Datum am nächsten liegt (unter der Annahme, dass die Daten in aufsteigender Reihenfolge sortiert sind), und gibt dann die zugehörigen Daten zurück.`
)}

function _bisect(d3)
{
  const bisectDate = d3.bisector(d => d.date).center;
  return (data, date) => data[bisectDate(data, date)];
}


function _27(md){return(
md`_[Als nächstes kommt ein riesiger Brocken an Material und Methoden, die spezifisch für Observable sind. Ich habe mich entschlossen, diesen Teil zu löschen, da er nicht wirklich etwas für euch bringt, es sei denn, ihr wisst, wie Observable und html+js funktionieren (dann währt ihr aber nicht hier). Ich empfehle trotzdem, [es auch mal anzuschauen](https://observablehq.com/@d3/learn-d3-interaction?collection=@d3/learn-d3#cell-0), aber nur als kleine Vorwarnung (aber nur auf englisch).]_`
)}

function _28(md){return(
md`Wir haben in diesem Tutorial eine Vielzahl von Interaktionstechniken durchgespielt - Tooltips, Event-Listener, Voronoi Overlays, Views _[das ist der Teil, den ich übersprungen habe]_ - aber es gibt noch so viel mehr, das wir nicht behandelt haben! Für den Anfang haben wir nicht einmal die wiederverwendbaren Verhaltensweisen von D3 erwähnt: [Pinseln](https://d3js.org/d3-brush) _[honestly, ich bin mir nicht sicher, ob das so die ganze Zeit korrekt war. Heißt das auch so auf deutsch?]_, [Zoomen](https://d3js.org/d3-zoom) und [Ziehen](https://d3js.org/d3-drag). (Zum Selbststudium findet ihr Beispiele in der [D3-Galerie](/@d3/gallery) und den Sammlungen _[der Link ist kaputt, ich hab ihn für euch entfernt :D]_).`
)}

function _29(md){return(
md`Nachdem wir nun die Grundlagen behandelt haben, ist es an der Zeit, einen Schritt zurückzutreten und zu überlegen, wie es weitergehen soll.

<a title="Learn D3: Further Topics" style="display: inline-flex; align-items: center; font: 600 14px var(--sans-serif);" href="/Notebooks/de9/index.html">Weiter<svg width="8" height="16" fill="none" stroke-width="1.8" style="margin-left: 0.25em; padding-top: 0.25em;"><path d="M2.75 11.25L5.25 8.25L2.75 5.25" stroke="currentColor"></path></svg></a>`
)}

function _30(md){return(
md`---

## Anhang

Mehr zum Thema Interaktion findet ihr in Gregor Aischs *"defense of interactive graphics"*. _[Offensichtlich wird dieses Notizbuch alt, viele der Links sind kaputt oder tot... Aber keine Angst, ich habe sie alle aktualisiert! :D_ <br>
_~~oder habe sie wie hier entfernt, damit es besser aussieht~~]_`
)}

function _data(FileAttachment){return(
FileAttachment("aapl-bollinger.csv").csv({typed: true})
)}

function _line(d3,x,y){return(
d3.line().x(d => x(d.date)).y(d => y(d.close))
)}

function _x(d3,data,margin,width){return(
d3.scaleUtc()
    .domain(d3.extent(data, d => d.date))
    .range([margin.left, width - margin.right])
)}

function _y(d3,data,height,margin){return(
d3.scaleLinear()
    .domain([0, d3.max(data, d => d.upper)])
    .range([height - margin.bottom, margin.top])
)}

function _xAxis(height,margin,d3,x,width){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
)}

function _yAxis(margin,d3,y,height){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(height / 40))
    .call(g => g.select(".domain").remove())
)}

function _formatDate(d3){return(
d3.utcFormat("%b %-d, ’%y")
)}

function _formatClose(d3){return(
d3.format("$.2f")
)}

function _height(){return(
240
)}

function _margin(){return(
{top: 20, right: 30, bottom: 30, left: 40}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["aapl-bollinger.csv", {url: new URL("./files/974c433d807128a001502e9a4d1f7a68aa0f0d1d0b64811b6440d049514cbed441f6a01cae321cadf169cdf0c5ff724778396d7466ce0aba151b52add0fac0c0.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["htl","width","height","line","data","d3","x","formatDate","formatClose","xAxis","yAxis"], _10);
  main.variable(observer()).define(["data","md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("voronoi")).define("voronoi", ["d3","data","x","y","width","height"], _voronoi);
  main.variable(observer()).define(["htl","width","height","line","data","voronoi","formatDate","formatClose","d3","xAxis","yAxis"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["Tooltip","htl","width","height","line","data","d3","xAxis","yAxis","x"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("Tooltip")).define("Tooltip", ["htl","x","y","formatDate","formatClose"], _Tooltip);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["Tooltip","d3","width","height","line","data","xAxis","yAxis","x"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["Tooltip","htl","width","height","bisect","data","x","line","d3","xAxis","yAxis"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("bisect")).define("bisect", ["d3"], _bisect);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("line")).define("line", ["d3","x","y"], _line);
  main.variable(observer("x")).define("x", ["d3","data","margin","width"], _x);
  main.variable(observer("y")).define("y", ["d3","data","height","margin"], _y);
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x","width"], _xAxis);
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y","height"], _yAxis);
  main.variable(observer("formatDate")).define("formatDate", ["d3"], _formatDate);
  main.variable(observer("formatClose")).define("formatClose", ["d3"], _formatClose);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("margin")).define("margin", _margin);
  return main;
}
