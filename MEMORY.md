# MEMORY.md — Contexto persistente del proyecto

> **Léeme primero al retomar el proyecto.** Aquí está el estado real, qué
> cambió, qué se agregó, las decisiones tomadas y lo que falta. Actualizar este
> archivo al final de cada sesión de trabajo.
>
> Última actualización: **2026-11-26**
> Estado: **rediseño profesional (v3) migrado a Astro y corregido tras la
> auditoría de diseño/accesibilidad**. Falta poner fotos reales de los
> proyectos.

---

## 1. Resumen

Portafolio personal de **Giovanni Medina**, desarrollador full stack en Cancún.
Hecho con **Astro 7**, salida estática, sin frameworks de cliente.

- Ruta local: `C:\Users\elbry\Documents\PortafolioTactico`
- Repositorio: `https://github.com/Giov0205/Portafolio` (rama `main`)
- Página única con scroll normal y anclas (`#sobre-mi`, `#habilidades`,
  `#proyectos`, `#contacto`).
- Todo el contenido vive en `src/data/portfolio.ts`.
- Instrucciones para agentes: `AGENT.md`. Guía para el usuario: `README.md`.

---

## 2. Qué cambió el 2026-11-24 (rediseño)

Se reemplazó por completo el diseño "HUD / menú de consola" (cian, scanlines,
cajas de juego que se voltean, control de PS5) por un **diseño profesional en
blanco y negro**, inspirado en el template de Figma *Portfolio — Tomasz Gajda*.

### Diseño nuevo
- **Hero partido en diagonal**: texto sobre gris claro a la izquierda y la foto
  en blanco y negro sobre negro a la derecha. En móvil, la foto va debajo del
  texto.
- **Franja negra** con la UT Cancún y tres cifras (6 proyectos, 3 con código
  público, 4 áreas).
- **Títulos de sección dentro de un recuadro** con letras espaciadas.
- **Sobre mí**: texto, tres áreas (Frontend, Backend, Videojuegos y 3D) y tres
  objetivos numerados.
- **Habilidades** en cuadritos con abreviatura (no se usan logos oficiales) y
  **Trayectoria** como lista con año y estado.
- **Proyectos** en una rejilla oscura con **filtros** (Todos, Web, IoT, Móvil,
  Videojuegos).
- **Contacto**: formulario que abre la app de correo con el mensaje listo
  (`mailto:`), datos directos y botón "Copiar correo".
- **Pie negro** con "Volver arriba".
- Barra de navegación fija que se vuelve negra al bajar; menú hamburguesa en
  móvil.
- Tipografías: **Raleway** (títulos y texto) y **Montserrat** (etiquetas).
- Paleta: gris `#e6e6e6`, negro `#0d0d0d` / `#1a1a1a`, blanco.
- Favicon nuevo: hexágono con "GM".

### Funciones nuevas
- **Galería de fotos por proyecto**: cada proyecto tiene una lista `photos`.
  Con 2 o más fotos, la tarjeta muestra flechas, contador (`2 / 3`) y puntos, y
  se puede deslizar en el celular.
- **Visor ampliado (lightbox)**: al tocar una foto se abre en grande con su
  descripción; flechas ← →, `Escape` para cerrar, foco atrapado dentro del
  visor y regreso del foco a la foto al cerrar.
- **Filtros de proyectos** por categoría (`category` en los datos).
- **Aparición suave** de secciones al hacer scroll (se desactiva con
  "Reducir movimiento").

### Lo que se quitó
- Componentes del diseño anterior: `TacticalBackground`, `Header`, `MainMenu`,
  `PreviewPanel`, `SectionShell`, `AboutSection`, `ProjectsSection`,
  `SkillsSection`, `ContactSection`, `PadIcon`, `ButtonPrompts`.
- `src/scripts/gamepad.ts` (soporte de control de consola) y la barra de guías
  de botones ✕ ○ □ △.
- Navegación por "módulos" con hash y vistas ocultas.
- Campos de datos del diseño anterior: `menuSections`, `ui`, `genre`,
  `players`, `color`, `codename`, `backgroundImage`.
