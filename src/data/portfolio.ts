/**
 * ============================================================
 *  DATOS DEL PORTAFOLIO — edita SOLO este archivo
 * ============================================================
 *  Todo lo que aparece en pantalla vive aquí. No necesitas
 *  tocar los componentes para cambiar textos, proyectos,
 *  habilidades, redes o imágenes.
 *
 *  Si un proyecto no tiene repositorio o demo, deja el enlace
 *  vacío ("") y el botón no aparece.
 * ============================================================
 */

export type SectionId = "acerca" | "proyectos" | "habilidades" | "contacto";

/** Datos generales: nombre, rol, imágenes y contacto. */
export const site = {
  name: "GIOVANNI MEDINA",
  role: "DESARROLLADOR FULL STACK",
  callsign: "GIOV0205",
  city: "Cancún, México",
  email: "medinagiovanni398@gmail.com",

  /**
   * IMAGEN DE FONDO
   * 1. Guarda tu imagen en: public/images/
   * 2. Cambia la ruta aquí abajo (ej. "/images/mi-fondo.jpg")
   * La imagen se difumina y se oscurece automáticamente.
   */
  backgroundImage: "/images/fondo.jpg",

  /** FOTO DE PERFIL: guarda tu foto en public/images/ y pon la ruta. */
  photo: "/images/perfil.jpg",

  /** Texto del estado inferior de los paneles. */
  status: "EN LÍNEA",
  systemVersion: "v2.0",
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
    description: "Quién soy, dónde estudio y qué me gusta construir.",
    stats: [
      { label: "ROL", value: "FULL STACK" },
      { label: "UBICACIÓN", value: "CANCÚN, MX" },
    ],
  },
  {
    id: "proyectos",
    index: "02",
    label: "PROYECTOS",
    title: "PROYECTOS",
    description:
      "Aplicaciones web, sistemas IoT, una app móvil y un videojuego en equipo.",
    stats: [
      { label: "PROYECTOS", value: "06" },
      { label: "ÁREAS", value: "WEB · IOT · JUEGOS" },
    ],
  },
  {
    id: "habilidades",
    index: "03",
    label: "HABILIDADES Y EXPERIENCIA",
    title: "HABILIDADES Y EXPERIENCIA",
    description:
      "Las tecnologías que he usado en mis proyectos y lo que he construido con ellas.",
    stats: [
      { label: "FRONTEND", value: "REACT · NEXT.JS" },
      { label: "BACKEND", value: "NODE · NESTJS" },
    ],
  },
  {
    id: "contacto",
    index: "04",
    label: "CONTACTO Y REDES",
    title: "CONTACTO Y REDES",
    description:
      "Escríbeme para prácticas profesionales, colaboraciones o proyectos.",
    stats: [
      { label: "CANAL", value: "CORREO" },
      { label: "ESTADO", value: "DISPONIBLE" },
    ],
  },
];

/** SECCIÓN 01 — ACERCA DE MÍ */
export const about = {
  eyebrow: "MÓDULO 01 — PERFIL",
  title: "ACERCA DE MÍ",
  intro:
    "Soy desarrollador full stack y me gusta construir productos completos: desde la interfaz que ve el usuario hasta la base de datos que la sostiene. También hago videojuegos, así que mezclo el desarrollo de software con el diseño interactivo.",
  paragraphs: [
    "Trabajo principalmente con JavaScript y TypeScript: React, Next.js y Astro en el frontend, y Node.js con Express y NestJS en el backend, con bases de datos PostgreSQL y SQLite. En videojuegos uso Unity y Blender, donde modelo y animo personajes.",
    "Me gusta convertir ideas sueltas en algo que se pueda usar: ordenar los datos, cuidar el detalle visual y dejar el código claro para quien venga después.",
  ],
  school: {
    label: "FORMACIÓN",
    name: "Universidad Tecnológica de Cancún",
    place: "Cancún, Quintana Roo",
    period: "EN CURSO",
  },
  objectives: [
    {
      label: "OBJETIVO 01",
      text: "Conseguir prácticas profesionales donde participe en productos reales de principio a fin.",
    },
    {
      label: "OBJETIVO 02",
      text: "Terminar y publicar DontPetMe junto con mi equipo.",
    },
    {
      label: "OBJETIVO 03",
      text: "Seguir mejorando como desarrollador full stack y compartir lo que aprendo.",
    },
  ],
} as const;

