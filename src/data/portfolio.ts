/**
 * ============================================================
 *  DATOS DEL PORTAFOLIO — edita SOLO este archivo
 * ============================================================
 *  Todo lo que aparece en pantalla vive aquí: textos, proyectos,
 *  fotos de proyectos, habilidades, trayectoria y contacto.
 *
 *  - Si un proyecto no tiene repositorio, deja repo: "" y en su
 *    lugar se muestra la nota (note).
 *  - Las fotos de cada proyecto van en public/images/proyectos/
 *    y se listan en "photos". La primera es la portada.
 * ============================================================
 */

/** Datos generales. */
export const site = {
  name: "Giovanni Medina",
  role: "Desarrollador Full Stack / Videojuegos",
  tagline: "Construyo productos completos, de la interfaz a la base de datos. Cancún, México.",
  city: "Cancún, México",
  email: "medinagiovanni398@gmail.com",
  github: "https://github.com/Giov0205",
  githubHandle: "github.com/Giov0205",
  /** Foto sin fondo del hero (PNG o WebP con transparencia) en public/images/ */
  photoCutout: "/images/perfil-sin-fondo.webp",
  /** Foto normal: se usa como imagen al compartir el enlace en redes (og:image). */
  photo: "/images/perfil.jpg",
  description:
    "Giovanni Medina — Desarrollador full stack en Cancún. Proyectos web, IoT, móvil y videojuegos.",
} as const;

/** Franja negra bajo el hero. */
export const band = {
  title: "Universidad Tecnológica de Cancún",
  text: "Estudios universitarios en curso en Cancún, Quintana Roo. Busco prácticas profesionales donde participe en productos reales de principio a fin.",
  stats: [
    { value: "06", label: "Proyectos" },
    { value: "03", label: "Con código público" },
    { value: "4", label: "Áreas: web, IoT, móvil, juegos" },
  ],
  mark: "UT",
};

/** SOBRE MÍ */
export const about = {
  lead: "Soy desarrollador full stack y me gusta construir productos completos: desde la interfaz que ve el usuario hasta la base de datos que la sostiene. También hago videojuegos, así que mezclo el desarrollo de software con el diseño interactivo.",
  paragraphs: [
    "Trabajo principalmente con JavaScript y TypeScript: React, Next.js y Astro en el frontend, y Node.js con Express y NestJS en el backend, con bases de datos PostgreSQL y SQLite. En videojuegos uso Unity y Blender, donde modelo y animo personajes.",
    "Me gusta convertir ideas sueltas en algo que se pueda usar: ordenar los datos, cuidar el detalle visual y dejar el código claro para quien venga después.",
  ],
  services: [
    {
      icon: "code",
      title: "Frontend",
      text: "Interfaces en React, Next.js y Astro con TypeScript y Tailwind CSS, cuidando el detalle visual.",
    },
    {
      icon: "db",
      title: "Backend",
      text: "APIs REST con Node.js, Express y NestJS sobre PostgreSQL y SQLite, con autenticación JWT y OAuth.",
    },
    {
      icon: "pad",
      title: "Videojuegos y 3D",
      text: "Personajes modelados y animados en Blender y niveles construidos en Unity con C#.",
    },
  ],
} as const;

