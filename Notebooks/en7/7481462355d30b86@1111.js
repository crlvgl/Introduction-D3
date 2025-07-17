function _1(md){return(
md`# Learn D3: Joins (7/9)

> _Disclaimer:_ <br>
> _This notebook is a fork of [Mike Bostock](https://observablehq.com/user/@mbostock)s "[Learn D3](https://observablehq.com/@d3/learn-d3-joins?collection=@d3/learn-d3)" notebook series._ <br>
> _I only updated and changed the contents of the notebook to better fit our use case._

If you were familiar with D3 going into this tutorial, you may be surprised by how little D3 selections have been mentioned.

That’s because you might not need them!`
)}

function _2(md){return(
md`D3 selections fill a particular niche: fast, incremental updates of dynamic graphics. If your focus is on static graphics, or graphics that can be redrawn from scratch each frame, you may prefer a different abstraction. On the other hand, if you want animated transitions or to squeeze the best performance out of modern browsers, selections are for you.`
)}

function _3(md){return(
md`(Even if you decide not to use selections, remember that D3 has myriad other useful tools for visualization. Scales, shapes, interpolators, colors, map projections, and many other features, can be used with Canvas, WebGL, or other DOM abstractions such as Observable’s HTML tagged template literal, React, or Svelte. And D3 can assist with data cleaning and analysis, with methods for statistics, grouping and aggregation, time series and parsing.)`
)}

function _4(md){return(
md`At heart, D3 selections specify *transformation* rather than *representation*. Instead of expressing the desired state of the graphic (the DOM), you specify the changes (insertions, updates, and deletions) needed to transform the current state into the desired state. This is sometimes tedious but allows you to animate transitions and to minimize changes to the DOM, improving performance.

Let’s see how.`
)}

function _5(md){return(
md`Say we want to show the letters of the alphabet. Not much of a visualization, but we’ll keep things simple to focus on technique. (For real-world examples, see the animation and interaction sections of the [D3 gallery](/@d3/gallery).)`
)}

function _alphabet(){return(
[..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]
)}

function _chart1(d3,width,alphabet)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, 33])
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .style("display", "block");

  svg.selectAll("text")
    .data(alphabet)
    .join("text")
      .attr("x", (d, i) => i * 17)
      .attr("y", 17)
      .attr("dy", "0.35em")
      .text(d => d);

  return svg.node();
}


function _8(md){return(
md`This graphic is static in the sense that it is created from scratch each time the cell runs, making the D3 code equivalent in spirit to an HTML literal.`
)}

function _9(htl,width,alphabet){return(
htl.html`<svg viewBox="0 0 ${width} 33" font-family="sans-serif" font-size="10" style="display: block;">
  ${alphabet.map((d, i) => htl.svg`<text x="${i * 17}" y="17" dy="0.35em">${d}</text>`)}
</svg>`
)}

function _10(md){return(
md`So why bother with selections? Well, for a static graphic, there’s little reason to.

But say you want to update this chart in response to changing data. And say you *don’t* want to redraw it from scratch — you want to apply the minimal set of updates to reflect the new data. You want to reuse existing elements, adding what you need, and removing what you don’t. Merely by moving the above code into a method that is called when the data changes, you get performant incremental updates!`
)}

async function* _randomLetters(d3,alphabet,Promises)
{
  while (true) {
    yield d3.shuffle(alphabet.slice())
      .slice(Math.floor(Math.random() * 10) + 5)
      .sort(d3.ascending);
    await Promises.delay(3000);
  }
}


function _chart2(d3,width)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, 33])
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .style("display", "block");

  let text = svg.selectAll("text");

  return Object.assign(svg.node(), {
    update(letters) {
      text = text
        .data(letters)
        .join("text")
          .attr("x", (d, i) => i * 17)
          .attr("y", 17)
          .attr("dy", "0.35em")
          .text(d => d);
    }
  });
}


function _13(chart2,randomLetters){return(
chart2.update(randomLetters)
)}

function _14(md){return(
md`Let’s break down the code.

*text* is a selection of text elements, initially empty, whose parent is the SVG element. This parent determines where entering text elements will be appended later.

By calling *selection*.data, *text* is bound to a new array of data, *letters*. This computes three disjoint subsets of the *text* selection: the *enter* selection representing new data for which there is no existing element; the *update* selection representing existing elements for which there is new data; and the *exit* selection representing existing elements for which there is no new data.

As a Venn diagram:`
)}

