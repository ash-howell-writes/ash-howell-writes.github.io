const fillSheets = new Map()

function secretMessages(strings, className) {
  const name = className.replace(/^\./, "")
  const cssString = (s) =>
    '"' +
    String(s)
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\n/g, "\\A ") +
    '"'
  const elements = document.getElementsByClassName(name)

  if (elements.length !== strings.length) {
    console.warn(
      `secretMessage: found ${elements.length} element(s) with class "${name}" ` +
        `but received ${strings.length} string(s). Nothing was changed.`,
    )
    return false
  }

  const attr = `data-fill-${name}`

  let rules = ""
  for (let i = 0; i < elements.length; i++) {
    elements[i].setAttribute(attr, i)
    rules += `.${CSS.escape(name)}[${attr}="${i}"]::after { content: ${cssString(strings[i])}; }\n`
  }

  let sheet = fillSheets.get(name)
  if (!sheet) {
    sheet = new CSSStyleSheet()
    fillSheets.set(name, sheet)
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet]
  }
  sheet.replaceSync(rules)

  return true
}
