# AGENT.md — Guía para agentes de IA

> Lee este archivo **antes** de modificar el proyecto. Después lee `MEMORY.md`
> para conocer el estado actual, decisiones y pendientes.

## 1. Qué es este proyecto

Portafolio personal de **Giovanni Medina**, desarrollador full stack. La
interfaz imita el menú principal de un videojuego táctico/militar: fondo oscuro,
acento rojo, paneles HUD, scanlines y navegación tipo consola.

- Una sola página (`src/pages/index.astro`) con cuatro vistas internas.
- Salida estática, sin backend.
- Todo el contenido está centralizado en `src/data/portfolio.ts`.
- Todo el texto visible debe estar en **español**.

## 2. Reglas no negociables

1. **No agregar frameworks de cliente** (React, Vue, Svelte, etc.). El proyecto
   debe seguir siendo HTML + CSS + un script pequeño de TypeScript.
2. **No duplicar datos.** Si un texto o enlace aparece en pantalla, debe venir de
   `src/data/portfolio.ts`.
3. **No romper la accesibilidad**: navegación completa por teclado, foco visible,
   `aria-current` en el menú, `aria-live` para anuncios, encabezados semánticos.
4. **Respetar `prefers-reduced-motion`**: cualquier animación nueva debe
   desactivarse en `src/styles/global.css`.
5. **No cambiar la identidad visual** (negro + rojo + plateado, Rajdhani/Teko,
   mayúsculas con tracking, brackets HUD) sin que el usuario lo pida.
6. **No afirmar que algo está desplegado** si no se ejecutó el despliegue. El
   proyecto se entrega listo para publicar, no publicado.
7. **No inventar datos personales.** Los marcados con `// ← CAMBIA ESTO` son
   placeholders hasta que el usuario los confirme.

## 3. Stack y requisitos

| Elemento | Versión / nota |
| --- | --- |
| Astro | 7.4.x (requiere Node >= 22.23.4) |
| Tailwind CSS | 4.3.x, integrado con `@tailwindcss/vite` |
| TypeScript | 6.x (solo tipos; no hay runtime de framework) |
| JS de cliente | `src/scripts/main.ts`, se inserta inline en el build |
| Fuentes | Google Fonts: Rajdhani, Teko, JetBrains Mono |

No existe `tailwind.config.js`: el tema se define con `@theme` en
`src/styles/global.css` (Tailwind v4).

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
  TacticalBackground.astro   ← foto difuminada + tintes + ruido + scanlines
  Header.astro               ← nombre con degradado + rol
  MainMenu.astro             ← 4 botones con data-* y roles ARIA
  PreviewPanel.astro         ← 4 paneles HUD, uno visible a la vez
  SectionShell.astro         ← marco de sección + botón REGRESAR
  AboutSection.astro         ← sección 01
  ProjectsSection.astro      ← sección 02 (tarjetas misión)
  SkillsSection.astro        ← sección 03 (barras + timeline)
  ContactSection.astro       ← sección 04 (redes + correo)
src/scripts/main.ts          ← selección, teclado, hash, foco, historial
src/styles/global.css        ← tema, HUD, animaciones, reduced motion
public/images/               ← fondo, perfil y miniaturas de proyectos
```

## 6. Contrato de datos (`src/data/portfolio.ts`)

- `site`: nombre, rol, callsign, ciudad, correo, `backgroundImage`, `photo`,
  `status`, `systemVersion`.
- `menuSections`: `id` (`acerca | proyectos | habilidades | contacto`), `index`,
  `label`, `title`, `description`, `stats[2]`.
- `about`: intro, párrafos, `school`, `objectives`.
- `projects[]`: `id`, `codename`, `name`, `status`, `description`, `tech[]`,
  `image`, `repo`, `demo`. Si `repo`/`demo` están vacíos, el botón se muestra
  desactivado (comportamiento intencional).
- `skillGroups[]`: `name`, `codename`, `skills[{ name, level }]`.
- `experience[]`: `period`, `title`, `place`, `description`, `tag`.
- `socials[]`: `label`, `handle`, `href`, `icon`, `primary?`.
- `ui`: microcopy de la interfaz.

Los `id` de `menuSections` están acoplados a:
- `data-section` de cada botón del menú,
- `id="panel-<id>"` del panel de vista previa,
- `data-view-panel="<id>"` de cada sección,
- el hash de la URL (`#acerca`, etc.).

