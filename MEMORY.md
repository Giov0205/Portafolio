# MEMORY.md — Contexto persistente del proyecto

> **Léeme primero al retomar el proyecto.** Aquí está el estado real, qué
> cambió, qué se agregó, las decisiones tomadas y lo que falta. Actualizar este
> archivo al final de cada sesión de trabajo.
>
> Última actualización: **2026-11-24**
> Estado: **rediseño profesional (v3) migrado a Astro**. Falta poner fotos
> reales de los proyectos.

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
| `src/components/About.astro` | Sobre mí, áreas y objetivos |
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

- [ ] **Fotos reales de los proyectos** (prioridad). Hoy cada proyecto usa su
      ilustración SVG provisional. Sugerencias:
      ARCUS (panel, calendario, login) · AgroSense (mapa, gráficas) ·
      AirGuard (medidores, alertas) · DontPetMe (renders de Mochi, Copo y
      Trufa; nivel en Unity) · Pokédex Arena (2–3 pantallas) ·
      API NestJS (Postman o Swagger).
      Guardarlas en `public/images/proyectos/` y listarlas en `photos`.
- [ ] Foto de perfil más profesional (de frente, buena luz, fondo liso).
- [ ] Añadir LinkedIn en `contact.linkedin` si existe.
- [ ] **ARCUS**: repo privado; si se publica, poner URL en `repo`.
- [ ] **Pokédex Arena**: sin repo; poner URL si se sube.
- [ ] **DontPetMe**: el enlace apunta al GDD, no al juego.
- [ ] Limpiar `public/images/`: ya no se usan `fondo.jpg`, `fondo.svg`,
      `perfil.svg`, `proyecto-torneos.svg`,
      `Escenario gamer futurista de neón cian.png` (~1.4 MB) ni
      `WhatsApp Image 2026-11-15 at 10.23.25 PM.jpeg`. Se copian a `dist/`.
- [ ] Añadir `og:image` en `Layout.astro`.
- [ ] Cambiar `site` en `astro.config.mjs` por el dominio final.
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
- **Clase `.reveal`**: empieza invisible y aparece con IntersectionObserver.
  Si un elemento no aparece, revisa que el script cargue.
- **`body.lock`** bloquea el scroll mientras el visor está abierto.
- **Imágenes**: en `public/`, rutas que empiezan con `/images/...`. Todo lo
  que esté ahí se publica.
- **Fuentes de Google** (Raleway, Montserrat): sin internet se usan fuentes
  del sistema.

---

## 8. Bitácora

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
