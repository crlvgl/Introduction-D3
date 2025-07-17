// https://observablehq.com/@mbostock/ramp@99
function _1(md){return(
md`# Color Ramp

A simple, reusable ramp for visualizing color scales. For a labeled version using D3 scales, see the [D3 color legend](/@d3/color-legend).`
)}

function _ramp(DOM){return(
function ramp(color, n = 512) {
  const canvas = DOM.canvas(n, 1);
  const context = canvas.getContext("2d");
  canvas.style.margin = "0 -14px";
  canvas.style.width = "calc(100% + 28px)";
  canvas.style.height = "40px";
  canvas.style.imageRendering = "-moz-crisp-edges";
  canvas.style.imageRendering = "pixelated";
  for (let i = 0; i < n; ++i) {
    context.fillStyle = color(i / (n - 1));
    context.fillRect(i, 0, 1, 1);
  }
  return canvas;
}
)}

function _3(ramp){return(
ramp(t => `hsl(${t * 360},100%,50%)`)
)}

function _4(ramp,d3){return(
ramp(d3.interpolateRainbow)
)}

function _5(ramp,d3){return(
ramp(d3.interpolateViridis)
)}

function _6(ramp,d3){return(
ramp(d3.interpolateViridis, 12)
)}

function _7(ramp,d3){return(
ramp(d3.interpolateRgb("red", "blue"))
)}

function _8(ramp,d3){return(
ramp(d3.interpolateLab("red", "blue"))
)}

function _9(ramp,d3){return(
ramp(d3.interpolateHclLong("red", "blue"))
)}

function _d3(require){return(
require("d3-scale-chromatic@1", "d3-interpolate@1")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("ramp")).define("ramp", ["DOM"], _ramp);
  main.variable(observer()).define(["ramp"], _3);
  main.variable(observer()).define(["ramp","d3"], _4);
  main.variable(observer()).define(["ramp","d3"], _5);
  main.variable(observer()).define(["ramp","d3"], _6);
  main.variable(observer()).define(["ramp","d3"], _7);
  main.variable(observer()).define(["ramp","d3"], _8);
  main.variable(observer()).define(["ramp","d3"], _9);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
