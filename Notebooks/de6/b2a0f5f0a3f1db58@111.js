import define1 from "./450051d7f1174df8@255.js";
import define2 from "./1104ceb0818de884@99.js";

function _1(md){return(
md`# Learn D3: Animation (6/9)

> _Disclaimer:_<br>
> _Dieses Notebook ist ein Fork von [Mike Bostock](https://observablehq.com/user/@mbostock)s "[Learn D3](https://observablehq.com/@d3/learn-d3-animation?collection=@d3/learn-d3)" Notebook-Serie._ <br>
> _Ich habe nur den Inhalt des Notebooks aktualisiert und geändert, um es besser an unseren Anwendungsfall anzupassen._ <br>
> _Dies ist die deutsche Übersetzung der Serie. Die Übersetzung wurde teils automatisiert erstellt. Keine Garantie auf Funktion, dafür bitte die [englische Version](/Notebooks/en6/index.html) verwenden. Alles sollte aber dennoch funktionieren._ <br><br>
> _Dieses Notebook enthält mehrere Zellen und Beschreibungen speziell für Observable-Notebooks, nicht für das klassische D3. Ich habe mich entschieden, sie im Notizbuch zu belassen, weil sie keine Entsprechung in klassischen Projekten haben und hilfreich sind, wenn man versucht zu verstehen, wie D3 tatsächlich funktioniert, anstatt es nur als Blackbox zu betrachten._

Im Gegensatz zu Grafiken, die auf Papier gezeichnet werden, müssen Computergrafiken nicht statisch sein; wie Frankensteins Monster können sie durch Animation lebendig werden!`
)}

function _replay(Inputs){return(
Inputs.button("Replay")
)}

function _3(replay,htl,width,height,d3,line,data,reveal,xAxis,yAxis)
{
  replay; // references the button above, causing this cell to run on click
  return htl.html`<svg viewBox="0 0 ${width} ${height}">
  ${d3.select(htl.svg`<path d="${line(data)}" fill="none" stroke="steelblue" stroke-width="1.5" stroke-miterlimit="1" stroke-dasharray="0,1"></path>`).call(reveal).node()}
  ${d3.select(htl.svg`<g>`).call(xAxis).node()}
  ${d3.select(htl.svg`<g>`).call(yAxis).node()}
</svg>`;
}


function _4(md){return(
md`Das obige Liniendiagramm wird nach und nach sichtbar. Das ist zwar etwas überflüssig - Bewegung sollte sparsam eingesetzt werden, da sie Aufmerksamkeit erregt -, aber es unterstreicht zumindest, dass *x* die Zeit repräsentiert, und bringt einen Hauch von Spannung in ein ansonsten langweiliges Diagramm.`
)}

function _5(md){return(
md`Der Code hier ähnelt dem Achsen-Rendering, das wir zuvor gesehen haben: Wir wählen ein SVG-Pfadelement aus, rufen eine Funktion (*reveal*) auf, um einen Übergang anzuwenden, und betten das Element schließlich in das HTML-Vorlagenliteral ein.`
)}

function _reveal(d3){return(
path => path.transition()
    .duration(5000)
    .ease(d3.easeLinear)
    .attrTween("stroke-dasharray", function() {
      const length = this.getTotalLength();
      return d3.interpolate(`0,${length}`, `${length},${length}`);
    })
)}

function _7(md){return(
md`Bevor wir uns jedoch mit den Einzelheiten der Techniken befassen, sollten wir einen Schritt zurücktreten und über Animation im Allgemeinen nachdenken.`
)}

function _8(md){return(
md`Bei einer Animation handelt es sich nicht um eine einzelne Grafik, sondern um eine *Folge* von Grafiken im Zeitverlauf. Diese Sequenz kann als Zelle (oder Funktion) dargestellt werden, die die Grafik für eine bestimmte Zeit *t* zurückgibt. Der Einfachheit halber verwenden wir oft eine normalisierte Zeit, bei der *t* = 0 der Beginn der Animation und *t* = 1 das Ende ist.`
)}

function _t(Scrubber,d3){return(
Scrubber(d3.ticks(0, 1, 200), {
  autoplay: false,
  loop: false,
  initial: 0,
  format: x => `t = ${x.toFixed(3)}`
})
)}

function _10(htl,width,height,line,data,lineLength,t,d3,xAxis,yAxis){return(
htl.html`<svg viewBox="0 0 ${width} ${height}">
  <path d="${line(data)}" fill="none" stroke="steelblue" stroke-width="1.5" stroke-miterlimit="1" stroke-dasharray="${lineLength * t},${lineLength}"></path>
  ${d3.select(htl.svg`<g>`).call(xAxis).node()}
  ${d3.select(htl.svg`<g>`).call(yAxis).node()}
</svg>`
)}

