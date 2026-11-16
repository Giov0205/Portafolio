# Portafolio Táctico — Astro + Tailwind CSS

Portafolio personal con estética de **menú principal de videojuego táctico**:
fondo oscuro, acento rojo, paneles HUD con esquinas marcadas, scanlines y
navegación por teclado como en un menú de shooter.

- **Framework:** Astro 7 (salida 100% estática)
- **Estilos:** Tailwind CSS 4
- **JavaScript:** solo un archivo pequeño (~4 KB) para el menú. Sin React ni frameworks de cliente.
- **Contenido:** todo vive en `src/data/portfolio.ts`.
- **Idioma:** español.

---

## 1. Requisitos

Antes de empezar necesitas:

1. **Node.js 22 o superior** → https://nodejs.org
   Comprueba tu versión en una terminal:
   ```bash
   node --version
   ```
2. **Un editor de código** (VS Code es gratis) → https://code.visualstudio.com
3. **Git** (para subirlo a GitHub) → https://git-scm.com

> En Windows, abre **PowerShell** o la terminal de VS Code dentro de la carpeta
> del proyecto.

---

## 2. Correrlo en tu computadora

Abre la terminal en la carpeta `PortafolioTactico` y ejecuta:

```bash
# 1. Instalar las dependencias (solo la primera vez)
npm install

# 2. Levantar el servidor de desarrollo
npm run dev
```

Abre **http://localhost:4321** en el navegador. Cada vez que guardes un archivo,
la página se actualiza sola.

Para detener el servidor: `Ctrl + C`.

### Otros comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga automática |
| `npm run build` | Genera la versión final en la carpeta `dist/` |
| `npm run preview` | Previsualiza la versión final compilada |
| `npm run check` | Revisa errores de TypeScript y Astro |

---

## 3. Personalizar tus datos (lo más importante)

**Abre un solo archivo: `src/data/portfolio.ts`.**

Ahí están:

| Qué | Dónde |
| --- | --- |
| Nombre, rol, ciudad, correo | `site` |
| Opciones del menú y panel de vista previa | `menuSections` |
| Foto, descripción, escuela, objetivos | `about` |
| Proyectos (nombre, descripción, tecnologías, enlaces) | `projects` |
| Habilidades y niveles (0 a 100) | `skillGroups` |
| Experiencia / línea de tiempo | `experience` |
| Redes sociales y correo | `socials` |
| Textos de la interfaz | `ui` |

Los comentarios `// ← CAMBIA ESTO` te marcan los datos de ejemplo.

### Poner tus enlaces de proyectos

En cada proyecto hay dos campos:

```ts
repo: "", // enlace de GitHub
demo: "", // enlace de la demo en vivo
```

Si los dejas vacíos, el botón aparece desactivado. Si pegas una URL completa
(`https://...`), el botón se activa automáticamente.

### Poner tu foto y tu fondo

1. Guarda tus imágenes dentro de `public/images/`.
   - Fondo: por ejemplo `mi-fondo.jpg` (idealmente 1600 × 900 px o más).
   - Foto: por ejemplo `mi-foto.jpg` (idealmente vertical, 600 × 720 px).
2. Cambia las rutas en `src/data/portfolio.ts`:

```ts
backgroundImage: "/images/mi-fondo.jpg",
photo: "/images/mi-foto.jpg",
```

La imagen de fondo se difumina y se oscurece automáticamente con las capas del
componente `TacticalBackground.astro`. No necesitas editarla.

### Imágenes de los proyectos

Los archivos de ejemplo están en `public/images/proyecto-*.svg`. Reemplázalos
por capturas reales (`.jpg` o `.png`) y actualiza la ruta `image` de cada
proyecto.

---

## 4. Cambiar colores y tipografías

- **Colores:** `src/styles/global.css`, bloque `@theme` al inicio.
  - `--color-accent`: rojo de acentos (por defecto `#e11d2e`).
  - `--color-blood`: rojo oscuro de fondos.
  - `--color-void`: negro base.
- **Tipografías:** se cargan desde Google Fonts en `src/layouts/Layout.astro`.
  - Rajdhani: interfaz.
  - Teko: títulos grandes.
  - JetBrains Mono: etiquetas HUD.
  - Si quieres cambiar una, actualiza el `<link>` de Google Fonts y las variables
    `--font-display`, `--font-title` o `--font-mono` en `global.css`.
- **Esquinas HUD:** variable `--hud-corner` en `global.css` (tamaño de los
  brackets).

---

## 5. Estructura del proyecto

```
PortafolioTactico/
├─ public/
│  ├─ favicon.svg
│  └─ images/                  ← tus fotos e imágenes
├─ src/
│  ├─ components/
│  │  ├─ TacticalBackground.astro   Fondo: foto + capa oscura + ruido + scanlines
│  │  ├─ Header.astro               Nombre con degradado plateado y rol
│  │  ├─ MainMenu.astro             Menú vertical de 4 opciones
│  │  ├─ PreviewPanel.astro         Panel HUD que cambia según la opción
│  │  ├─ SectionShell.astro         Marco común de las secciones (botón REGRESAR)
│  │  ├─ AboutSection.astro         Sección 01
│  │  ├─ ProjectsSection.astro      Sección 02
│  │  ├─ SkillsSection.astro        Sección 03
│  │  └─ ContactSection.astro       Sección 04
│  ├─ data/
│  │  └─ portfolio.ts               ← TODOS TUS DATOS
│  ├─ layouts/
│  │  └─ Layout.astro               <head>, fuentes, metadatos
│  ├─ pages/
│  │  └─ index.astro                Página única que une todo
│  ├─ scripts/
│  │  └─ main.ts                    Menú, teclado, foco y navegación
│  └─ styles/
│     └─ global.css                 Tema, HUD, animaciones y accesibilidad
├─ astro.config.mjs
├─ netlify.toml
└─ package.json
```

