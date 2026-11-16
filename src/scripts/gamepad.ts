/**
 * Soporte para control de consola (Gamepad API).
 *
 * Lee el control conectado y avisa al resto de la página con un evento
 * "pad" en document. Usa el mapeo estándar de los navegadores, que es el
 * que tienen los controles de PS5 y Xbox conectados por cable o Bluetooth:
 *   0 = ✕   1 = ○   2 = □   3 = △   12-15 = cruceta   palanca izquierda = mover
 *
 * Nota: el navegador solo "ve" el control después de que presionas un botón.
 */

export type PadButton =
  | "cross"
  | "circle"
  | "square"
  | "triangle"
  | "up"
  | "down"
  | "left"
  | "right";

const BUTTONS: Record<number, PadButton> = {
  0: "cross",
  1: "circle",
  2: "square",
  3: "triangle",
  12: "up",
  13: "down",
  14: "left",
  15: "right",
};

const DIRECTIONS = new Set<PadButton>(["up", "down", "left", "right"]);
const STICK_DEADZONE = 0.55;
const FIRST_REPEAT_MS = 380;
const REPEAT_MS = 140;

const wasPressed = new Map<PadButton, boolean>();
const nextRepeat = new Map<PadButton, number>();
let frame = 0;

function emit(button: PadButton) {
  document.dispatchEvent(new CustomEvent<PadButton>("pad", { detail: button }));
}

function firstPad(): Gamepad | null {
  const pads = navigator.getGamepads ? navigator.getGamepads() : [];
  for (const pad of pads) if (pad && pad.connected) return pad;
  return null;
}

function poll(time: number) {
  const pad = firstPad();
  if (!pad) {
    frame = 0;
    return;
  }

  const pressed = new Map<PadButton, boolean>();
  for (const [index, name] of Object.entries(BUTTONS)) {
    if (pad.buttons[Number(index)]?.pressed) pressed.set(name, true);
  }

  const x = pad.axes[0] ?? 0;
  const y = pad.axes[1] ?? 0;
  if (y < -STICK_DEADZONE) pressed.set("up", true);
  if (y > STICK_DEADZONE) pressed.set("down", true);
  if (x < -STICK_DEADZONE) pressed.set("left", true);
  if (x > STICK_DEADZONE) pressed.set("right", true);

  for (const name of Object.values(BUTTONS)) {
    const down = pressed.get(name) ?? false;
    const before = wasPressed.get(name) ?? false;

    if (down && !before) {
      emit(name);
      nextRepeat.set(name, time + FIRST_REPEAT_MS);
    } else if (down && before && DIRECTIONS.has(name)) {
      // Mantener presionada una dirección repite el movimiento, como en un menú de consola.
      if (time >= (nextRepeat.get(name) ?? Infinity)) {
        emit(name);
        nextRepeat.set(name, time + REPEAT_MS);
      }
    }
    wasPressed.set(name, down);
  }

  frame = requestAnimationFrame(poll);
}

function start() {
  if (!frame) frame = requestAnimationFrame(poll);
}

if ("getGamepads" in navigator) {
  window.addEventListener("gamepadconnected", () => {
    document.documentElement.dataset.gamepad = "on";
    document.dispatchEvent(new CustomEvent("pad-connection", { detail: true }));
    start();
  });

  window.addEventListener("gamepaddisconnected", () => {
    if (firstPad()) return;
    delete document.documentElement.dataset.gamepad;
    wasPressed.clear();
    document.dispatchEvent(new CustomEvent("pad-connection", { detail: false }));
  });

  // Si el control ya estaba conectado antes de cargar la página.
  if (firstPad()) {
    document.documentElement.dataset.gamepad = "on";
    start();
  }
}
