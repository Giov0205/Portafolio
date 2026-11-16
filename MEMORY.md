# MEMORY.md — Contexto persistente del proyecto

> **Léeme primero al retomar el proyecto.** Aquí está el estado real, las
> decisiones tomadas y lo que falta. Actualizar este archivo al final de cada
> sesión de trabajo.
>
> Última actualización: **2026-11-15**
> Estado: **funcional, verificado y listo para personalizar/publicar**.

---

## 1. Resumen

Portafolio personal de **Giovanni Medina** con estética de menú táctico de
videojuego. Hecho con **Astro 7 + Tailwind CSS 4**, salida estática, sin
frameworks de cliente.

- Ruta local: `C:\Users\elbry\Documents\PortafolioTactico`
- Página única con cuatro "expedientes" internos y navegación por hash.
- Datos centralizados en `src/data/portfolio.ts`.
- Instrucciones para agentes: `AGENT.md`.
- Guía para el usuario: `README.md`.

---

## 2. Cómo retomar en 30 segundos

```powershell
cd C:\Users\elbry\Documents\PortafolioTactico
npm run dev
```

Abrir http://localhost:4321. Leer `AGENT.md` antes de editar. Verificar con
`npm run check` y `npm run build`.

---

## 3. Estado actual (verificado)

- [x] `npm install` completado.
- [x] `npm run check` → **0 errores, 0 warnings, 0 hints** (15 archivos).
- [x] `npm run build` → genera `dist/` correctamente.
- [x] Navegación por teclado probada con Playwright + Chrome:
  - Flechas desde `body` seleccionan opciones.
  - `Enter` abre la sección y mueve el foco al `h2`.
  - `Escape` cierra y devuelve el foco al botón del menú.
  - `popstate` / hash directo (`#proyectos`) funciona.
- [x] Responsive probado a **320, 360, 390, 768, 1024 y 1440 px**.
- [x] Sin scroll horizontal en esos anchos.
- [x] `prefers-reduced-motion` desactiva animaciones, parpadeo y scroll suave.
- [x] Botones CÓDIGO/DEMO desactivados cuando la URL está vacía.
- [x] Contenido en español.
- [x] Documentación (`README.md`, `AGENT.md`, `MEMORY.md`).

Tamaño del build: ~100 KB en total, CSS ~33 KB, JS inline ~4 KB. No hay
dependencias de runtime en el cliente.

---

## 4. Decisiones de diseño y por qué

1. **Una sola página con hash routing** (`#acerca`, `#proyectos`…).
   Permite animar el cambio de vista sin recargar y mantiene el proyecto ligero.
   Las secciones existen en el HTML desde el inicio (mejor para SEO/lectores).
2. **Sin React/Vue/Svelte.** Todo el dinamismo son ~150 líneas de TypeScript
   vanilla. El menú, el foco y el historial no justifican un framework.
3. **Los cuatro paneles de vista previa se renderizan en el servidor** y se
   ocultan con `hidden`. Así el cambio es instantáneo y no hay que inyectar
   texto desde JS.
4. **Datos en un único archivo** (`src/data/portfolio.ts`) con tipos e
   instrucciones `// ← CAMBIA ESTO`.
5. **`[hidden] { display: none !important; }`** en `global.css` porque las
   utilidades `flex`/`grid` de Tailwind sobrescriben el atributo nativo.
6. **Fuentes de Google** (Rajdhani, Teko, JetBrains Mono) para no cargar archivos
   locales; aceptable para un portafolio. Si se requiere 100% offline, habría que
   autoalojarlas.
7. **Estética:** negro `#06070a`, acento `#e11d2e`, rojo oscuro `#5c0d17`,
   paneles con brackets, scanlines con `repeating-linear-gradient` y ruido SVG
   inline. Nombre con degradado plateado (Teko).
8. **Enlaces vacíos = botón desactivado** con `title` que indica dónde
   completarlos, en lugar de un enlace roto.
9. **Botones "CÓDIGO"/"DEMO"** se convierten en `<a>` reales en cuanto el campo
   correspondiente tiene contenido.

---

## 5. Pendientes del usuario (datos reales)

