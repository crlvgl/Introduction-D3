import define1 from "./8d5ef3030dfd3bad@499.js";
import define2 from "./450051d7f1174df8@255.js";

function _1(md){return(
md`# Learn D3: By Example (2/9)

> _Disclaimer:_ <br>
> _This notebook is a fork of [Mike Bostock](https://observablehq.com/user/@mbostock)s "[Learn D3](https://observablehq.com/@d3/learn-d3-by-example?collection=@d3/learn-d3)" notebook series._ <br>
> _I only updated and changed the contents of the notebook to better fit our use case._

One of the best ways to start with D3 is to [browse the gallery](/@d3/gallery).`
)}

function _2(md){return(
md`If you’re lucky (and with many to choose from, your odds aren’t bad), you may find an example you can repurpose as-is. This can save a lot of effort over learning how to build from scratch. For example, to construct a treemap, you *could* consult the [d3-hierarchy API reference](https://d3js.org/d3-hierarchy), but much faster would be to take the [treemap example](https://observablehq.com/@d3/treemap) and substitute your data.`
)}

function _3(md){return(
md`This may feel like cheating, but it’s okay! Examples are not merely reusable templates but tools for learning, hinting at subjects for study. “Breaking” an example by tinkering—changing stuff and seeing what happens—helps you achieve understanding faster than passive reading.

Plus, it’s fun.`
)}

async function _4(FileAttachment,md){return(
md`<figure>
  <img src="${await FileAttachment("changing-stuff@1.jpg").url()}" style="width: 274px; height: 360px;">
  <figcaption>A legitimate learning strategy. Image: [DEV Community](https://twitter.com/thepracticaldev)</figcaption>
</figure>`
)}

function _5(md){return(
md`Not by coincidence, Observable _[this environment; parts removed from this tutorial for simplicity]_ is designed to help you tinker. Visit any notebook, edit a cell, and see what happens! In many cases all it takes to substitute your data is clicking to replace a file. If you like the result, save your work by forking.`
)}

function _6(md){return(
md`You can also import examples and tinker with them without diving into the code. This is undoubtedly the fastest way to start with D3, and it’ll grow more powerful as you learn.`
)}

function _7(md){return(
md`Let’s see how.

Say I hand you a set of numbers. What might you tell me about this data?`
)}

function _values(FileAttachment){return(
FileAttachment("values@1.json").json()
)}

function _9(md){return(
md`You could inspect a few values by hand, but this won’t reveal much. There’s no way to know if the handful of values you inspect is representative of the overall distribution. What if you computed a few [summary statistics](/@d3/d3-mean-d3-median-and-friends), such as the min, median and max?`
)}

function _10(d3,values){return(
[d3.min(values), d3.median(values), d3.max(values)]
)}

function _11(md){return(
md`Well… that’s something. But we need something richer than a single number to get a sense of the distribution. We need a visualization. Specifically, a histogram. So let’s [import](/@observablehq/introduction-to-imports) the [D3 example histogram](/@d3/histogram).`
)}

function _13(Histogram,values){return(
Histogram(values)
)}

function _14(tex,md){return(
md`*Et voilà!* Now we see: the data roughly forms a normal distribution centered on zero. (I created these values using [d3.randomNormal](/@d3/d3-random) with an expected value ${tex`\mu = 0`} and standard deviation ${tex`\sigma = 1`}.)`
)}

function _15(md){return(
md`But we’re not limited to substituting data when we import. We can specify options, say to customize the appearance of the *x*- or *y*-axis. Or if we’d prefer a slightly shorter chart, we can change the height.`
)}

function _16(Histogram,values,width){return(
Histogram(values, {width, height: 200, color: "steelblue"})
)}

function _17(md){return(
md`Did you notice fewer ticks along the *y*-axis in this shorter chart? Magic! And if you think that’s cool, watch this histogram come alive as we inject *dynamic* data! Click play below or drag the slider.`
)}

function _mu(Scrubber,d3){return(
Scrubber(d3.ticks(-5, 5, 200), {
  format: x => `mu = ${d3.format("+.2f")(x)}`,
  autoplay: false,
  alternate: true
})
)}

function _19(Histogram,randoms,width){return(
Histogram(randoms, {width, height: 200, color: "steelblue", domain: [-10, 10]})
)}

function _randoms(d3,mu){return(
Float64Array.from({length: 2000}, d3.randomNormal(mu, 2))
)}

function _21(md){return(
md`The *randoms* cell generates random values with a normal distribution. The *domain* option fixes the histogram’s domain to [-10, +10]; this shows how the distribution shifts in response to the mean, *mu*; if a fixed domain were not specified, the domain would be computed to fit the data and the change in distribution would only be apparent by a close reading of the *x*-axis ticks. (To see this yourself, try removing *domain* option above.)`
)}

function _22(md){return(
md`Now that you’ve seen how far you can get repurposing examples, let’s write some code from scratch!

<a title="Learn D3: Data" style="display: inline-flex; align-items: center; font: 600 14px var(--sans-serif);" href="/Notebooks/en3/index.html">Next<svg width="8" height="16" fill="none" stroke-width="1.8" style="margin-left: 0.25em; padding-top: 0.25em;"><path d="M2.75 11.25L5.25 8.25L2.75 5.25" stroke="currentColor"></path></svg></a>`
)}

function _23(md){return(
md`---

## Appendix

_[Observable runs cells in topological order rather than top-to-bottom, so it doesn't matter where references are imported as long as they can be referenced. In a classic project that would not work and all imports need to be executed before they are referenced for the first time._ <br>
_For readability reasons all non-essential imports are at the end of the notebook.]_`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["values@1.json", {url: new URL("./files/3847c94c6702a07037c13c98420295e8aae20c8a4630edea8543bbf7e8a72c87dd41d455035bc3f229ef3e6736ff476a7f34bcd14f013ae0a9a6c2d45114524f.json", import.meta.url), mimeType: "application/json", toString}],
    ["changing-stuff@1.jpg", {url: new URL("./files/d28dcb2f7ccecddccb458a31296dbf5f290f4915347d845ecec513b55d27e8118eb4706dcd2430bcf702251bb2afa4e1f78ae41359a56c01d2b30559679d9a8b.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["FileAttachment","md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("values")).define("values", ["FileAttachment"], _values);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["d3","values"], _10);
  main.variable(observer()).define(["md"], _11);
  const child1 = runtime.module(define1);
  main.import("Histogram", child1);
  main.variable(observer()).define(["Histogram","values"], _13);
  main.variable(observer()).define(["tex","md"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["Histogram","values","width"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("viewof mu")).define("viewof mu", ["Scrubber","d3"], _mu);
  main.variable(observer("mu")).define("mu", ["Generators", "viewof mu"], (G, _) => G.input(_));
  main.variable(observer()).define(["Histogram","randoms","width"], _19);
  main.variable(observer("randoms")).define("randoms", ["d3","mu"], _randoms);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["md"], _23);
  const child2 = runtime.module(define2);
  main.import("Scrubber", child2);
  return main;
}
