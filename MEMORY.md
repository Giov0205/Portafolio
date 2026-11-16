# MEMORY.md — Contexto persistente del proyecto

> **Léeme primero al retomar el proyecto.** Aquí está el estado real, las
> decisiones tomadas y lo que falta. Actualizar este archivo al final de cada
> sesión de trabajo.
>
> Última actualización: **2026-11-16**
> Estado: **funcional, compila y está listo para publicar**. Falta revalidar
> visualmente la última versión y probar con un control físico.

---

## 1. Resumen

Portafolio personal de **Giovanni Medina** con estética de menú de consola /
HUD futurista. Hecho con **Astro 7 + Tailwind CSS 4**, salida estática, sin
frameworks de cliente.

- Ruta local: `C:\Users\elbry\Documents\PortafolioTactico`
- Página única con cuatro "módulos" y navegación por hash.
- La sección PROYECTOS es una **tienda de cajas de juego** que se voltean.
- Navegación con mouse, teclado y **control de consola** (Gamepad API).
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

## 3. Estado actual (verificado 2026-11-16)

- [x] `npm install` completado.
- [x] `npm run check` → **0 errores, 0 warnings, 0 hints** (18 archivos).
- [x] `npm run build` → compila y regenera `dist/` (1 página, ~3 s).
- [x] Contenido real de Giovanni: nombre, Cancún, UT Cancún, correo, GitHub y
      seis proyectos con sus tecnologías.
- [x] Seis proyectos, tres con repositorio público enlazado.
- [x] Botones CÓDIGO/DEMO se omiten cuando la URL está vacía.
- [x] Contenido en español.
- [x] Documentación (`README.md`, `AGENT.md`, `MEMORY.md`) actualizada a la
      versión actual.

Tamaño del build (sin contar imágenes): HTML ≈ 49 KB, CSS ≈ 37 KB, JS ≈ 7 KB
(archivo aparte, ya no inline). Total ≈ 95 KB.

**Sin revalidar en esta sesión** (eran pruebas de la versión anterior): capturas
en 320/360/768/1024 px, recorrido completo con teclado, prueba con control
físico y comprobación de scroll horizontal en esos anchos. Hay que repetirlas
antes de publicar. En 1440 y 390 px sí se verificó con Chrome DevTools Protocol:
`scrollWidth === innerWidth`, sin desbordes, polvo oculto en móvil y capas
congeladas con `prefers-reduced-motion`.

---

## 4. Decisiones de diseño y por qué

1. **Una sola página con hash routing** (`#acerca`, `#proyectos`…).
   Permite animar el cambio de vista sin recargar y mantiene el proyecto ligero.
   Las secciones existen en el HTML desde el inicio (mejor para SEO/lectores).
2. **Sin React/Vue/Svelte.** Todo el dinamismo son dos archivos TypeScript
   pequeños (`main.ts` y `gamepad.ts`).
3. **Los cuatro paneles de vista previa se renderizan en el servidor** y se
   ocultan con `hidden`. Así el cambio es instantáneo y no hay que inyectar
   texto desde JS.
4. **PROYECTOS como tienda de juegos**: cada proyecto es una caja 3D con portada
   (carátula, género, año, estado) y contraportada (descripción, tecnologías y
   enlaces). Se voltea con clic, `Enter`, ✕ del control o ○ para cerrar. Motivo:
   mostrar los proyectos de forma memorable sin salir de la estética de consola.
5. **Cada caja tiene su color** (`project.color` → variable `--box`) para que el
   estante no sea monocromo; el acento global sigue siendo cian.
6. **Habilidades como chips, no como barras.** Se eliminaron los niveles 0–100:
   el usuario solo quería listar tecnologías que realmente ha usado.
7. **Control de consola opcional** (Gamepad API): mapeo estándar de PS5/Xbox,
   cruceta + palanca con zona muerta y repetición. No añade dependencias y no
   afecta a quien no tiene mando.
8. **Barra de guías de botones** (`ButtonPrompts.astro`) que se filtra por vista
   con `data-views`. Sus botones son clicables, así que también sirve como ayuda
   visual para usuarios de mouse/teclado.
9. **Datos en un único archivo** (`src/data/portfolio.ts`) con tipos e
   instrucciones en comentarios.