function _lineLength(htl,line,data){return(
htl.svg`<path d="${line(data)}">`.getTotalLength()
)}

function _12(md){return(
md`Unsere Zelle könnte theoretisch *jede beliebige* Grafik für einen bestimmten Zeitpunkt *t* zurückgeben, aber oft ist die Grafik für den Zeitpunkt *t* ähnlich wie die für den Zeitpunkt *t* + ϵ. Diese Ähnlichkeit von Bild zu Bild hilft dem Betrachter beim Verfolgen. (Oben animiert sich nur das Attribut '*stroke-dasharray*'; der Rest der Grafik bleibt konstant). Daher werden kontinuierliche Animationen oft durch diskrete Keyframes mit Zwischenbildern definiert, die durch Interpolation oder [*Tweening*](https://de.wikipedia.org/wiki/Tweening) erzeugt werden.`
)}

function _13(md){return(
md`Betrachten Sie das Attribut '*stroke-dasharray*'. Es handelt sich um zwei durch Kommata getrennte Zahlen: die erste ist die Länge des Gedankenstrichs, die zweite die Länge der Lücke zwischen den Gedankenstrichen. Ist die Länge des Strichs gleich Null, ist die Linie unsichtbar; ist die Länge des Strichs so lang wie die Linie, ist die Linie nicht unterbrochen. Indem wir die Länge des Strichs anpassen und die Lücke mindestens so lang wie die Linie halten, können wir steuern, wie viel von der Linie gestrichen wird. Und wir brauchen nur zwei Keyframes: einen Strich mit der Länge Null und einen Strich mit der Länge der Linie.`
)}

function _14(md){return(
md`Zur Unterstützung bei der Animation (neben anderen Anwendungen) bietet D3 [Interpolatoren](/collection/@d3/d3-interpolate). Der allgemeinste von ihnen, [d3.interpolate](/@d3/d3-interpolate), akzeptiert Zahlen, Farben, Zeichenketten und sogar Arrays und Objekte. Bei einem *Start*- und *End*wert gibt d3.interpolate eine Funktion zurück, die eine Zeit 0 ≤ *t* ≤ 1 annimmt und den entsprechenden Zwischenwert zurückgibt.`
)}

function _strokeDasharray(d3,lineLength){return(
d3.interpolate(`0,${lineLength}`, `${lineLength},${lineLength}`)
)}

function _16(strokeDasharray,t){return(
strokeDasharray(t)
)}

function _17(md){return(
md`Wenn Sie einen Übergang definieren, können Sie den Interpolator entweder explizit angeben (wie oben mit [*transition*.attrTween](https://d3js.org/d3-transition/modifying#transition_attrTween)) oder D3 wählen lassen (mit [*transition*.attr](https://d3js.org/d3-transition/modifying#transition_attr) oder [*transition*.style](https://d3js.org/d3-transition/modifying#transition_style)). Die explizite Angabe ermöglicht fortschrittlichere Interpolationsmethoden wie [Zoomen](/@d3/d3-interpolatezoom), [gammakorrigierte RGB-Überblendung](https://d3js.org/d3-interpolate/color#interpolateColor_gamma) oder sogar [Formüberblendung](/@mbostock/hello-flubber).`
)}

function _18(ramp,d3){return(
ramp(d3.interpolateRgb("steelblue", "orange"))
)}

function _19(ramp,d3){return(
ramp(d3.interpolateRgb.gamma(2.2)("steelblue", "orange"))
)}

function _20(md){return(
md`Animation ist jedoch mehr als Interpolation: Es geht auch um das Timing. Wir müssen sechzig Mal pro Sekunde neu zeichnen und die normalisierte Zeit *t* auf der Grundlage der Echtzeit sowie der gewünschten Startzeit und Dauer der Animation berechnen.

Bisher haben wir zwei Timing-Methoden kennengelernt.`
)}

function _21(md){return(
md`Die erste basiert auf den D3-Übergängen, wobei eine Ausgangsgrafik erstellt und dann ein Übergang gestartet wird, um sie zu verändern (Interpolation des Strich-Punkt-Arrays).`
)}

function _22(md){return(
md`Die zweite Methode stützt sich auf den *dataflow* von Observable, wobei die Grafik jedes Mal neu erstellt wird, wenn sich der referenzierte Wert *t* ändert, und ein [Scrubber](/@mbostock/scrubber) für das Timing zuständig ist. Dies ist weniger effizient als die vorherige Methode, da die Grafik bei jedem Frame von Grund auf neu erstellt wird, aber einfacher zu schreiben. <br>
_[Aus offensichtlichen Gründen würde dies in einem klassischen Projekt nicht funktionieren, da HTML + Js keinen Datenfluss wie Observable-Notebooks hat.]_`
)}

