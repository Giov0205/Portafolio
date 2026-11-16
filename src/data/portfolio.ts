/**
 * ============================================================
 *  DATOS DEL PORTAFOLIO — edita SOLO este archivo
 * ============================================================
 *  Todo lo que aparece en pantalla vive aquí. No necesitas
 *  tocar los componentes para cambiar textos, proyectos,
 *  habilidades, redes o imágenes.
 *
 *  Los enlaces y datos marcados con "← CAMBIA ESTO" son
 *  ejemplos: reemplázalos por los tuyos.
 * ============================================================
 */

export type SectionId = "acerca" | "proyectos" | "habilidades" | "contacto";

/** Datos generales: nombre, rol, imágenes y contacto. */
export const site = {
  name: "GIOVANNI MEDINA",
  role: "DESARROLLADOR FULL STACK",
  callsign: "GIOV0205",
  city: "México", // ← CAMBIA ESTO por tu ciudad
  email: "medinagiovanni398@gmail.com",

  /**
   * IMAGEN DE FONDO
   * 1. Guarda tu foto en: public/images/
   * 2. Cambia la ruta aquí abajo (ej. "/images/mi-fondo.jpg")
   * La imagen se difumina y se oscurece automáticamente.
   */
  backgroundImage: "/images/fondo.svg",

  /** FOTO DE PERFIL: guarda tu foto en public/images/ y pon la ruta. */
  photo: "/images/perfil.svg",

  /** Texto del estado inferior de los paneles. */
  status: "ENLACE ESTABLE",
  systemVersion: "SISTEMA v2.4",
} as const;

/** Las 4 opciones del menú + su panel de vista previa (HUD). */
export const menuSections: {
  id: SectionId;
  index: string;
  label: string;
  title: string;
  description: string;
  stats: { label: string; value: string }[];
}[] = [
  {
    id: "acerca",
    index: "01",
    label: "ACERCA DE MÍ",
    title: "ACERCA DE MÍ",
    description:
      "Perfil, formación y objetivos. Quién está detrás de la terminal y hacia dónde va la misión.",
    stats: [
      { label: "CLASE", value: "FULL STACK" },
      { label: "ZONA", value: site.city.toUpperCase() },
    ],
  },
  {
    id: "proyectos",
    index: "02",
    label: "PROYECTOS",
    title: "PROYECTOS",
    description:
      "Misiones desplegadas: aplicaciones web, videojuegos y herramientas que ya están en el campo.",
    stats: [
      { label: "REGISTROS", value: "05 ACTIVOS" },
      { label: "ESTADO", value: "OPERATIVO" },
    ],
  },
  {
    id: "habilidades",
    index: "03",
    label: "HABILIDADES Y EXPERIENCIA",
    title: "HABILIDADES Y EXPERIENCIA",
    description:
      "Equipamiento técnico y registro de campañas: stack, herramientas y trayectoria.",
    stats: [
      { label: "PERFIL", value: "TÉCNICO" },
      { label: "NIVEL", value: "EN ASCENSO" },
    ],
  },
  {
    id: "contacto",
    index: "04",
    label: "CONTACTO Y REDES",
    title: "CONTACTO Y REDES",
    description:
      "Canal abierto para colaboraciones, proyectos freelance o una vacante en tu escuadrón.",
    stats: [
      { label: "CANAL", value: "ABIERTO" },
      { label: "RESPUESTA", value: "< 24 H" },
    ],
  },
];

