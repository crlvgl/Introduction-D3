function _1(md){return(
md`# Learn D3: Introduction (1/9)

> _Disclaimer:_ <br>
> _This notebook is a fork of [Mike Bostock](https://observablehq.com/user/@mbostock)s "[Learn D3](https://observablehq.com/@d3/learn-d3?collection=@d3/learn-d3)" notebook series._ <br>
> _I only updated and changed the contents of the notebook to better fit our use case._

This series of notebooks will guide you through your first steps with [D3.js](https://d3js.org).`
)}

function _2(md){return(
md`<figure>
  <svg viewBox="-60 -10 216 111" stroke-width=".25"><path fill="#bbb" d="M0 0h7.75a45.5 45.5 0 110 91H0V71h7.75a25.5 25.5 0 100-51H0zm36.251 0h32a27.75 27.75 0 0121.331 45.5A27.75 27.75 0 0168.251 91h-32a53.69 53.69 0 0018.746-20H68.25a7.75 7.75 0 100-15.5H60.5a53.69 53.69 0 000-20h7.75a7.75 7.75 0 100-15.5H54.997A53.69 53.69 0 0036.251 0z"/><g fill="none" stroke="currentColor" stroke-opacity=".3"><path d="M-100 0h300M-100 20h300M-100 35.5h300M-100 45.5h300M-100 55.5h300M-100 71h300M-100 91h300M0-100v300M7.75-100v300M60.5-100v300M68.25-100v300M96-100v300"/></g><g fill="#00f"><circle cx="7.75" cy="45.5" r="1"/><circle cx="68.25" cy="27.75" r="1"/><circle cx="68.25" cy="63.25" r="1"/></g><g fill="red"><circle cx="36.251" r="1"/><circle cx="54.997" cy="20" r="1"/><circle cx="60.5" cy="35.5" r="1"/><circle cx="60.5" cy="55.5" r="1"/><circle cx="54.997" cy="71" r="1"/><circle cx="36.251" cy="91" r="1"/><circle cx="89.581" cy="45.5" r="1"/></g><g fill="none" stroke="currentColor"><circle cx="7.75" cy="45.5" r="25.5"/><circle cx="7.75" cy="45.5" r="45.5"/><circle cx="7.75" cy="45.5" r="53.69"/><circle cx="68.25" cy="27.75" r="7.75"/><circle cx="68.25" cy="27.75" r="27.75"/><circle cx="68.25" cy="63.25" r="7.75"/><circle cx="68.25" cy="63.25" r="27.75"/></g></svg>
  <figcaption>[D3’s logo](/@d3/logo) is drawn with circles and perpendicular lines.</figcaption>
</figure>`
)}

function _3(md){return(
md`Before we embark, it’s worth briefly considering: *Why bother learning D3? And why learn here in Observable?*`
)}

function _4(md){return(
md`For one, D3 is popular ([600M downloads](/@mbostock/npm-daily-downloads?name=d3) and [100K stars](https://github.com/d3/d3)), so you’re in good company. There are plenty of community-developed resources, including tutorials, videos, classes, and books. And the D3 team has published hundreds of its own forkable examples and tutorials to boost your learning and productivity.`
)}

function _5(md){return(
md`For another, D3 is flexible. D3’s superpower is that you can do whatever you want—creative freedom! The [D3 gallery](/@d3/gallery) is a veritable zoo of forms: [treemap](/@d3/treemap), [hierarchical edge bundling](/@d3/hierarchical-edge-bundling/2), [Sankey diagram](/@d3/sankey-diagram), [density contours](/@d3/density-contours), [force-directed graph](/@d3/disjoint-force-directed-graph), to name a few. (And nearly a hundred [map projections](/@d3/world-map)!) This flexibility stems from D3’s low-level approach, focusing on composable primitives such as [shapes](https://medium.com/@mbostock/introducing-d3-shape-73f8367e6d12) and [scales](https://medium.com/@mbostock/introducing-d3-scale-61980c51545f) rather than configurable charts. D3 imposes no constraints, so avail yourself of all bells and whistles supported by modern browsers.`
)}

function _6(md){return(
md`And D3 is renowned for animation and interaction. If you’ve got a few minutes, watch a [bar chart race](/@d3/bar-chart-race) or an [animated treemap](/@d3/animated-treemap). Dive into a [hierarchical bar chart](/@d3/hierarchical-bar-chart), [collapsible tree](/@d3/collapsible-tree), or zoomable [sunburst](/@d3/zoomable-sunburst), [treemap](/@d3/zoomable-treemap), or [packed circles](/@d3/zoomable-circle-packing). Or brush a [scatterplot matrix](/@d3/brushable-scatterplot-matrix) or zoom into an [area chart](/@d3/zoomable-area-chart). Animation can be a powerful device for storytelling, while interaction allows active readers to explore.`
)}

function _7(md){return(
md`This power, of course, comes at a cost. There’s much to learn: D3 has more than thirty modules and a thousand methods! And D3 can be more tedious than tools expressly intended for exploratory visualization, such as [Observable Plot](/@observablehq/plot) and [Vega-Lite](https://vega.github.io/vega-lite/).`
)}

function _8(md){return(
md`Enough overture. Let’s raise the curtain and get our first glimpse of D3.

<a title="Learn D3: By Example" style="display: inline-flex; align-items: center; font: 600 14px var(--sans-serif);" href="/Notebooks/en2/index.html">Next<svg width="8" height="16" fill="none" stroke-width="1.8" style="margin-left: 0.25em; padding-top: 0.25em;"><path d="M2.75 11.25L5.25 8.25L2.75 5.25" stroke="currentColor"></path></svg></a>`
)}

function _9(md){return(
md`---

## Table of Contents

1. Introduction - you are here!
1. [By Example](/Notebooks/en2/index.html) - finding, forking, importing examples
1. [Data](/Notebooks/en3/index.html) - loading, parsing, transforming data
1. [Scales](/Notebooks/en4/index.html) - making the abstract visual
1. [Shapes](/Notebooks/en5/index.html) - geometric primitives for visualization
1. [Animation](/Notebooks/en6/index.html) - graphics that change over time
1. [Joins](/Notebooks/en7/index.html) - D3’s pattern for manipulating the DOM
1. [Interaction](/Notebooks/en8/index.html) - responding to user input
1. [Further Topics](/Notebooks/en9/index.html) - where to go next`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  return main;
}