function _15(htl){return(
htl.html`<figure>
  <svg viewBox="-200 -128 400 240" style="font: 10px sans-serif;">
    <g transform="translate(-50,0)">
      <circle r="110" fill="#377eb8" fill-opacity="0.7" style="mix-blend-mode: multiply;" stroke="black"></circle>
      <text x="-5" y="-120" dy="0.35em" text-anchor="middle">New Data</text>
      <text x="-70" dy="0.35em" text-anchor="middle">Enter</text>
    </g>
    <g transform="translate(50,0)">
      <circle r="110" fill="#e41a1c" fill-opacity="0.7" style="mix-blend-mode: multiply;" stroke="black"></circle>
      <text x="5" y="-120" dy="0.35em" text-anchor="middle">Existing Elements</text>
      <text x="70" dy="0.35em" text-anchor="middle">Exit</text>
    </g>
    <text x="0" dy=".35em" text-anchor="middle" fill="white">Update</text>
  </svg>
  <figcaption>The three selections computed by the <i>selection</i>.data.</figcaption>
</figure>`
)}

function _16(md){return(
md`(These selections are hidden in the code: *selection*.data returns the *update* selection, from which you can call *selection*.enter or *selection*.exit to access the others.)`
)}

function _17(md){return(
md`We could handle these three cases manually, but [*selection*.join](/@d3/selection-join) provides convenient defaults. The *enter* selection is appended; the *exit* selection is removed; and lastly the *update* and *enter* selections are merged, ordered and returned. We can then assign attributes and text on these entering-or-updating elements.`
)}

function _18(md){return(
md`We can be even more efficient by observing that we don’t need to reassign some attributes and text content on updating elements as long as the association between letter and text element remains constant. To preserve this association, *selection*.data needs a key function; and for precise operations on *enter*, *update*, and *exit*, *selection*.join needs corresponding functions. If updates are more common than enters and exits, this can greatly improve performance!`
)}

function _chart3(d3,width)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, 33])
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .style("display", "block");

  let text = svg.selectAll("text");

  return Object.assign(svg.node(), {
    update(letters) {
      text = text
        .data(letters, d => d)
        .join(
          enter => enter.append("text")
            .attr("y", 17)
            .attr("dy", "0.35em")
            .text(d => d),
          update => update,
          exit => exit.remove()
        )
          .attr("x", (d, i) => i * 17);
    }
  });
}


function _20(chart3,randomLetters){return(
chart3.update(randomLetters)
)}

function _21(md){return(
md`As before, *selection*.join returns the merged *enter* and *update* selections, so we can share code that applies to both, such as setting the *x* attribute.`
)}

function _22(md){return(
md`The key function passed to *selection*.data is used to compute a (string) key for each new datum and each selected element’s old datum, determining which datum is bound to which element: if an element and datum have the same key, that datum is bound to the element and the element is put in the *update* selection. Letters make good keys, so the identity function (<code>d => d</code>) is appropriate here.`
)}

function _23(md){return(
md`(If no key function is specified, data is bound by index: the first datum is bound to the first element, and so on. As an exercise, try rewriting the code above to join by index. You’ll also want to swap setting the *x* attribute with setting the text content!)`
)}

function _24(md){return(
md`Where selections really shine, though, are transitions! ✨

Below, letters enter from the top, slide horizontally when they update, and exit to the bottom. This is much easier to interpret than the instantaneous cuts above.`
)}

function _chart4(d3,width)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, 33])
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .style("display", "block");

  let text = svg.selectAll("text");

  return Object.assign(svg.node(), {
    update(letters) {
      const t = svg.transition().duration(750);

      text = text
        .data(letters, d => d)
        .join(
          enter => enter.append("text")
            .attr("y", -7)
            .attr("dy", "0.35em")
            .attr("x", (d, i) => i * 17)
            .text(d => d),
          update => update,
          exit => exit
            .call(text => text.transition(t).remove()
              .attr("y", 41))
        )
          .call(text => text.transition(t)
            .attr("y", 17)
            .attr("x", (d, i) => i * 17));
    }
  });
}


function _26(chart4,randomLetters){return(
chart4.update(randomLetters)
)}

function _27(md){return(
md`Good transitions don’t just make a graphic “dance” to grab attention; they help the viewer understand through motion *how the data changes*. 

Good transitions maintain [*object constancy*](https://bost.ocks.org/mike/constancy/): a graphical element that represents a particular thing (such as the letter C) *before* the transition should represent the same thing *throughout and after* the transition, allowing continuous tracking by the viewer. If instead the meaning of a given element were to change during the transition, then the motion would be meaningless.`
)}

function _28(md){return(
md`How about a more practical example?

The chart below shows the top ten states (and D.C., the urban outlier) by percentage of population in a particular age group. It shows Utah’s disproportionately youthful population, a reflection of the LDS Church’s emphasis on raising families. Florida in contrast has a large retiree population, many in their seventies or older.`
)}

function _29(md){return(
md`As you change the selected age group, watch how the bars reorder to reflect the change in ranking. The *x*-axis simultaneously rescales to fit the new data.`
)}

function _agedata(Inputs,data,d3){return(
Inputs.select(new Map(data.ages.map(age => [age, data.filter(d => d.age === age).sort((a, b) => d3.descending(a.value, b.value))])), {label: "Age group"})
)}

