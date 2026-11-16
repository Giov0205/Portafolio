# AGENT.md — Guía para agentes de IA

> Lee este archivo **antes** de modificar el proyecto. Después lee `MEMORY.md`
> para conocer el estado actual, decisiones y pendientes.

## 1. Qué es este proyecto

Portafolio personal de **Giovanni Medina**, desarrollador full stack. La
interfaz imita el menú de una consola / HUD futurista: fondo oscuro azulado,
acento cian, paneles con brackets, scanlines, navegación tipo menú de
videojuego y una barra inferior con guías de botones (✕ ○ □ △).

- Una sola página (`src/pages/index.astro`) con cuatro módulos internos.
- La sección **PROYECTOS** es una "tienda": cada proyecto es una caja de
  videojuego que se voltea para mostrar su contraportada.
- Salida estática, sin backend.
- Todo el contenido está centralizado en `src/data/portfolio.ts`.
- Todo el texto visible debe estar en **español**.
- Se puede navegar con mouse, teclado **y control de consola** (Gamepad API).

## 2. Reglas no negociables

1. **No agregar frameworks de cliente** (React, Vue, Svelte, etc.). El proyecto
   debe seguir siendo HTML + CSS + dos scripts pequeños de TypeScript.
2. **No duplicar datos.** Si un texto o enlace aparece en pantalla, debe venir de
   `src/data/portfolio.ts`.
3. **No romper la accesibilidad**: navegación completa por teclado, foco visible,
   `aria-current` en el menú, `aria-expanded` en las cajas de proyecto,
   `aria-live` para anuncios y toasts, encabezados semánticos, `inert` en la cara
   oculta de cada caja.
4. **Respetar `prefers-reduced-motion`**: cualquier animación nueva (incluido el
   volteo de cajas y el hover del estante) debe desactivarse en
   `src/styles/global.css`.
5. **No cambiar la identidad visual** (negro azulado + cian + plateado,
   Rajdhani/Teko, mayúsculas con tracking, brackets HUD) sin que el usuario lo
   pida.
6. **No afirmar que algo está desplegado** si no se ejecutó el despliegue. El
   proyecto se entrega listo para publicar, no publicado.
7. **No inventar datos personales.** Los comentarios del tipo
   `// Si lo publicas, pon aquí el enlace` marcan lo que falta confirmar.
8. **El control de consola es opcional**: si la Gamepad API no existe, la página
   debe seguir funcionando igual con mouse y teclado.

## 3. Stack y requisitos

| Elemento | Versión / nota |
| --- | --- |
| Astro | 7.4.x (requiere Node >= 22.23.4) |
| Tailwind CSS | 4.3.x, integrado con `@tailwindcss/vite` |
| TypeScript | 6.x (solo tipos; no hay runtime de framework) |
| JS de cliente | `src/scripts/main.ts` + `src/scripts/gamepad.ts` |
| Fuentes | Google Fonts: Rajdhani, Teko, JetBrains Mono |

No existe `tailwind.config.js`: el tema se define con `@theme` en
`src/styles/global.css` (Tailwind v4).

Astro emite el JS como **archivo aparte** (≈7 KB) porque `main.ts` importa
`gamepad.ts`. No es inline; no lo fuerces a inline sin motivo.

## 4. Comandos

```bash
npm install      # dependencias
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run preview  # sirve dist/
npm run check    # astro check (0 errores esperados)
```

## 5. Mapa de archivos

```
src/data/portfolio.ts        ← fuente única de contenido
src/pages/index.astro        ← composición de la página
src/layouts/Layout.astro     ← <head>, fuentes, metadatos, skip link
src/components/
  TacticalBackground.astro   ← foto + tintes + rejilla + ruido + scanlines + viñeta
  Header.astro               ← nombre con degradado + rol
  MainMenu.astro             ← 4 botones con data-* y roles ARIA
  PreviewPanel.astro         ← 4 paneles HUD, uno visible a la vez
  SectionShell.astro         ← marco de sección + botón REGRESAR
  AboutSection.astro         ← módulo 01 (perfil)
  ProjectsSection.astro      ← módulo 02 (estante de cajas de juego)
  SkillsSection.astro        ← módulo 03 (chips de stack + timeline)
  ContactSection.astro       ← módulo 04 (redes, correo, copiar correo)
  PadIcon.astro              ← símbolos ✕ ○ □ △ y cruceta en SVG
  ButtonPrompts.astro        ← barra inferior de guías de botones + toast
src/scripts/main.ts          ← selección, teclado, hash, foco, volteo, acciones
src/scripts/gamepad.ts       ← Gamepad API: emite eventos "pad" / "pad-connection"
src/styles/global.css        ← tema, HUD, tienda, barra de botones, animaciones
public/images/               ← fondo, perfil y portadas de proyectos
```

