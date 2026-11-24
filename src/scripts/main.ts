/**
 * Interacciones del portafolio:
 * - Barra de navegación que se vuelve sólida al hacer scroll y menú móvil.
 * - Filtros de proyectos.
 * - Galería de fotos dentro de cada tarjeta de proyecto.
 * - Visor ampliado (lightbox) con teclado.
 * - Copiar correo y formulario que abre la app de correo (con validación
 *   campo por campo y errores anunciados).
 */

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T | null;
const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Navegación ---------- */
const nav = $("nav");
const menuBtn = $<HTMLButtonElement>("menuBtn");
const links = $("links");

if (nav) {
  const onScroll = () => nav.classList.toggle("solid", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

const closeMenu = () => {
  nav?.classList.remove("open");
  menuBtn?.setAttribute("aria-expanded", "false");
  menuBtn?.setAttribute("aria-label", "Abrir menú");
};

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    const open = !nav?.classList.contains("open");
    nav?.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });
}

links?.addEventListener("click", (e) => {
  if ((e.target as HTMLElement).closest("a")) closeMenu();
});

/* ---------- Toast ---------- */
const toast = $("toast");
let toastTimer = 0;
const say = (msg: string) => {
  if (!toast) return;
  toast.textContent = msg;
  toast.hidden = false;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => (toast.hidden = true), 2600);
};

/* ---------- Filtros de proyectos ---------- */
const filters = $("filters");
const grid = $("grid");

if (filters) filters.addEventListener("click", (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>("button");
  if (!btn || !grid) return;
  filters.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
  const f = btn.dataset.f;
  grid.querySelectorAll<HTMLElement>(".card").forEach((c) => {
    c.hidden = !(f === "todos" || c.dataset.cat === f);
  });
});

/* ---------- Galería dentro de cada tarjeta ---------- */
grid?.querySelectorAll<HTMLElement>(".gallery").forEach((g) => {
  const shots = g.querySelector<HTMLElement>(".shots");
  if (!shots) return;
  const counter = g.querySelector(".count .n");
  const dots = g.querySelectorAll(".dots i");
  const current = () => Math.round(shots.scrollLeft / Math.max(1, shots.clientWidth));
  const go = (i: number) => {
    const max = shots.children.length - 1;
    const next = i < 0 ? max : i > max ? 0 : i;
    shots.scrollTo({ left: next * shots.clientWidth, behavior: reduceMotion() ? "auto" : "smooth" });
  };

  g.querySelector(".g-prev")?.addEventListener("click", () => go(current() - 1));
  g.querySelector(".g-next")?.addEventListener("click", () => go(current() + 1));
  shots.addEventListener(
    "scroll",
    () => {
      const i = current();
      if (counter) counter.textContent = String(i + 1);
      dots.forEach((d, k) => d.classList.toggle("on", k === i));
    },
    { passive: true },
  );
  shots.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(current() - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); go(current() + 1); }
  });
});

/* ---------- Visor ampliado ---------- */
const lb = $("lb");
const lbImg = $<HTMLImageElement>("lbImg");
const lbTitle = $("lbTitle");
const lbCap = $("lbCap");
const lbPrev = $<HTMLButtonElement>("lbPrev");
const lbNext = $<HTMLButtonElement>("lbNext");
const lbClose = $<HTMLButtonElement>("lbClose");

let lbShots: HTMLButtonElement[] = [];
let lbIndex = 0;
let lbName = "";
let lbFrom: HTMLElement | null = null;

const lbShow = () => {
  const shot = lbShots[lbIndex];
  if (!shot || !lbImg || !lbTitle || !lbCap || !lbPrev || !lbNext) return;
  const many = lbShots.length > 1;
  lbImg.src = shot.dataset.src ?? "";
  lbImg.alt = shot.dataset.caption ?? lbName;
  lbTitle.textContent = many ? `${lbName} · ${lbIndex + 1} / ${lbShots.length}` : lbName;
  lbCap.textContent = shot.dataset.caption ?? "";
  lbPrev.hidden = !many;
  lbNext.hidden = !many;
};

