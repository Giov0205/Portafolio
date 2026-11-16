# Portafolio HUD — Astro + Tailwind CSS

Portafolio personal con estética de **menú de consola / HUD futurista**: fondo
oscuro azulado, acento cian, paneles con esquinas marcadas, scanlines, una
tienda de proyectos con cajas que se voltean y navegación con teclado, mouse o
control de consola.

- **Framework:** Astro 7 (salida 100 % estática)
- **Estilos:** Tailwind CSS 4
- **JavaScript:** dos archivos pequeños (`main.ts` y `gamepad.ts`, ~7 KB en total). Sin React ni frameworks de cliente.
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
| Proyectos (textos, tecnologías, caja y enlaces) | `projects` |
| Tecnologías por área | `skillGroups` |
| Experiencia / línea de tiempo | `experience` |
| Redes sociales y correo | `socials` |
| Textos de la interfaz | `ui` |

### Los proyectos son cajas de juego

Cada proyecto del arreglo `projects` se dibuja como una caja con portada y
contraportada. Además de los textos, cada uno tiene datos de la caja:

```ts
{
  id: "mi-proyecto",
  name: "MI PROYECTO",
  genre: "WEB · FULL STACK",   // etiqueta superior
  players: "1 JUGADOR",        // texto inferior izquierdo
  year: "2026",                // año en la franja
  status: "TERMINADO",         // etiqueta de estado
  color: "#22d3ee",            // color de la franja y acentos de esa caja
  image: "/images/mi-proyecto.jpg",
  repo: "",
  demo: "",
  // …
}
```

### Poner tus enlaces de proyectos

```ts
repo: "", // enlace de GitHub
demo: "", // enlace de la demo en vivo
```

Si dejas un campo vacío, **ese botón no aparece** en la contraportada. Si pegas
una URL completa (`https://...`), el botón se muestra automáticamente.

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

> Todo lo que pongas en `public/images/` se publica tal cual. Borra las imágenes
> que no uses para que el sitio pese menos.

### Portadas de los proyectos

Los archivos de ejemplo están en `public/images/proyecto-*.svg`. Reemplázalos
por capturas reales (`.jpg` o `.png`) y actualiza la ruta `image` de cada
proyecto.

### Tecnologías y experiencia

`skillGroups` es una lista de áreas con una lista de tecnologías (solo texto, se
muestran como chips). `experience` es la línea de tiempo: periodo, título, lugar,
descripción y etiqueta.

---

## 4. Cambiar colores y tipografías

- **Colores:** `src/styles/global.css`, bloque `@theme` al inicio.
  - `--color-accent`: cian de acentos (por defecto `#22d3ee`).
  - `--color-accent-soft`: cian claro para etiquetas (`#67e8f9`).
  - `--color-blood`: azul profundo de fondos (`#0b3a4a`).
  - `--color-void`: negro azulado base (`#04080d`).
  - Si cambias el acento, revisa también las referencias
    `rgba(34, 211, 238, …)` del mismo archivo y los `color` de cada proyecto.
- **Tipografías:** se cargan desde Google Fonts en `src/layouts/Layout.astro`.
  - Rajdhani: interfaz.
  - Teko: títulos grandes.
  - JetBrains Mono: etiquetas HUD.
  - Si quieres cambiar una, actualiza el `<link>` de Google Fonts y las variables
    `--font-display`, `--font-title` o `--font-mono` en `global.css`.
- **Esquinas HUD:** variable `--hud-corner` en `global.css` (tamaño de los
  brackets).

### Atmósfera del fondo

El fondo tiene capas sutiles sobre la foto: aurora cian, neblina, un pulso de
telemetría y polvo en suspensión. Si quieres ajustarlas, edita `opacity` en
`global.css`:

- `.fx-aurora` → intensidad de las manchas de luz.
- `.fx-fog` → neblina.
- `.fx-pulse` → latido de brillo.
- `.fx-dust` → polvo (se oculta solo en móvil).

Con "Reducir movimiento" activado las capas se quedan quietas, así que el fondo
sigue teniendo profundidad sin animarse.

---

## 5. Estructura del proyecto

