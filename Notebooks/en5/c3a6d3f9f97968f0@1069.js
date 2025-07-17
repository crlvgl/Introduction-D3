function _1(md){return(
md`# Learn D3: Shapes (5/9)

> _Disclaimer:_ <br>
> _This notebook is a fork of [Mike Bostock](https://observablehq.com/user/@mbostock)s "[Learn D3](https://observablehq.com/@d3/learn-d3-shapes?collection=@d3/learn-d3)" notebook series._ <br>
> _I only updated and changed the contents of the notebook to better fit our use case._

SVG and Canvas are intentionally generic; they allow for any type of graphic. D3 meanwhile is intended for visualization, and so provides a specialized vocabulary of *shapes* which are functions that generate path data.`
)}

function _2(md){return(
md`Paths can draw circles, rectangles, lines, squiggles, swoops, [tigers 🐅](https://commons.wikimedia.org/wiki/File:Ghostscript_Tiger.svg), and anything else you can imagine. A path’s shape is specified in the [SVG path data language](https://www.w3.org/TR/SVG/paths.html#TheDProperty) (or equivalent [Canvas path methods](https://html.spec.whatwg.org/multipage/canvas.html#canvaspath)), which is akin to commands you’d give an old-fashioned [pen plotter](https://en.wikipedia.org/wiki/Plotter). Such as:

* <code>M<i>x</i>,<i>y</i></code> - move to the specified point [*x*, *y*]
* <code>L<i>x</i>,<i>y</i></code> - draw a line to the specified point [*x*, *y*]
* <code>h<i>x</i></code> - draw a horizontal line of length *x*
* <code>v<i>y</i></code> - draw a vertical line of length *y*
* <code>z</code> - close the current subpath`
)}

function _3(md){return(
md`Say we wanted to visualize several years of Apple stock price as a line chart. Here’s a dataset with *date* and *close* columns (with “close” referring to the price of the stock when the market closed), and the corresponding scales.`
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
md`To draw the line, we need path data that starts with <code>M<i>x</i>,<i>y</i></code> to move to the first point, followed repeatedly by <code>L<i>x</i>,<i>y</i></code> to draw a line to each subsequent point. We could do this by looping over the points to concatenate.`
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
md`But [d3.line](/@d3/d3-line) is more convenient. Calling d3.line returns a default line generator, and by calling *line*.x and *line*.y we can configure the line with functions to return the *x*- and *y*-position for a given data point *d*. These functions retrieve the desired abstract value (*date* or *count*) and convert it to visual position (by applying a scale).`
)}

function _line(d3,x,y){return(
d3.line()
    .x(d => x(d.date))
    .y(d => y(d.close))
)}

function _11(md){return(
md`Passing the line generator the data returns the corresponding SVG path data string which can be used to set a path element’s *d* attribute.`
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
md`(To avoid repetition, I defined reusable axes in the appendix below. Each axis is a function that takes a selection of G elements to populate.)`
)}

function _15(md){return(
md`The path above is styled with a blue stroke and no fill. To avoid misleading spikes caused by miter joins between line segments, I set the [miter limit](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-miterlimit) to 100% of (1×) the stroke width. I could have used round line joins and caps, alternatively.`
)}

function _16(md){return(
md`For an area chart, there’s similarly d3.area. An area’s shape is specified as two lines with shared *x*-values: *area*.y0 is the baseline and *area*.y1 is topline. For an area chart with a constant baseline along the chart’s bottom edge, we set *area*.y0 to *y*(0).`
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
md`If you want an area with a variable baseline—as in a [stacked area chart](/@d3/stacked-area-chart), a [streamgraph](/@d3/streamgraph), or the chart of [Bollinger bands](/@d3/bollinger-bands) below—pass *area*.y0 a function instead. As with *area*.x and *area*.y1, this function will be called for each data point to compute the corresponding *y*-value.`
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
md`To complete the display of Bollinger bands by showing the central moving average and the daily closing price, we can overlay lines on top. Since each path element can only have a single style, we use multiple paths for multiple colors.`
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
md`Lines and areas are designed to work together: you can derive the line corresponding to an area’s baseline or topline by calling *area*.lineY0 or *area*.lineY1, respectively. This is useful for decorating an area with a top or bottom stroke.`
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
md`Lines and areas have more features we won’t cover here, but to hint at a few: [radial lines and areas](/@d3/d3-lineradial) are useful for cyclical data, such as [seasonal temperatures](/@d3/radial-area-chart); [curves](https://d3js.org/d3-shape/curve) provide configurable interpolation methods, such as monotonicity-preserving splines; and you can [show gaps for missing data](/@d3/area-with-missing-data).`
)}

function _28(md){return(
md`Of course, visualization is not just bars, lines, and areas.

Another common shape is what D3 calls the *arc*, but what mathematicians would call an <a href="https://en.wikipedia.org/wiki/Annulus_(mathematics)">*annulus sector*</a>. It features in [pie charts](/@d3/pie-chart), [donut charts](/@d3/donut-chart) and [sunbursts](/@d3/sunburst) (but not, confusingly, [arc diagrams](/@d3/arc-diagram)).`
)}

function _arc(d3){return(
d3.arc()
    .innerRadius(210)
    .outerRadius(310)
    .startAngle(([startAngle, endAngle]) => startAngle)
    .endAngle(([startAngle, endAngle]) => endAngle)
)}

function _30(md){return(
md`Similar to how lines and areas are configured by *x* and *y*, an arc is configured by *innerRadius*, *outerRadius*, *startAngle*, and *endAngle* (with angles in radians). The arc generator above is configured to accept an array [*startAngle*, *endAngle*].`
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
md`Computing arc angles as above can be tedious for a pie or donut chart, so D3 provides [d3.pie](https://d3js.org/d3-shape/pie) for convenience. Recall the fruits dataset.`
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
md`By configuring a pie layout with a *value* accessor for the *count* property, we can compute the arc angles such that the angular span of each arc is proportional to its value, and together the arcs span contiguously from 0 to 2π.`
)}

function _pieArcData(d3,fruits){return(
d3.pie()
    .value(d => d.count)
  (fruits)
)}

function _38(md){return(
md`These objects, one per datum, can be passed to an arc generator with fixed radii to produce a donut chart. (And because I can’t resist showing off a *little* bit, I’ll apply padding and a corner radius.)`
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
md`Now that we’ve covered a handful of common data graphics, let’s see how to make them come alive!

<a title="Learn D3: Animation" style="display: inline-flex; align-items: center; font: 600 14px var(--sans-serif);" href="/Notebooks/en6/index.html">Next<svg width="8" height="16" fill="none" stroke-width="1.8" style="margin-left: 0.25em; padding-top: 0.25em;"><path d="M2.75 11.25L5.25 8.25L2.75 5.25" stroke="currentColor"></path></svg></a>`
)}

function _42(md){return(
md`---

## Appendix`
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
    ["aapl-bollinger.csv", {url: new URL("./files/68598443a16fce00a89f983b40c3b4c89b15827ac91726b864da942e4fad1b5cc19abaa1d3efd9855a7a2fadb3ef16f7c4365666eb572026a986b69d768bbc34.csv", import.meta.url), mimeType: "text/csv", toString}]
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