10. **`[hidden] { display: none !important; }`** en `global.css` porque las
    utilidades `flex`/`grid` de Tailwind sobrescriben el atributo nativo.
11. **Paleta cian** (`#22d3ee`) sobre negro azulado: reemplazó el rojo inicial
    porque el fondo real (escenario gamer cian) pedía esa coherencia.
12. **Fuentes de Google** (Rajdhani, Teko, JetBrains Mono) para no cargar
    archivos locales; aceptable para un portafolio. Si se requiere 100 % offline,
    habría que autoalojarlas.

---

## 5. Pendientes del usuario

- [ ] **ARCUS**: repositorio privado. Si lo publica, poner la URL en `repo`.
- [ ] **POKÉDEX ARENA**: sin repositorio; poner URL si lo sube.
- [ ] **DontPetMe**: el enlace actual apunta al GDD, no al juego. Confirmar si es
      lo que quiere mostrar.
- [ ] Añadir LinkedIn a `socials` (está comentado como plantilla).
- [ ] Reemplazar las portadas `proyecto-*.svg` por capturas reales.
- [ ] **Limpiar `public/images/`**: borrar los archivos crudos que no se usan
      (`Escenario gamer futurista de neón cian.png` ~1.4 MB,
      `WhatsApp Image 2026-11-15 at 10.23.25 PM.jpeg` ~87 KB) y los SVG viejos
      (`fondo.svg`, `perfil.svg`, `proyecto-torneos.svg`). Hoy se copian a
      `dist/` y engordan el despliegue.
- [ ] Añadir `og:image` en `Layout.astro` para vista previa al compartir.
- [ ] Cambiar `site` en `astro.config.mjs` por el dominio final.
- [ ] Confirmar fechas y textos de la trayectoria (ya son reales, pero están sin
      validar por el usuario).
- [ ] Repetir pruebas visuales, de teclado y con control físico antes de publicar.
- [ ] Crear repositorio en GitHub, agregar remoto y desplegar.

---

## 6. Despliegue

- **No desplegado todavía.** No hay URL pública.
- Remoto configurado: `origin` → `https://github.com/Giov0205/Portafolio.git`;
  la rama `main` sigue a `origin/main`.
- Commits locales en `main`:
  1. `Portafolio tactico con Astro y Tailwind`
  2. `Documenta el proyecto y prepara el despliegue`
  3. `Portafolio con estilo HUD, tienda de proyectos y controles de PS5`
  4. `Añade capas atmosféricas cian y actualiza documentación`
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
  hash ↔ `data-views` de las guías. Cambiar uno exige cambiar los demás.
- **Imágenes**: en `public/images/`, rutas `/images/...`. Todo lo que esté ahí se
  copia tal cual a `dist/` (incluidos los archivos que no se usan).
- **JS separado**: desde que `main.ts` importa `gamepad.ts`, Astro emite un
  archivo JS aparte (~7 KB) en `dist/_astro/`. Ya no es inline.
- **Enlaces vacíos**: el botón CÓDIGO/DEMO no se renderiza. Antes se mostraba un
  `<span>` desactivado; ese comportamiento ya no existe.
- **Cajas de proyecto**: la cara oculta usa `inert`; el foco se mueve con
  `[data-back-focus]`. No quites el `inert` o el teclado entrará a contenido
  invisible.
- **`window.open`** puede ser bloqueado por el navegador al abrir el repo con △;
  hay un toast que sugiere usar el botón CÓDIGO.
- **Gamepad**: el navegador solo detecta el mando después de presionar un botón.
  Safari/iOS no lo soporta. La barra de guías se muestra igual en pantallas
  ≥640 px con puntero, así que su presencia no implica mando conectado.
- **La animación de las cajas y del estante** se desactiva en
  `@media (prefers-reduced-motion: reduce)` al final de `global.css`.
- **El fondo ya es una foto real** (`fondo.jpg`) con poco desenfoque
  (`blur(1.5px)`, `opacity 0.85`). Si se ve muy cargado, subir el alfa de
  `.fx-tint`.
- **Clases heredadas** sin uso: `.mission-card`, `.skill-bar`, `.skill-fill`.
- **Los screenshots de verificación** de sesiones anteriores están en
  `C:\Users\elbry\AppData\Local\Temp\opencode\shots` (temporales, fuera del
  repo) y corresponden a la versión roja anterior.

---

## 8. Archivos que no se deben tocar sin motivo