/** SECCIÓN 02 — PROYECTOS */
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
  /** Datos de la "caja" del juego. */
  genre: string;
  players: string;
  year: string;
  /** Color de la franja superior de la caja. */
  color: string;
};

export const projects: Project[] = [
  {
    id: "arcus",
    codename: "PROYECTO 01",
    name: "ARCUS",
    status: "EN USO",
    description:
      "Sistema de gestión de clientes y finanzas para asesores. Panel con métricas, control de pagos, metas mensuales, calendario y exportación a CSV. Inicio de sesión con Google y cada asesor ve solo sus propios clientes.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "SQLite", "Google OAuth"],
    image: "/images/proyecto-arcus.svg",
    repo: "", // Repositorio privado: si lo publicas, pon aquí el enlace.
    demo: "",
    genre: "WEB · FULL STACK",
    players: "1 JUGADOR",
    year: "2026",
    color: "#22d3ee",
  },
  {
    id: "agrosense",
    codename: "PROYECTO 02",
    name: "AGROSENSE",
    status: "TERMINADO",
    description:
      "Sistema IoT para monitorear parcelas: mapa interactivo de parcelas, historial de clima por minuto y gráficas de temperatura, humedad y lluvia. API propia con registro, inicio de sesión y pregunta de seguridad.",
    tech: ["React", "TypeScript", "Express", "PostgreSQL", "Sequelize", "JWT", "Mapbox", "Recharts"],
    image: "/images/proyecto-agrosense.svg",
    repo: "https://github.com/Giov0205/Clima-IOT",
    demo: "",
    genre: "IOT · FULL STACK",
    players: "1 JUGADOR",
    year: "2025",
    color: "#4ade80",
  },
  {
    id: "airguard",
    codename: "PROYECTO 03",
    name: "AIRGUARD",
    status: "TERMINADO",
    description:
      "Monitor de calidad del aire con sensores: lecturas en tiempo real con medidores y gráficas, y un panel de alertas que suena una alarma cuando los valores se salen del rango.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Express", "PostgreSQL", "JWT"],
    image: "/images/proyecto-airguard.svg",
    repo: "https://github.com/Giov0205/Sensor-IOT",
    demo: "",
    genre: "IOT · SENSORES",
    players: "1 JUGADOR",
    year: "2025",
    color: "#f59e0b",
  },
  {
    id: "dontpetme",
    codename: "PROYECTO 04",
    name: "DONTPETME",
    status: "EN DESARROLLO",
    description:
      "Videojuego de plataformas en equipo protagonizado por Mochi, un hámster. Modelo y animo en Blender a los personajes Mochi, Copo y Trufa, y trabajo en los niveles en Unity. Colaboramos con git usando ramas por función.",
    tech: ["Unity", "C#", "Blender", "Git", "Trabajo en equipo"],
    image: "/images/proyecto-dontpetme.svg",
    repo: "https://github.com/BryanChuc2509/GDD-DONT-PET-ME", // Documento de diseño del juego (GDD)
    demo: "",
    genre: "PLATAFORMAS 3D",
    players: "EN EQUIPO",
    year: "2026",
    color: "#c084fc",
  },
  {
    id: "pokedex-arena",
    codename: "PROYECTO 05",
    name: "POKÉDEX ARENA",
    status: "TERMINADO",
    description:
      "App móvil que consume la PokéAPI en tiempo real: pantalla de inicio animada, búsqueda por nombre, filtro por tipo, detalle con estadísticas y favoritos guardados en el teléfono. Actividad de la UT Cancún.",
    tech: ["React Native", "Expo", "JavaScript", "Axios", "AsyncStorage"],
    image: "/images/proyecto-pokedex.svg",
    repo: "", // Si lo subes a GitHub, pon aquí el enlace.
    demo: "",
    genre: "APP MÓVIL",
    players: "1 JUGADOR",
    year: "2026",
    color: "#f87171",
  },
  {
    id: "api-nestjs",
    codename: "PROYECTO 06",
    name: "API REST CON NESTJS",
    status: "TERMINADO",
    description:
      "API CRUD hecha con buenas prácticas de seguridad: validación y limpieza de datos, cabeceras seguras con Helmet y límite de peticiones para evitar abusos.",
    tech: ["NestJS", "TypeScript", "TypeORM", "PostgreSQL", "Helmet"],
    image: "/images/proyecto-api.svg",
    repo: "https://github.com/Giov0205/Backend-CRUD",
    demo: "",
    genre: "BACKEND · API",
    players: "1 JUGADOR",
    year: "2026",
    color: "#818cf8",
  },
];