/** SECCIÓN 01 — ACERCA DE MÍ */
export const about = {
  eyebrow: "SECCIÓN 01 — EXPEDIENTE",
  title: "ACERCA DE MÍ",
  intro:
    "Soy desarrollador full stack y me gusta construir productos completos: desde la interfaz que ve el usuario hasta la base de datos que la sostiene. También desarrollo videojuegos, así que mezclo la disciplina del software con la diversión del diseño interactivo.",
  paragraphs: [
    "Trabajo principalmente con JavaScript y TypeScript: React, Next.js y Astro en el frontend, y Node.js con NestJS en el backend. En el lado de los videojuegos uso Unity con C# y Blender para los modelos 3D.",
    "Disfruto convertir ideas sueltas en algo que se pueda usar: ordenar los datos, cuidar el detalle visual y dejar el código lo más claro posible para quien venga después.",
  ],
  school: {
    label: "FORMACIÓN",
    name: "Ingeniería en Sistemas Computacionales", // ← CAMBIA ESTO
    place: "Tu escuela / universidad", // ← CAMBIA ESTO
    period: "EN CURSO",
  },
  objectives: [
    {
      label: "OBJETIVO 01",
      text: "Consolidarme como desarrollador full stack, participando en productos reales de principio a fin.",
    },
    {
      label: "OBJETIVO 02",
      text: "Publicar un videojuego propio y aprender el ciclo completo: diseño, producción y lanzamiento.",
    },
    {
      label: "OBJETIVO 03",
      text: "Mantener un stack actualizado y compartir lo que aprendo con otros desarrolladores.",
    },
  ],
} as const;

/** SECCIÓN 02 — PROYECTOS (tarjetas tipo "misión") */
export type Project = {
  id: string;
  codename: string;
  name: string;
  status: string;
  description: string;
  tech: string[];
  image: string;
  repo: string;
  demo: string;
};

export const projects: Project[] = [
  {
    id: "arcus",
    codename: "MISIÓN 01",
    name: "ARCUS",
    status: "COMPLETADA",
    description:
      "Sistema interno de gestión de clientes y finanzas. Panel con métricas, control de pagos, reportes y autenticación. Funciona 100% local.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "SQLite"],
    image: "/images/proyecto-arcus.svg",
    repo: "", // ← CAMBIA ESTO: enlace del repositorio
    demo: "", // ← CAMBIA ESTO: enlace de la demo (si no hay, déjalo vacío)
  },
  {
    id: "dontpetme",
    codename: "MISIÓN 02",
    name: "DONTPETME",
    status: "COMPLETADA",
    description:
      "Videojuego 3D con estética cartoon donde el jugador debe sobrevivir a criaturas que no quieren que las toques. Incluye menús, mecánicas y assets propios.",
    tech: ["Unity", "C#", "Blender", "Game Design"],
    image: "/images/proyecto-dontpetme.svg",
    repo: "", // ← CAMBIA ESTO: enlace del repositorio
    demo: "", // ← CAMBIA ESTO: enlace de la demo (si no hay, déjalo vacío)
  },
  {
    id: "pokedex",
    codename: "MISIÓN 03",
    name: "POKEDEX APP",
    status: "COMPLETADA",
    description:
      "Aplicación móvil que consume la PokéAPI: listado, búsqueda, detalle de cada Pokémon y favoritos guardados en el dispositivo.",
    tech: ["React Native", "Expo", "TypeScript", "Axios"],
    image: "/images/proyecto-pokedex.svg",
    repo: "", // ← CAMBIA ESTO: enlace del repositorio
    demo: "", // ← CAMBIA ESTO: enlace de la demo (si no hay, déjalo vacío)
  },
  {
    id: "arcus-api",
    codename: "MISIÓN 04",
    name: "ARCUS API",
    status: "COMPLETADA",
    description:
      "API REST del sistema ARCUS: autenticación con JWT, roles, clientes, pagos y reportes. Documentada con Swagger y validación de datos.",
    tech: ["NestJS", "Prisma", "TypeScript", "JWT", "Swagger"],
    image: "/images/proyecto-api.svg",
    repo: "", // ← CAMBIA ESTO: enlace del repositorio
    demo: "", // ← CAMBIA ESTO: enlace de la demo (si no hay, déjalo vacío)
  },
  {
    id: "torneos",
    codename: "MISIÓN 05",
    name: "SISTEMA DE TORNEOS",
    status: "COMPLETADA",
    description:
      "Interfaz para administrar torneos de videojuegos: registro de equipos, brackets y seguimiento de partidas en una sola pantalla.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/images/proyecto-torneos.svg",
    repo: "", // ← CAMBIA ESTO: enlace del repositorio
    demo: "", // ← CAMBIA ESTO: enlace de la demo (si no hay, déjalo vacío)
  },
];