- `src/styles/global.css` → contiene todo el sistema visual, la tienda, la barra
  de control y la regla `[hidden]`.
- `src/scripts/main.ts` → contrato de teclado, foco, historial, volteo y acciones.
- `src/scripts/gamepad.ts` → mapeo del control y repetición de la cruceta.
- `src/data/portfolio.ts` → única fuente de contenido; si se rompe, la página no
  compila.

---

## 9. Bitácora

### 2026-11-15 — Creación inicial

- Se creó el proyecto desde cero con Astro 7.4.12 + Tailwind 4.3.5.
- Se implementaron: fondo táctico con foto difuminada, capas de ruido/scanlines,
  nombre con degradado plateado, menú vertical con flechas y barra de acento,
  panel de vista previa HUD, cuatro secciones completas, botón REGRESAR,
  navegación por hash, teclado, `aria-live`, foco gestionado y
  `prefers-reduced-motion`.
- Se generaron placeholders SVG para fondo, perfil y cinco proyectos.
- Se validó con `astro check` (0 errores) y con capturas en seis anchos.
- Se documentó en `README.md`, `AGENT.md` y este `MEMORY.md`.
- Se inicializó Git en la rama `main` con un commit inicial. Sin remoto todavía.
- Verificación con Playwright: hover, Enter, Escape, foco, hash, título y
  0 errores de consola.

### 2026-11-15/16 — Rediseño HUD cian, tienda de proyectos y control

Commit `0e7b512` — *Portafolio con estilo HUD, tienda de proyectos y controles
de PS5*.

- Paleta cambiada de rojo a **cian** (`#22d3ee`) y fondos azulados; fondo real
  (`fondo.jpg`) con menos desenfoque y nueva capa `.fx-vignette`.
- PROYECTOS reconstruido como **estante de cajas de juego** con volteo 3D,
  contraportada, chips de tecnologías y botones CÓDIGO/DEMO.
- Añadido **soporte de control** (`gamepad.ts`): cruceta, palanca, ✕ ○ □ △,
  repetición al mantener y detección de conexión.
- Añadida **barra de guías de botones** (`ButtonPrompts.astro`, `PadIcon.astro`)
  filtrada por vista, clicable, con estado del control y toasts.
- Nuevas acciones: △ abre repositorio, □ copia el correo, ○/Escape cierra caja o
  vuelve al menú.
- Datos reemplazados por los reales: 6 proyectos (AgroSense y AirGuard nuevos;
  se quitó Torneos; Pokédex Arena y API NestJS renombrados), ciudad, escuela,
  trayectoria y enlaces de GitHub.
- Habilidades pasaron de barras con nivel a **chips**; nuevo grupo MÓVIL.
- Se añadieron `fondo.jpg` y `perfil.jpg`; se subieron también dos archivos
  crudos sin usar (pendiente de limpiar).
- `npm run check` (0 errores, 18 archivos) y `npm run build` verificados.
- Documentación (`AGENT.md`, `MEMORY.md`, `README.md`) reescrita para esta
  versión y `dist/` regenerado.
- Pendiente inmediato: limpiar imágenes sin usar, revalidar visualmente y probar
  con un mando físico antes de publicar.

### 2026-11-16 — Capas atmosféricas

- Se añadieron cuatro capas al fondo, en la paleta cian existente:
  `fx-aurora` (dos manchas de luz que respiran), `fx-fog` (neblina que se
  desplaza), `fx-pulse` (latido de telemetría) y `fx-dust` (polvo en
  suspensión).
- El ruido (`fx-noise`) ahora tiene un desplazamiento sutil en `steps()` para que
  el grano no se sienta estático.
- Todo se anima solo con `transform`/`opacity` y `mix-blend-mode: screen`; sin
  `filter: blur()` a pantalla completa. En móvil se oculta el polvo y se baja la
  opacidad de aurora/neblina.
- Con `prefers-reduced-motion` las capas quedan quietas y visibles.
- Verificado con Chrome DevTools Protocol en 1440 y 390 px: sin desbordes,
  `scrollWidth === innerWidth`, capas activas y animaciones desactivadas con
  movimiento reducido. Capturas en
  `C:\Users\elbry\AppData\Local\Temp\opencode\atmos`.
- `npm run check` (0/0/0) y `npm run build` correctos tras el cambio.
