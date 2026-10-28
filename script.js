document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  if (!app) {
    return;
  }

  let count = Number.parseInt(localStorage.getItem("counterValue"), 10) || 0;

  // Funzione helper DRY per la creazione dei pulsanti
  function createButton(text, className, ariaLabel) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.classList.add(...className.split(" "));
    btn.textContent = text;
    if (ariaLabel) {
      btn.setAttribute("aria-label", ariaLabel);
    }
    return btn;
  }

  const container = document.createElement("div");
  container.classList.add("counter-container");

  const title = document.createElement("h1");
  title.classList.add("counter-title");
  title.textContent = "Contatore";

  const display = document.createElement("div");
  display.classList.add("counter-value");
  display.setAttribute("aria-live", "polite"); // Spostato qui per gli screen reader
  display.textContent = count;

  const controls = document.createElement("div");
  controls.classList.add("controls");

  const mainButtons = document.createElement("div");
  mainButtons.classList.add("buttons-group");

  const quickButtons = document.createElement("div");
  quickButtons.classList.add("buttons-group", "buttons-group-secondary");

  // Utilizzo della funzione helper createButton (principio DRY)
  const btnDecrement = createButton("−", "btn btn-decrement", "Decrementa di 1");
  const btnIncrement = createButton("+", "btn btn-increment", "Incrementa di 1");
  const btnStepDown = createButton("−10", "btn btn-step", "Decrementa di 10");
  const btnStepUp = createButton("+10", "btn btn-step", "Incrementa di 10");
  const btnReset = createButton("Azzera", "btn-reset");

  const hint = document.createElement("p");
  hint.classList.add("keyboard-hint");
  hint.textContent = "Scorciatoie: + / − / R";

  mainButtons.appendChild(btnDecrement);
  mainButtons.appendChild(btnIncrement);

  quickButtons.appendChild(btnStepDown);
  quickButtons.appendChild(btnStepUp);

  controls.appendChild(mainButtons);
  controls.appendChild(quickButtons);

  container.appendChild(title);
  container.appendChild(display);
  container.appendChild(controls);
  container.appendChild(btnReset);
  container.appendChild(hint);

  app.appendChild(container);

  function updateUI() {
    display.textContent = count;

    display.classList.remove("positive", "negative", "neutral");
    if (count > 0) {
      display.classList.add("positive");
    } else if (count < 0) {
      display.classList.add("negative");
    } else {
      display.classList.add("neutral");
    }

    display.classList.add("pulse");
    window.setTimeout(() => display.classList.remove("pulse"), 180);

    localStorage.setItem("counterValue", String(count));
  }

  // Funzione unica DRY per incrementi e decrementi
  function changeBy(delta) {
    count += delta;
    updateUI();
  }

  function reset() {
    count = 0;
    updateUI();
  }

  btnIncrement.addEventListener("click", () => changeBy(1));
  btnDecrement.addEventListener("click", () => changeBy(-1));
  btnStepUp.addEventListener("click", () => changeBy(10));
  btnStepDown.addEventListener("click", () => changeBy(-10));
  btnReset.addEventListener("click", reset);

  document.addEventListener("keydown", (event) => {
    // Ignora i tasti premuti insieme a modificatori (es. Cmd+R / Ctrl+R)
    if (event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }

    if (event.key === "+" || event.key === "ArrowUp") {
      event.preventDefault(); // Evita lo scroll della pagina
      changeBy(1);
    } else if (event.key === "-" || event.key === "ArrowDown") {
      event.preventDefault(); // Evita lo scroll della pagina
      changeBy(-1);
    } else if (event.key === "PageUp") {
      event.preventDefault(); // Evita lo scroll della pagina
      changeBy(10);
    } else if (event.key === "PageDown") {
      event.preventDefault(); // Evita lo scroll della pagina
      changeBy(-10);
    } else if (event.key.toLowerCase() === "r") {
      reset();
    }
  });

  updateUI();
});