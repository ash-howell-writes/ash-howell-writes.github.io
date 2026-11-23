const TYPE_SPEED = 80;
const DELETE_SPEED = 40;
const PAUSE_AFTER_TYPE = 800;
const PAUSE_AFTER_DELETE = 400;

function typewritten(strings, className) {
  const name = className.replace(/^\./, "");
  const elements = document.getElementsByClassName(name);

  if (elements.length !== strings.length) {
    console.warn(
      `typewritten: found ${elements.length} element(s) with class "${name}" ` +
        `but received ${strings.length} string(s). Nothing was changed.`,
    );
    return false;
  }

  for (let i = 0; i < elements.length; i++) {
    elements[i].textContent = strings[i];
  }

  return true;
}

function typewriter(strings, target) {
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!el || !strings.length) return { stop() {} };

  const textNode = document.createTextNode("");
  const cursor = document.createElement("span");
  cursor.className = "typewriter-cursor";
  cursor.setAttribute("aria-hidden", "true");
  cursor.textContent = "|";
  el.textContent = "";
  el.append(textNode, cursor);

  let stringIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let timer = null;

  function tick() {
    const current = strings[stringIndex];
    let delay;

    if (!deleting) {
      charIndex++;
      textNode.data = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        delay = PAUSE_AFTER_TYPE;
      } else {
        delay = TYPE_SPEED;
      }
    } else {
      charIndex--;
      textNode.data = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        stringIndex = (stringIndex + 1) % strings.length;
        delay = PAUSE_AFTER_DELETE;
      } else {
        delay = DELETE_SPEED;
      }
    }

    timer = setTimeout(tick, delay);
  }

  tick();

  return {
    stop() {
      clearTimeout(timer);
      cursor.remove();
    },
  };
}

typewriter(
  [
    "a sci-fi & fantasy author.",
    "your friendly neighborhood spider.",
    "a weird little guy.",
    "actually three gerblins in a trenchcoat!",
  ],
  "#typing",
);
