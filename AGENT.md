# AGENT.md — Guía para agentes de IA

> Lee este archivo **antes** de modificar el proyecto. Después lee `MEMORY.md`
> para conocer el estado actual, qué cambió, decisiones y pendientes.

## 1. Qué es este proyecto

Portafolio personal de **Giovanni Medina**, desarrollador full stack en Cancún.
Diseño profesional en **blanco y negro** inspirado en el template de Figma
*Portfolio — Tomasz Gajda*.

- Una sola página (`src/pages/index.astro`) con scroll y anclas.
- Proyectos con **filtros**: los destacados (`featured: true`) en filas
  grandes con galería, el resto en una lista compacta, una **ficha de
  detalles** por proyecto y un **visor ampliado** (lightbox).
- Salida estática, sin backend. El formulario usa `mailto:`.
- Todo el contenido está en `src/data/portfolio.ts`.
- Todo el texto visible debe estar en **español**.

## 2. Reglas no negociables

1. **No agregar frameworks de cliente** (React, Vue, Svelte…). Todo el JS vive
   en `src/scripts/main.ts`.
2. **No duplicar datos.** Lo que aparece en pantalla viene de
   `src/data/portfolio.ts`.
3. **Accesibilidad**: foco visible, navegación completa con teclado,
   `aria-pressed` en filtros, `aria-expanded` en el menú móvil, visor con
   `role="dialog"`, `aria-modal`, foco atrapado y devuelto al cerrar, `alt` en
   todas las fotos (viene de `caption`).
4. **Respetar `prefers-reduced-motion`** en cualquier animación nueva. El único
   momento de movimiento es la entrada del hero; **no agregar** animaciones de
   aparición por scroll ni ocultar contenido hasta que cargue el JS.
5. **No cambiar la identidad visual** (gris/negro/blanco, Raleway +
   Montserrat, títulos en recuadro, hero en diagonal) sin que el usuario lo
   pida. El usuario **rechazó** un acento amarillo y la foto recortada.
6. **No afirmar que algo está desplegado** si no se ejecutó el despliegue.
7. **No inventar datos personales** ni fotos de proyectos. Las portadas SVG
   son provisionales. La foto del hero es `site.photoCutout` (sin fondo).
8. **No usar logos oficiales** de tecnologías; se usan abreviaturas.
9. **Contraste mínimo** 4.5:1 en texto normal y 3:1 en texto grande. Usar las
   variables de color de `:root`; no escribir grises sueltos.
10. **Skills del proyecto** en `.claude/skills` (impeccable, web-design-guidelines,
   ui-ux-pro-max…). Para revisar, usar `impeccable audit` / `critique`.

## 3. Stack

| Elemento | Versión / nota |
| --- | --- |
| Astro | 7.4.x (requiere Node >= 22.23.4) |
| CSS | Normal, en `src/styles/global.css` (no se importa Tailwind) |
| Tailwind | Sigue instalado y el plugin sigue en `astro.config.mjs`, pero no se usa |
| TypeScript | 6.x, modo estricto |
| Fuentes | Google Fonts: Raleway, Montserrat |

## 4. Comandos

```bash
npm run dev      # http://localhost:4321
npm run check    # tipos y plantillas Astro
npm run build    # genera dist/
npm run preview
```

## 5. Mapa de archivos

| Archivo | Responsabilidad |
| --- | --- |
| `src/data/portfolio.ts` | Única fuente de contenido (`site`, `band`, `about`, `skillGroups`, `experience`, `projects`, `projectFilters`, `contact`) |
| `src/pages/index.astro` | Une las secciones y carga `main.ts` |
| `src/layouts/Layout.astro` | `<head>`, fuentes, metadatos, enlace "Saltar al contenido" |
| `src/components/Nav.astro` | Barra fija + menú móvil |
| `src/components/Hero.astro` | Portada partida en diagonal con foto |
| `src/components/Band.astro` | Franja negra con cifras |
| `src/components/About.astro` | Sobre mí y áreas |
| `src/components/Skills.astro` | Habilidades y trayectoria |
| `src/components/Projects.astro` | Encabezado, filtros y rejilla |
| `src/components/ProjectFeature.astro` | Fila de proyecto destacado (foto grande + texto) |
| `src/components/ProjectMini.astro` | Fila compacta de "Más proyectos" |
| `src/components/ProjectCase.astro` | Ficha de detalles (panel con el reto, qué hice y resultado) |
| `src/components/Gallery.astro` | Galería: foto grande, miniaturas y pie de foto |
| `src/components/ProjectActions.astro` | Botones de cada proyecto (detalles, jugar, código) |
| `src/components/Lightbox.astro` | Visor ampliado |
| `src/components/Contact.astro` | Formulario `mailto:` y datos directos |
| `src/components/Footer.astro` | Pie y toast |
| `src/components/BoxHead.astro` | Título en recuadro |
| `src/components/Divider.astro` | Separador |
| `src/components/Icon.astro` | Íconos SVG |
| `src/scripts/main.ts` | Nav, filtros, galería, visor, copiar correo, formulario, aparición |
| `src/styles/global.css` | Todo el diseño y los puntos de quiebre (1000, 820, 600 px) |

## 6. Contrato de datos

- `Project.photos: { src, caption }[]` — la primera es la portada; con 2+ se
  activa la galería. Rutas dentro de `public/` (empiezan con `/images/`).
- `Project.category` ∈ `"web" | "iot" | "movil" | "juegos"` — debe coincidir
  con un `projectFilters[].id`.
- `Project.repo` vacío → se muestra `note` en vez del botón.
- `contact.linkedin` en `null` → no se muestra LinkedIn.

## 7. Contrato de interacción (IDs que usa `main.ts`)

`nav`, `menuBtn`, `links`, `filters`, `grid`, `lb`, `lbImg`, `lbTitle`,
`lbCap`, `lbPrev`, `lbNext`, `lbClose`, `toast`, `copy`, `form`, `f-name`,
`f-mail`, `f-msg`, `formNote`, `e-name`, `e-mail`, `e-msg`, `contenido`.

Clases con comportamiento: `.gallery` (`data-name`), `.shots`, `.shot`
(`data-i`, `data-src`, `data-caption`), `.g-prev`, `.g-next`, `.count .n`,
`.dots i`, `.card` (`data-cat`), `.nav.solid`, `.nav.open`, `body.lock`,
`.field-wrap` / `.err` (errores del formulario, `aria-invalid`).

## 8. Recetas

- **Agregar fotos a un proyecto**: copiar a `public/images/proyectos/` y
  agregar `{ src, caption }` a `photos`.
- **Agregar un proyecto**: nuevo objeto en `projects` con todos los campos.
- **Agregar un filtro**: nueva categoría en `ProjectCategory` y en
  `projectFilters`.
- **Agregar una habilidad**: `{ abbr, name }` en el grupo de `skillGroups`.
- **Cambiar colores**: variables en `:root` de `global.css` (agrupadas: fondos
  claros, tinta, fondos oscuros, texto sobre oscuro, estados).

## 9. Verificación antes de terminar

1. `npm run check` sin errores.
2. `npm run build` correcto.
3. Revisar en 1440, 1024, 768 y 390 px: sin scroll horizontal.
4. Probar con teclado: menú, filtros, galería (← →), visor (Escape), formulario
   vacío (debe enfocar el primer error).
5. Medir contraste de los textos nuevos (≥4.5:1).
6. Actualizar `MEMORY.md` (qué cambió, pendientes, bitácora).

## 10. Despliegue

Ver `README.md` sección 7. No hay URL pública todavía.