/** HABILIDADES — abbr es el texto del cuadrito; name, el nombre completo. */
export const skillGroups: { name: string; skills: { abbr: string; name: string }[] }[] = [
  {
    name: "Frontend",
    skills: [
      { abbr: "</>", name: "HTML / CSS" },
      { abbr: "JS", name: "JavaScript" },
      { abbr: "TS", name: "TypeScript" },
      { abbr: "Re", name: "React" },
      { abbr: "Nx", name: "Next.js" },
      { abbr: "As", name: "Astro" },
      { abbr: "Tw", name: "Tailwind CSS" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { abbr: "No", name: "Node.js" },
      { abbr: "Ex", name: "Express" },
      { abbr: "Ns", name: "NestJS" },
      { abbr: "Pg", name: "PostgreSQL" },
      { abbr: "Sq", name: "SQLite" },
      { abbr: "Or", name: "Sequelize / TypeORM" },
      { abbr: "{ }", name: "APIs REST" },
      { abbr: "Jw", name: "JWT / OAuth" },
    ],
  },
  {
    name: "Móvil",
    skills: [
      { abbr: "Rn", name: "React Native" },
      { abbr: "Ex", name: "Expo" },
      { abbr: "Pw", name: "PWA" },
    ],
  },
  {
    name: "Videojuegos y 3D",
    skills: [
      { abbr: "Un", name: "Unity" },
      { abbr: "C#", name: "C#" },
      { abbr: "Bl", name: "Blender" },
      { abbr: "3D", name: "Modelado y animación" },
    ],
  },
  {
    name: "Herramientas",
    skills: [
      { abbr: "Git", name: "Git / GitHub" },
      { abbr: "Vi", name: "Vite" },
      { abbr: "Rd", name: "Render" },
    ],
  },
];

/** TRAYECTORIA */
export type TimelineEntry = {
  period: string;
  tag: string;
  title: string;
  place: string;
  description: string;
};

export const experience: TimelineEntry[] = [
  {
    period: "2026",
    tag: "En uso",
    title: "Desarrollo full stack",
    place: "ARCUS · Proyecto propio",
    description:
      "Sistema de clientes y finanzas en Next.js con SQLite, con inicio de sesión con Google y datos separados por asesor.",
  },
  {
    period: "2026",
    tag: "En desarrollo",
    title: "Desarrollo de videojuego en equipo",
    place: "DontPetMe · Proyecto en equipo",
    description:
      "Modelado y animación de personajes en Blender y trabajo en Unity, coordinando cambios con el equipo por medio de git.",
  },
  {
    period: "2026",
    tag: "Terminado",
    title: "Desarrollo móvil y backend",
    place: "Pokédex Arena · API REST con NestJS",
    description:
      "App móvil con React Native y Expo conectada a una API pública, y una API CRUD en NestJS con validación y medidas de seguridad.",
  },
  {
    period: "2025",
    tag: "Terminado",
    title: "Proyectos IoT",
    place: "AgroSense · AirGuard",
    description:
      "Dos sistemas full stack para mostrar datos de sensores: mapas, gráficas, alertas e inicio de sesión con JWT.",
  },
  {
    period: "En curso",
    tag: "En curso",
    title: "Formación académica",
    place: "Universidad Tecnológica de Cancún",
    description: "Estudios universitarios en curso.",
  },
];

/** PROYECTOS */
export type ProjectCategory = "web" | "iot" | "movil" | "juegos";

export type Photo = {
  /** Ruta dentro de public/, ej. "/images/proyectos/arcus-panel.jpg" */
  src: string;
  /** Texto que se ve en el visor ampliado (y texto alternativo). */
  caption: string;
};

export type Project = {
  id: string;
  name: string;
  category: ProjectCategory;
  area: string;
  year: string;
  status: string;
  description: string;
  tech: string[];
  /**
   * FOTOS DEL PROYECTO
   * 1. Guarda las imágenes en public/images/proyectos/
   * 2. Agrégalas aquí: { src: "/images/proyectos/arcus-1.jpg", caption: "Panel con métricas" }
   * La primera es la portada. Con 2 o más, la tarjeta se vuelve galería.
   */
  photos: Photo[];
  repo: string;
  /** Texto del botón del repositorio (por defecto "Ver código"). */
  repoLabel?: string;
  /** Se muestra cuando no hay repo. */
  note?: string;
};

export const projectFilters: { id: "todos" | ProjectCategory; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "web", label: "Web" },
  { id: "iot", label: "IoT" },
  { id: "movil", label: "Móvil" },
  { id: "juegos", label: "Videojuegos" },
];