/** SECCIÓN 03 — HABILIDADES (solo tecnologías que ya usé en mis proyectos) */
export const skillGroups: {
  name: string;
  codename: string;
  skills: string[];
}[] = [
  {
    name: "FRONTEND",
    codename: "GRUPO · A",
    skills: ["HTML / CSS", "JavaScript", "TypeScript", "React", "Next.js", "Astro", "Tailwind CSS"],
  },
  {
    name: "BACKEND",
    codename: "GRUPO · B",
    skills: ["Node.js", "Express", "NestJS", "PostgreSQL", "SQLite", "Sequelize / TypeORM", "APIs REST", "JWT / OAuth"],
  },
  {
    name: "MÓVIL",
    codename: "GRUPO · C",
    skills: ["React Native", "Expo", "PWA"],
  },
  {
    name: "VIDEOJUEGOS Y 3D",
    codename: "GRUPO · D",
    skills: ["Unity", "C#", "Blender", "Modelado y animación"],
  },
  {
    name: "HERRAMIENTAS",
    codename: "GRUPO · E",
    skills: ["Git / GitHub", "Vite", "Render"],
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
    period: "2026",
    title: "Desarrollo full stack",
    place: "ARCUS · Proyecto propio",
    description:
      "Sistema de clientes y finanzas en Next.js con SQLite, con inicio de sesión con Google y datos separados por asesor.",
    tag: "EN USO",
  },
  {
    period: "2026",
    title: "Desarrollo de videojuego en equipo",
    place: "DontPetMe · Proyecto en equipo",
    description:
      "Modelado y animación de personajes en Blender y trabajo en Unity, coordinando cambios con el equipo por medio de git.",
    tag: "EN DESARROLLO",
  },
  {
    period: "2026",
    title: "Desarrollo móvil y backend",
    place: "PokéDex Arena · API REST con NestJS",
    description:
      "App móvil con React Native y Expo conectada a una API pública, y una API CRUD en NestJS con validación y medidas de seguridad.",
    tag: "TERMINADO",
  },
  {
    period: "2025",
    title: "Proyectos IoT",
    place: "AgroSense · AirGuard",
    description:
      "Dos sistemas full stack para mostrar datos de sensores: mapas, gráficas, alertas e inicio de sesión con JWT.",
    tag: "TERMINADO",
  },
  {
    period: "EN CURSO",
    title: "Formación académica",
    place: "Universidad Tecnológica de Cancún",
    description: "Estudios universitarios en curso.",
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
  // Si tienes LinkedIn, descomenta esto y pon tu usuario:
  // {
  //   label: "LINKEDIN",
  //   handle: "linkedin.com/in/tu-usuario",
  //   href: "https://www.linkedin.com/in/tu-usuario/",
  //   icon: "linkedin",
  // },
];

/** Textos sueltos de la interfaz. */
export const ui = {
  terminal: "SISTEMA // PERFIL PERSONAL",
  previewLabel: "SISTEMA // MÓDULO",
  previewTag: "VISTA PREVIA",
  menuHint: "↑ ↓ NAVEGAR · ENTER ABRIR",
  footerDesktop: "SELECCIONA UN MÓDULO PARA CONTINUAR",
  footerMobile: "TOCA UN MÓDULO PARA CONTINUAR",
  back: "REGRESAR",
} as const;