function _23(md){return(
md`Observable verfügt über ein weiteres leistungsfähiges Werkzeug zur Steuerung der Animation: [*Generatoren*](/@observablehq/introduction-to-generators). Wenn eine Generatorzelle einen Wert liefert, wird ihre Ausführung bis zum nächsten Animationsframe ausgesetzt, und zwar bis zu sechzig Mal pro Sekunde. Der ausgegebene Wert kann ein einfacher Integer-Wert sein - oder ein sich inkrementell aktualisierendes SVG-Element! <br>
_[Generatoren sind ein JavaScript-Konstruktor und funktionieren als solcher auch in klassischen Projekten.]_`
)}

function _replay2(Inputs){return(
Inputs.button("Replay")
)}

function* _25(replay2)
{
  replay2; // auf die Schaltfläche verweisen, so dass diese Zelle beim Anklicken erneut angezeigt wird
  for (let i = 0, n = 300; i < n; ++i) {
    yield i;
  }
}


function* _26(replay2,htl,line,data,width,height,d3,xAxis,yAxis,lineLength)
{
  replay2; // reference the button so this cell re-runs on click

  const path = htl.svg`<path d="${line(data)}" fill="none" stroke="steelblue" stroke-width="1.5" stroke-miterlimit="1">`;

  const chart = htl.html`<svg viewBox="0 0 ${width} ${height}">
    ${path}
    ${d3.select(htl.svg`<g>`).call(xAxis).node()}
    ${d3.select(htl.svg`<g>`).call(yAxis).node()}
  </svg>`;

  for (let i = 0, n = 300; i < n; ++i) {
    const t = (i + 1) / n;
    path.setAttribute("stroke-dasharray", `${t * lineLength},${lineLength}`);
    yield chart;
  }
}


function _27(md){return(
md`In Anbetracht der Vielzahl möglicher Animationsansätze in Observable _[und auch D3]_, welchen sollte man verwenden? Es kommt darauf an!`
)}

function _28(md){return(
md`Wenn die Grafik so einfach ist, dass ihr sie bei jedem Bild von Grund auf neu erstellen könnt - oder wenn ihr keine animierten Übergänge benötigt -, dann schreibt die Grafik deklarativ. Mit anderen Worten: Macht nichts! Dank des *dataflows* von Observable kann eine "statische" Grafik reaktionsfähig, interaktiv oder animiert gemacht werden, ohne dass ihr Code geändert werden muss.
_[Klassische Projekte haben keinen dataflow.]_`
)}

function _29(md){return(
md`Bei dynamischen Grafiken mit höherer Komplexität - wo die Leistung effiziente inkrementelle Aktualisierungen erfordert - werden hingegen Übergänge oder Generatoren verwendet.`
)}

function _30(md){return(
md`Ihr könnt auch verschiedene Ansätze kombinieren. Die folgende Grafik ist zunächst statisch, verfügt aber über eine *chart*.update-Methode für den Übergang zu einer bestimmten *x*-Domäne; diese Methode wird von einer anderen Zelle aufgerufen, wenn sich der ausgewählte Wert der Radioeingabe ändert. (Dieser Code ist mit d3-selection und nicht mit HTML-Template-Literalen geschrieben, aber die Struktur der Grafik ist die gleiche wie in früheren Beispielen, also versucht, die Bedeutung des Codes durch Vergleich zu erschließen). <br>
_[Dieser Codesnippet kann also in klassischen Projekten verwendet werden.]_`
)}

function _timeframe(Inputs,d3,data){return(
Inputs.radio(new Map([
  ["All", d3.extent(data, d => d.date)],
  ["2009", [new Date("2009-01-01"), new Date("2010-01-01")]],
  ["2010", [new Date("2010-01-01"), new Date("2011-01-01")]],
  ["2011", [new Date("2011-01-01"), new Date("2012-01-01")]],
]), {key: "All"})
)}

function _chart(d3,width,height,x,y,data,xAxis,yAxis)
{
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  const zx = x.copy(); // x, but with a new domain.

  const line = d3.line()
      .x(d => zx(d.date))
      .y(d => y(d.close));

  const path = svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-miterlimit", 1)
      .attr("d", line(data));

  const gx = svg.append("g")
      .call(xAxis, zx);

  const gy = svg.append("g")
      .call(yAxis, y);

  return Object.assign(svg.node(), {
    update(domain) {
      const t = svg.transition().duration(750);
      zx.domain(domain);
      gx.transition(t).call(xAxis, zx);
      path.transition(t).attr("d", line(data));
    }
  });
}


