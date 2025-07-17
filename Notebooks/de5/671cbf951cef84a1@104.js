function _1(md){return(
md`# Learn D3: Formen (5/9)

> _Disclaimer:_<br>
> _Dieses Notebook ist ein Fork von [Mike Bostock](https://observablehq.com/user/@mbostock)s "[Learn D3](https://observablehq.com/@d3/learn-d3-shapes?collection=@d3/learn-d3)" Notebook-Serie._ <br>
> _Ich habe nur den Inhalt des Notebooks aktualisiert und geändert, um es besser an unseren Anwendungsfall anzupassen._ <br>
> _Dies ist die deutsche Übersetzung der Serie. Die Übersetzung wurde teils automatisiert erstellt. Keine Garantie auf Funktion, dafür bitte die [englische Version](/Notebooks/en5/index.html) verwenden. Alles sollte aber dennoch funktionieren._

SVG und Canvas sind absichtlich generisch; sie erlauben jede Art von Grafik. D3 hingegen ist für die Visualisierung gedacht und bietet daher ein spezielles Vokabular von *Formen*, die Funktionen zur Erzeugung von Pfaddaten sind.`
)}

function _2(md){return(
md`Pfade können Kreise, Rechtecke, Linien, Schnörkel, Schleifen, [Tiger 🐅](https://commons.wikimedia.org/wiki/File:Ghostscript_Tiger.svg) und alles andere zeichnen, was Sie sich vorstellen können. Die Form eines Pfades wird in der [SVG-Pfaddatensprache](https://www.w3.org/TR/SVG/paths.html#TheDProperty) (oder entsprechenden [Canvas-Pfadmethoden](https://html.spec.whatwg.org/multipage/canvas.html#canvaspath)) angegeben, die Befehlen ähnelt, die man einem altmodischen [Stiftplotter](https://en.wikipedia.org/wiki/Plotter) geben würde. Zum Beispiel:

* <code>M<i>x</i>,<i>y</i></code> - zum angegebenen Punkt [*x*, *y*] bewegen
* <code>L<i>x</i>,<i>y</i></code> - eine Linie zum angegebenen Punkt [*x*, *y*] zeichnen
* <code>h<i>x</i></code> - eine horizontale Linie der Länge *x* zeichnen
* <code>v<i>y</i></code> - eine vertikale Linie der Länge *y* zeichnen
* <code>z</code> - den aktuellen Unterpfad schließen`
)}

function _3(md){return(
md`Angenommen, wir möchten den Kurs der Apple-Aktie über mehrere Jahre hinweg in einem Liniendiagramm darstellen. Hier ist ein Datensatz mit Spalten für *Datum* und *Schlusskurs* (wobei sich „Schluss“ auf den Kurs der Aktie bei Börsenschluss bezieht) und den entsprechenden Skalen.`
)}