- Ya no se importa Tailwind en `global.css` (el CSS es normal). Las
  dependencias de Tailwind siguen instaladas y el plugin sigue en
  `astro.config.mjs`, pero no se usan.

### Archivos nuevos
| Archivo | Qué hace |
| --- | --- |
| `src/components/Nav.astro` | Barra de navegación y menú móvil |
| `src/components/Hero.astro` | Portada partida en diagonal |
| `src/components/Band.astro` | Franja negra con UT Cancún y cifras |
| `src/components/About.astro` | Sobre mí y áreas |
| `src/components/Skills.astro` | Habilidades y trayectoria |
| `src/components/Projects.astro` | Sección de proyectos y filtros |
| `src/components/ProjectCard.astro` | Tarjeta de proyecto con galería |
| `src/components/Lightbox.astro` | Visor ampliado de fotos |
| `src/components/Contact.astro` | Formulario y datos de contacto |
| `src/components/Footer.astro` | Pie de página y aviso (toast) |
| `src/components/BoxHead.astro` | Título de sección en recuadro |
| `src/components/Divider.astro` | Separador decorativo |
| `src/components/Icon.astro` | Íconos SVG (GitHub, correo, flechas, etc.) |

### Archivos reescritos
`src/data/portfolio.ts`, `src/pages/index.astro`, `src/layouts/Layout.astro`,
`src/scripts/main.ts`, `src/styles/global.css`, `public/favicon.svg`,
`README.md`, `AGENT.md`, `MEMORY.md`.

### Cómo se llegó a este diseño
1. **v1** — diseño blanco y negro basado en Tomasz Gajda. ✅ Elegido.
2. **v2** — mezcla de 3 templates (Tomasz Gajda, *Portfo* y *Developer
   Portfolio*) con acento amarillo `#ffb400` y foto recortada sin fondo.
   ❌ Descartado: no le gustó al usuario.
3. **v3** — v1 + galerías de fotos en los proyectos. ✅ Es lo que está en el
   código.

Referencias de Figma:
- Tomasz Gajda: `https://www.figma.com/design/wpa3UaJTvDFHju7KmpoyOE/`
- Portfo (Resume Template): `https://www.figma.com/design/7V3cY2ybsCw84iyioWyz2o/`
- Developer Portfolio: `https://www.figma.com/design/VLZeritz7D6y8tfjfKW7So/`

### Correcciones de la auditoría (2026-11-24, segunda subida)

Auditoría hecha con las skills de `.claude/skills` (**impeccable** `audit` +
**web-design-guidelines**). Nota inicial: **13/20**. Reporte completo en el
proyecto de Claude "REDISEÑO GIO" (`auditoria-portafolio-2026-11-24.md`).

