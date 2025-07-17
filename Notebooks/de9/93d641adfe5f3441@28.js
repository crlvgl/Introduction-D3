function _1(md){return(
md`# Learn D3: Weitere Themen (9/9)

> _Disclaimer:_<br>
> _Dieses Notebook ist ein Fork von [Mike Bostock](https://observablehq.com/user/@mbostock)s "[Learn D3](https://observablehq.com/@d3/learn-d3-animation?collection=@d3/learn-d3)" Notebook-Serie._ <br>
> _Ich habe nur den Inhalt des Notebooks aktualisiert und geändert, um es besser an unseren Anwendungsfall anzupassen._ <br>
> _Dies ist die deutsche Übersetzung der Serie. Die Übersetzung wurde teils automatisiert erstellt. Keine Garantie auf Funktion, dafür bitte die [englische Version](/Notebooks/en9/index.html) verwenden. Alles sollte aber dennoch funktionieren._

Wenn ihr diesem Tutorial von Anfang an gefolgt seid, atmet tief durch und [klopft euch selbst auf die Schulter](https://i.pinimg.com/originals/a6/96/42/a6964204da51bb6d171e4030a5441788.gif)! Ihr habt viel gelernt und einen guten Eindruck davon bekommen, was eine typische Visualisierung ausmacht.

Aber wir haben den Gipfel noch nicht erreicht! Nein, dies ist lediglich das Basislager. _[[ihr jetzt gerade :D](https://media.tenor.com/5I1HPj8ekXgAAAAM/243.gif)]_

Es ist an der Zeit, nach oben zu schauen und zu sehen, was vor uns liegt.`
)}

function _2(md){return(
md`Saubere Daten sind eine Voraussetzung für eine effektive Datenvisualisierung. Einen Vorgeschmack auf die Datenerfassung und -bereinigung erhalten Sie in diesem [Tutorial über Wikipedia-Daten](/@mbostock/working-with-wikipedia-data). Sehen Sie sich die Methoden von [d3-array](/collection/@d3/d3-array) zum Transformieren und Aggregieren von Daten an, einschließlich [grundlegender zusammenfassender Statistiken](/@d3/d3-mean-d3-median-and-friends) und der leistungsstarken [d3.group und d3.rollup](/@d3/d3-group). Siehe auch [d3-regression](/@harrystevens/introducing-d3-regression) von Harry Steven für Trend- und Korrelationsanalysen. Für die Datenaggregation können Sie [eindimensionale Binning](https://d3js.org/d3-array/bin)-Methoden (wie in Histogrammen), [zweidimensionale Hexbins](https://github.com/d3/d3-hexbin) und [Dichtekonturschätzungen](https://d3js.org/d3-contour/density) verwenden.`
)}

function _3(md){return(
md`Wir haben bereits über Skalen gesprochen, aber [d3-scale](https://d3js.org/d3-scale) bietet auch zahlreiche Transformationen, die wir nicht behandelt haben, wie z. B. log-Skalen, Potenz-Skalen, symlog-Skalen, Quantisierungs-Skalen und Quantil-Skalen. (Hier ist ein schöner [Übergang von log zu linearer Skala](/@mbostock/new-zealand-tourists-1921-2018).) Eure Visualisierung wird effektiver sein, wenn ihr eine Transformation wählt, die zu euren Daten und der jeweiligen Fragestellung passt! Siehe auch diesen [Aufsatz über Vergleiche](/@mbostock/methods-of-comparison-compared).`
)}