function _update(chart,timeframe){return(
chart.update(timeframe)
)}

function _34(md){return(
md`Durch die Bereitstellung einer oder mehrerer Aktualisierungsmethoden kann ein Diagramm selektiv Übergänge für bestimmte Wertänderungen animieren. Wenn sich etwas anderes ändert, fällt das Diagramm auf passive Reaktivität zurück und wird von Grund auf neu gezeichnet.`
)}

function _35(md){return(
md`Dieses Beispiel demonstriert ein weiteres praktisches Feature von D3-Achsen: Durch den Wechsel zu [*transition*.call](https://d3js.org/d3-transition/control-flow#transition_call) anstelle von *selection*.call wird die Änderung der *x*-Achse nun animiert und nicht mehr augenblicklich und synchronisiert mit dem Übergangspfad!`
)}

function _36(md){return(
md`Die obigen Animationen betreffen praktischerweise nur ein einziges Element: die Linie des Diagramms. Was aber, wenn ihr mehrere Elemente animieren möchtet? Und was, wenn sich die Menge der Elemente im Laufe der Zeit ändert, wenn neue Elemente hinzukommen und alte Elemente verschwinden? Lest weiter!

<a title="Learn D3: Joins" style="display: inline-flex; align-items: center; font: 600 14px var(--sans-serif);" href="/Notebooks/de7/index.html">Weiter<svg width="8" height="16" fill="none" stroke-width="1.8" style="margin-left: 0.25em; padding-top: 0.25em;"><path d="M2.75 11.25L5.25 8.25L2.75 5.25" stroke="currentColor"></path></svg></a>`
)}

function _37(md){return(
md`---

## Anhang

Wenn ihr an der Gestaltung effektiver Animationen interessiert seid, empfehle ich euch wärmstens den 2007 erschienenen Artikel [*Animated Transitions in Statistical Data Graphics*](http://vis.berkeley.edu/papers/animated_transitions/) von Heer und Robertsons.`
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

function _xAxis(x,height,margin,d3,width){return(
(g, scale = x) => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(scale).ticks(width / 80).tickSizeOuter(0))
)}

function _yAxis(y,margin,d3,height){return(
(g, scale = y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(scale).ticks(height / 40))
    .call(g => g.select(".domain").remove())
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
  main.variable(observer("viewof replay")).define("viewof replay", ["Inputs"], _replay);
  main.variable(observer("replay")).define("replay", ["Generators", "viewof replay"], (G, _) => G.input(_));
  main.variable(observer()).define(["replay","htl","width","height","d3","line","data","reveal","xAxis","yAxis"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("reveal")).define("reveal", ["d3"], _reveal);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof t")).define("viewof t", ["Scrubber","d3"], _t);
  main.variable(observer("t")).define("t", ["Generators", "viewof t"], (G, _) => G.input(_));
  main.variable(observer()).define(["htl","width","height","line","data","lineLength","t","d3","xAxis","yAxis"], _10);
  main.variable(observer("lineLength")).define("lineLength", ["htl","line","data"], _lineLength);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("strokeDasharray")).define("strokeDasharray", ["d3","lineLength"], _strokeDasharray);
  main.variable(observer()).define(["strokeDasharray","t"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["ramp","d3"], _18);
  main.variable(observer()).define(["ramp","d3"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("viewof replay2")).define("viewof replay2", ["Inputs"], _replay2);
  main.variable(observer("replay2")).define("replay2", ["Generators", "viewof replay2"], (G, _) => G.input(_));
  main.variable(observer()).define(["replay2"], _25);
  main.variable(observer()).define(["replay2","htl","line","data","width","height","d3","xAxis","yAxis","lineLength"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("viewof timeframe")).define("viewof timeframe", ["Inputs","d3","data"], _timeframe);
  main.variable(observer("timeframe")).define("timeframe", ["Generators", "viewof timeframe"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","width","height","x","y","data","xAxis","yAxis"], _chart);
  main.variable(observer("update")).define("update", ["chart","timeframe"], _update);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("line")).define("line", ["d3","x","y"], _line);
  main.variable(observer("x")).define("x", ["d3","data","margin","width"], _x);
  main.variable(observer("y")).define("y", ["d3","data","height","margin"], _y);
  main.variable(observer("xAxis")).define("xAxis", ["x","height","margin","d3","width"], _xAxis);
  main.variable(observer("yAxis")).define("yAxis", ["y","margin","d3","height"], _yAxis);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("margin")).define("margin", _margin);
  const child1 = runtime.module(define1);
  main.import("Scrubber", child1);
  const child2 = runtime.module(define2);
  main.import("ramp", child2);
  return main;
}