```
PortafolioTactico/
├─ public/
│  ├─ favicon.svg
│  └─ images/                       ← tus fotos e imágenes
├─ src/
│  ├─ components/
│  │  ├─ TacticalBackground.astro   Fondo: foto + tintes + rejilla + scanlines
│  │  ├─ Header.astro               Nombre con degradado plateado y rol
│  │  ├─ MainMenu.astro             Menú vertical de 4 opciones
│  │  ├─ PreviewPanel.astro         Panel HUD que cambia según la opción
│  │  ├─ SectionShell.astro         Marco común de las secciones (botón REGRESAR)
│  │  ├─ AboutSection.astro         Módulo 01
│  │  ├─ ProjectsSection.astro      Módulo 02: tienda de cajas de juego
│  │  ├─ SkillsSection.astro        Módulo 03: chips de stack y trayectoria
│  │  ├─ ContactSection.astro       Módulo 04: redes y copiar correo
│  │  ├─ PadIcon.astro              Símbolos ✕ ○ □ △ y cruceta
│  │  └─ ButtonPrompts.astro        Barra inferior de guías de botones
│  ├─ data/
│  │  └─ portfolio.ts               ← TODOS TUS DATOS
│  ├─ layouts/
│  │  └─ Layout.astro               <head>, fuentes, metadatos
│  ├─ pages/
│  │  └─ index.astro                Página única que une todo
│  ├─ scripts/
│  │  ├─ main.ts                    Menú, teclado, foco, volteo y acciones
│  │  └─ gamepad.ts                 Lectura del control de consola
│  └─ styles/
│     └─ global.css                 Tema, HUD, tienda, animaciones y accesibilidad
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

### Cajas de proyecto

- Haz clic en una portada para **voltearla** y ver la contraportada.
- `Enter` también la voltea cuando está enfocada.
- `○` o `Escape` cierran la caja abierta (y, si no hay ninguna, vuelven al menú).
- `△` abre el repositorio de la caja activa; `□` copia tu correo.

### Teclado

- `↑` / `↓` (o `←` / `→`): mover la selección.
- `Enter` o `Espacio`: entrar a la sección o voltear la caja.
- `Escape`: cerrar la caja / regresar al menú.
- `Tab`: recorrer los elementos interactivos.
- El enlace "SALTAR AL CONTENIDO" aparece al tabular desde el inicio.

### Control de consola (opcional)

Conecta un mando de PS5, PS4, Xbox o similar por cable o Bluetooth y **presiona
un botón** para que el navegador lo detecte (Chrome o Edge en escritorio).

- Cruceta o palanca izquierda: navegar.
- `✕`: abrir / voltear / activar.
- `○`: cerrar caja o volver al menú.
- `△`: abrir el repositorio del proyecto.
- `□`: copiar el correo.

La barra inferior de guías también aparece en escritorio (pantallas de 640 px o
más con puntero) y sus botones se pueden pulsar con clic. En móvil o Safari el
mando no está soportado.

### Movimiento reducido

Si el sistema operativo tiene activado **"Reducir movimiento"**, las
animaciones, el parpadeo, el volteo de cajas y el desplazamiento suave se
desactivan mediante `@media (prefers-reduced-motion: reduce)` en `global.css`.

---

## 6. Compilar para producción

```bash
npm run build
```

Se crea la carpeta `dist/` con el sitio estático (HTML, CSS, JS e imágenes). Esa
es la carpeta que se publica.

Para revisarlo localmente antes de subirlo:

```bash
npm run preview
```

---

## 7. Subirlo gratis a internet

### Paso previo: el repositorio en GitHub

El proyecto ya tiene el remoto `origin` apuntando a
`https://github.com/Giov0205/Portafolio.git` y la rama `main` sigue a
`origin/main`. Para subir los commits:

```bash
git push -u origin main
```

> La primera vez puede pedirte iniciar sesión en GitHub.

Si algún día creas el repositorio desde cero, el flujo sería:

```bash
git init
git add .
git commit -m "Portafolio HUD con Astro y Tailwind"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/portafolio-tactico.git
git push -u origin main
```

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
| El fondo se ve muy oscuro o muy cargado | Ajusta `opacity` de `.fx-photo` y el alfa de `.fx-tint` en `global.css`. |
| Las fuentes se ven distintas | Google Fonts necesita internet. Sin conexión se usan fuentes del sistema. |
| No aparece el botón CÓDIGO o DEMO | La URL está vacía en `src/data/portfolio.ts`. |
| El control no responde | Presiona un botón después de conectarlo; usa Chrome o Edge en escritorio. |
| El sitio pesa mucho | Revisa `public/images/`: todo lo que está ahí se publica. |
| El fondo se anima demasiado o no se nota | Ajusta `opacity` de `.fx-aurora`, `.fx-fog`, `.fx-pulse` y `.fx-dust` en `global.css`. |
| Cambié datos y no veo nada | Guarda el archivo y revisa la terminal; si hay un error de sintaxis, aparece ahí. |

---

## 9. Siguientes pasos sugeridos

- Reemplazar las portadas de ejemplo por capturas reales de cada proyecto.
- Añadir LinkedIn a `socials` si quieres mostrarlo.
- Borrar de `public/images/` las imágenes que no uses.
- Cambiar `site` en `astro.config.mjs` por tu dominio final.
- Añadir una imagen para compartir en redes (`og:image`) en `Layout.astro`.
- Crear un `robots.txt` y un `sitemap.xml` si quieres mejorar el SEO.
- Subir el proyecto a GitHub y desplegarlo en Vercel o Netlify.

---

Hecho con Astro + Tailwind CSS. Interfaz inspirada en menús de consola y HUD
de videojuegos.
