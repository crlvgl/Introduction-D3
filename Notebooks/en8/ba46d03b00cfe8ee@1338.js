function _1(md){return(
md`# Learn D3: Interaction (8/9)

> _Disclaimer:_ <br>
> _This notebook is a fork of [Mike Bostock](https://observablehq.com/user/@mbostock)s "[Learn D3](https://observablehq.com/@d3/learn-d3-interaction?collection=@d3/learn-d3)" notebook series._ <br>
> _I only updated and changed the contents of the notebook to better fit our use case._ <br><br>
> _This notebook contains multiple cells and descriptions specifically for Observable notebooks, not for classic D3. I, however, kept them in because of how Mike Bostock set up this Notebook. Some cells would not have worked otherwise. This is just an edit of Mike Bostocks work, after all._ <br>
> _All affected cells are marked accordingly._

There’s almost always too much information than can reasonably “fit” in a graphic. Thus design is not just deciding *how* to show something, but *what* to show and what not to show based on what we think matters to the imagined reader.`
)}

function _2(md){return(
md`And thanks to computers, the *actual* reader can now have a say: the graphic can be tailored on demand to the reader’s interests.`
)}

function _3(md){return(
md`Yet this power is a double-edged sword. Interactivity allows the reader to surface more information, but forces the reader to work for it. If we’re not careful, we may hide important insights behind controls that readers never click.`
)}

function _4(md){return(
md`If our intent is to communicate something known, we should design an effective static graphic before even considering interaction. On the other hand, if we seek to explore the unknown, then interaction can be faster than coding a new graphic (but consider also visualization grammars for exploration, such as [Vega-Lite](https://vega.github.io/vega-lite/))!`
)}

function _5(md){return(
md`A good guideline for interaction is Ben Shneiderman’s [information-seeking mantra](https://www.cs.umd.edu/~ben/papers/Shneiderman1996eyes.pdf):

> *Overview first,  
> zoom and filter,  
> then details on demand.*`
)}

function _6(md){return(
md`The *overview* is the initial form of the graphic. Its purpose is not to show everything (this is impossible), but to give a “macro” view of all the data. The overview is a map that guides the reader’s exploration.`
)}

function _7(md){return(
md`*Zooming* and *filtering* are methods of culling what is shown to focus on a topic of interest. We previously saw controls to crop the chart to individual years; there’s also [free-form zooming](/@d3/zoomable-area-chart), [panning](/@d3/pannable-chart) and [focus + context](/@d3/focus-context). If we were comparing many time series, we might want filtering as in the [multi-line chart example](/@d3/multi-line-chart). See also the [brushable scatterplot matrix](/@d3/brushable-scatterplot-matrix).`
)}

function _8(md){return(
md`*Details on demand* allows the reader to extract exact values from the chart, rather than be limited to visual approximations. This can be as simple as tooltips.`
)}

function _9(md){return(
md`One approach to tooltips is to liberally sprinkle title elements into SVG. Mouseover (and wait briefly) to see the Apple stock price for a particular day below.`
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
md`Above, ${(data.length - 1).toLocaleString("en")} invisible rect elements vertically span the chart and horizontally span adjacent data points (computed with [d3.pairs](https://d3js.org/d3-array/transform#pairs)). When the mouse hovers a rect, the text of the child title element is shown. Thus, the displayed tooltip is a function of the mouse’s *x*-position, which is most appropriate for time-series charts where *y* is the dependent variable.`
)}

function _12(md){return(
md`A more general approach is a [Voronoi overlay](https://d3js.org/d3-delaunay), where the closest data point to the mouse determines the tooltip. (The Voronoi diagram is drawn below for clarity… and because it looks cool. You wouldn’t typically show it.) <br>
_[in other words, use two diagrams atop each other, but only show the 'clean' one, keep the Voronoi overlay invisible.]_`
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
md`Native tooltips have several drawbacks: they can be sluggish to appear; mobile browsers don’t support them; and it’s not always obvious which data point is associated with the tooltip, especially when using a Voronoi diagram.

With a little more work, though, we can have custom tooltips.`
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
md`The ordering of elements here is important: SVG does not support *z*-order, so to draw the tooltip on top of the line and axes, it must be last.`
)}

