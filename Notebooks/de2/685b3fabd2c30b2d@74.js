import define1 from "./8d5ef3030dfd3bad@499.js";
import define2 from "./450051d7f1174df8@255.js";

function _1(md){return(
md`# Learn D3: Nach Beispielen (2/9)

> _Disclaimer:_<br>
> _Dieses Notebook ist ein Fork von [Mike Bostock](https://observablehq.com/user/@mbostock)s "[Learn D3](https://observablehq.com/@d3/learn-d3-by-example?collection=@d3/learn-d3)" Notebook-Serie._ <br>
> _Ich habe nur den Inhalt des Notebooks aktualisiert und geändert, um es besser an unseren Anwendungsfall anzupassen._ <br>
> _Dies ist die deutsche Übersetzung der Serie. Die Übersetzung wurde teils automatisiert erstellt. Keine Garantie auf Funktion, dafür bitte die [englische Version](/Notebooks/en2/index.html) verwenden. Alles sollte aber dennoch funktionieren._

Eine der besten Möglichkeiten, mit D3 zu beginnen, ist das [Durchstöbern der Galerie](/@d3/gallery).`
)}

function _2(md){return(
md`Wenn ihr Glück habt (und bei der großen Auswahl stehen eure Chancen nicht schlecht), findet ihr vielleicht ein Beispiel, das ihr so weiterverwenden könnt, wie es ist. Das kann eine Menge Arbeit ersparen, als von Grund auf neu zu lernen, wie man etwas erstellt. Um zum Beispiel eine Treemap zu erstellen, *könntet* ihr die [d3-Hierarchie-API-Referenz](https://d3js.org/d3-hierarchy) zu Rate ziehen, aber viel schneller wäre es, das [Treemap-Beispiel](https://observablehq.com/@d3/treemap) zu nehmen und eure Daten zu ersetzen.`
)}

function _3(md){return(
md`Das mag sich wie Schummeln anfühlen, aber das ist in Ordnung! Beispiele sind nicht nur wiederverwendbare Vorlagen, sondern auch Lernwerkzeuge, die auf Lerninhalte hinweisen. Ein Beispiel zu „brechen“, indem man etwas verändert und sieht, was passiert, hilft euch, es schneller zu verstehen als durch passives Lesen.

Außerdem macht es Spaß.`
)}

async function _changingStuff1(FileAttachment,md){return(
md`<figure>
  <img src="${await FileAttachment("changing-stuff-1.jpg").url()}" style="width: 274px; height: 360px;">
  <figcaption>Eine legitime Lernstrategie. Bild: [DEV Community](https://twitter.com/thepracticaldev)</figcaption>
</figure>`
)}

function _5(md){return(
md`Es ist kein Zufall, dass Observable _[diese Umgebung; Teile wurden der Einfachheit halber aus diesem Tutorial entfernt]_ so konzipiert ist, dass es euch beim Basteln hilft. Besucht ein beliebiges Notizbuch, bearbeitet eine Zelle, und seht, was passiert! In vielen Fällen genügt ein Klick, um eine Datei zu ersetzen. Wenn euch das Ergebnis gefällt, speichert eure Arbeit durch Forking.`
)}

function _6(md){return(
md`Ihr könnt auch Beispiele importieren und mit ihnen basteln, ohne in den Code einzutauchen. Dies ist zweifellos der schnellste Weg, um mit D3 zu beginnen, und es wird immer leistungsfähiger, während ihr lernt.`
)}

function _7(md){return(
md`Sehen wir uns das mal an.

Angenommen, ich gebe euch eine Reihe von Zahlen. Was könnt ihr mir über diese Daten sagen?`
)}

function _values(FileAttachment){return(
FileAttachment("values-1.json").json()
)}

function _9(md){return(
md`Ihr könntet einige Werte von Hand prüfen, aber das wird nicht viel bringen. Es gibt keine Möglichkeit, herauszufinden, ob die Handvoll Werte, die ihr untersucht, repräsentativ für die Gesamtverteilung sind. Wie wäre es, wenn ihr einige [zusammenfassende Statistiken](/@d3/d3-mean-d3-median-and-friends) berechnen würden, z. B. Minimum, Median und Maximum?`
)}

