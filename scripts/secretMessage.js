const fillSheets = new Map();

function secretMessages(strings, className) {
  const name = className.replace(/^\./, "");
  const cssString = (s) =>
    '"' +
    String(s)
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\n/g, "\\A ") +
    '"';
  const elements = document.getElementsByClassName(name);

  if (elements.length !== strings.length) {
    console.warn(
      `secretMessage: found ${elements.length} element(s) with class "${name}" ` +
        `but received ${strings.length} string(s). Nothing was changed.`,
    );
    return false;
  }

  const attr = `data-fill-${name}`;

  let rules = "";
  for (let i = 0; i < elements.length; i++) {
    elements[i].setAttribute(attr, i);
    rules += `.${CSS.escape(name)}[${attr}="${i}"]::after { content: ${cssString(strings[i])}; }\n`;
  }

  let sheet = fillSheets.get(name);
  if (!sheet) {
    sheet = new CSSStyleSheet();
    fillSheets.set(name, sheet);
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
  }
  sheet.replaceSync(rules);

  return true;
}

secretMessages(
  [
    "Lock up your libraries if you like; but there is no gate, no lock, no bolt that you can set upon the freedom of my mind.",
    "Writing is perhaps the greatest of human inventions, binding together people who never knew each other, citizens of distant epochs. Books break the shackles of time. A book is proof that humans are capable of working magic.",
    "We live in capitalism. Its power seems inescapable. So did the divine right of kings. Any human power can be resisted and changed by human beings. Resistance and change often begin in art, and very often in our art, the art of words.",
  ],
  "liminal",
);