function _data(FileAttachment){return(
FileAttachment("aapl-bollinger.csv").csv({typed: true})
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

function _7(md){return(
md`Um die Linie zu zeichnen, benötigen wir Pfaddaten, die mit <code>M<i>x</i>,<i>y</i></code> beginnen, um den ersten Punkt anzufahren, und dann wiederholt <code>L<i>x</i>,<i>y</i></code>, um eine Linie zu jedem nachfolgenden Punkt zu zeichnen. Wir könnten dies tun, indem wir eine Schleife über die zu verkettenden Punkte ziehen.`
)}

function _8(x,data,y)
{
  let path = `M${x(data[0].date)},${y(data[0].close)}`;
  for (let i = 1; i < data.length; ++i) {
    path += `L${x(data[i].date)},${y(data[i].close)}`;
  }
  return path;
}


function _9(md){return(
md`Aber [d3.line](/@d3/d3-line) ist komfortabler. Der Aufruf von d3.line gibt einen Standard-Liniengenerator zurück, und durch den Aufruf von *line*.x und *line*.y können wir die Linie mit Funktionen konfigurieren, die die *x*- und *y*-Position für einen gegebenen Datenpunkt *d* zurückgeben. Diese Funktionen rufen den gewünschten abstrakten Wert (*Datum* oder *Anzahl*) ab und konvertieren ihn in eine visuelle Position (durch Anwendung einer Skala).`
)}

function _line(d3,x,y){return(
d3.line()
    .x(d => x(d.date))
    .y(d => y(d.close))
)}

function _11(md){return(
md`Die Übergabe der Daten an den Zeilengenerator liefert den entsprechenden SVG-Pfaddatenstring, der verwendet werden kann, um das *d*-Attribut eines Pfadelements zu setzen.`
)}

function _12(line,data){return(
line(data)
)}

function _13(htl,width,height,line,data,d3,xAxis,yAxis){return(
htl.html`<svg viewBox="0 0 ${width} ${height}">
  <path d="${line(data)}" fill="none" stroke="steelblue" stroke-width="1.5" stroke-miterlimit="1"></path>
  ${d3.select(htl.svg`<g>`).call(xAxis).node()}
  ${d3.select(htl.svg`<g>`).call(yAxis).node()}
</svg>`
)}

function _14(md){return(
md`(Um Wiederholungen zu vermeiden, habe ich im Anhang unten wiederverwendbare Achsen definiert. Jede Achse ist eine Funktion, die mit einer Auswahl von G-Elementen gefüllt werden kann).`
)}

function _15(md){return(
md`Der obige Pfad ist mit einer blauen Kontur und keiner Füllung gestaltet. Um irreführende Spitzen zu vermeiden, die durch Gehrungsverbindungen zwischen Liniensegmenten verursacht werden, habe ich die [Gehrungsgrenze](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-miterlimit) auf 100 % (1×) der Strichstärke festgelegt. Ich hätte alternativ auch runde Linienverbindungen und Kappen verwenden können.`
)}

function _16(md){return(
md`Für ein Flächendiagramm gibt es ebenfalls die Funktion d3.area. Die Form eines Bereichs wird als zwei Linien mit gemeinsamen *x*-Werten angegeben: *area*.y0 ist die Grundlinie und *area*.y1 ist die Oberlinie. Für ein Flächendiagramm mit einer konstanten Grundlinie entlang der unteren Kante des Diagramms setzen wir *area*.y0 auf *y*(0).`
)}

function _area(d3,x,y){return(
d3.area()
    .x(d => x(d.date))
    .y0(y(0))
    .y1(d => y(d.close))
)}

function _18(htl,width,height,area,data,d3,xAxis,yAxis){return(
htl.html`<svg viewBox="0 0 ${width} ${height}">
  <path fill="steelblue" d="${area(data)}"></path>
  ${d3.select(htl.svg`<g>`).call(xAxis).node()}
  ${d3.select(htl.svg`<g>`).call(yAxis).node()}
</svg>`
)}

function _19(md){return(
md`Wenn ihr einen Bereich mit einer variablen Basislinie wünscht - wie in einem gestapelten Bereichsdiagramm, einem Stromdiagramm oder dem Diagramm der Bollinger-Bänder unten -, übergebt stattdessen *area*.y0 eine Funktion. Wie bei *area*.x und *area*.y1 wird diese Funktion für jeden Datenpunkt aufgerufen, um den entsprechenden *y*-Wert zu berechnen.`
)}

function _areaBand(d3,x,y){return(
d3.area()
    .x(d => x(d.date))
    .y0(d => y(d.lower))
    .y1(d => y(d.upper))
)}

function _21(htl,width,height,areaBand,data,d3,xAxis,yAxis){return(
htl.html`<svg viewBox="0 0 ${width} ${height}">
  <path d="${areaBand(data)}" fill="steelblue"></path>
  ${d3.select(htl.svg`<g>`).call(xAxis).node()}
  ${d3.select(htl.svg`<g>`).call(yAxis).node()}
</svg>`
)}

function _22(md){return(
md`Um die Anzeige der Bollinger-Bänder zu vervollständigen, indem der zentrale gleitende Durchschnitt und der Tagesschlusskurs angezeigt werden, können wir Linien darüberlegen. Da jedes Pfadelement nur einen einzigen Stil haben kann, verwenden wir mehrere Pfade für mehrere Farben.`
)}

function _lineMiddle(d3,x,y){return(
d3.line()
    .x(d => x(d.date))
    .y(d => y(d.middle))
)}

function _24(htl,width,height,areaBand,data,lineMiddle,line,d3,xAxis,yAxis){return(
htl.html`<svg viewBox="0 0 ${width} ${height}">
  <path d="${areaBand(data)}" fill="#ddd"></path>
  <g fill="none" stroke-width="1.5" stroke-miterlimit="1">
    <path d="${lineMiddle(data)}" stroke="#00f"></path>
    <path d="${line(data)}" stroke="#000"></path>
  </g>
  ${d3.select(htl.svg`<g>`).call(xAxis).node()}
  ${d3.select(htl.svg`<g>`).call(yAxis).node()}
</svg>`
)}

function _25(md){return(
md`Linien und Flächen sind so konzipiert, dass sie zusammenarbeiten: ihr könnt die Linie, die der Grundlinie oder Oberlinie einer Fläche entspricht, durch den Aufruf von *area*.lineY0 bzw. *area*.lineY1 ableiten. Dies ist nützlich, um einen Bereich mit einem oberen oder unteren Strich zu verzieren.`
)}

function _26(htl,width,height,areaBand,data,d3,xAxis,yAxis){return(
htl.html`<svg viewBox="0 0 ${width} ${height}">
  <path d="${areaBand(data)}" fill="#ddd"></path>
  <g fill="none" stroke-width="1.5" stroke-miterlimit="1">
    <path d="${areaBand.lineY0()(data)}" stroke="#00f"></path>
    <path d="${areaBand.lineY1()(data)}" stroke="#f00"></path>
  </g>
  ${d3.select(htl.svg`<g>`).call(xAxis).node()}
  ${d3.select(htl.svg`<g>`).call(yAxis).node()}
</svg>`
)}

function _27(md){return(
md`Linien und Flächen verfügen über weitere Funktionen, auf die wir hier nicht eingehen werden, aber einige seien angedeutet: [Radiale Linien und Flächen](/@d3/d3-lineradial) sind nützlich für zyklische Daten, wie z. B. [saisonale Temperaturen](/@d3/radial-area-chart); [Kurven](https://d3js.org/d3-shape/curve) bieten konfigurierbare Interpolationsmethoden, wie z. B. monotonitätserhaltende Splines; und ihr könnt [Lücken für fehlende Daten anzeigen](/@d3/area-with-missing-data).`
)}

function _28(md){return(
md`Natürlich besteht die Visualisierung nicht nur aus Balken, Linien und Flächen.

Eine weitere gängige Form ist das, was D3 als *arc* bezeichnet, was Mathematiker jedoch als <a href="https://de.wikipedia.org/wiki/Kreisring">*Kreisring*</a> bezeichnen würden. Er kommt in [Tortendiagrammen](/@d3/pie-chart), [Donut-Diagrammen](/@d3/donut-chart) und [Sunbursts](/@d3/sunburst) vor (aber verwirrenderweise nicht in [Bogen-Diagrammen](/@d3/arc-diagram)).`
)}

function _arc(d3){return(
d3.arc()
    .innerRadius(210)
    .outerRadius(310)
    .startAngle(([startAngle, endAngle]) => startAngle)
    .endAngle(([startAngle, endAngle]) => endAngle)
)}

function _30(md){return(
md`Ähnlich wie Linien und Flächen durch *x* und *y* konfiguriert werden, wird ein Bogen durch *innerRadius*, *outerRadius*, *startAngle* und *endAngle* (mit Winkeln im Bogenmaß) konfiguriert. Der obige Bogengenerator ist so konfiguriert, dass er ein Array [*startAngle*, *endAngle*] akzeptiert.`
)}

function _31(arc){return(
arc([Math.PI / 2, Math.PI])
)}

function _n(Inputs){return(
Inputs.range([1, 50], {value: 12, step: 1, label: "n"})
)}

function _33(htl,n,d3,arc){return(
htl.html`<svg viewBox="-320 -320 640 640" style="max-width: 640px;">
  ${Array.from({length: n}, (_, i) => htl.svg`<path stroke="black" fill="${d3.interpolateRainbow(i / n)}" d="${arc([i / n * 2 * Math.PI, (i + 1) / n * 2 * Math.PI])}"></path>`)}
</svg>`
)}

function _34(md){return(
md`Die Berechnung von Bogenwinkeln wie oben kann für ein Torten- oder Donut-Diagramm mühsam sein, daher bietet D3 zur Vereinfachung [d3.pie](https://d3js.org/d3-shape/pie). Erinnert euch an den Obst-Datensatz.`
)}

function _fruits(){return(
[
  {name: "🍊", count: 21},
  {name: "🍇", count: 13},
  {name: "🍏", count: 8},
  {name: "🍌", count: 5},
  {name: "🍐", count: 3},
  {name: "🍋", count: 2},
  {name: "🍎", count: 1},
  {name: "🍉", count: 1}
]
)}

function _36(md){return(
md`Durch Konfigurieren eines Tortenlayouts mit einem *value*-Aktor für die Eigenschaft *count* können wir die Bogenwinkel so berechnen, dass die Winkelspanne jedes Bogens proportional zu seinem Wert ist und die Bögen zusammenhängend von 0 bis 2π reichen.`
)}

function _pieArcData(d3,fruits){return(
d3.pie()
    .value(d => d.count)
  (fruits)
)}

function _38(md){return(
md`Diese Objekte, eines pro Bezugspunkt, können an einen Bogengenerator mit festen Radien übergeben werden, um ein Donut-Diagramm zu erstellen. (Und weil ich nicht widerstehen kann, ein *wenig* anzugeben, wende ich eine Füllung und einen Eckenradius an).`
)}

function _arcPie(d3){return(
d3.arc()
    .innerRadius(210)
    .outerRadius(310)
    .padRadius(300)
    .padAngle(2 / 300)
    .cornerRadius(8)
)}

function _40(htl,pieArcData,arcPie){return(
htl.html`<svg viewBox="-320 -320 640 640" style="max-width: 640px;" text-anchor="middle" font-family="sans-serif">
  ${pieArcData.map(d => htl.svg`
    <path fill="steelblue" d="${arcPie(d)}"></path>
    <text fill="white" transform="translate(${arcPie.centroid(d).join(",")})">
      <tspan x="0" font-size="24">${d.data.name}</tspan>
      <tspan x="0" font-size="12" dy="1.3em">${d.value.toLocaleString("en")}</tspan>
    </text>
  `)}
</svg>`
)}

function _41(md){return(
md`Nachdem wir nun eine Handvoll gängiger Datengrafiken behandelt haben, wollen wir sehen, wie man sie zum Leben erwecken kann!

<a title="Learn D3: Animation" style="display: inline-flex; align-items: center; font: 600 14px var(--sans-serif);" href="/Notebooks/de6/index.html">Weiter<svg width="8" height="16" fill="none" stroke-width="1.8" style="margin-left: 0.25em; padding-top: 0.25em;"><path d="M2.75 11.25L5.25 8.25L2.75 5.25" stroke="currentColor"></path></svg></a>`
)}

function _42(md){return(
md`---

## Anhang`
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
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("x")).define("x", ["d3","data","margin","width"], _x);
  main.variable(observer("y")).define("y", ["d3","data","height","margin"], _y);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["x","data","y"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("line")).define("line", ["d3","x","y"], _line);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["line","data"], _12);
  main.variable(observer()).define(["htl","width","height","line","data","d3","xAxis","yAxis"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("area")).define("area", ["d3","x","y"], _area);
  main.variable(observer()).define(["htl","width","height","area","data","d3","xAxis","yAxis"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("areaBand")).define("areaBand", ["d3","x","y"], _areaBand);
  main.variable(observer()).define(["htl","width","height","areaBand","data","d3","xAxis","yAxis"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("lineMiddle")).define("lineMiddle", ["d3","x","y"], _lineMiddle);
  main.variable(observer()).define(["htl","width","height","areaBand","data","lineMiddle","line","d3","xAxis","yAxis"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["htl","width","height","areaBand","data","d3","xAxis","yAxis"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("arc")).define("arc", ["d3"], _arc);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer()).define(["arc"], _31);
  main.variable(observer("viewof n")).define("viewof n", ["Inputs"], _n);
  main.variable(observer("n")).define("n", ["Generators", "viewof n"], (G, _) => G.input(_));
  main.variable(observer()).define(["htl","n","d3","arc"], _33);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer("fruits")).define("fruits", _fruits);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("pieArcData")).define("pieArcData", ["d3","fruits"], _pieArcData);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("arcPie")).define("arcPie", ["d3"], _arcPie);
  main.variable(observer()).define(["htl","pieArcData","arcPie"], _40);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x","width"], _xAxis);
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y","height"], _yAxis);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("margin")).define("margin", _margin);
  return main;
}
