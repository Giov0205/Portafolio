/**
 * Interacciones del portafolio:
 * - Barra de navegación que se vuelve sólida al hacer scroll y menú móvil.
 * - Filtros de proyectos.
 * - Galería de cada proyecto: foto grande con miniaturas.
 * - Ficha de detalles de cada proyecto (panel) con teclado.
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
const minor = $("minor");

// Las filas destacadas alternan el lado de la foto entre las que se ven.
const relayout = () => {
  let k = 0;
  grid?.querySelectorAll<HTMLElement>(".feat").forEach((f) => {
    if (f.hidden) return;
    f.classList.toggle("flip", k % 2 === 1);
    k++;
  });
  if (minor) minor.hidden = !minor.querySelector(".mini:not([hidden])");
};
relayout();

if (filters) filters.addEventListener("click", (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>("button");
  if (!btn || !grid) return;
  filters.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
  const f = btn.dataset.f;
  grid.querySelectorAll<HTMLElement>(".card").forEach((c) => {
    c.hidden = !(f === "todos" || c.dataset.cat === f);
  });
  relayout();
});

/* ---------- Galerías (foto grande + miniaturas) ---------- */
type Photo = { src: string; caption: string };
const photosOf = (g: HTMLElement): Photo[] => {
  try {
    return JSON.parse(g.dataset.photos ?? "[]") as Photo[];
  } catch {
    return [];
  }
};

const showPhoto = (g: HTMLElement, i: number) => {
  const photos = photosOf(g);
  const ph = photos[i];
  const main = g.querySelector<HTMLButtonElement>(".gal-main");
  const img = main?.querySelector("img");
  const cap = g.querySelector(".gal-cap");
  if (!ph || !main || !img) return;
  main.dataset.i = String(i);
  main.setAttribute("aria-label", `Ver en grande: ${ph.caption}`);
  if (cap) cap.textContent = ph.caption;
  g.querySelectorAll<HTMLButtonElement>(".gal-th").forEach((t) =>
    t.setAttribute("aria-pressed", String(Number(t.dataset.i) === i)),
  );
  const swap = () => {
    img.src = ph.src;
    img.alt = ph.caption;
  };
  if (reduceMotion()) return swap();
  // Cambio suave: se desvanece, cambia y vuelve a aparecer cuando cargó.
  img.classList.add("fading");
  window.setTimeout(() => {
    const show = () => img.classList.remove("fading");
    img.addEventListener("load", show, { once: true });
    img.addEventListener("error", show, { once: true });
    swap();
    if (img.complete) show();
    // Por si la foto tarda: nunca dejarla oculta más de un momento.
    window.setTimeout(show, 900);
  }, 140);
};

document.addEventListener("click", (e) => {
  const th = (e.target as HTMLElement).closest<HTMLButtonElement>(".gal-th");
  if (!th) return;
  const g = th.closest<HTMLElement>(".gal");
  if (g) showPhoto(g, Number(th.dataset.i ?? 0));
});

// Flechas del teclado entre miniaturas.
document.addEventListener("keydown", (e) => {
  const th = (e.target as HTMLElement).closest<HTMLButtonElement>(".gal-th");
  if (!th || (e.key !== "ArrowLeft" && e.key !== "ArrowRight")) return;
  const all = Array.from(th.closest(".gal-thumbs")?.querySelectorAll<HTMLButtonElement>(".gal-th") ?? []);
  const i = all.indexOf(th);
  const next = all[(i + (e.key === "ArrowRight" ? 1 : -1) + all.length) % all.length];
  e.preventDefault();
  next?.focus();
  next?.click();
});

/* ---------- Visor ampliado ---------- */
const lb = $("lb");
const lbImg = $<HTMLImageElement>("lbImg");
const lbTitle = $("lbTitle");
const lbCap = $("lbCap");
const lbPrev = $<HTMLButtonElement>("lbPrev");
const lbNext = $<HTMLButtonElement>("lbNext");
const lbClose = $<HTMLButtonElement>("lbClose");

let lbPhotos: Photo[] = [];
let lbIndex = 0;
let lbName = "";
let lbFrom: HTMLElement | null = null;
let openCase: HTMLElement | null = null;

const lbShow = () => {
  const ph = lbPhotos[lbIndex];
  if (!ph || !lbImg || !lbTitle || !lbCap || !lbPrev || !lbNext) return;
  const many = lbPhotos.length > 1;
  lbImg.src = ph.src;
  lbImg.alt = ph.caption || lbName;
  lbTitle.textContent = many ? `${lbName} · ${lbIndex + 1} / ${lbPhotos.length}` : lbName;
  lbCap.textContent = ph.caption;
  lbPrev.hidden = !many;
  lbNext.hidden = !many;
};

