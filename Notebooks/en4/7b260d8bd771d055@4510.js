import define1 from "./a33468b95d0b15b0@817.js";

function _1(md){return(
md`# Learn D3: Scales (4/9)

> _Disclaimer:_ <br>
> _This notebook is a fork of [Mike Bostock](https://observablehq.com/user/@mbostock)s "[Learn D3](https://observablehq.com/@d3/learn-d3-scales?collection=@d3/learn-d3)" notebook series._ <br>
> _I only updated and changed the contents of the notebook to better fit our use case._

Of all D3’s tools for data graphics, the most fundamental is the *scale*, which maps an abstract dimension of data to a visual variable.

For a taste, consider this tiny dataset of fruit.`
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
md`We typically think of dimensions as spatial, such as position in three dimensions, but an abstract dimension need not be spatial. It may be quantitative, such as the *count* of each fruit above. Or it may be nominal, such as a *name*.`
)}

function _4(fruits){return(
fruits.map(d => d.count)
)}

function _5(fruits){return(
fruits.map(d => d.name)
)}

function _6(md){return(
md`In *Semiology of Graphics*, Jacques Bertin describes how graphical marks such as points and lines can “represent differences (≠), similarities (≡), a quantified order (Q), or a nonquantified order (O), and can express groups, hierarchies, or vertical movements” using position, size, color, and the like. These properties of graphical marks are our visual variables.`
)}

async function _7(FileAttachment,md){return(
md`<figure>
  <img src="${await FileAttachment("bertin-variables.png").url()}">
  <figcaption>From *Semiology of Graphics*, colorized by the author.</figcaption>
</figure>`
)}

function _8(md){return(
md`Like many visualizations, the bar chart below maps two abstract dimensions to two visual variables: the *name* dimension is mapped to the bars’ *y*-position, while the *count* dimension is mapped to the *x*-position. These mappings are implemented by the *x* and *y* scales that follow.`
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
md`(Feel free to edit the code and see what happens!)

D3 scales come in many types. Which you use depends on the abstract dimension (quantitative or nominal?) and the visual variable (position or color?). Here *x* is a [linear scale](/@d3/d3-scalelinear) because *count* is quantitative and bar length should be proportional to value, while *y* is a [band scale](/@d3/d3-scaleband) because *name* is nominal and bars are thick.`
)}

function _13(md){return(
md`Each scale is configured by pairwise correspondences from abstract data (the *domain*) to visual variable (the *range*). For example, the *x*-domain’s lower value (0) is mapped to *x*-range’s lower value (the chart’s left edge), while the domain’s upper value (the maximum count) is mapped to the range’s upper value (the right edge).`
)}

function _14(md){return(
md`For a linear scale, the domain and range are continuous intervals (from *min* to *max*). For a band scale, the domain is an array of discrete values (🍊, 🍇, 🍏, …) while the range is a continuous interval; the band scale automatically determines how to slice the range into discrete, padded bands.`
)}

function _15(md){return(
md`The scales above are configured using *method chaining*. This concise style is possible because methods that configure a scale, such as *scale*.domain, return the scale. Here’s the equivalent longhand.`
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
md`Scale methods can also be used to retrieve their associated values if you call them with no arguments. This is useful for deriving new scales or debugging.`
)}

function _18(x){return(
x.domain()
)}

function _19(x){return(
x.range()
)}

function _20(md){return(
md`And what *is* a D3 scale? A function. Calling it returns the visual value (such as an *x*-position) corresponding to the given abstract value (such as a *count*).`
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
md`By [convention](/@d3/margin-convention), most D3 charts apply margins to inset scale ranges and make room for axes. Hence, *x*(0) is often not zero; it’s the size of the left margin.`
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
md`The *xy*-position returned by these scales is a point, such as [*x* = 640, *y* = 30]. But since bars aren’t infinitesimal—they have a width and height—this position corresponds to the bar’s top-right corner. The bar’s width is *x*(*count*) - *x*(0), and its height is defined as *y*.bandwidth() by the band scale.`
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
md`Another great reason to use scales is that D3 provides axes for explicitly showing a positional scale’s encoding, complete with nice, human-readable ticks. Axes improve the readability of charts, helping you to communicate.`
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
md`D3 axes require [selections](https://d3js.org/d3-selection).`
)}

function _33(md){return(
md`To add the axis, we first create a (as yet detached) G element _[done here using htl.svg because notebook]_. Then we select this element by passing it to [d3.select](https://d3js.org/d3-selection/selecting#select). Then we invoke [*selection*.call](https://d3js.org/d3-selection/control-flow#selection_call) once to render the axis into the G element, and again to remove the domain path (for a minimalist style). Lastly we retrieve the G element by calling [*selection*.node](https://d3js.org/d3-selection/control-flow#selection_node), and embed it in the outer literal.`
)}

function _34(md){return(
md`Position is the strongest visual variable, so it’s not a coincidence that our discussion of scales has so far focused on position.

Yet scales can be used for other visual variables, such as color. 🌈`
)}

function _color(d3,fruits){return(
d3.scaleSequential()
    .domain([0, d3.max(fruits, d => d.count)])
    .interpolator(d3.interpolateBlues)
)}

function _36(md){return(
md`The code above defines a sequential scale, which is similar to a linear scale except instead of a range it relies on an interpolator. And an interpolator is a function which takes a value between 0 and 1, returning the corresponding visual value. Often, this interpolator is one of D3’s [built-in color schemes](/@d3/color-schemes).

Passing this color scale a count returns the corresponding color string.`
)}

function _37(color){return(
color(0)
)}

function _38(color){return(
color(21)
)}

function _39(md){return(
md`Now we can add a redundant encoding to the bar chart, mapping *count* to *color* as well as *x*-position. To document the color encoding, similar to an axis for a positional encoding, we’ll import a [D3 color legend](/@d3/color-legend).`
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
md`Some visualizations require specialized graphical marks that aren’t built-in to SVG or Canvas. Next, we’ll go beyond basic bar charts and visit D3’s shapes.

<a title="Learn D3: Shapes" style="display: inline-flex; align-items: center; font: 600 14px var(--sans-serif);" href="/Notebooks/en5/index.html">Next<svg width="8" height="16" fill="none" stroke-width="1.8" style="margin-left: 0.25em; padding-top: 0.25em;"><path d="M2.75 11.25L5.25 8.25L2.75 5.25" stroke="currentColor"></path></svg></a>`
)}

function _43(md){return(
md`---

## Appendix`
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
    ["bertin-variables.png", {url: new URL("./files/ef5fbb8b77ff7c117ec45df5583ee5919321685578e8247c348eaa9139e6dacf64ef339374c8069109351d0985aee2e536884e5cb82d4361c21123adb8790475.png", import.meta.url), mimeType: "image/png", toString}]
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
