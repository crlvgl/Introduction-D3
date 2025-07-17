import define1 from "./8d5ef3030dfd3bad@499.js";
import define2 from "./4c29238c961f0d53@139.js";

function _1(md){return(
md`# Learn D3: Daten (3/9)

> _Disclaimer:_<br>
> _Dieses Notebook ist ein Fork von [Mike Bostock](https://observablehq.com/user/@mbostock)s "[Learn D3](https://observablehq.com/@d3/learn-d3-data?collection=@d3/learn-d3)" Notebook-Serie._ <br>
> _Ich habe nur den Inhalt des Notebooks aktualisiert und geändert, um es besser an unseren Anwendungsfall anzupassen._ <br>
> _Dies ist die deutsche Übersetzung der Serie. Die Übersetzung wurde teils automatisiert erstellt. Keine Garantie auf Funktion, dafür bitte die [englische Version](/Notebooks/en3/index.html) verwenden. Alles sollte aber dennoch funktionieren._ <br><br>
> _**Wichtig:** In dieser Datei wurde eine Menge gelöscht und geändert, da Observable und klassisches HTML+Js beim Importieren von Daten unterschiedlich funktionieren._ <br>
> _Die Codezellen in diesem Notizbuch enthalten den Code, der in Observable ausgeführt werden soll. Alle Äquivalente für diese Snippets sollten in die Textzellen eingefügt worden sein, aber da dieses Notebook ziemlich viel geändert wurde, könnten einige fehlen oder sich an unerwarteten Stellen befinden. Ich kann auch nicht garantieren, dass alle „normalen“ Codesnippets außerhalb des Kontexts dieses Notizbuchs funktionieren._ <br>
> _Im Zweifelsfall [fragt Google](https://letmegooglethat.com/?q=d3+csvparse)._`
)}

function _2(FileAttachment){return(
FileAttachment("temperature.csv").csv()
)}

function _3(md){return(
md`Während Observable implizit auf *promises* wartet, müssen wir in einem klassischen Projekt auf den *file.csv-promise* warten, um in unserem Skript auf die versprochenen Werte zugreifen zu können.
(verwendet [d3.csvParse](https://d3js.org/d3-dsv#csvParse))`
)}

function _4(md){return(
md`CSV kodiert keine Typinformationen, so dass sowohl die *Datum*s- als auch die *Temperatur*eigenschaften standardmäßig Strings sind. Das macht es schwierig, mit ihnen zu arbeiten. Wenn ihr z. B. versucht, zwei Temperaturen hinzuzufügen, werden diese miteinander verknüpft.`
)}

function _5(){return(
"62.7" + "59.9"
)}

function _6(md){return(
md`Um diese Zeichenketten in Daten und Zahlen umzuwandeln, können wir [d3.autoType](/@d3/d3-autotype) als zweites Argument an d3.csvParse übergeben, das d3.autoType für jede Zeile aufruft. <br>
(d3.csvParse(temperatur.csv, d3.autoType))`
)}

function _7(FileAttachment){return(
FileAttachment("temperature.csv").csv({typed: true})
)}

function _8(md){return(
md`Wenn ihr das obige Array untersucht, seht ihr blaue Datumsangaben (<code style="color: #20a5ba;">2011-10-16</code>) und Zahlen (<code style="color: #20a5ba;">61.6</code>) anstelle von blauen Zeichenfolgen (<code style="color: #008ec4;">"2011-10-16"</code> und <code style="color: #008ec4;">"61.6"</code>), was die Typkonvertierung bestätigt.`
)}

function _9(md){return(
md`Hier ist ein expliziterer Weg, die CSV-Datei abzurufen, zu analysieren und zu typisieren. Ihr könnt diesen Ansatz wählen, wenn eure Daten nicht mit d3.autoType kompatibel sind. (Wenn ihr unsicher seid, verlasst euch nicht auf die automatische Typinferenz oder [konsultiert die Dokumentation](https://d3js.org/d3-dsv#autoType)).`
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


function _11(md){return(
md`Da die Daten nun bequem dargestellt sind, können wir uns nun an die Arbeit machen! Zum Beispiel können wir die Ausmaße der Daten und Temperaturen berechnen, um ein Gefühl für den Umfang zu bekommen.`
)}

function _12(d3,data){return(
d3.extent(data, d => d.date)
)}

function _13(d3,data){return(
d3.extent(data, d => d.temperature)
)}

function _14(md){return(
md`Und wie wir bereits gesehen haben, können wir in das Beispielhistogramm einfügen, um einen schnellen Eindruck von der Temperaturverteilung zu erhalten.`
)}

function _16(Histogram,data,width,height){return(
Histogram(data, {value: d => d.temperature, width, height})
)}

function _17(md){return(
md`Mit den so vorbereiteten Daten können wir uns nun den Grafiken zuwenden!

<a title="Learn D3: Scales" style="display: inline-flex; align-items: center; font: 600 14px var(--sans-serif);" href="/Notebooks/de4/index.html">Weiter<svg width="8" height="16" fill="none" stroke-width="1.8" style="margin-left: 0.25em; padding-top: 0.25em;"><path d="M2.75 11.25L5.25 8.25L2.75 5.25" stroke="currentColor"></path></svg></a>`
)}

function _18(md){return(
md`---

## Anhang`
)}

function _height(){return(
200
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["temperature.csv", {url: new URL("./files/a21ff7fb292405b03c061ed727536b823b3ba126070da1758fad67d525da60141f177c62a76a6df451a3dd19ddf0f54256abfc457d54d19b46a1a81aaacf884b.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["FileAttachment"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(_5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["FileAttachment"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("data")).define("data", ["FileAttachment","d3"], _data);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["d3","data"], _12);
  main.variable(observer()).define(["d3","data"], _13);
  main.variable(observer()).define(["md"], _14);
  const child1 = runtime.module(define1);
  main.import("Histogram", child1);
  main.variable(observer()).define(["Histogram","data","width","height"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("height")).define("height", _height);
  const child2 = runtime.module(define2);
  main.import("keyStyled", child2);
  return main;
}