Si agregas o renombras una sección, actualiza los cuatro lugares.

## 7. Sistema de diseño

Definido en `src/styles/global.css`:

- Colores: `void`, `carbon`, `panel`, `line`, `blood`, `accent`, `accent-soft`,
  `ash`, `silver`.
- Tipografías: `font-display` (Rajdhani), `font-title` (Teko),
  `font-mono` (JetBrains Mono).
- Clases clave:
  - `.fx`, `.fx-photo`, `.fx-tint`, `.fx-grid`, `.fx-noise`, `.fx-scanlines`
  - `.hud`, `.hud-corner-sm`, `.hud-label`, `.hud-label-accent`, `.hud-divider`
  - `.name-gradient`, `.role-line`, `.eyebrow`
  - `.menu-item`, `.menu-arrow`, `.menu-enter`
  - `.btn-hud`, `.btn-accent`
  - `.chip`, `.skill-bar`, `.skill-fill`, `.timeline`, `.timeline-item`
  - `.status-dot` (parpadeante), `.status-dot-green` (fijo, "en línea")
- Esquinas de los paneles: variable `--hud-corner`.

## 8. Contrato de interacción

`src/scripts/main.ts` debe conservar:

- Selección por hover y por foco (una sola opción con `aria-current="true"` y
  `tabindex="0"`; el resto `-1`).
- Flechas ↑/↓/←/→, `Home`, `End` funcionan incluso sin hacer clic.
- `Enter` abre la opción seleccionada; `Espacio` también cuando el foco está en
  el botón.
- `Escape` y el botón `< REGRESAR` vuelven al menú.
- Hash routing con `history.pushState` y soporte de `popstate`.
- Al abrir una sección: foco al `h2` (`data-view-title`), scroll arriba,
  `document.title` actualizado y anuncio en `[data-announcer]`.
- Al cerrar: foco de vuelta en la opción del menú.

## 9. Recetas

### Agregar un proyecto
Añade un objeto a `projects` con una imagen en `public/images/`. No toques los
componentes.

### Cambiar una sección del menú
Edita `menuSections` y el componente de la sección correspondiente. Mantén el
`id` sincronizado como se explica en la sección 6.

### Cambiar el fondo
Solo cambia `site.backgroundImage`. La imagen se difumina y oscurece sola.

### Cambiar el acento rojo
Cambia `--color-accent` y `--color-accent-soft` en `@theme`. Revisa también las
referencias `rgba(225, 29, 46, …)` que quedan en `global.css` (barras, sombras y
tintes) si quieres coherencia total.

### Agregar una habilidad
Edita `skillGroups`; el nivel es 0–100 y se refleja en la barra y en
`aria-valuenow`.

## 10. Verificación antes de terminar

1. `npm run check` → 0 errores, 0 warnings.
2. `npm run build` → compila y genera `dist/index.html`.
3. Revisar visualmente en 390 px, 768 px y 1440 px.
4. Probar solo con teclado: flechas, Enter, Escape, Tab, botón REGRESAR.
5. Verificar que no haya scroll horizontal (`document.documentElement.scrollWidth
   === window.innerWidth`).
6. Confirmar que las animaciones se desactivan con "reducir movimiento".
7. Actualizar `MEMORY.md` con lo hecho y lo pendiente.

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
- **Enlaces vacíos**: los botones CÓDIGO/DEMO se renderizan como `<span>` cuando
  la URL está vacía. Es intencional; no los conviertas en enlaces rotos.
- **Rutas absolutas del sistema**: el proyecto está en
  `C:\Users\elbry\Documents\PortafolioTactico`. Usa esa ruta al ejecutar
  comandos.
- **Git**: el proyecto está inicializado en la rama `main` con un commit inicial
  y **sin remoto**. No asumas que existe un repositorio en GitHub.

## 12. Despliegue

- Vercel detecta Astro; build `npm run build`, salida `dist`.
- Netlify usa `netlify.toml` (build, publish y Node 22).
- Actualizar `site` en `astro.config.mjs` con el dominio real antes de publicar
  (afecta a metadatos y futuras URLs absolutas).