## 6. Contrato de datos (`src/data/portfolio.ts`)

- `site`: `name`, `role`, `callsign`, `city`, `email`, `backgroundImage`,
  `photo`, `status`, `systemVersion`.
- `menuSections`: `id` (`acerca | proyectos | habilidades | contacto`), `index`,
  `label`, `title`, `description`, `stats[2]`.
- `about`: `eyebrow`, `title`, `intro`, `paragraphs[]`, `school{label,name,place,period}`,
  `objectives[{label,text}]`.
- `projects[]`: `id`, `codename`, `name`, `status`, `description`, `tech[]`,
  `image`, `repo`, `demo` y los datos de la caja: `genre`, `players`, `year`,
  `color`.
  - `color` pinta la franja, el género, el foco y el estado de esa caja
    (se inyecta como `--box`).
  - Si `repo` o `demo` están vacíos, **ese botón no se renderiza** (ya no se
    muestra desactivado). Es intencional.
- `skillGroups[]`: `name`, `codename`, `skills[]` (solo texto, **sin nivel**).
- `experience[]`: `period`, `title`, `place`, `description`, `tag`.
- `socials[]`: `label`, `handle`, `href`, `icon`
  (`github | linkedin | mail | x | link`), `primary?`.
- `ui`: microcopy de la interfaz.

Los `id` de `menuSections` están acoplados a:
- `data-section` de cada botón del menú,
- `id="panel-<id>"` del panel de vista previa,
- `data-view-panel="<id>"` de cada sección,
- el hash de la URL (`#acerca`, etc.),
- `data-views` de las guías de `ButtonPrompts.astro`.

Si agregas o renombras una sección, actualiza esos cinco lugares.

## 7. Sistema de diseño

Definido en `src/styles/global.css`:

- Colores: `void` `#04080d`, `carbon` `#08101a`, `panel` `#0b141f`,
  `line` `#1c2a38`, `blood` `#0b3a4a`, `accent` `#22d3ee`,
  `accent-soft` `#67e8f9`, `ash` `#98a1b0`, `silver` `#d7dde6`.
- Tipografías: `font-display` (Rajdhani), `font-title` (Teko),
  `font-mono` (JetBrains Mono).
- Clases clave:
  - Fondo: `.fx`, `.fx-photo`, `.fx-tint`, `.fx-grid`, `.fx-noise`,
    `.fx-scanlines`, `.fx-vignette`
  - Atmósfera: `.fx-aurora`, `.fx-aurora-blob`, `.fx-aurora-a`,
    `.fx-aurora-b`, `.fx-fog`, `.fx-pulse`, `.fx-dust` (aurora cian, neblina,
    pulso de telemetría y polvo en suspensión)
  - HUD: `.hud`, `.hud-corner-sm`, `.hud-label`, `.hud-label-accent`,
    `.hud-divider`, `.note-line`
  - Tipografía: `.name-gradient`, `.role-line`, `.eyebrow`, `.section-title`
  - Menú: `.menu-item`, `.menu-arrow`, `.menu-index`, `.menu-enter`
  - Botones: `.btn-hud`, `.btn-accent`
  - Contenido: `.chip`, `.timeline`, `.timeline-item`, `.social-row`
  - Estado: `.status-dot` (parpadeante), `.status-dot-green` (fijo)
  - **Tienda de proyectos**: `.shelf`, `.game-slot`, `.game-box`,
    `.game-face`, `.game-front`, `.game-back`, `.game-band`, `.game-cover`,
    `.game-info`, `.game-hint`, `.game-back-body`, `.game-back-actions`
  - **Guías de control**: `.pad-icon`, `.pad-inline`, `.pad-cross`,
    `.pad-circle`, `.pad-triangle`, `.pad-square`, `.pad-dpad`, `.pad-bar`,
    `.pad-bar-inner`, `.pad-status`, `.pad-prompts`, `.pad-prompt`,
    `.pad-prompt-button`, `.pad-toast`