function _4(md){return(
md`Wir haben uns auf abstrakte tabellarische Daten beschränkt, aber D3 funktioniert auch mit anderen Datentypen. Für Netzwerke könnt ihr ein [Akkorddiagramm](https://d3js.org/d3-chord) oder einen [kräftegesteuerten Graphen](https://d3js.org/d3-force) verwenden _[der quabbelt °o° (wusstet ihr, dass das Wort existiert??? ^.^)]_. Für hierarchische Daten implementiert [d3-hierarchy](https://d3js.org/d3-hierarchy) mehrere beliebte Algorithmen, darunter [Treemaps](/@d3/treemap) und [Tidy Trees](/@d3/tidy-tree). Für Kartographie und Geodatenvisualisierung siehe [d3-geo](https://d3js.org/d3-geo). Und für Zeitreihendaten siehe [d3-time](https://d3js.org/d3-time).`
)}

function _5(md){return(
md`Um mehr Kontrolle über die Darstellung eurer Daten zu haben, bietet D3 Low-Level-Methoden zur Formatierung von [Zahlen](https://d3js.org/d3-format) und [Daten](https://d3js.org/d3-time-format) (in eurem gewünschten Gebietsschema). Und D3 implementiert zahlreiche [Farbräume](https://d3js.org/d3-color) und -[schemata](/@d3/color-schemes).`
)}

function _6(md){return(
md`Für die Animation erkundet die D3-[Elastizierungsmethoden](https://d3js.org/d3-ease), [Interpolatoren](https://d3js.org/d3-interpolate) und [Übergänge](https://d3js.org/d3-transition). Und für die Interaktion sehen Sie sich die wiederverwendbaren Verhaltensweisen von D3 an: [Pinseln](https://d3js.org/d3-brush), [Zoomen](https://d3js.org/d3-zoom) und [Ziehen](https://d3js.org/d3-drag).`
)}

function _7(md){return(
md`Es gibt eine Vielzahl von Observable-spezifischen Themen, die Sie auch angehen könnten *[oder halt nicht, ihr könnt's ja sowieso nicht benutzen :person\\_shrugging:]*. Bringt [Observables *dataflow*](/@observablehq/how-observable-runs) mit [*promises*](/@observablehq/introduction-to-promises), [Generatoren](/@observablehq/introduction-to-generators) und [Views](/@observablehq/introduction-to-views) auf die nächste Stufe. Verwendet das [Invalidierungspromise](/@observablehq/invalidation), um Ressourcen zu entsorgen, wenn eine Zelle erneut ausgeführt wird, oder das [Sichtbarkeitspromise](/@mbostock/intersection-observer), um die Auswertung einer Zelle aufzuschieben, bis sie sichtbar ist. <br>
_[Ich habe das für den Fall, dass ihr es ausprobieren möchten, beibehalten, aber wie gesagt, es ist Observable-spezifisch und wird höchstwahrscheinlich außerhalb dieser Umgebung nicht funktionieren]_`
)}

function _8(md){return(
md`Und vergesst nicht zu kommunizieren! Dieses U.W.-Tutorial über [grafische Markierungen und visuelle Kodierungskanäle](/@uwdata/data-types-graphical-marks-and-visual-encoding-channels) ist eine hervorragende Einführung in die Grundlagen der Visualisierung. Das Denken in visuellen Variablen wird euch helfen, auch in D3 bessere Visualisierungen zu entwerfen. Für die Beschriftung dichter Graphen solltet ihr eine [Voronoi-Heuristik](/@d3/voronoi-labels) oder eine [iterative Optimierung](/@fil/occlusion) in Betracht ziehen. Verwenden Sie zur Darstellung von Farbkodierungen eine [Farblegende](/@d3/color-legend).`
)}

function _9(md){return(
md`Wie immer, danke fürs Lesen. Bitte folgt uns auf Twitter _[So alt ist das hier. Wie jeder vernünftige Mensch ist d3.js inzwischen weitergezogen und hat seine Twitter-Seite gelöscht.]_ für Updates und sendet uns euer Feedback. Wir freuen uns auch über Vorschläge für künftige Ergänzungen zu dieser Serie.

Und jetzt legt los!

_[Aber um die Annerkennung zu geben, hier ist ihr [BlueSky](https://bsky.app/profile/observablehq.com)]_`
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
