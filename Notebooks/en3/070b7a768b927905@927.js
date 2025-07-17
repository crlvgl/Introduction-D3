import define1 from "./8d5ef3030dfd3bad@499.js";
import define2 from "./4c29238c961f0d53@139.js";

function _1(md){return(
md`# Learn D3: Data (3/9)
`
)}

function _2(md){return(
md`> _Disclaimer:_ <br>
> _This notebook is a fork of [Mike Bostock](https://observablehq.com/user/@mbostock)s "[Learn D3](https://observablehq.com/@d3/learn-d3-data?collection=@d3/learn-d3)" notebook series._ <br>
> _I only updated and changed the contents of the notebook to better fit our use case._ <br><br>
> _**Important:** A lot was deleted and changed in this file since Observable and classic HTML+Js work different when importing data._ <br>
> _The code cells in this notebook contain the code to run in Observable. All equivalents for those snippets should have been added in the text cells, but since this notebook was changed quite a lot, some could be missing or be in unexpected places. I also can't guarantee that all "normal" code snippets work outside the context of this notebook._ <br>
> _When in doubt, [ask Google](https://letmegooglethat.com/?q=d3+csvparse)._`
)}

function _3(FileAttachment){return(
FileAttachment("temperature.csv").csv()
)}

function _4(md){return(
md`While Observable implicitly awaits promises, in a classic project we must await the file.csv promise in order to access the promised values within our script. <br>
(use [d3.csvParse](https://d3js.org/d3-dsv#csvParse))`
)}

function _5(md){return(
md`CSV doesn’t encode any type information, so by default both the *date* and *temperature* properties are strings. This makes them tricky to work with. For example, if you tried to add two temperatures, it would concatenate them.`
)}

function _6(){return(
"62.7" + "59.9"
)}

function _7(md){return(
md`To convert these strings into dates and numbers, we can pass [d3.autoType](/@d3/d3-autotype) as the second argument to d3.csvParse, which calls d3.autoType for each row. <br>
(d3.csvParse(temperature.csv, d3.autoType))`
)}

function _8(FileAttachment){return(
FileAttachment("temperature.csv").csv({typed: true})
)}

function _9(md){return(
md`If you inspect the array above, you’ll see teal dates (<code style="color: #20a5ba;">2011-10-16</code>) and numbers (<code style="color: #20a5ba;">61.6</code>) rather than blue strings (<code style="color: #008ec4;">"2011-10-16"</code> and <code style="color: #008ec4;">"61.6"</code>), confirming type conversion.`
)}

function _10(md){return(
md`Here’s a more explicit way of fetching, parsing, and type-converting the CSV file. You might take this approach if your data isn’t compatible with d3.autoType. (If you’re unsure, don’t rely on automatic type inference or [consult the documentation](https://d3js.org/d3-dsv#autoType).)`
)}

async function _data(FileAttachment,d3)
{
  const text = await FileAttachment("temperature.csv").text(); // this line only works in the context of this notebook
  const parseDate = d3.utcParse("%Y-%m-%d");
  return d3.csvParse(text, ({date, temperature}) => ({
    date: parseDate(date),
    temperature: +temperature
  }));
}


function _12(md){return(
md`With the data conveniently represented, we can now get to work! For example, we can compute the extents of the dates and temperatures to get a sense of scope.`
)}

function _13(d3,data){return(
d3.extent(data, d => d.date)
)}

function _14(d3,data){return(
d3.extent(data, d => d.temperature)
)}

function _15(md){return(
md`And as we saw previously, we can inject into the [example histogram](/@d3/histogram) for a quick sense of the temperature distribution.`
)}

function _17(Histogram,data,width,height){return(
Histogram(data, {value: d => d.temperature, width, height})
)}

function _18(md){return(
md`With our data so prepared, let’s move towards graphics!

<a title="Learn D3: Scales" style="display: inline-flex; align-items: center; font: 600 14px var(--sans-serif);" href="/Notebooks/en4/index.html">Next<svg width="8" height="16" fill="none" stroke-width="1.8" style="margin-left: 0.25em; padding-top: 0.25em;"><path d="M2.75 11.25L5.25 8.25L2.75 5.25" stroke="currentColor"></path></svg></a>`
)}

function _19(md){return(
md`---

## Appendix`
)}

function _height(){return(
200
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["temperature.csv", {url: new URL("./files/cb1fa9dc3147e810a19f64ff1808f3f0f71d9730b593e1e1ef22e22a1bd3392dba8c3ae7c8efd54726f420bba89fceffe247021605d9668f4d93cca500476986.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["FileAttachment"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(_6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["FileAttachment"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("data")).define("data", ["FileAttachment","d3"], _data);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["d3","data"], _13);
  main.variable(observer()).define(["d3","data"], _14);
  main.variable(observer()).define(["md"], _15);
  const child1 = runtime.module(define1);
  main.import("Histogram", child1);
  main.variable(observer()).define(["Histogram","data","width","height"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("height")).define("height", _height);
  const child2 = runtime.module(define2);
  main.import("keyStyled", child2);
  return main;
}
