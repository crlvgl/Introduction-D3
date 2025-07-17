function _1(md){return(
md`# Learn D3: Further Topics (9/9)

> _Disclaimer:_ <br>
> _This notebook is a fork of [Mike Bostock](https://observablehq.com/user/@mbostock)s "[Learn D3](https://observablehq.com/@d3/learn-d3-further-topics?collection=@d3/learn-d3)" notebook series._ <br>
> _I only updated and changed the contents of the notebook to better fit our use case._

If you stuck with this tutorial from the beginning, take a deep breath, and [pat yourself on the back](https://i.pinimg.com/originals/a6/96/42/a6964204da51bb6d171e4030a5441788.gif)! You covered a lot of ground and have gained a meaningful sense of what goes into a typical visualization.

But we haven’t reached the top, yet! No, this is merely base camp. _[[you right now :D](https://media.tenor.com/5I1HPj8ekXgAAAAM/243.gif)]_

It’s time to look up and see what lies ahead.`
)}

function _2(md){return(
md`Clean data is a prerequisite for effective data visualization. For a taste of data collection and cleaning, read this [tutorial on Wikipedia data](/@mbostock/working-with-wikipedia-data). See [d3-array](/collection/@d3/d3-array)’s methods for transforming and aggregating data, including [basic summary statistics](/@d3/d3-mean-d3-median-and-friends) and the powerful [d3.group and d3.rollup](/@d3/d3-group). Also see Harry Steven’s [d3-regression](/@harrystevens/introducing-d3-regression) for trend and correlation analysis. For data aggregation, consider [one-dimensional binning](https://d3js.org/d3-array/bin) (as in histograms), [two-dimensional hexbins](https://github.com/d3/d3-hexbin), and [density contour estimation](https://d3js.org/d3-contour/density).`
)}

function _3(md){return(
md`We touched on scales earlier, but [d3-scale](https://d3js.org/d3-scale) also provides numerous transformations that we didn’t cover, such as log scales, power scales, symlog scales, quantize scales, and quantile scales. (Here’s a neat [log-to-linear scale transition](/@mbostock/new-zealand-tourists-1921-2018).) Your visualization will be more effective if you choose a transformation appropriate to your data and the question at hand! And see this [essay on comparison](/@mbostock/methods-of-comparison-compared).`
)}

function _4(md){return(
md`We limited ourselves to abstract tabular data, but D3 also works with other types of data. For networks, consider a [chord diagram](https://d3js.org/d3-chord) or [force-directed graph](https://d3js.org/d3-force) _[it jiggles °o°]_. For hierarchical data, [d3-hierarchy](https://d3js.org/d3-hierarchy) implements several popular algorithms, including [treemaps](/@d3/treemap) and [tidy trees](/@d3/tidy-tree). For cartography and geospatial visualization, see [d3-geo](https://d3js.org/d3-geo). And for time-series data, see [d3-time](https://d3js.org/d3-time).`
)}

function _5(md){return(
md`For more control over how your data is presented, D3 provides low-level methods for formatting [numbers](https://d3js.org/d3-format) and [dates](https://d3js.org/d3-time-format) (in your desired locale). And D3 implements numerous color [spaces](https://d3js.org/d3-color) and [schemes](/@d3/color-schemes).`
)}

function _6(md){return(
md`For animation, explore D3’s [easing methods](https://d3js.org/d3-ease), [interpolators](https://d3js.org/d3-interpolate), and [transitions](https://d3js.org/d3-transition). And for interaction, see D3’s reusable behaviors: [brushing](https://d3js.org/d3-brush), [zooming](https://d3js.org/d3-zoom), and [dragging](https://d3js.org/d3-drag).`
)}

function _7(md){return(
md`There’s a variety of Observable-specific topics you could tackle, too *[or don't you can't use it anyway :person\\_shrugging:]*. Take [Observable’s dataflow](/@observablehq/how-observable-runs) to the next level with [promises](/@observablehq/introduction-to-promises), [generators](/@observablehq/introduction-to-generators), and [views](/@observablehq/introduction-to-views). Use the [invalidation promise](/@observablehq/invalidation) to dispose of resources when a cell is re-run, or the [visibility promise](/@mbostock/intersection-observer) to defer evaluation of a cell until it’s visible. <br>
_[I kept this in in case you want to check it out, but, as it said, it's Observable-specific and quite likely won't work outside of this environment]_`
)}

function _8(md){return(
md`And don’t forget to communicate! This U.W. tutorial on [graphical marks and visual encoding channels](/@uwdata/data-types-graphical-marks-and-visual-encoding-channels) is an excellent introduction to the foundation of visualization. Thinking in visual variables will help you design better visualizations in D3, too. For labeling dense graphs, consider [a Voronoi heuristic](/@d3/voronoi-labels) or [iterative optimization](/@fil/occlusion). For showing color encodings, use [a color legend](/@d3/color-legend).`
)}

function _9(md){return(
md`As always, thanks for reading. Please follow us on Twitter _[That's how old this is. Anyway, like any sane person, d3.js has since moved on and deleted their Twitter page.]_ for updates, and send us your feedback. We’d also welcome suggestions for future additions to this series.

Now get cracking!

_[But to give credit, here's their [BlueSky](https://bsky.app/profile/observablehq.com)]_`
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