| Problema | Arreglo |
| --- | --- |
| Menú blanco ilegible sobre el gris entre 821 y 1100 px | Los enlaces llevan una píldora negra mientras la barra es transparente (`global.css`, regla `.nav:not(.solid) .links`) |
| Subtítulo del hero con contraste 2.25:1 | Ahora usa `--mute` (≈5.3:1) |
| "Repositorio privado" con 4.48:1 | Ahora `--on-dark-3` (#8a8a8a, ≈5.3:1) |
| Títulos saltaban de h2 a h4 en Trayectoria | Ahora h3 |
| Formulario: errores sin anunciar ni enfocar | Mensaje de error junto a cada campo, `aria-invalid`, foco al primer campo con error, nota con `aria-live` |
| Correo con corrector ortográfico | `spellcheck="false"`, `autocapitalize="off"`, `inputmode="email"` |
| Foco de los campos casi invisible | Fondo blanco + contorno negro de 2 px en todo el campo |
| Sin JavaScript el contenido quedaba invisible | Se quitó la aparición por scroll (`.reveal`); todo es visible siempre |
| La misma animación en todas las secciones | Un solo momento de movimiento: la foto del hero se descubre en diagonal y el texto sube en cascada (solo CSS, se apaga con "Reducir movimiento") |
| Sombra dura `4px 4px 0` en los cuadritos de habilidades | Quitada; al pasar el mouse el cuadro se invierte (negro con texto blanco) |
| Números 01/02/03 en Objetivos | Cambiados por un cuadrito negro (el orden no significaba nada) |
| ~25 grises escritos a mano | Variables en `:root`: `--paper-hi`, `--tile`, `--body`, `--body-2`, `--rule`, `--card`, `--deep`, `--on-dark-hi`, `--on-dark`, `--on-dark-2`, `--on-dark-3`, `--error` |
| 1.6 MB de imágenes sin usar que se publicaban | Borradas: `Escenario gamer futurista de neón cian.png`, `WhatsApp Image 2026-11-15 at 10.23.25 PM.jpeg`, `fondo.jpg`, `fondo.svg`, `perfil.svg`, `proyecto-torneos.svg` |
| Foto del hero sin prioridad de carga | `fetchpriority="high"` |
| `theme-color` no coincidía con el fondo | Ahora `#e6e6e6` |
| Faltaban `canonical` y `og:image` | Agregados en `Layout.astro` (se arman con `site` de `astro.config.mjs`) |
| Visor sin contener el scroll; flechas de 40 px | `overscroll-behavior: contain`; flechas de 44 px |
| Selección de texto y scrollbar por defecto | Selección negra (blanca en zonas oscuras) y scrollbar con colores del sitio |
| "Saltar al contenido" iba a Sobre mí | Ahora va a `<main id="contenido">` |
| Botón "Enviar" poco claro | Ahora "Enviar por correo" |

**Foto del hero (resuelto después, ver abajo):** la foto anterior medía 600 px
y se veía borrosa en escritorio.

### Foto sin fondo e íconos de "Lo que hago" (2026-11-24, tercera subida)

- **Foto nueva sin fondo en el hero**: el usuario agregó una versión en alta
  resolución (2970 × 3713) recortada, pero con fondo blanco sólido (sin
  transparencia). Se le quitó el blanco, se limpió el halo claro del pelo y los
  hombros y se exportó como `public/images/perfil-sin-fondo.webp`
  (1400 × 1377, ~70 KB, con transparencia; la mesa de abajo se desvanece).
- El hero ahora muestra la figura **apoyada en el borde inferior** del panel
  negro en diagonal, con un foco gris suave detrás (`--spot`). Ya no hay
  degradado encima de la foto.
- `site.photoCutout` (hero) y `site.photo` (sigue siendo `perfil.jpg`, se usa
  para `og:image`).
- **Íconos de "Lo que hago"**: antes iban muy tenues y encimados detrás del
  título (imitaban el template de Tomasz) y parecían un error. Ahora cada ícono
  va en un recuadro negro de 52 px arriba del título, igual que los cuadritos
  de habilidades.
- El archivo original que subió el usuario
  (`public/images/Blue And White Simple Clean Dynamic Football Match Day Instagram Post.png`,
  1.5 MB) **no se sube a git**; se puede borrar o mover fuera de `public/`.

---

## 3. Cómo retomar en 30 segundos

```powershell
cd C:\Users\elbry\Documents\PortafolioTactico
npm run dev
```

Abrir http://localhost:4321. Leer `AGENT.md` antes de editar. Verificar con
`npm run check` y `npm run build`.

---

## 4. Decisiones de diseño y por qué

1. **Blanco y negro, sin color de acento**: se ve sobrio y profesional para
   reclutadores; el usuario rechazó el acento amarillo.
2. **Una sola página con scroll** en vez de módulos ocultos: más fácil de leer
   y de compartir; mejor para buscadores.
3. **Sin frameworks de cliente**: todo el JS está en `src/scripts/main.ts`.
4. **Fotos de proyectos en gris** que toman color al pasar el mouse, para que
   la rejilla se vea uniforme aunque las capturas tengan colores distintos.
5. **Abreviaturas en vez de logos** de tecnologías, para no usar marcas
   registradas.
6. **Formulario con `mailto:`**: el sitio es estático y no tiene servidor.
7. **Datos en un solo archivo** (`src/data/portfolio.ts`) con tipos y
   comentarios.

---

## 5. Pendientes

- [ ] **Fotos reales de los proyectos** (prioridad). ✅ EbenConta (3),
      ✅ ARCUS (4), ✅ DontPetMe (10), ✅ AgroSense (6) y ✅ AirGuard (7) ya tienen capturas;
      faltan los demás, que siguen con su ilustración SVG provisional.
      Sugerencias:
      Pokédex Arena (2–3 pantallas) ·
      API NestJS (Postman o Swagger).
      Guardarlas en `public/images/proyectos/` y listarlas en `photos`.
- [ ] Borrar o mover fuera de `public/` el PNG original de la foto
      (`Blue And White Simple Clean Dynamic Football Match Day Instagram Post.png`).
- [ ] Añadir LinkedIn en `contact.linkedin` si existe.
- [ ] **ARCUS**: repo privado; si se publica, poner URL en `repo`.
- [ ] **Pokédex Arena**: sin repo; poner URL si se sube.
- [ ] **DontPetMe**: el enlace apunta al GDD, no al juego.
- [ ] Cambiar `site` en `astro.config.mjs` por el dominio final (de ahí salen
      `canonical` y `og:image`).
- [ ] Desplegar (Vercel o Netlify).

---

## 6. Despliegue

- **No desplegado todavía.** No hay URL pública.
- Remoto: `origin` → `https://github.com/Giov0205/Portafolio.git`, rama `main`.
- `netlify.toml` listo (build `npm run build`, publish `dist`, Node 22).
- Vercel detecta Astro automáticamente. Pasos en `README.md`.

---

## 7. Trampas y notas técnicas

- **Node >= 22.23.4** (lo exige Astro 7).
- **IDs que usa `main.ts`**: `nav`, `menuBtn`, `links`, `filters`, `grid`,
  `lb`, `lbImg`, `lbTitle`, `lbCap`, `lbPrev`, `lbNext`, `lbClose`, `toast`,
  `copy`, `form`, `f-name`, `f-mail`, `f-msg`, `formNote`. Si cambias uno en un
  componente, cámbialo en el script.
- **Galería**: cada foto es un `<button class="shot">` con `data-src` y
  `data-caption`; el visor lee esos atributos. No hay JSON duplicado.
- **Movimiento**: solo la entrada del hero (`hero-wipe`, `hero-rise` en
  `global.css`). No volver a agregar animaciones de aparición por scroll: la
  auditoría las marcó (contenido invisible sin JS y movimiento repetido).
- **Formulario**: cada campo tiene su mensaje de error (`e-name`, `e-mail`,
  `e-msg`) enlazado con `aria-describedby`; el script pone `aria-invalid`.
- **`body.lock`** bloquea el scroll mientras el visor está abierto.
- **Imágenes**: en `public/`, rutas que empiezan con `/images/...`. Todo lo
  que esté ahí se publica.
- **Fuentes de Google** (Raleway, Montserrat): sin internet se usan fuentes
  del sistema.

---

## 8. Bitácora

### 2026-11-26 (4) — Capturas de AirGuard
- **AirGuard** (Sensor-IOT) ya tiene galería con 7 capturas de la versión
  rediseñada en `public/images/proyectos/airguard-*.webp` (monitor en
  precaución, peligro y seguro, lecturas, alertas, ajustes e inicio de
  sesión), a 1440 px.
- Se tomaron con **datos simulados** del sensor de gas (el ESP32 no estaba
  conectado). Los originales en PNG están en
  `Sensor-IOT\capturas-portafolio\`.
- `public/images/proyecto-airguard.svg` ya no se usa; se puede borrar.

### 2026-11-26 (3) — Capturas de AgroSense
- **AgroSense** ya tiene galería con 6 capturas de la versión remodelada en
  `public/images/proyectos/agrosense-*.webp` (resumen, mapa, parcelas,
  historial, alertas e inicio de sesión), tema claro a 1440 px.
- Se tomaron con **datos simulados**: la API del campo
  (`moriahmkt.com/iotapp/updated/`) da 404 y el backend no tiene
  `DATABASE_URL`. Los originales en PNG están en
  `Clima-IOT\capturas-portafolio\nuevas\`.
- `public/images/proyecto-agrosense.svg` ya no se usa; se puede borrar.

### 2026-11-26 — Fotos de DontPetMe
- **DontPetMe** ya tiene galería con 10 imágenes en
  `public/images/proyectos/dontpetme-*.webp` (1600 × 1000):
  - 3 recortes del póster hecho en Blender (logo, Mochi y la araña,
    enemigos), sacados de `Documents\Poster_DontPetMe_renders`.
  - 7 capturas de los niveles (Nivel 0 jaula y escritorio, Nivel 1 cuarto,
    hormiga reina y libros, Nivel 2 aspiradora y alfombra), renderizadas en
    el Editor de Unity con la cámara del juego. Los originales en PNG
    1920 × 1080 están en `DontPetMe\.playtest\portfolio\`.
- `public/images/proyecto-dontpetme.svg` ya no se usa; se puede borrar.

### 2026-11-24 (6) — Capturas de ARCUS
- **ARCUS** ya tiene galería con 4 capturas reales en
  `public/images/proyectos/arcus-*.webp` (panel, clientes, finanzas y
  calendario del mes), tomadas con los datos ficticios de su modo demo
  (`scripts/seed.ts`), en tema oscuro a 1440 px.
- Se borró la portada provisional `public/images/proyecto-arcus.svg` (ya no
  se usa).

### 2026-11-24 (5) — Nuevo proyecto: EbenConta
- Se agregó **EbenConta** (sistema contable para contadores, 2025) como
  primer proyecto, con galería de 3 capturas reales en
  `public/images/proyectos/ebenconta-*.webp` (inicio, ingresos y egresos,
  vencimientos). Repositorio privado.
- Nueva entrada en Trayectoria (2025) y la franja pasa a **07 proyectos**.
- Las fotos de las tarjetas ahora se alinean arriba (`object-position: top`)
  para que en las capturas se vea el encabezado de la app.
- El visor limita el alto de la foto (`max-height: calc(100svh - 170px)`) para
  que las capturas altas no tapen la descripción.

### 2026-11-24 (4) — Se quita Objetivos
- Se eliminó la sección "Objetivos" de Sobre mí (datos `about.goals`,
  estilos `.goals` y `.goals-title`) a pedido del usuario.
- Se probó una foto nueva (en un bote) para el hero; el usuario prefirió
  quedarse con la foto anterior (`perfil-sin-fondo.webp` no cambia).

### 2026-11-24 (3) — Foto sin fondo e íconos
- Foto nueva en alta resolución, sin fondo, en el hero.
- Íconos de "Lo que hago" en recuadro arriba del título.

### 2026-11-24 (2) — Correcciones de la auditoría
- Auditoría con las skills impeccable y web-design-guidelines (13/20).
- Arreglados todos los hallazgos posibles desde código (ver sección 2).
- Borradas 6 imágenes sin uso (~1.6 MB).

### 2026-11-24 — Rediseño profesional (v3) y galerías
- Diseño HUD reemplazado por diseño blanco y negro (ver sección 2).
- Galería de fotos por proyecto y visor ampliado.
- Documentación reescrita (`README.md`, `AGENT.md`, `MEMORY.md`).

### 2026-11-16 — Capas atmosféricas (diseño anterior)
- Aurora, neblina, pulso y polvo en el fondo cian. (Ya no existe.)

### 2026-11-15/16 — Rediseño HUD cian, tienda de proyectos y control
- Paleta cian, cajas de juego que se voltean, soporte de control de PS5.
  (Ya no existe.)

### 2026-11-15 — Creación inicial
- Proyecto creado con Astro 7 + Tailwind 4.