export const projects: Project[] = [
  {
    id: "arcus",
    name: "ARCUS",
    category: "web",
    area: "Web · Full stack",
    year: "2026",
    status: "En uso",
    description:
      "Sistema de gestión de clientes y finanzas para asesores. Panel con métricas, control de pagos, metas mensuales, calendario y exportación a CSV. Inicio de sesión con Google y cada asesor ve solo sus propios clientes.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "SQLite", "Google OAuth"],
    photos: [
      { src: "/images/proyecto-arcus.svg", caption: "ARCUS — portada provisional" },
    ],
    repo: "", // Repositorio privado: si lo publicas, pon aquí el enlace.
    note: "Repositorio privado",
  },
  {
    id: "agrosense",
    name: "AgroSense",
    category: "iot",
    area: "IoT · Full stack",
    year: "2025",
    status: "Terminado",
    description:
      "Sistema IoT para monitorear parcelas: mapa interactivo, historial de clima por minuto y gráficas de temperatura, humedad y lluvia. API propia con registro, inicio de sesión y pregunta de seguridad.",
    tech: ["React", "TypeScript", "Express", "PostgreSQL", "Sequelize", "JWT", "Mapbox", "Recharts"],
    photos: [
      { src: "/images/proyecto-agrosense.svg", caption: "AgroSense — portada provisional" },
    ],
    repo: "https://github.com/Giov0205/Clima-IOT",
  },
  {
    id: "airguard",
    name: "AirGuard",
    category: "iot",
    area: "IoT · Sensores",
    year: "2025",
    status: "Terminado",
    description:
      "Monitor de calidad del aire con sensores: lecturas en tiempo real con medidores y gráficas, y un panel de alertas que suena una alarma cuando los valores se salen del rango.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Express", "PostgreSQL", "JWT"],
    photos: [
      { src: "/images/proyecto-airguard.svg", caption: "AirGuard — portada provisional" },
    ],
    repo: "https://github.com/Giov0205/Sensor-IOT",
  },
  {
    id: "dontpetme",
    name: "DontPetMe",
    category: "juegos",
    area: "Videojuego · Plataformas 3D",
    year: "2026",
    status: "En desarrollo",
    description:
      "Videojuego de plataformas en equipo protagonizado por Mochi, un hámster. Modelo y animo en Blender a los personajes Mochi, Copo y Trufa, y trabajo en los niveles en Unity. Colaboramos con git usando ramas por función.",
    tech: ["Unity", "C#", "Blender", "Git", "Trabajo en equipo"],
    photos: [
      { src: "/images/proyecto-dontpetme.svg", caption: "DontPetMe — portada provisional" },
    ],
    repo: "https://github.com/BryanChuc2509/GDD-DONT-PET-ME", // Documento de diseño del juego (GDD)
    repoLabel: "Ver GDD",
  },
  {
    id: "pokedex-arena",
    name: "Pokédex Arena",
    category: "movil",
    area: "App móvil",
    year: "2026",
    status: "Terminado",
    description:
      "App móvil que consume la PokéAPI en tiempo real: pantalla de inicio animada, búsqueda por nombre, filtro por tipo, detalle con estadísticas y favoritos guardados en el teléfono. Actividad de la UT Cancún.",
    tech: ["React Native", "Expo", "JavaScript", "Axios", "AsyncStorage"],
    photos: [
      { src: "/images/proyecto-pokedex.svg", caption: "Pokédex Arena — portada provisional" },
    ],
    repo: "", // Si lo subes a GitHub, pon aquí el enlace.
    note: "Sin repositorio público",
  },
  {
    id: "api-nestjs",
    name: "API REST con NestJS",
    category: "web",
    area: "Backend · API",
    year: "2026",
    status: "Terminado",
    description:
      "API CRUD hecha con buenas prácticas de seguridad: validación y limpieza de datos, cabeceras seguras con Helmet y límite de peticiones para evitar abusos.",
    tech: ["NestJS", "TypeScript", "TypeORM", "PostgreSQL", "Helmet"],
    photos: [
      { src: "/images/proyecto-api.svg", caption: "API REST con NestJS — portada provisional" },
    ],
    repo: "https://github.com/Giov0205/Backend-CRUD",
  },
];

/** CONTACTO */
export const contact = {
  intro: "¿Tienes una idea, un proyecto o una vacante? Escríbeme y coordinamos.",
  status: "Disponible",
  statusText: "Para prácticas profesionales, colaboraciones y proyectos.",
  /** Si tienes LinkedIn, agrégalo: { label: "LinkedIn", handle: "linkedin.com/in/tu-usuario", href: "https://www.linkedin.com/in/tu-usuario/" } */
  linkedin: null as null | { label: string; handle: string; href: string },
};