/** SECCIÓN 03 — HABILIDADES Y EXPERIENCIA */
export const skillGroups: {
  name: string;
  codename: string;
  skills: { name: string; level: number }[];
}[] = [
  {
    name: "FRONTEND",
    codename: "EQUIPO · A",
    skills: [
      { name: "HTML / CSS", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "React", level: 82 },
      { name: "Next.js / Astro", level: 78 },
      { name: "Tailwind CSS", level: 86 },
    ],
  },
  {
    name: "BACKEND",
    codename: "EQUIPO · B",
    skills: [
      { name: "Node.js", level: 78 },
      { name: "NestJS", level: 72 },
      { name: "Prisma / SQL", level: 75 },
      { name: "APIs REST", level: 82 },
      { name: "JWT / Auth", level: 70 },
    ],
  },
  {
    name: "VIDEOJUEGOS Y 3D",
    codename: "EQUIPO · C",
    skills: [
      { name: "Unity / C#", level: 75 },
      { name: "Blender", level: 70 },
      { name: "Diseño de niveles", level: 65 },
    ],
  },
  {
    name: "HERRAMIENTAS",
    codename: "EQUIPO · D",
    skills: [
      { name: "Git / GitHub", level: 84 },
      { name: "Vercel / Netlify", level: 76 },
      { name: "Figma", level: 65 },
      { name: "Expo", level: 72 },
    ],
  },
];

export type TimelineEntry = {
  period: string;
  title: string;
  place: string;
  description: string;
  tag: string;
};

export const experience: TimelineEntry[] = [
  {
    period: "2025",
    title: "Desarrollador Full Stack",
    place: "ARCUS · Proyecto propio",
    description:
      "Diseño y desarrollo del sistema de clientes y finanzas: frontend en Next.js, API en NestJS y base de datos SQLite.",
    tag: "ACTIVO",
  },
  {
    period: "2024",
    title: "Desarrollo de videojuego",
    place: "DontPetMe · Proyecto propio",
    description:
      "Programación de mecánicas, menús y sistemas de juego en Unity. Modelado y texturizado de assets en Blender.",
    tag: "COMPLETADO",
  },
  {
    period: "2024",
    title: "Desarrollo móvil",
    place: "Pokédex App · Proyecto propio",
    description:
      "Aplicación con React Native y Expo conectada a una API pública, con navegación, búsqueda y persistencia local.",
    tag: "COMPLETADO",
  },
  {
    period: "2023 — HOY",
    title: "Formación académica",
    place: "Ingeniería en Sistemas Computacionales", // ← CAMBIA ESTO
    description:
      "Estudios enfocados en programación, bases de datos, redes y desarrollo de software.",
    tag: "EN CURSO",
  },
];

/** SECCIÓN 04 — CONTACTO Y REDES */
export type Social = {
  label: string;
  handle: string;
  href: string;
  icon: "github" | "linkedin" | "mail" | "x" | "link";
  primary?: boolean;
};

export const socials: Social[] = [
  {
    label: "CORREO",
    handle: "medinagiovanni398@gmail.com",
    href: "mailto:medinagiovanni398@gmail.com",
    icon: "mail",
    primary: true,
  },
  {
    label: "GITHUB",
    handle: "github.com/Giov0205",
    href: "https://github.com/Giov0205",
    icon: "github",
  },
  {
    label: "LINKEDIN",
    handle: "linkedin.com/in/tu-usuario", // ← CAMBIA ESTO
    href: "https://www.linkedin.com/in/tu-usuario/", // ← CAMBIA ESTO
    icon: "linkedin",
  },
  {
    label: "X / TWITTER",
    handle: "@tu-usuario", // ← CAMBIA ESTO
    href: "https://x.com/tu-usuario", // ← CAMBIA ESTO
    icon: "x",
  },
];

/** Textos sueltos de la interfaz. */
export const ui = {
  terminal: "TAC-COM // TERMINAL PERSONAL",
  previewLabel: "TAC-COM // INTEL",
  previewTag: "VISTA PREVIA",
  menuHint: "↑ ↓ NAVEGAR · ENTER ACCEDER",
  footerDesktop: "SELECCIONA UNA OPCIÓN PARA ENTRAR",
  footerMobile: "TOCA UNA OPCIÓN PARA ENTRAR",
  back: "REGRESAR",
} as const;

