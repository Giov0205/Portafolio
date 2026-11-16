/**
 * Interacción del menú táctico.
 * Mantener este archivo pequeño: solo navegación, teclado y foco.
 */

const app = document.querySelector<HTMLElement>("[data-app]");

if (app) {
  const menuScreen = app.querySelector<HTMLElement>("[data-menu-screen]");
  const items = Array.from(
    app.querySelectorAll<HTMLButtonElement>("[data-menu-item]"),
  );
  const panels = Array.from(app.querySelectorAll<HTMLElement>("[data-preview]"));
  const views = Array.from(app.querySelectorAll<HTMLElement>("[data-view-panel]"));
  const backButtons = Array.from(app.querySelectorAll<HTMLButtonElement>("[data-back]"));
  const announcer = app.querySelector<HTMLElement>("[data-announcer]");

  const baseTitle = document.title;

  let selected = Math.max(
    0,
    items.findIndex((item) => item.getAttribute("aria-current") === "true"),
  );
  let currentView: string | null = null;

  function announce(message: string) {
    if (!announcer) return;
    announcer.textContent = "";
    window.setTimeout(() => {
      announcer.textContent = message;
    }, 80);
  }

  function select(index: number, moveFocus = false) {
    const total = items.length;
    if (!total) return;
    selected = (index + total) % total;

    items.forEach((item, i) => {
      item.setAttribute("aria-current", i === selected ? "true" : "false");
      item.tabIndex = i === selected ? 0 : -1;
    });

    panels.forEach((panel, i) => {
      panel.hidden = i !== selected;
    });

    if (moveFocus) items[selected]?.focus({ preventScroll: true });
  }

  function sectionLabel(id: string) {
    return items.find((item) => item.dataset.section === id)?.dataset.label ?? id;
  }

  function openSection(
    id: string,
    options: { push?: boolean; focus?: boolean } = {},
  ) {
    const view = views.find((element) => element.dataset.viewPanel === id);
    if (!view) return;

    currentView = id;
    if (menuScreen) menuScreen.hidden = true;
    views.forEach((element) => {
      element.hidden = element !== view;
    });
    app!.dataset.view = id;

    view.classList.remove("view-in");
    void view.offsetWidth;
    view.classList.add("view-in");

    if (options.push !== false) {
      history.pushState({ section: id }, "", `#${id}`);
    }

    window.scrollTo(0, 0);
    document.title = `${sectionLabel(id)} — Portafolio`;

    if (options.focus !== false) {
      const heading = view.querySelector<HTMLElement>("[data-view-title]");
      heading?.focus({ preventScroll: true });
    }

    announce(`Sección abierta: ${sectionLabel(id)}.`);
  }

  function closeSection(
    options: { push?: boolean; focus?: boolean } = {},
  ) {
    currentView = null;
    views.forEach((view) => {
      view.hidden = true;
    });
    if (menuScreen) menuScreen.hidden = false;
    app!.dataset.view = "menu";

    if (options.push !== false) {
      history.pushState({}, "", location.pathname + location.search);
    }

    window.scrollTo(0, 0);
    document.title = baseTitle;

    if (options.focus !== false) {
      items[selected]?.focus({ preventScroll: true });
    }

    announce("Menú principal.");
  }

  function sectionFromHash() {
    const id = decodeURIComponent(location.hash.replace(/^#/, ""));
    return views.some((view) => view.dataset.viewPanel === id) ? id : null;
  }

  // --- Selección con mouse y foco ---
  items.forEach((item, index) => {
    item.addEventListener("mouseenter", () => select(index));
    item.addEventListener("focus", () => select(index));
    item.addEventListener("click", () => {
      select(index);
      const id = item.dataset.section;
      if (id) openSection(id);
    });

    // --- Teclado tipo videojuego ---
    item.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowDown":
        case "ArrowRight":
          event.preventDefault();
          select(selected + 1, true);
          break;
        case "ArrowUp":
        case "ArrowLeft":
          event.preventDefault();
          select(selected - 1, true);
          break;
        case "Home":
          event.preventDefault();
          select(0, true);
          break;
        case "End":
          event.preventDefault();
          select(items.length - 1, true);
          break;
        case "Enter":
        case " ": {
          event.preventDefault();
          const id = items[selected]?.dataset.section;
          if (id) openSection(id);
          break;
        }
        default:
          break;
      }
    });
  });

  // --- Botones "REGRESAR" ---
  backButtons.forEach((button) => {
    button.addEventListener("click", () => closeSection());
  });

  // --- Escape vuelve al menú y flechas funcionan sin hacer clic ---
  document.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) return;

    if (currentView) {
      if (event.key === "Escape") closeSection();
      return;
    }

    const target = event.target as HTMLElement | null;
    const tag = target?.tagName ?? "";
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        select(selected + 1, true);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        select(selected - 1, true);
        break;
      case "Home":
        event.preventDefault();
        select(0, true);
        break;
      case "End":
        event.preventDefault();
        select(items.length - 1, true);
        break;
      case "Enter": {
        // Solo cuando el foco está en la página, no en un enlace o botón.
        const active = document.activeElement;
        const isPage =
          active === document.body || active === document.documentElement;
        if (!isPage) return;
        event.preventDefault();
        const id = items[selected]?.dataset.section;
        if (id) openSection(id);
        break;
      }
      default:
        break;
    }
  });

  // --- Navegación con hash (atrás/adelante del navegador) ---
  window.addEventListener("popstate", () => {
    const id = sectionFromHash();
    if (id) {
      openSection(id, { push: false, focus: false });
    } else if (currentView) {
      closeSection({ push: false, focus: false });
    }
  });

  // --- Estado inicial: respeta un enlace directo con #seccion ---
  select(selected);
  const initial = sectionFromHash();
  if (initial) openSection(initial, { push: false, focus: false });
}