const lbOpen = (shot: HTMLButtonElement) => {
  const gallery = shot.closest<HTMLElement>(".gallery");
  if (!gallery || !lb) return;
  lbShots = Array.from(gallery.querySelectorAll<HTMLButtonElement>(".shot"));
  lbIndex = Number(shot.dataset.i ?? 0);
  lbName = gallery.dataset.name ?? "";
  lbFrom = shot;
  lbShow();
  lb.hidden = false;
  document.body.classList.add("lock");
  lbClose?.focus();
};

const lbHide = () => {
  if (!lb) return;
  lb.hidden = true;
  document.body.classList.remove("lock");
  lbFrom?.focus();
};

const lbStep = (d: number) => {
  const len = lbShots.length;
  if (!len) return;
  lbIndex = (lbIndex + d + len) % len;
  lbShow();
};

grid?.addEventListener("click", (e) => {
  const shot = (e.target as HTMLElement).closest<HTMLButtonElement>(".shot");
  if (shot) lbOpen(shot);
});
lbClose?.addEventListener("click", lbHide);
lbPrev?.addEventListener("click", () => lbStep(-1));
lbNext?.addEventListener("click", () => lbStep(1));
lb?.addEventListener("click", (e) => {
  const t = e.target as HTMLElement;
  if (t === lb || t.classList.contains("lb-stage")) lbHide();
});

document.addEventListener("keydown", (e) => {
  if (!lb || lb.hidden) return;
  if (e.key === "Escape") lbHide();
  if (e.key === "ArrowLeft") lbStep(-1);
  if (e.key === "ArrowRight") lbStep(1);
  if (e.key === "Tab") {
    // Mantener el foco dentro del visor.
    const focusables = Array.from(lb.querySelectorAll<HTMLButtonElement>("button:not([hidden])"));
    const i = focusables.indexOf(document.activeElement as HTMLButtonElement);
    e.preventDefault();
    focusables[(i + (e.shiftKey ? -1 : 1) + focusables.length) % focusables.length]?.focus();
  }
});

/* ---------- Copiar correo ---------- */
const copyBtn = $<HTMLButtonElement>("copy");
if (copyBtn) copyBtn.addEventListener("click", async () => {
  const email = copyBtn.dataset.email ?? "";
  try {
    await navigator.clipboard.writeText(email);
    say("Correo copiado");
  } catch {
    say(`Mi correo: ${email}`);
  }
});

/* ---------- Formulario (abre la app de correo) ---------- */
const form = $<HTMLFormElement>("form");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldCheck = { input: HTMLInputElement | HTMLTextAreaElement; error: HTMLElement; valid: () => boolean };

const setInvalid = (f: FieldCheck, invalid: boolean) => {
  f.input.setAttribute("aria-invalid", String(invalid));
  f.error.hidden = !invalid;
};

if (form) {
  const note = $("formNote");
  const rules: { input: string; error: string; test: (v: string) => boolean }[] = [
    { input: "f-name", error: "e-name", test: (v) => v.length > 0 },
    { input: "f-mail", error: "e-mail", test: (v) => EMAIL_RE.test(v) },
    { input: "f-msg", error: "e-msg", test: (v) => v.length > 0 },
  ];
  const fields: FieldCheck[] = rules.flatMap((r) => {
    const input = $<HTMLInputElement | HTMLTextAreaElement>(r.input);
    const error = $(r.error);
    if (!input || !error) return [];
    return [{ input, error, valid: () => r.test(input.value.trim()) }];
  });

  // Al corregir un campo marcado, se quita el error en cuanto vuelve a ser válido.
  fields.forEach((f) =>
    f.input.addEventListener("input", () => {
      if (f.input.getAttribute("aria-invalid") === "true" && f.valid()) setInvalid(f, false);
    }),
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.dataset.email ?? "";
    const invalid = fields.filter((f) => !f.valid());
    fields.forEach((f) => setInvalid(f, invalid.includes(f)));

    if (invalid.length) {
      if (note) note.textContent = invalid.length === 1 ? "Revisa el campo marcado." : `Revisa los ${invalid.length} campos marcados.`;
      invalid[0].input.focus();
      return;
    }

    const [name, from, msg] = fields.map((f) => f.input.value.trim());
    const subject = encodeURIComponent(`Contacto desde el portafolio — ${name}`);
    const body = encodeURIComponent(`${msg}\n\n— ${name} (${from})`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    if (note) note.textContent = `Se abrió tu app de correo. Si no apareció, escríbeme a ${email}`;
  });
}
