function _1(md){return(
md`# Keys

A reusable notebook for displaying platform-appropriate keyboard shortcuts.`
)}

function _2(keyWords){return(
keyWords("Alt-Enter")
)}

function _3(keySymbols){return(
keySymbols("Alt-Enter")
)}

function _4(keys){return(
keys("Alt-Enter")
)}

function _5(buttons){return(
buttons("Alt-Enter")
)}

function _mac(){return(
/Mac|iPhone/.test(navigator.platform)
)}

function _7(){return(
navigator.platform
)}

function _symbols(mac){return(
mac ? {
  Alt: "⌥",
  Tab: "⇥",
  Up: "↑",
  Down: "↓",
  Left: "←",
  Right: "→",
  Mod: "⌘",
  Cmd: "⌘",
  Ctrl: "⌃",
  Shift: "⇧",
  Enter: "↩︎",
  Backspace: "⌫",
  Escape: "⎋"
} : {
  Mod: "Ctrl"
}
)}

function _words(mac){return(
mac ? {
  Alt: "Option",
  Backspace: "Delete",
  Mod: "Command",
  Cmd: "Command",
  Ctrl: "Control",
  Enter: "Return",
  Escape: "Esc",
  "/": "Slash",
  "?": "Question mark"
} : {
  Mod: "Ctrl"
}
)}

function _shortwords(mac){return(
mac ? {
  Alt: "⌥opt",
  Tab: "⇥tab",
  Up: "↑",
  Down: "↓",
  Left: "←",
  Right: "→",
  Mod: "⌘cmd",
  Cmd: "⌘cmd",
  Ctrl: "⌃ctrl",
  Shift: "⇧shift",
  Enter: "↩︎return",
  Backspace: "⌫delete",
  Escape: "⎋esc"
} : {
  Up: "↑",
  Down: "↓",
  Left: "←",
  Right: "→",
  Mod: "Ctrl"
}
)}

function _order(){return(
{
  Ctrl: -4,
  Alt: -3,
  Shift: -2,
  Mod: -1,
  Cmd: -1
}
)}

function _remap(order){return(
function remap(keyset, map) {
  const keys = keyset.split("-");
  return keys
      .slice()
      .sort((a, b) => (order[a] || keys.indexOf(a)) - (order[b] || keys.indexOf(b)))
      .map(key => map && map[key] || key);
}
)}

function _keyWords(remap,words){return(
function keyWords(keyset) {
  return remap(keyset, words).join("-");
}
)}

function _keySymbols(remap,symbols){return(
function keySymbols(keyset) {
  return remap(keyset, symbols).join("");
}
)}

function _keys(keyWords,symbols,keySymbols){return(
function keys(keyset) {
  return keyWords(keyset) + (symbols ? ` ${keySymbols(keyset)}` : "");
}
)}

function _keyStyled(htl,keys){return(
function keyStyled(keyset) {
  return htl.html`<span style="font-family: var(--sans-serif); font-size: 90%;">${keys(keyset)}</span>`;
}
)}

function _buttons(htl,remap,shortwords){return(
function buttons(keyset) {
  return htl.html`${remap(keyset, shortwords).map(key => htl.html`<span style="font: 500 12px/1.25 var(--sans-serif); margin: 0 4px; padding: 0 4px; border-radius: 0.25rem; box-shadow: 0 0 0 1px #dedede, 1px 1px 0 1px #e8e8e8; display: inline-block;">${key.toLowerCase()}`)}</span>`;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["keyWords"], _2);
  main.variable(observer()).define(["keySymbols"], _3);
  main.variable(observer()).define(["keys"], _4);
  main.variable(observer()).define(["buttons"], _5);
  main.variable(observer("mac")).define("mac", _mac);
  main.variable(observer()).define(_7);
  main.variable(observer("symbols")).define("symbols", ["mac"], _symbols);
  main.variable(observer("words")).define("words", ["mac"], _words);
  main.variable(observer("shortwords")).define("shortwords", ["mac"], _shortwords);
  main.variable(observer("order")).define("order", _order);
  main.variable(observer("remap")).define("remap", ["order"], _remap);
  main.variable(observer("keyWords")).define("keyWords", ["remap","words"], _keyWords);
  main.variable(observer("keySymbols")).define("keySymbols", ["remap","symbols"], _keySymbols);
  main.variable(observer("keys")).define("keys", ["keyWords","symbols","keySymbols"], _keys);
  main.variable(observer("keyStyled")).define("keyStyled", ["htl","keys"], _keyStyled);
  main.variable(observer("buttons")).define("buttons", ["htl","remap","shortwords"], _buttons);
  return main;
}