const lbOpen = (main: HTMLButtonElement) => {
  const g = main.closest<HTMLElement>(".gal");
  if (!g || !lb) return;
  lbPhotos = photosOf(g);
  lbIndex = Number(main.dataset.i ?? 0);
  lbName = g.dataset.name ?? "";
  lbFrom = main;
  lbShow();
  lb.hidden = false;
  document.body.classList.add("lock");
  lbClose?.focus();
};

const lbHide = () => {
  if (!lb) return;
  lb.hidden = true;
  if (!openCase) document.body.classList.remove("lock");
  lbFrom?.focus();
};

const lbStep = (d: number) => {
  const len = lbPhotos.length;
  if (!len) return;
  lbIndex = (lbIndex + d + len) % len;
  lbShow();
};

document.addEventListener("click", (e) => {
  const main = (e.target as HTMLElement).closest<HTMLButtonElement>(".gal-main");
  if (main) lbOpen(main);
});
lbClose?.addEventListener("click", lbHide);
lbPrev?.addEventListener("click", () => lbStep(-1));
lbNext?.addEventListener("click", () => lbStep(1));
lb?.addEventListener("click", (e) => {
  const t = e.target as HTMLElement;
  if (t === lb || t.classList.contains("lb-stage")) lbHide();
});

/* ---------- Ficha de detalles de cada proyecto ---------- */
let caseFrom: HTMLElement | null = null;

const caseOpen = (id: string, from: HTMLElement) => {
  const panel = $(`case-${id}`);
  if (!panel) return;
  openCase = panel;
  caseFrom = from;
  panel.hidden = false;
  const body = panel.querySelector<HTMLElement>(".case-body");
  if (body) body.scrollTop = 0;
  document.body.classList.add("lock");
  // Un cuadro después para que se vea la transición de entrada.
  requestAnimationFrame(() => panel.classList.add("open"));
  panel.querySelector<HTMLButtonElement>("[data-close]")?.focus();
};

const caseClose = () => {
  const panel = openCase;
  if (!panel) return;
  openCase = null;
  panel.classList.remove("open");
  panel.hidden = true;
  document.body.classList.remove("lock");
  caseFrom?.focus();
};

document.addEventListener("click", (e) => {
  const t = e.target as HTMLElement;
  const opener = t.closest<HTMLElement>("[data-case]");
  if (opener) return caseOpen(opener.dataset.case ?? "", opener);
  if (t.closest("[data-close]") || (openCase && t === openCase)) caseClose();
});

const trapFocus = (box: HTMLElement, e: KeyboardEvent) => {
  const focusables = Array.from(
    box.querySelectorAll<HTMLElement>("button:not([hidden]), a[href]"),
  ).filter((el) => el.offsetParent !== null);
  if (!focusables.length) return;
  const i = focusables.indexOf(document.activeElement as HTMLElement);
  e.preventDefault();
  focusables[(i + (e.shiftKey ? -1 : 1) + focusables.length) % focusables.length]?.focus();
};

document.addEventListener("keydown", (e) => {
  // El visor va encima de la ficha, así que atiende primero.
  if (lb && !lb.hidden) {
    if (e.key === "Escape") lbHide();
    if (e.key === "ArrowLeft") lbStep(-1);
    if (e.key === "ArrowRight") lbStep(1);
    if (e.key === "Tab") trapFocus(lb, e);
    return;
  }
  if (openCase) {
    if (e.key === "Escape") caseClose();
    if (e.key === "Tab") trapFocus(openCase, e);
  }
});

/* ---------- Demo de una app dentro de un celular ---------- */
document.addEventListener("click", (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-demo]");
  if (!btn) return;
  const demo = $(`demo-${btn.dataset.demo}`);
  const photos = btn.closest(".feat")?.querySelector<HTMLElement>(".feat-photos");
  if (!demo || !photos) return;
  const open = demo.hidden;
  if (open) {
    // La app solo se descarga la primera vez que alguien la abre.
    const frame = demo.querySelector<HTMLIFrameElement>("iframe");
    if (frame && !frame.src) frame.src = frame.dataset.src ?? "";
  }
  demo.hidden = !open;
  photos.hidden = open;
  btn.setAttribute("aria-expanded", String(open));
  btn.textContent = open ? "Ver fotos" : "Probar la app";
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
