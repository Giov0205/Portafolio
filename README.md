# Portafolio — Giovanni Medina

Portafolio personal con diseño **profesional en blanco y negro**: portada
partida en diagonal con foto, secciones con títulos en recuadro, proyectos con
**galería de fotos** y filtros, y formulario de contacto.

- **Framework:** Astro 7 (salida 100 % estática)
- **Estilos:** CSS normal en `src/styles/global.css`
- **JavaScript:** un solo archivo pequeño (`src/scripts/main.ts`). Sin React ni frameworks de cliente.
- **Contenido:** todo vive en `src/data/portfolio.ts`.
- **Idioma:** español.

> ¿Qué cambió y por qué? Lee `MEMORY.md`.

---

## 1. Requisitos

1. **Node.js 22.23.4 o superior** → https://nodejs.org (`node --version`)
2. **Un editor de código** (VS Code) → https://code.visualstudio.com
3. **Git** → https://git-scm.com

---

## 2. Correrlo en tu computadora

```bash
npm install     # solo la primera vez
npm run dev     # abre http://localhost:4321
```

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga automática |
| `npm run build` | Genera la versión final en `dist/` |
| `npm run preview` | Previsualiza la versión compilada |
| `npm run check` | Revisa errores de TypeScript y Astro |

---

## 3. Cambiar tus datos

**Abre un solo archivo: `src/data/portfolio.ts`.**

| Qué | Dónde |
| --- | --- |
| Nombre, rol, correo, GitHub, foto | `site` |
| Franja negra (UT Cancún y cifras) | `band` |
| Texto de "Sobre mí", áreas y objetivos | `about` |
| Habilidades (cuadritos) | `skillGroups` |
| Trayectoria | `experience` |
| Proyectos, fotos y enlaces | `projects` |
| Filtros de proyectos | `projectFilters` |
| Textos de contacto y LinkedIn | `contact` |

### Agregar fotos a un proyecto

1. Guarda las imágenes en `public/images/proyectos/`
   (ej. `arcus-panel.jpg`). Tamaño recomendado: 1600 × 1000 px, en `.jpg` o `.webp`.
2. En `src/data/portfolio.ts`, busca el proyecto y llena `photos`:

```ts
photos: [
  { src: "/images/proyectos/arcus-panel.jpg", caption: "Panel con métricas" },
  { src: "/images/proyectos/arcus-calendario.jpg", caption: "Calendario de pagos" },
  { src: "/images/proyectos/arcus-login.jpg", caption: "Inicio de sesión con Google" },
],
```

- La **primera** foto es la portada de la tarjeta.
- Con **2 o más** fotos aparecen flechas, contador y puntos; en el celular se desliza.
- Al tocar una foto se abre en grande con su `caption`.

### Enlaces de los proyectos

```ts
repo: "https://github.com/...", // si está vacío, se muestra la nota (note)
repoLabel: "Ver GDD",           // opcional: texto del botón
note: "Repositorio privado",    // se muestra cuando no hay repo
```

### Categoría (para los filtros)

`category` puede ser `"web"`, `"iot"`, `"movil"` o `"juegos"`.

### Tu foto

Hay dos fotos en `site`:

- `photoCutout`: la del hero, **sin fondo** (PNG o WebP con transparencia, de
  al menos 1200 px de ancho). Se apoya en el borde inferior del panel negro.
- `photo`: una foto normal que aparece cuando compartes tu enlace en redes.

Ambas se muestran en blanco y negro. Si tu herramienta de recorte deja el fondo
blanco en vez de transparente, hay que quitarlo antes de usarla.

### LinkedIn

En `contact.linkedin` pon:

```ts
linkedin: { label: "LinkedIn", handle: "linkedin.com/in/tu-usuario", href: "https://www.linkedin.com/in/tu-usuario/" },
```

Aparece en Contacto y en el pie.

---

## 4. Cambiar colores y tipografías

- **Colores:** al inicio de `src/styles/global.css`, en `:root`. Están
  agrupados (fondos claros, tinta, fondos oscuros, texto sobre oscuro y
  `--error`). Si cambias uno, revisa que el texto siga leyéndose bien
  (contraste mínimo 4.5:1).
- **Tipografías:** se cargan desde Google Fonts en `src/layouts/Layout.astro`
  (Raleway y Montserrat). Si cambias una, actualiza el `<link>` y los
  `font:` de `global.css`.

---

## 5. Estructura del proyecto

```
PortafolioTactico/
├─ public/
│  ├─ favicon.svg
│  └─ images/              ← tu foto, portadas y fotos de proyectos
├─ src/
│  ├─ components/
│  │  ├─ Nav.astro           Barra de navegación y menú móvil
│  │  ├─ Hero.astro          Portada partida en diagonal
│  │  ├─ Band.astro          Franja negra (UT Cancún y cifras)
│  │  ├─ About.astro         Sobre mí, áreas y objetivos
│  │  ├─ Skills.astro        Habilidades y trayectoria
│  │  ├─ Projects.astro      Proyectos y filtros
│  │  ├─ ProjectCard.astro   Tarjeta con galería de fotos
│  │  ├─ Lightbox.astro      Visor ampliado de fotos
│  │  ├─ Contact.astro       Formulario y datos de contacto
│  │  ├─ Footer.astro        Pie de página
│  │  ├─ BoxHead.astro       Título en recuadro
│  │  ├─ Divider.astro       Separador
│  │  └─ Icon.astro          Íconos SVG
│  ├─ data/portfolio.ts      ← TODOS TUS DATOS
│  ├─ layouts/Layout.astro   <head>, fuentes, metadatos
│  ├─ pages/index.astro      Página única
│  ├─ scripts/main.ts        Menú, filtros, galería, visor, formulario
│  └─ styles/global.css      Todo el diseño
├─ astro.config.mjs
├─ netlify.toml
└─ package.json
```

### Teclado y accesibilidad

- `Tab` recorre todos los enlaces y botones; el foco es visible.
- En el visor de fotos: `←` / `→` cambian de foto, `Escape` cierra.
- Con "Reducir movimiento" activado en el sistema, se desactivan las animaciones.

### Formulario de contacto

El sitio no tiene servidor, así que al enviar se abre la app de correo del
visitante con el mensaje ya escrito. Si falta un dato, aparece un mensaje junto
al campo y el cursor salta al primero que hay que corregir. Si en el futuro quieres que se envíe solo,
puedes usar un servicio como Formspree o Netlify Forms.

---

## 6. Compilar para producción

```bash
npm run build
npm run preview
```

---

## 7. Subirlo a internet

```bash
git add .
git commit -m "Describe tu cambio"
git push
```

### Vercel (recomendado)
1. https://vercel.com → entra con GitHub → **Add New → Project**.
2. Elige el repo `Portafolio` → **Deploy** (Astro se detecta solo).

### Netlify
1. https://netlify.com → **Add new site → Import an existing project**.
2. Elige el repo; `netlify.toml` ya trae `npm run build` y `dist`.

Cada `git push` a `main` vuelve a publicar el sitio.

---

## 8. Problemas comunes

| Problema | Solución |
| --- | --- |
| `npm` no se reconoce | Instala Node.js y reinicia la terminal. |
| Error de versión de Node | Necesitas Node 22.23.4 o superior. |
| El puerto 4321 está ocupado | `npm run dev -- --port 4322` |
| No se ve una foto | Debe estar en `public/` y la ruta empezar con `/images/...` |
| No aparece el botón "Ver código" | `repo` está vacío en `portfolio.ts`. |
| Las fuentes se ven distintas | Google Fonts necesita internet. |
