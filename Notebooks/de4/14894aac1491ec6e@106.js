import define1 from "./a33468b95d0b15b0@817.js";

function _1(md){return(
md`# Learn D3: Skalen (4/9)

> _Disclaimer:_<br>
> _Dieses Notebook ist ein Fork von [Mike Bostock](https://observablehq.com/user/@mbostock)s "[Learn D3](https://observablehq.com/@d3/learn-d3-scales?collection=@d3/learn-d3)" Notebook-Serie._ <br>
> _Ich habe nur den Inhalt des Notebooks aktualisiert und geändert, um es besser an unseren Anwendungsfall anzupassen._ <br>
> _Dies ist die deutsche Übersetzung der Serie. Die Übersetzung wurde teils automatisiert erstellt. Keine Garantie auf Funktion, dafür bitte die [englische Version](/Notebooks/en4/index.html) verwenden. Alles sollte aber dennoch funktionieren._

Von allen D3-Werkzeugen für Datengrafiken ist das grundlegendste die Skala, die eine abstrakte Dimension von Daten auf eine visuelle Variable abbildet.

Ein kleiner Vorgeschmack ist dieser winzige Obstdatensatz.`
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

function _3(md){return(
md`Normalerweise denken wir bei Dimensionen an den Raum, z. B. an die Position in drei Dimensionen, aber eine abstrakte Dimension muss nicht räumlich sein. Sie kann quantitativ sein, wie die *Anzahl* der einzelnen Früchte oben. Oder sie kann nominal sein, wie etwa ein *Name*.`
)}

function _4(fruits){return(
fruits.map(d => d.count)
)}

function _5(fruits){return(
fruits.map(d => d.name)
)}

function _6(md){return(
md`In *Semiology of Graphics* beschreibt Jacques Bertin, wie grafische Zeichen wie Punkte und Linien „Unterschiede (≠), Ähnlichkeiten (≡), eine quantifizierte Ordnung (Q) oder eine nicht-quantifizierte Ordnung (O) darstellen und Gruppen, Hierarchien oder vertikale Bewegungen ausdrücken können“, indem sie Position, Größe, Farbe und dergleichen verwenden. Diese Eigenschaften von grafischen Zeichen sind unsere visuellen Variablen.`
)}

async function _7(FileAttachment,md){return(
md`<figure>
  <img src="${await FileAttachment("bertin-variables.png").url()}">
  <figcaption>Aus *Semiology of Graphics*, koloriert vom Autor.</figcaption>
</figure>`
)}

function _8(md){return(
md`Wie viele andere Visualisierungen ordnet das nachstehende Balkendiagramm zwei abstrakte Dimensionen zwei visuellen Variablen zu: Die *Namens*dimension wird der *y*-Position der Balken zugeordnet, während die *Zähl*dimension der *x*-Position zugeordnet wird. Diese Zuordnungen werden durch die folgenden *x*- und *y*-Skalen umgesetzt.`
)}

function _9(htl,width,height,fruits,y,x,d3,margin){return(
htl.html`<svg viewBox="0 0 ${width} ${height}" style="max-width: ${width}px; font: 10px sans-serif;">
  <g fill="steelblue">
    ${fruits.map(d => htl.svg`<rect y="${y(d.name)}" x="${x(0)}" width="${x(d.count) - x(0)}" height="${y.bandwidth()}"></rect>`)}
  </g>
  <g fill="white" text-anchor="end" transform="translate(-6,${y.bandwidth() / 2})">
    ${fruits.map(d => htl.svg`<text y="${y(d.name)}" x="${x(d.count)}" dy="0.35em">${d.count}</text>`)}
  </g>
  ${d3.select(htl.svg`<g transform="translate(0,${margin.top})">`)
    .call(d3.axisTop(x))
    .call(g => g.select(".domain").remove())
    .node()}
  ${d3.select(htl.svg`<g transform="translate(${margin.left},0)">`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .node()}
</svg>`
)}

function _x(d3,fruits,margin,width){return(
d3.scaleLinear()
    .domain([0, d3.max(fruits, d => d.count)])
    .range([margin.left, width - margin.right])
    .interpolate(d3.interpolateRound)
)}

function _y(d3,fruits,margin,height){return(
d3.scaleBand()
    .domain(fruits.map(d => d.name))
    .range([margin.top, height - margin.bottom])
    .padding(0.1)
    .round(true)
)}

function _12(md){return(
md`(Ihr könnt den Code gerne bearbeiten und sehen, was passiert!)

D3-Skalen gibt es in vielen Varianten. Welche ihr verwendet, hängt von der abstrakten Dimension (quantitativ oder nominal?) und der visuellen Variable (Position oder Farbe?) ab. Hier ist *x* eine [lineare Skala](/@d3/d3-scalelinear), weil die *Anzahl* quantitativ ist und die Balkenlänge proportional zum Wert sein sollte, während *y* eine [Bandskala](/@d3/d3-scaleband) ist, weil der *Name* nominal ist und die Balken dick sind.`
)}

function _13(md){return(
md`Jede Skala wird durch paarweise Korrespondenzen von abstrakten Daten (der *domain*) zu visuellen Variablen (der *range*) konfiguriert. Beispielsweise wird der untere Wert der *x-domain* (0) auf den unteren Wert der *x-range* (linker Rand des Diagramms) abgebildet, während der obere Wert der *domain* (die maximale Anzahl) auf den oberen Wert der *range* (rechter Rand) abgebildet wird.`
)}

function _14(md){return(
md`Bei einer linearen Skala sind die *domain* und die *range* kontinuierliche Intervalle (von *min* bis *max*). Bei einer Bandskala ist die *domain* ein Array diskreter Werte (🍊, 🍇, 🍏, ...), während die *range* ein kontinuierliches Intervall ist; die Bandskala bestimmt automatisch, wie die *range* in diskrete, aufgefüllte Bänder unterteilt wird.`
)}

function _15(md){return(
md`Die obigen Skalen werden durch *Methodenverkettung* konfiguriert. Dieser prägnante Stil ist möglich, weil Methoden, die eine Skala konfigurieren, wie *scale*.domain, die Skala zurückgeben. Hier ist die entsprechende Langschrift.`
)}

function _16(d3,fruits,margin,width)
{
  const x = d3.scaleLinear();
  x.domain([0, d3.max(fruits, d => d.count)]);
  x.range([margin.left, width - margin.right]);
  x.interpolate(d3.interpolateRound);
  return x;
}


function _17(md){return(
md`Skalenmethoden können auch verwendet werden, um ihre zugehörigen Werte abzurufen, wenn sie ohne Argumente aufgerufen werden. Dies ist nützlich für die Ableitung neuer Skalen oder zur Fehlersuche.`
)}

function _18(x){return(
x.domain()
)}

function _19(x){return(
x.range()
)}

function _20(md){return(
md`Und was *ist* eine D3-Skala? Eine Funktion. Wenn man sie aufruft, erhält man den visuellen Wert (z. B. eine *x*-Position), der dem angegebenen abstrakten Wert (z. B. *count*) entspricht.`
)}

function _21(y){return(
y("🍇")
)}

function _22(x){return(
x(21)
)}

function _23(x){return(
x(0)
)}

function _24(md){return(
md`Nach [Konvention](/@d3/margin-convention) werden in den meisten D3-Diagrammen Ränder auf die Skalenbereiche angewendet, um Platz für die Achsen zu schaffen. Daher ist *x*(0) oft nicht Null, sondern die Größe des linken Rands.`
)}

function _25(DOM,htl,width,height,d3,x,y)
{
  const margin = ({top: 30, right: 30, bottom: 30, left: 30});
  const barId = DOM.uid("bar");
  const arrowId = DOM.uid("arrow");
  return htl.svg`<svg viewBox="0 0 ${width} ${height}" style="max-width: ${width}px; font: 10px sans-serif; overflow: visible;">
  <defs>
    <marker id="${barId.id}" viewBox="-5 -5 10 10" markerWidth="6" markerHeight="6" orient="auto">
      <path fill="none" stroke="black" stroke-width="1.5" d="M0,5v-10"></path>
    </marker>
    <marker id="${arrowId.id}" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0,0L10,5L0,10z"></path>
    </marker>
  </defs>
  <rect fill="none" stroke="#000" stroke-dasharray="1,2" width="${width}" height="${height}"></rect>
  <rect fill="#eee" stroke="#000" x="${margin.left}" y="${margin.top}" width="${width - margin.left - margin.right}" height="${height - margin.top - margin.bottom}"></rect>

  <g fill="none" stroke="#000" marker-start="${barId}" marker-end="${arrowId}">
    <path d="M0,${height / 2}h${margin.left}"></path>
    <path d="M${width},${height / 2}h${-margin.right}"></path>
    <path d="M${width / 2},0v${margin.top}"></path>
    <path d="M${width / 2},${height}v${-margin.bottom}"></path>
  </g>

  <circle r="2.5"></circle>

  <text x="${margin.left + 6}" y="${height / 2}" dy="0.35em">margin.left</text>
  <text x="${width - margin.right - 6}" y="${height / 2}" dy="0.35em" text-anchor="end">margin.right</text>
  <text x="${width / 2}" y="${margin.top + 6}" dy="0.71em" text-anchor="middle">margin.top</text>
  <text x="${width / 2}" y="${height - margin.bottom - 6}" text-anchor="middle">margin.bottom</text>
  <text x="6" dy="0.35em" fill="none" stroke="white" stroke-linejoin="round" stroke-width="4">origin</text>
  <text x="6" dy="0.35em">origin</text>

  ${d3.create("svg:g")
    .call(d3.axisTop(x.copy().range([margin.left, width - margin.right])))
    .call(g => g.select(".domain").remove())
    .attr("transform", `translate(0,${margin.top})`)
    .node()}

  ${d3.create("svg:g")
    .call(d3.axisLeft(y.copy().range([margin.top, height - margin.bottom])))
    .call(g => g.select(".domain").remove())
    .attr("transform", `translate(${margin.left},0)`)
    .node()}
</svg>`;
}


function _26(md){return(
md`Die von diesen Skalen zurückgegebene *xy*-Position ist ein Punkt, z. B. [*x* = 640, *y* = 30]. Da Balken jedoch nicht infinitesimal sind - sie haben eine Breite und eine Höhe - entspricht diese Position der oberen rechten Ecke des Balkens. Die Breite des Balkens ist *x*(*count*) - *x*(0), und seine Höhe ist definiert als *y*.bandwidth() durch die Bandskala.`
)}

function _27(htl,width,height,fruits,y,x,d3,margin){return(
htl.html`<svg viewBox="0 0 ${width} ${height}" style="max-width: ${width}px; font: 10px sans-serif; overflow: visible">
  <g fill="#eee">
    ${fruits.map(d => htl.svg`<rect y="${y(d.name)}" x="${x(0)}" width="${x(d.count) - x(0)}" height="${y.bandwidth()}"></rect>`)}
  </g>
  <g fill="#fff" text-anchor="end" transform="translate(-6,15)">
    ${fruits.map(d => htl.svg`<text y="${y(d.name)}" x="${x(d.count)}">${d.count}</text>`)}
  </g>
  <g>
    ${fruits.map(d => htl.svg`<circle cy="${y(d.name)}" cx="${x(d.count)}" r="2.5"></circle>`)}
  </g>
  ${d3.select(htl.svg`<g transform="translate(0,${margin.top})">`)
    .call(d3.axisTop(x))
    .call(g => g.select(".domain").remove())
    .node()}
  ${d3.select(htl.svg`<g transform="translate(${margin.left},0)">`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .node()}
</svg>`
)}

function _28(x){return(
x(21) - x(0)
)}

function _29(y){return(
y.bandwidth()
)}

function _30(md){return(
md`Ein weiterer guter Grund für die Verwendung von Skalen ist, dass D3 Achsen für die explizite Darstellung der Kodierung einer Positionsskala bietet, komplett mit schönen, für Menschen lesbaren Häkchen. Achsen verbessern die Lesbarkeit von Diagrammen und helfen bei der Kommunikation.`
)}

function _31(htl,width,height,fruits,y,x,d3,margin){return(
htl.html`<svg viewBox="0 0 ${width} ${height}" style="max-width: ${width}px; font: 10px sans-serif;">
  <g fill="steelblue">
    ${fruits.map(d => htl.svg`<rect y="${y(d.name)}" x="${x(0)}" width="${x(d.count) - x(0)}" height="${y.bandwidth()}"></rect>`)}
  </g>
  <g fill="white" text-anchor="end" transform="translate(-6,${y.bandwidth() / 2})">
    ${fruits.map(d => htl.svg`<text y="${y(d.name)}" x="${x(d.count)}" dy="0.35em">${d.count}</text>`)}
  </g>
  ${d3.select(htl.svg`<g transform="translate(0,${margin.top})">`)
    .call(d3.axisTop(x))
    .call(g => g.select(".domain").remove())
    .node()}
  ${d3.select(htl.svg`<g transform="translate(${margin.left},0)">`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .node()}
</svg>`
)}

function _32(md){return(
md`D3-Achsen erfordern [Auswahlen](https://d3js.org/d3-selection).`
)}

function _33(md){return(
md`Um die Achse hinzuzufügen, erstellen wir zunächst ein (noch ungebundenes) G-Element _[hier mit htl.svg, weil Notebook]_. Dann wählen wir dieses Element aus, indem wir es an [d3.select](https://d3js.org/d3-selection/selecting#select) übergeben. Dann rufen wir [*selection*.call](https://d3js.org/d3-selection/control-flow#selection_call) einmal auf, um die Achse in das G-Element zu rendern, und ein zweites Mal, um den Domain-Pfad zu entfernen (für einen minimalistischen Stil). Schließlich rufen wir das G-Element durch den Aufruf von [*selection*.node](https://d3js.org/d3-selection/control-flow#selection_node) ab und betten es in das äußere Literal ein.`
)}

function _34(md){return(
md`Die Position ist die stärkste visuelle Variable, daher ist es kein Zufall, dass sich unsere Diskussion über Skalen bisher auf die Position konzentriert hat.

Skalen können jedoch auch für andere visuelle Variablen, wie z. B. die Farbe, verwendet werden. 🌈`
)}

function _color(d3,fruits){return(
d3.scaleSequential()
    .domain([0, d3.max(fruits, d => d.count)])
    .interpolator(d3.interpolateBlues)
)}

function _36(md){return(
md`Der obige Code definiert eine sequenzielle Skala, die einer linearen Skala ähnelt, mit der Ausnahme, dass sie anstelle eines Bereichs auf einem Interpolator beruht. Und ein Interpolator ist eine Funktion, die einen Wert zwischen 0 und 1 annimmt und den entsprechenden visuellen Wert zurückgibt. Oft ist dieser Interpolator eines der in D3 [eingebauten Farbschemata](/@d3/color-schemes).

Übergibt man dieser Farbskala einen Zähler, erhält man den entsprechenden Farbstring.`
)}

function _37(color){return(
color(0)
)}

function _38(color){return(
color(21)
)}

function _39(md){return(
md`Jetzt können wir dem Balkendiagramm eine redundante Kodierung hinzufügen, die sowohl *count* als auch die *x*-Position auf *color* abbildet. Um die Farbkodierung zu dokumentieren, ähnlich wie eine Achse für eine Positionskodierung, importieren wir eine [D3-Farblegende](/@d3/color-legend).`
)}

function _40(Legend,color){return(
Legend(color, {title: "Number of fruit"})
)}

function _41(htl,margin,width,height,fruits,color,y,x,d3){return(
htl.html`<svg viewBox="0 ${margin.top} ${width} ${height - margin.top}" style="max-width: ${width}px; font: 10px sans-serif;">
  <g>
    ${fruits.map(d => htl.svg`<rect fill="${color(d.count)}" y="${y(d.name)}" x="${x(0)}" width="${x(d.count) - x(0)}" height="${y.bandwidth()}"></rect>`)}
  </g>
  <g text-anchor="end" transform="translate(-6,${y.bandwidth() / 2})">
    ${fruits.map(d => htl.svg`<text fill="${d3.lab(color(d.count)).l < 60 ? "white" : "black"}" y="${y(d.name)}" x="${x(d.count)}" dy="0.35em">${d.count}</text>`)}
  </g>
  ${d3.select(htl.svg`<g transform="translate(${margin.left},0)">`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .node()}
</svg>`
)}

function _42(md){return(
md`Einige Visualisierungen erfordern spezielle grafische Zeichen, die nicht in SVG oder Canvas integriert sind. Als Nächstes werden wir über einfache Balkendiagramme hinausgehen und uns die Formen von D3 ansehen.

<a title="Learn D3: Shapes" style="display: inline-flex; align-items: center; font: 600 14px var(--sans-serif);" href="/Notebooks/de5/index.html">Weiter<svg width="8" height="16" fill="none" stroke-width="1.8" style="margin-left: 0.25em; padding-top: 0.25em;"><path d="M2.75 11.25L5.25 8.25L2.75 5.25" stroke="currentColor"></path></svg></a>`
)}

function _43(md){return(
md`---
## Anhang`
)}

function _width(){return(
640
)}

function _height(){return(
202
)}

function _margin(){return(
{top: 20, right: 0, bottom: 0, left: 30}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["bertin-variables.png", {url: new URL("./files/111d478c1e967165317e9af207179742f3cc71d8d9c1268dcf446be55aad5d1a7e7474b29a34ee459aab070329d6204b7ca78069e39cf3827c10624c1ab00d27.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("fruits")).define("fruits", _fruits);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["fruits"], _4);
  main.variable(observer()).define(["fruits"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["FileAttachment","md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["htl","width","height","fruits","y","x","d3","margin"], _9);
  main.variable(observer("x")).define("x", ["d3","fruits","margin","width"], _x);
  main.variable(observer("y")).define("y", ["d3","fruits","margin","height"], _y);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["d3","fruits","margin","width"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["x"], _18);
  main.variable(observer()).define(["x"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["y"], _21);
  main.variable(observer()).define(["x"], _22);
  main.variable(observer()).define(["x"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["DOM","htl","width","height","d3","x","y"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer()).define(["htl","width","height","fruits","y","x","d3","margin"], _27);
  main.variable(observer()).define(["x"], _28);
  main.variable(observer()).define(["y"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer()).define(["htl","width","height","fruits","y","x","d3","margin"], _31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer("color")).define("color", ["d3","fruits"], _color);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["color"], _37);
  main.variable(observer()).define(["color"], _38);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer()).define(["Legend","color"], _40);
  main.variable(observer()).define(["htl","margin","width","height","fruits","color","y","x","d3"], _41);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("margin")).define("margin", _margin);
  const child1 = runtime.module(define1);
  main.import("Legend", child1);
  return main;
}