function _18(md){return(
md`Whereas native tooltips appear automatically, custom tooltips typically require event listeners. These functions are invoked by the browser when the user performs an action, such as moving the mouse over an element. The listeners above capture data (*a* and *b*) in a closure to know what to show when the event is triggered.`
)}

function _19(md){return(
md`The custom tooltip is implemented in the class below. It exposes a *tooltip*.node property (an SVG g element) for embedding, and *tooltip*.show and *tooltip*.hide methods to update the tooltip as needed. This affords some flexibility in how the tooltip is triggered.`
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
md`The chart above uses [hypertext literal](/@observablehq/htl), but we can implement an identical chart in the D3 style. Use whichever you prefer! _[This one. You prefer this one. Trust me on that.]_`
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
md`Tooltips triggered by *mouseover* events can be expensive: they require a separate element for each hoverable area of the chart. For complex charts, you may improve performance by calculating what is hovered on demand.

A particularly efficient approach for data sorted on one dimension, such as our time-series data here, is [bisection](https://observablehq.com/@d3/d3-bisect) on *mousemove*.`
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
md`Bisection finds the value closest to the mouse (along *x*). The function below first computes the index of the data point closest to the specified date (assuming that the data is sorted in ascending order), and then returns the associated data.`
)}

function _bisect(d3)
{
  const bisectDate = d3.bisector(d => d.date).center;
  return (data, date) => data[bisectDate(data, date)];
}


function _27(md){return(
md`_[There’s a huge chunk of stuff and methods specific to Observable coming up. I decided to delete that part since it doesn't really yield any value unless you know a bunch about how Observable and html+js work (in which case you wouldn’t be here). I still recommend [checking it out](https://observablehq.com/@d3/learn-d3-interaction?collection=@d3/learn-d3#cell-0), but just a heads-up.]_`
)}

function _28(md){return(
md`We raced through a variety of interaction techniques in this tutorial—tooltips, event listeners, Voronoi overlays, views _[that’s the part i skipped]_ — but there’s so much more we didn’t cover! For starters, we didn’t even mention D3’s reusable behaviors: [brushing](https://d3js.org/d3-brush), [zooming](https://d3js.org/d3-zoom), and [dragging](https://d3js.org/d3-drag). (For self-directed study, find examples in the [D3 gallery](/@d3/gallery) and collections _[that link is broken, i removed it for you :D]_.)`
)}

function _29(md){return(
md`In fact, now that we’ve covered the basics, it’s a good time to step back and reflect on where to go from here.

<a title="Learn D3: Further Topics" style="display: inline-flex; align-items: center; font: 600 14px var(--sans-serif);" href="/Notebooks/en9/index.html">Next<svg width="8" height="16" fill="none" stroke-width="1.8" style="margin-left: 0.25em; padding-top: 0.25em;"><path d="M2.75 11.25L5.25 8.25L2.75 5.25" stroke="currentColor"></path></svg></a>`
)}

function _30(md){return(
md`---

## Appendix

For more on interaction, read Gregor Aisch’s "defense of interactive graphics". _[Apparently this notebook is considered old, a lot of the links are broken or dead... But fear not, i updated all of them! :D_ <br>
_~~or removed them like here for your viewing convenience~~]_`
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
    ["aapl-bollinger.csv", {url: new URL("./files/68598443a16fce00a89f983b40c3b4c89b15827ac91726b864da942e4fad1b5cc19abaa1d3efd9855a7a2fadb3ef16f7c4365666eb572026a986b69d768bbc34.csv", import.meta.url), mimeType: "text/csv", toString}]
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