- Esquinas de los paneles: variable `--hud-corner`.
- Color de cada caja: variable local `--box` (viene de `project.color`).

> `.mission-card`, `.skill-bar` y `.skill-fill` quedaron en el CSS de la
> versión anterior y **ya no se usan**. Se pueden eliminar cuando se confirme
> que nada los referencia.

## 8. Contrato de interacción

`src/scripts/main.ts` debe conservar:

- Selección del menú por hover y por foco (una sola opción con
  `aria-current="true"` y `tabindex="0"`; el resto `-1`).
- Flechas ↑/↓/←/→, `Home`, `End` funcionan incluso sin hacer clic.
- `Enter` abre la opción seleccionada; `Espacio` también cuando el foco está en
  el botón.
- Hash routing con `history.pushState` y soporte de `popstate`.
- Al abrir una sección: foco al `h2` (`data-view-title`), scroll arriba,
  `document.title` actualizado y anuncio en `[data-announcer]`.
- Al cerrar: foco de vuelta en la opción del menú y todas las cajas cerradas.

Cajas de proyecto:

- `data-game-box` con `data-flipped="false|true"`, `data-repo` y `data-name`.
- La portada es un `<button data-flip="open">` con `aria-expanded` y
  `aria-controls`; la contraportada es un `<div id="contra-<id>" inert>`.
- Al abrir: `inert` en la portada, foco al primer elemento `[data-back-focus]`.
- Al cerrar: `inert` en la contraportada, foco de vuelta a la portada.

Barra de guías (`ButtonPrompts.astro`):

- Cada `[data-prompt]` declara `data-views="menu proyectos …"`; `main.ts` oculta
  las que no corresponden a `[data-app][data-view]`.
- Las guías con `data-pad-action` (`circle`, `triangle`, `square`) son botones
  clicables y ejecutan la misma acción que el control.

Control de consola (`src/scripts/gamepad.ts`):

- Mapeo estándar: `0` ✕, `1` ○, `2` □, `3` △, `12–15` cruceta; palanca
  izquierda con zona muerta `0.55` y repetición al mantener.
- Emite `document` → `CustomEvent("pad", { detail })` y
  `CustomEvent("pad-connection", { detail: boolean })`.
- Mientras hay control: `document.documentElement.dataset.gamepad = "on"`
  (muestra la barra y el estado "CONTROL CONECTADO").

Acciones globales:

- **✕ / Enter**: abrir menú, voltear caja o activar el elemento enfocado.
- **△**: en PROYECTOS abre el repositorio de la caja activa.
- **□**: copia `site.email` al portapapeles (con fallback a toast).
- **○ / Escape**: cierra la caja abierta; si no hay, vuelve al menú.
- Los avisos usan `[data-toast]` (2400 ms).

## 9. Recetas

### Agregar un proyecto
Añade un objeto a `projects` con `id` único, imagen en `public/images/`, los
datos de caja (`genre`, `players`, `year`, `color`) y los enlaces. No toques los
componentes.

### Cambiar una sección del menú
Edita `menuSections` y el componente de la sección correspondiente. Mantén el
`id` sincronizado como se explica en la sección 6, incluido `data-views` de
`ButtonPrompts.astro`.

### Cambiar el fondo
Solo cambia `site.backgroundImage`. La imagen se difumina y oscurece sola
(`.fx-photo` y `.fx-tint`). Si quieres el fondo más visible, sube `opacity` de
`.fx-photo` y baja el alfa de `.fx-tint`.

### Ajustar la atmósfera
Las capas atmosféricas viven en `TacticalBackground.astro` y se estilan en
`global.css`. Para subir o bajar su intensidad, cambia `opacity` en:

- `.fx-aurora` (manchas de luz cian) y `.fx-aurora-blob` (su brillo interno),
- `.fx-fog` (neblina que se desplaza),
- `.fx-pulse` (latido de telemetría),
- `.fx-dust` (polvo; se oculta en móvil).

No uses `filter: blur()` grande en capas a pantalla completa: la animación debe
ser solo `transform`/`opacity` para que sea barata en GPU.

### Cambiar el acento
Cambia `--color-accent` y `--color-accent-soft` en `@theme`. Revisa también las
referencias `rgba(34, 211, 238, …)` de `global.css` (sombras, tintes, toast,
hover) y los `color` de cada proyecto en `portfolio.ts`.