Marcados en `src/data/portfolio.ts`:

- [ ] Confirmar/cambiar `site.name` (ahora "GIOVANNI MEDINA", tomado de Git).
- [ ] `site.city` (ahora "México").
- [ ] `about.school.name` y `about.school.place` (placeholders).
- [ ] Enlaces `repo` y `demo` de los 5 proyectos (todos vacíos).
- [ ] LinkedIn y X/Twitter en `socials` (usuarios placeholder).
- [ ] Sustituir `public/images/perfil.svg` por una foto real.
- [ ] Sustituir `public/images/fondo.svg` por una imagen propia.
- [ ] Sustituir las miniaturas `proyecto-*.svg` por capturas reales.
- [ ] Cambiar `site` en `astro.config.mjs` por el dominio final.
- [ ] Revisar textos de experiencia (fechas y descripciones son de ejemplo).
- [ ] Añadir `og:image` si se quiere vista previa bonita al compartir.

---

## 6. Despliegue

- **No desplegado todavía.** No hay URL pública ni repositorio remoto.
- Repositorio Git local **inicializado** en la rama `main`, con un commit
  inicial (`Portafolio tactico con Astro y Tailwind`). Falta crear el repositorio
  en GitHub y agregar el remoto.
- `netlify.toml` listo (build `npm run build`, publish `dist`, Node 22).
- Vercel detecta Astro automáticamente.
- Pasos completos en `README.md`, sección 7.

---

## 7. Trampas y notas técnicas

- **Node >= 22.23.4** (lo exige Astro 7). La máquina tiene Node 24.16.0.
- **Tailwind v4**: no existe `tailwind.config.js`; el tema está en `@theme`
  dentro de `src/styles/global.css`.
- **No usar `textContent` del botón del menú** para el nombre de la sección:
  incluye flecha, número y "ACCEDER". Se usa `data-label`.
- **IDs acoplados**: `menuSections[].id` ↔ `panel-<id>` ↔ `data-view-panel` ↔
  hash. Cambiar uno exige cambiar los demás.
- **Imágenes**: en `public/images/`, rutas `/images/...`.
- **Script inline**: Astro inserta `main.ts` al final del HTML; no genera archivo
  JS separado. Es intencional para ahorrar una petición.
- **El fondo es muy oscuro a propósito.** Si el usuario dice que no se ve su
  imagen, subir `opacity`/`brightness` de `.fx-photo` y bajar el alfa de
  `.fx-tint` en `global.css`.
- **La animación de las barras** se reinicia al mostrarse la sección porque el
  contenedor pasa de `display:none` a visible. No hace falta JS.
- **Los screenshots de verificación** están en
  `C:\Users\elbry\AppData\Local\Temp\opencode\shots` (temporales, fuera del
  repo).

---

## 8. Archivos que no se deben tocar sin motivo

- `src/styles/global.css` → contiene todo el sistema visual y la regla `[hidden]`.
- `src/scripts/main.ts` → contrato de teclado, foco e historial.
- `src/data/portfolio.ts` → única fuente de contenido; si se rompe, la página no
  compila.

---

## 9. Bitácora

### 2026-11-15 — Creación inicial

- Se creó el proyecto desde cero con Astro 7.4.12 + Tailwind 4.3.5.
- Se implementaron: fondo táctico con foto difuminada, capas de ruido/scanlines,
  nombre con degradado plateado, menú vertical con flechas y barra roja, panel
  de vista previa HUD, cuatro secciones completas, botón REGRESAR, navegación
  por hash, teclado, `aria-live`, foco gestionado y `prefers-reduced-motion`.
- Se generaron placeholders SVG para fondo, perfil y cinco proyectos.
- Se validó con `astro check` (0 errores) y con capturas en seis anchos.
- Se documentó en `README.md`, `AGENT.md` y este `MEMORY.md`.
- Se inicializó Git en la rama `main` con un commit inicial. Sin remoto todavía.
- Verificación final con Playwright: hover, Enter, Escape, foco, hash, título y
  0 errores de consola.
- Pendiente inmediato: reemplazar placeholders y publicar.
