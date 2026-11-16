/**
 * Interacción del menú HUD.
 * Navegación con mouse, teclado y control de consola (ver gamepad.ts),
 * guías de botones y cajas de proyectos que se voltean.
 */
import "./gamepad";
import type { PadButton } from "./gamepad";
import { site } from "../data/portfolio";

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
  const prompts = Array.from(document.querySelectorAll<HTMLElement>("[data-prompt]"));
  const padStatusText = document.querySelector<HTMLElement>("[data-pad-status-text]");
  const toast = document.querySelector<HTMLElement>("[data-toast]");
  const gameBoxes = Array.from(app.querySelectorAll<HTMLElement>("[data-game-box]"));
  let activeBox: HTMLElement | null = null;
  let toastTimer = 0;

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

  function showToast(message: string) {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.hidden = true;
    }, 2400);
  }

  /** Muestra solo las guías de botones de la vista actual. */
  function updatePrompts(view: string) {
    prompts.forEach((prompt) => {
      const views = (prompt.dataset.views ?? "").split(" ");
      prompt.hidden = !views.includes(view);
    });
  }

  // --- Cajas de proyectos: voltear portada / contraportada ---
  function flipBox(box: HTMLElement, open: boolean, moveFocus = true) {
    const front = box.querySelector<HTMLElement>(".game-front");
    const back = box.querySelector<HTMLElement>(".game-back");
    if (!front || !back) return;

    box.dataset.flipped = String(open);
    front.setAttribute("aria-expanded", String(open));
    front.inert = open;
    back.inert = !open;
    activeBox = box;

    if (!moveFocus) return;
    if (open) {
      back.querySelector<HTMLElement>("[data-back-focus]")?.focus({ preventScroll: true });
    } else {
      front.focus({ preventScroll: true });
    }
  }

  function openRepo(box: HTMLElement | null) {
    if (!box) {
      showToast("Primero selecciona una caja.");
      return;
    }
    const repo = box.dataset.repo ?? "";
    if (!repo) {
      showToast(`${box.dataset.name} no tiene código público.`);
      return;
    }
    const opened = window.open(repo, "_blank", "noopener,noreferrer");
    if (!opened) showToast("Tu navegador bloqueó la pestaña. Usa el botón CÓDIGO.");
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      showToast(`Correo copiado: ${site.email}`);
    } catch {
      showToast(`Mi correo: ${site.email}`);
    }
  }

  gameBoxes.forEach((box) => {
    box.querySelector('[data-flip="open"]')?.addEventListener("click", () => flipBox(box, true));
    box.querySelector('[data-flip="close"]')?.addEventListener("click", () => flipBox(box, false));
    box.addEventListener("focusin", () => {
      activeBox = box;
    });
    box.addEventListener("mouseenter", () => {
      activeBox = box;
    });
  });

  document.querySelectorAll<HTMLElement>("[data-copy-email]").forEach((button) => {
    button.addEventListener("click", () => void copyEmail());
  });

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
    updatePrompts(id);

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
    gameBoxes.forEach((box) => flipBox(box, false, false));
    updatePrompts("menu");

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
      if (event.key === "Escape") handleAction("circle");
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

  // --- Acciones de los botones △ ○ □ (control, teclado o clic en la barra) ---
  function handleAction(action: "circle" | "triangle" | "square") {
    if (action === "square") {
      void copyEmail();
      return;
    }
    if (!currentView) return;

    if (action === "triangle") {
      if (currentView === "proyectos") openRepo(activeBox);
      return;
    }

    // ○: primero voltea la caja abierta; si no hay, regresa al menú.
    const flipped = gameBoxes.find((box) => box.dataset.flipped === "true");
    if (flipped) flipBox(flipped, false);
    else closeSection();
  }

  document.querySelectorAll<HTMLElement>("[data-pad-action]").forEach((button) => {
    button.addEventListener("click", () => {
      handleAction(button.dataset.padAction as "circle" | "triangle" | "square");
    });
  });

  // --- Control de consola ---
  function focusables(container: HTMLElement) {
    return Array.from(
      container.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
    ).filter((element) => !element.closest("[inert]") && element.offsetParent !== null);
  }

  function moveFocus(step: number) {
    const view = views.find((element) => element.dataset.viewPanel === currentView);
    if (!view) return;
    const list = focusables(view);
    if (!list.length) return;
    const current = list.indexOf(document.activeElement as HTMLElement);
    const next = current === -1 ? 0 : Math.min(list.length - 1, Math.max(0, current + step));
    list[next].focus({ preventScroll: true });
    list[next].scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  document.addEventListener("pad", (event) => {
    const button = (event as CustomEvent<PadButton>).detail;

    if (!currentView) {
      if (button === "up" || button === "left") select(selected - 1, true);
      else if (button === "down" || button === "right") select(selected + 1, true);
      else if (button === "cross") {
        const id = items[selected]?.dataset.section;
        if (id) openSection(id);
      } else if (button === "square") handleAction("square");
      return;
    }

    switch (button) {
      case "up":
      case "left":
        moveFocus(-1);
        break;
      case "down":
      case "right":
        moveFocus(1);
        break;
      case "cross": {
        const active = document.activeElement as HTMLElement | null;
        const view = views.find((element) => element.dataset.viewPanel === currentView);
        if (active && view?.contains(active) && active.matches("a[href], button")) active.click();
        else moveFocus(1);
        break;
      }
      default:
        handleAction(button);
    }
  });

  document.addEventListener("pad-connection", (event) => {
    const connected = (event as CustomEvent<boolean>).detail;
    if (padStatusText) padStatusText.textContent = connected ? "CONTROL CONECTADO" : "CONECTA UN CONTROL";
    showToast(connected ? "Control conectado. Usa la cruceta y ✕." : "Control desconectado.");
  });

  if (document.documentElement.dataset.gamepad === "on" && padStatusText) {
    padStatusText.textContent = "CONTROL CONECTADO";
  }

  // --- Estado inicial: respeta un enlace directo con #seccion ---
  select(selected);
  updatePrompts("menu");
  const initial = sectionFromHash();
  if (initial) openSection(initial, { push: false, focus: false });
}