### Agregar una habilidad
Añade un string a `skills` del grupo correspondiente. Se muestra como chip; no
hay barras ni niveles.

### Agregar una guía de botón
Añade un objeto a `prompts` en `ButtonPrompts.astro` con `icon`, `label`,
`views` (separadas por espacio) y, si es accionable, `action`.

## 10. Verificación antes de terminar

1. `npm run check` → 0 errores, 0 warnings.
2. `npm run build` → compila y regenera `dist/`.
3. Revisar visualmente en 390 px, 768 px y 1440 px.
4. Probar solo con teclado: flechas, Enter, Escape, Tab, botón REGRESAR,
   voltear cajas con Enter.
5. Probar con mouse: hover del estante, clic en portada, botones CÓDIGO/DEMO,
   COPIAR CORREO.
6. Si hay control: conectarlo, presionar un botón y probar cruceta, ✕, ○, △, □
   (Chrome/Edge en escritorio).
7. Verificar que no haya scroll horizontal (`document.documentElement.scrollWidth
   === window.innerWidth`).
8. Confirmar que las animaciones se desactivan con "reducir movimiento".
9. Actualizar `MEMORY.md` con lo hecho y lo pendiente.

## 11. Trampas conocidas

- **`[hidden]`**: en `global.css` existe `[hidden] { display: none !important; }`
  porque utilidades como `flex` sobrescriben el atributo `hidden` del navegador.
  No la elimines.
- **Tailwind v4**: no hay `tailwind.config.js`. Los tokens se declaran en
  `@theme`.
- **Astro 7** exige Node >= 22.23.4. Si el build falla por versión, revisa Node.
- **Labels del menú**: no uses `textContent` del botón para obtener el nombre de
  la sección (incluye número, flecha y "ACCEDER"); usa `data-label`.
- **Imágenes**: deben estar en `public/images/` y las rutas deben empezar por
  `/images/`. Astro no procesa imágenes dentro de `public/`.
- **Enlaces vacíos**: los botones CÓDIGO/DEMO simplemente **no se renderizan**
  cuando la URL está vacía. No los conviertas en enlaces rotos ni en botones
  desactivados.
- **Cajas volteadas**: el contenido de la cara oculta lleva `inert`. Si añades
  enlaces dentro de una caja, no los hagas focusables fuera de su cara.
- **`window.open`**: el navegador puede bloquear la pestaña al abrir el repo con
  △; por eso existe el aviso que invita a usar el botón CÓDIGO.
- **Gamepad**: el navegador solo detecta el control después de presionar un
  botón; no hay soporte en Safari/iOS. La barra de guías también se muestra en
  pantallas ≥640 px con puntero (media query `hover: hover`), así que su
  presencia no implica que haya un control conectado.
- **Script separado**: el JS del cliente es un archivo aparte en `dist/`, no
  inline. No lo cambies sin motivo.
- **Clases heredadas**: `.mission-card`, `.skill-bar` y `.skill-fill` ya no se
  usan; no las tomes como referencia del diseño actual.
- **Atmósfera**: `.fx-aurora`, `.fx-fog`, `.fx-dust` y `.fx-pulse` usan
  `mix-blend-mode: screen` sobre `.fx`. Se animan solo con `transform`/`opacity`
  para no repintar a pantalla completa. `.fx-dust` se oculta en móvil y todas se
  congelan con `prefers-reduced-motion`. No les pongas `filter: blur()` grande.
- **Rutas absolutas del sistema**: el proyecto está en
  `C:\Users\elbry\Documents\PortafolioTactico`. Usa esa ruta al ejecutar
  comandos.
- **Git**: rama `main` con remoto `origin` →
  `https://github.com/Giov0205/Portafolio.git`. `main` sigue a `origin/main`;
  un `git push` publica los commits. No asumas que hay despliegue automático.
- **Peso del repo**: `public/images/` contiene dos archivos crudos sin usar
  (un PNG de ~1.4 MB y un JPEG de ~87 KB) además de los SVG viejos. No los
  dupliques ni los uses como fuente final.

## 12. Despliegue

- Vercel detecta Astro; build `npm run build`, salida `dist`.
- Netlify usa `netlify.toml` (build, publish y Node 22).
- Actualizar `site` en `astro.config.mjs` con el dominio real antes de publicar
  (afecta a metadatos y futuras URLs absolutas).
