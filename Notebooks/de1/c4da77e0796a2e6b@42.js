function _1(md){return(
md`# Learn D3: Einführung (1/9)

> _Disclaimer:_<br>
> _Dieses Notebook ist ein Fork von [Mike Bostock](https://observablehq.com/user/@mbostock)s "[Learn D3](https://observablehq.com/@d3/learn-d3?collection=@d3/learn-d3)" Notebook-Serie._ <br>
> _Ich habe nur den Inhalt des Notebooks aktualisiert und geändert, um es besser an unseren Anwendungsfall anzupassen._ <br>
> _Dies ist die deutsche Übersetzung der Serie. Die Übersetzung wurde teils automatisiert erstellt. Keine Garantie auf Funktion, dafür bitte die [englische Version](/Notebooks/en1/index.html) verwenden. Alles sollte aber dennoch funktionieren._

Diese Reihe von Notebooks wird euch durch eure ersten Schritte mit [D3.js](https://d3js.org) führen.`
)}

function _2(md){return(
md`<figure>
  <svg viewBox="-60 -10 216 111" stroke-width=".25"><path fill="#bbb" d="M0 0h7.75a45.5 45.5 0 110 91H0V71h7.75a25.5 25.5 0 100-51H0zm36.251 0h32a27.75 27.75 0 0121.331 45.5A27.75 27.75 0 0168.251 91h-32a53.69 53.69 0 0018.746-20H68.25a7.75 7.75 0 100-15.5H60.5a53.69 53.69 0 000-20h7.75a7.75 7.75 0 100-15.5H54.997A53.69 53.69 0 0036.251 0z"/><g fill="none" stroke="currentColor" stroke-opacity=".3"><path d="M-100 0h300M-100 20h300M-100 35.5h300M-100 45.5h300M-100 55.5h300M-100 71h300M-100 91h300M0-100v300M7.75-100v300M60.5-100v300M68.25-100v300M96-100v300"/></g><g fill="#00f"><circle cx="7.75" cy="45.5" r="1"/><circle cx="68.25" cy="27.75" r="1"/><circle cx="68.25" cy="63.25" r="1"/></g><g fill="red"><circle cx="36.251" r="1"/><circle cx="54.997" cy="20" r="1"/><circle cx="60.5" cy="35.5" r="1"/><circle cx="60.5" cy="55.5" r="1"/><circle cx="54.997" cy="71" r="1"/><circle cx="36.251" cy="91" r="1"/><circle cx="89.581" cy="45.5" r="1"/></g><g fill="none" stroke="currentColor"><circle cx="7.75" cy="45.5" r="25.5"/><circle cx="7.75" cy="45.5" r="45.5"/><circle cx="7.75" cy="45.5" r="53.69"/><circle cx="68.25" cy="27.75" r="7.75"/><circle cx="68.25" cy="27.75" r="27.75"/><circle cx="68.25" cy="63.25" r="7.75"/><circle cx="68.25" cy="63.25" r="27.75"/></g></svg>
  <figcaption>[D3's Logo](/@d3/logo) ist mit Kreisen und senkrechten Linien gezeichnet.</figcaption>
</figure>`
)}

function _3(md){return(
md`Bevor wir beginnen, lohnt es sich, kurz darüber nachzudenken: _Warum sollte man sich die Mühe machen, D3 zu lernen? Und warum hier in Observable lernen?_`
)}

function _4(md){return(
md`Zum einen ist D3 sehr beliebt ([600 Millionen Downloads](/@mbostock/npm-daily-downloads?name=d3) und [100.000 Sterne](https://github.com/d3/d3)), ihr befindet euch also in guter Gesellschaft. Es gibt viele von der Community entwickelte Ressourcen, darunter Tutorials, Videos, Kurse und Bücher. Und das D3-Team hat Hunderte von eigenen forkbaren Beispielen und Tutorials veröffentlicht, um euer Lernen und eure Produktivität zu steigern.`
)}