function _10(d3,values){return(
[d3.min(values), d3.median(values), d3.max(values)]
)}

function _11(md){return(
md`Nun... das ist schon etwas. Aber wir brauchen mehr als eine einzelne Zahl, um ein Gefühl für die Verteilung zu bekommen. Wir brauchen eine Visualisierung. Genauer gesagt, ein Histogramm. [Importieren](/@observablehq/introduction-to-imports) wir also das [D3-Beispiel-Histogramm](/@d3/histogram).`
)}

function _13(Histogram,values){return(
Histogram(values)
)}

function _14(tex,md){return(
md`Et voilà! Jetzt sehen wir: Die Daten bilden in etwa eine Normalverteilung mit dem Mittelpunkt Null. (Ich habe diese Werte mit [d3.randomNormal](/@d3/d3-random) mit einem Erwartungswert ${tex`\mu = 0`} und einer Standardabweichung ${tex`\sigma = 1`} erstellt).`
)}

function _15(md){return(
md`Aber wir sind nicht auf das Ersetzen von Daten beim Importieren beschränkt. Wir können Optionen angeben, um beispielsweise das Aussehen der *x*- oder *y*-Achse anzupassen. Oder wenn wir ein etwas kürzeres Diagramm bevorzugen, können wir die Höhe ändern.`
)}

function _16(Histogram,values,width){return(
Histogram(values, {width, height: 200, color: "steelblue"})
)}

function _17(md){return(
md`Ist euch aufgefallen, dass es in diesem kürzeren Diagramm weniger Ticks entlang der *y*-Achse gibt? *Magic*! Und wenn ihr das cool findet, seht euch an, wie dieses Histogramm zum Leben erwacht, wenn wir *dynamische* Daten einspeisen! Klickt unten auf Play oder zieht den Schieberegler.`
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
md`Die Zelle *randoms* erzeugt Zufallswerte mit einer Normalverteilung. Die Option *domain* legt den Bereich des Histogramms auf [-10, +10] fest; dies zeigt, wie sich die Verteilung als Reaktion auf den Mittelwert *mu* verschiebt; wäre kein fester Bereich angegeben, würde der Bereich so berechnet, dass er zu den Daten passt, und die Veränderung der Verteilung wäre nur durch genaues Ablesen der Ticks auf der *x*-Achse erkennbar. (Um dies selbst zu sehen, versucht, die obige Option *domain* zu entfernen).`
)}

function _22(md){return(
md`Nachdem ihr nun gesehen habt, wie weit ihr mit der Wiederverwendung von Beispielen kommen könnt, lasst uns etwas Code von Grund auf schreiben!

<a title="Learn D3: Data" style="display: inline-flex; align-items: center; font: 600 14px var(--sans-serif);" href="/Notebooks/de3/index.html">Weiter<svg width="8" height="16" fill="none" stroke-width="1.8" style="margin-left: 0.25em; padding-top: 0.25em;"><path d="M2.75 11.25L5.25 8.25L2.75 5.25" stroke="currentColor"></path></svg></a>`
)}

function _23(md){return(
md`---

## Anhang
_[Observable führt Zellen in topologischer Reihenfolge und nicht von oben nach unten aus, so dass es keine Rolle spielt, wo Referenzen importiert werden, solange sie referenziert werden können. In einem klassischen Projekt würde das nicht funktionieren und alle Importe müssen ausgeführt werden, bevor sie zum ersten Mal referenziert werden._ <br>
_Aus Gründen der Lesbarkeit stehen alle nicht notwendigen Importe am Ende des Notebooks]._`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["values-1.json", {url: new URL("./files/c96b0603e3710650ec81ba0acdcc67219b47d4dc225b9e00867b7f945603459de52df5dea57f52581cf78d36e44157ff873596664ee283f4a0e9041e8a4c0aeb.json", import.meta.url), mimeType: "application/json", toString}],
    ["changing-stuff-1.jpg", {url: new URL("./files/9cbc9626085f61d6299d3d399546f5fdc175be5f1af20f0211706a7e9504c1620b4dc0e9ab9fd3935211b954a204a167110cc6bab482e7d6730510a9d1711db1.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("changingStuff1")).define("changingStuff1", ["FileAttachment","md"], _changingStuff1);
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