function _chart(d3,width,height,$0,margin,data,xAxis,yAxis)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  // For the initial render, reference the current age non-reactively.
  const agedata = $0.value;

  const x = d3.scaleLinear()
      .domain([0, d3.max(agedata, d => d.value)])
      .rangeRound([margin.left, width - margin.right]);

  const y = d3.scaleBand()
      .domain(agedata.map(d => d.name))
      .rangeRound([margin.top, margin.top + 20 * data.names.length]);

  let bar = svg.append("g")
      .attr("fill", "steelblue")
    .selectAll("rect")
    .data(agedata, d => d.name)
    .join("rect")
      .style("mix-blend-mode", "multiply")
      .attr("x", x(0))
      .attr("y", d => y(d.name))  
      .attr("width", d => x(d.value) - x(0))
      .attr("height", y.bandwidth() - 1);

  const gx = svg.append("g")
      .call(xAxis, x);

  const gy = svg.append("g")
      .call(yAxis, y);

  return Object.assign(svg.node(), {
    update(agedata) {
      const t = svg.transition().duration(750);

      gx.transition(t)
          .call(xAxis, x.domain([0, d3.max(agedata, d => d.value)]));

      gy.transition(t)
          .call(yAxis, y.domain(agedata.map(d => d.name)));

      bar = bar
        .data(agedata, d => d.name)
        .call(bar => bar.transition(t)
          .attr("width", d => x(d.value) - x(0))
          .attr("y", d => y(d.name)));
    }
  });
}


function _32(chart,agedata){return(
chart.update(agedata)
)}

function _33(md){return(
md`Only the top 10 bars are visible because the remaining bars are hidden below the chart. Hence *selection*.join is not needed: no bars enter or exit; they only update. This not only simplifies the code, but makes the transitions more meaningful, as the speed of entering or exiting bars now hints at their offscreen position.`
)}

function _34(md){return(
md`Animated transitions are often triggered by the reader poking or prodding in search of answers. Next let’s see how we can make charts respond to such queries.

<a title="Learn D3: Interaction" style="display: inline-flex; align-items: center; font: 600 14px var(--sans-serif);" href="/Notebooks/en8/index.html">Next<svg width="8" height="16" fill="none" stroke-width="1.8" style="margin-left: 0.25em; padding-top: 0.25em;"><path d="M2.75 11.25L5.25 8.25L2.75 5.25" stroke="currentColor"></path></svg></a>`
)}

function _35(md){return(
md`---

## Appendix`
)}

async function _data(FileAttachment,d3)
{
  const data = await FileAttachment("us-population-state-age.csv").csv();
  const ages = data.columns.slice(1);
  const totals = new Map(data.map(d => [d.name, d3.sum(ages, age => d[age])]));
  return Object.assign(d3.cross(data, ages).map(([d, age]) => ({name: d.name, age, value: +d[age] / totals.get(d.name)})), {names: data.map(d => d.name), ages});
}


function _xAxis(margin,d3,width){return(
(g, x) => g
    .attr("transform", `translate(0,${margin.top})`)
    .call(d3.axisTop(x).ticks(width / 80, "%"))
    .call(g => (g.selection ? g.selection() : g).select(".domain").remove())
)}

function _yAxis(margin,d3){return(
(g, y) => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSizeOuter(0))
)}

function _height(margin){return(
margin.top + 20 * 10
)}

function _margin(){return(
{top: 30, right: 20, bottom: 0, left: 30}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["us-population-state-age.csv", {url: new URL("./files/81d7bd5e9551f005d7a4764e2dcb46c44f04b5918551ce19dba191a8799b498beddb5ef2da994047586fc7231749e8911c825b1967f22814a57bee58c590c86e.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("alphabet")).define("alphabet", _alphabet);
  main.variable(observer("chart1")).define("chart1", ["d3","width","alphabet"], _chart1);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["htl","width","alphabet"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("randomLetters")).define("randomLetters", ["d3","alphabet","Promises"], _randomLetters);
  main.variable(observer("chart2")).define("chart2", ["d3","width"], _chart2);
  main.variable(observer()).define(["chart2","randomLetters"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["htl"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("chart3")).define("chart3", ["d3","width"], _chart3);
  main.variable(observer()).define(["chart3","randomLetters"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("chart4")).define("chart4", ["d3","width"], _chart4);
  main.variable(observer()).define(["chart4","randomLetters"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("viewof agedata")).define("viewof agedata", ["Inputs","data","d3"], _agedata);
  main.variable(observer("agedata")).define("agedata", ["Generators", "viewof agedata"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","width","height","viewof agedata","margin","data","xAxis","yAxis"], _chart);
  main.variable(observer()).define(["chart","agedata"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer("data")).define("data", ["FileAttachment","d3"], _data);
  main.variable(observer("xAxis")).define("xAxis", ["margin","d3","width"], _xAxis);
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3"], _yAxis);
  main.variable(observer("height")).define("height", ["margin"], _height);
  main.variable(observer("margin")).define("margin", _margin);
  return main;
}