function _5(md){return(
md`Zum anderen ist D3 flexibel. Die Superkraft von D3 besteht darin, dass ihr tun könnt, was ihr wollt - kreative Freiheit! Die [D3-Galerie](/@d3/gallery) ist ein wahrer Formenzoo: [Treemap](/@d3/treemap), [hierarchische Kantenbündelung](/@d3/hierarchical-edge-bundling/2), [Sankey-Diagramm](/@d3/sankey-diagram), [Dichtekonturen](/@d3/density-contours), [Force-Directed Graph](/@d3/disjoint-force-directed-graph), um nur einige zu nennen. (Und fast hundert [Kartenprojektionen](/@d3/world-map)!) Diese Flexibilität ergibt sich aus dem Low-Level-Ansatz von D3, der sich auf komponierbare Primitive wie [Formen](https://medium.com/@mbostock/introducing-d3-shape-73f8367e6d12) und [Skalen](https://medium.com/@mbostock/introducing-d3-scale-61980c51545f) konzentriert, anstatt auf konfigurierbare Diagramme. D3 macht keine Einschränkungen, so dass Sie alle Glocken und Pfeifen nutzen können, die von modernen Browsern unterstützt werden.`
)}

function _6(md){return(
md`Und D3 ist bekannt für Animation und Interaktion. Wenn Sie ein paar Minuten Zeit haben, sehen Sie sich ein [Balkendiagramm](/@d3/bar-chart-race) oder eine [animierte Treemap](/@d3/animated-treemap) an. Taucht ein in ein [hierarchisches Balkendiagramm](/@d3/hierarchical-bar-chart), einen [zusammenklappbaren Baum](/@d3/collapsible-tree) oder ein zoombarer [Sunburst](/@d3/zoomable-sunburst), [Treemap](/@d3/zoomable-treemap) oder [gepackte Kreise](/@d3/zoomable-circle-packing). Oder streicht eine [Streudiagramm-Matrix](/@d3/brushable-scatterplot-matrix) oder zoomt in ein [Flächendiagramm](/@d3/zoomable-area-chart). Animationen können ein wirkungsvolles Mittel für die Erzählung von Geschichten sein, während die Interaktion dem aktiven Leser die Möglichkeit gibt, sich mit dem Thema auseinanderzusetzen.`
)}

function _7(md){return(
md`Diese Macht hat natürlich ihren Preis. Es gibt viel zu lernen: D3 hat mehr als dreißig Module und tausend Methoden! Und D3 kann mühsamer sein als Tools, die ausdrücklich für die explorative Visualisierung gedacht sind, wie [Observable Plot](/@observablehq/plot) und [Vega-Lite](https://vega.github.io/vega-lite/).`
)}

function _8(md){return(
md`Genug der Ouvertüre. Heben wir den Vorhang und werfen wir einen ersten Blick auf D3.

<a title="Learn D3: By Example" style="display: inline-flex; align-items: center; font: 600 14px var(--sans-serif);" href="/Notebooks/de2/index.html">Weiter<svg width="8" height="16" fill="none" stroke-width="1.8" style="margin-left: 0.25em; padding-top: 0.25em;"><path d="M2.75 11.25L5.25 8.25L2.75 5.25" stroke="currentColor"></path></svg></a>`
)}

function _9(md){return(
md`---

## Inhaltsverzeichnis

1. Einführung - ihr seid hier!
1. [Nach Beispielen](/Notebooks/de2/index.html) - Beispiele finden, forken, importieren
1. [Daten](/Notebooks/de3/index.html) - Daten laden, parsen, transformieren
1. [Skalen](/Notebooks/de4/index.html) - Abstraktes sichtbar machen
1. [Formen](/Notebooks/de5/index.html) - Geometrische Primitive für die Visualisierung
1. [Animation](/Notebooks/de6/index.html) - Grafiken, die sich im Laufe der Zeit verändern
1. [Joins](/Notebooks/de7/index.html) - D3's Muster für die Manipulation des DOM
1. [Interaktion](/Notebooks/de8/index.html) - Reagieren auf Benutzereingaben
1. [Weitere Themen](/Notebooks/de9/index.html) - wie es weitergeht`
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