### Cómo funciona la navegación

Es una sola página. Las cuatro secciones ya existen en el HTML, pero están
ocultas. Al elegir una opción, el script:

1. Oculta el menú y muestra la sección.
2. Cambia la URL a `#acerca`, `#proyectos`, etc. (puedes compartir el enlace).
3. Mueve el foco al título de la sección para lectores de pantalla.
4. `Escape` o el botón `REGRESAR` vuelven al menú.
5. El botón "atrás" del navegador también funciona.

### Teclado

- `↑` / `↓` (o `←` / `→`): mover la selección.
- `Enter` o `Espacio`: entrar a la sección.
- `Escape`: regresar al menú.
- `Tab`: recorrer los elementos interactivos.
- El enlace "SALTAR AL CONTENIDO" aparece al tabular desde el inicio.

### Movimiento reducido

Si el sistema operativo tiene activado **"Reducir movimiento"**, las
animaciones, el parpadeo y el desplazamiento suave se desactivan mediante
`@media (prefers-reduced-motion: reduce)` en `global.css`.

---

## 6. Compilar para producción

```bash
npm run build
```

Se crea la carpeta `dist/` con el sitio estático (HTML, CSS e imágenes). Esa es
la carpeta que se publica.

Para revisarlo localmente antes de subirlo:

```bash
npm run preview
```

---

## 7. Subirlo gratis a internet

### Paso previo: crear el repositorio en GitHub

1. Crea una cuenta en https://github.com si aún no tienes.
2. Entra a **github.com/new**.
3. Nombre del repositorio: `portafolio-tactico` (o el que quieras).
4. **No** marques "Add a README" (ya tienes uno).
5. Pulsa **Create repository**.
6. En la terminal, dentro de la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Portafolio táctico con Astro y Tailwind"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/portafolio-tactico.git
git push -u origin main
```

> Cambia `TU-USUARIO` por tu usuario real de GitHub.
> La primera vez puede pedirte iniciar sesión.

A partir de aquí, cada cambio se sube con:

```bash
git add .
git commit -m "Actualizo proyectos"
git push
```

---

### Opción A — Vercel (recomendado)

1. Entra a https://vercel.com y regístrate con **GitHub**.
2. Pulsa **Add New → Project**.
3. Autoriza a Vercel a ver tus repositorios.
4. Elige `portafolio-tactico` e **Import**.
5. Vercel detecta Astro automáticamente:
   - **Framework Preset:** Astro
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Pulsa **Deploy** y espera unos segundos.
7. Te dará una URL gratis tipo `portafolio-tactico.vercel.app`.

Cada `git push` a `main` vuelve a desplegar el sitio automáticamente.

**Dominio propio (opcional):** Project → Settings → Domains → Add.

---

### Opción B — Netlify

1. Entra a https://netlify.com y regístrate con **GitHub**.
2. Pulsa **Add new site → Import an existing project**.
3. Elige **GitHub** y selecciona `portafolio-tactico`.
4. Netlify leerá `netlify.toml` y usará:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node:** 22
5. Pulsa **Deploy site**.
6. Te dará una URL gratis tipo `nombre-aleatorio.netlify.app`.
7. Puedes cambiar el nombre en Site configuration → Site details → Change site name.

También se vuelve a publicar con cada `git push`.

---

## 8. Problemas comunes

| Problema | Solución |
| --- | --- |
| `npm` no se reconoce | Instala Node.js y reinicia la terminal. |
| Error de versión de Node | Necesitas Node 22 o superior (`node --version`). |
| El puerto 4321 está ocupado | `npm run dev -- --port 4322` y abre ese puerto. |
| No se ve mi imagen | Debe estar en `public/images/` y la ruta debe empezar con `/images/`. |
| Las fuentes se ven distintas | Google Fonts necesita internet. Sin conexión se usan fuentes del sistema. |
| Los botones de proyecto están desactivados | Pega las URLs en `src/data/portfolio.ts`. |
| Cambié datos y no veo nada | Guarda el archivo y revisa la terminal; si hay un error de sintaxis, aparece ahí. |

---

## 9. Siguientes pasos sugeridos

- Reemplazar todos los `// ← CAMBIA ESTO` por tus datos reales.
- Añadir capturas reales de ARCUS, DontPetMe y tus demás proyectos.
- Cambiar `site` en `astro.config.mjs` por tu dominio final.
- Añadir una imagen para compartir en redes (`og:image`) en `Layout.astro`.
- Crear un `robots.txt` y un `sitemap.xml` si quieres mejorar el SEO.
- Subir el proyecto a GitHub y desplegarlo en Vercel o Netlify.

---

Hecho con Astro + Tailwind CSS. Interfaz inspirada en menús tácticos de
videojuegos.
