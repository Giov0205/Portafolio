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
  /** CV en PDF dentro de public/. Para actualizarlo, reemplaza el archivo con el mismo nombre. */
  cv: "/cv/CV_Giovanni_Medina.pdf",
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
  text: "Estudios universitarios en curso en Cancún, Quintana Roo. Me gusta construir productos reales de principio a fin.",
  stats: [
    { value: "07", label: "Proyectos" },
    { value: "02", label: "Con código público" },
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
    tag: "Terminado",
    title: "Desarrollo de videojuego en equipo",
    place: "DontPetMe · Proyecto en equipo",
    description:
      "Modelado y animación de personajes en Blender y trabajo en Unity, coordinando cambios con el equipo por medio de git.",
  },
  {
    period: "2026",
    tag: "Terminado",
    title: "Desarrollo móvil",
    place: "Brawl Dex · App de Brawl Stars",
    description:
      "App móvil con React Native y Expo conectada a la API pública de Brawlify, con buscador, filtros y favoritos.",
  },
  {
    period: "2025",
    tag: "Terminado",
    title: "Desarrollo full stack",
    place: "EbenConta · Sistema contable",
    description:
      "Sistema para contadores en React y Express con PostgreSQL: lectura de facturas XML, cálculo de ingresos, egresos e IVA, tablero con gráficas y vencimientos, y verificación en dos pasos por correo.",
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
  /** Una línea: qué es o qué hace el proyecto. */
  summary: string;
  /** Una línea: qué hice yo. Se ve en la fila del proyecto. */
  role: string;
  /** Ficha de detalles: el reto, qué hice (completo) y el resultado. */
  story: { reto: string; hice: string; resultado: string };
  /** true = fila grande con galería; false = lista compacta de "Más proyectos". */
  featured?: boolean;
  tech: string[];
  /**
   * FOTOS DEL PROYECTO
   * 1. Guarda las imágenes en public/images/proyectos/
   * 2. Agrégalas aquí: { src: "/images/proyectos/arcus-1.jpg", caption: "Panel con métricas" }
   * La primera es la portada. Con 2 o más, la tarjeta se vuelve galería.
   */
  photos: Photo[];
  /** App que se puede probar dentro del portafolio (opcional): carpeta en public/ y QR para abrirla en el celular. */
  demo?: { url: string; qr?: string };
  /** Enlace para probar o descargar el proyecto (opcional), ej. itch.io. */
  play?: string;
  /** Texto del botón de "play" (por defecto "Ver proyecto"). */
  playLabel?: string;
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
    id: "ebenconta",
    name: "EbenConta",
    category: "web",
    area: "Web · Full stack",
    year: "2025",
    status: "Terminado",
    featured: true,
    summary: "Calcula ingresos, egresos e IVA de cada cliente a partir de sus facturas XML.",
    role: "Lo hice completo: lectura de los XML, cálculos por mes, tablero con gráficas e inicio de sesión con código por correo.",
    story: {
      reto: "Llevar las cuentas de varios clientes factura por factura toma mucho tiempo, y es fácil equivocarse al sumar el IVA o perder de vista una fecha fiscal.",
      hice: "Hice el frontend en React y la API en Express con PostgreSQL. El sistema lee el XML de cada factura y separa solo los ingresos y egresos de cada cliente por mes. Agregué un tablero con gráficas, seguimiento de vencimientos fiscales, filtros, exportación a CSV e inicio de sesión con un código que llega por correo.",
      resultado: "El contador sube las facturas y ve el balance y el IVA del mes de cada cliente en un solo tablero, listo para exportar.",
    },
    tech: ["React", "TypeScript", "Vite", "Express", "PostgreSQL", "Sequelize", "JWT", "Nodemailer"],
    photos: [
      { src: "/images/proyectos/ebenconta-inicio.webp", caption: "Inicio: panorama del mes, resumen por cliente, avance y próximos vencimientos" },
      { src: "/images/proyectos/ebenconta-ingresos.webp", caption: "Ingresos y egresos: totales del periodo, gráfica mes con mes y balance por cliente" },
      { src: "/images/proyectos/ebenconta-vencimientos.webp", caption: "Vencimientos agrupados por urgencia: vencidos, esta semana y más adelante" },
    ],
    repo: "", // Repositorio privado: si lo publicas, pon aquí el enlace.
    note: "Repositorio privado",
  },
  {
    id: "arcus",
    name: "ARCUS",
    category: "web",
    area: "Web · Full stack",
    year: "2026",
    status: "En uso",
    featured: true,
    summary: "Clientes, pagos y metas mensuales de cada asesor en un solo panel.",
    role: "Lo construí con Next.js y SQLite: métricas, pagos, metas, calendario y acceso con Google.",
    story: {
      reto: "Los asesores necesitaban llevar a sus clientes y sus pagos en un mismo lugar, y saber cómo van con su meta del mes sin hacer cuentas a mano.",
      hice: "Lo construí con Next.js, TypeScript y SQLite. Tiene un panel con métricas, control de pagos, metas mensuales, calendario y exportación a CSV. El inicio de sesión es con Google y cada asesor solo puede ver a sus propios clientes.",
      resultado: "Está en uso: cada asesor revisa sus pagos pendientes y su avance del mes desde el panel.",
    },
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "SQLite", "Google OAuth"],
    photos: [
      { src: "/images/proyectos/arcus-panel.webp", caption: "Panel: por cobrar hoy, clientes en recta final, cobros por mes e indicadores" },
      { src: "/images/proyectos/arcus-clientes.webp", caption: "Clientes: tabla con ciclo de 47 días, estatus de pago, búsqueda y filtros" },
      { src: "/images/proyectos/arcus-finanzas.webp", caption: "Finanzas: facturado, cobrado y pendiente del mes, meta mensual y desglose" },
      { src: "/images/proyectos/arcus-calendario.webp", caption: "Calendario del mes con los cobros de cada cliente según su ciclo" },
    ],
    repo: "", // Repositorio privado: si lo publicas, pon aquí el enlace.
    note: "Repositorio privado",
  },
  {
    id: "fitpro",
    name: "FitPro",
    category: "web",
    area: "Web · Full stack",
    year: "2026",
    status: "Terminado",
    featured: true,
    summary: "App web de entrenamiento: rutinas guiadas, registro de cargas y peso, y tu progreso de cada semana.",
    role: "La hice completa: el front en React y TypeScript, y la API en Express con PostgreSQL.",
    story: {
      reto: "Mucha gente entrena sin un plan y no sabe si de verdad está avanzando. Quería una app que arme las rutinas según tu objetivo y te muestre tu progreso semana a semana.",
      hice: "Hice el front con React 19, TypeScript y Vite, con modo claro y oscuro e íconos propios, y la API con Express y PostgreSQL: registro e inicio de sesión con contraseñas cifradas, validación con Zod y límite de peticiones. Tiene 4 programas con sus rutinas, sesiones con cronómetro y descanso automático, registro de cargas por ejercicio, gráfica de peso, calendario de actividad y logros. También funciona en modo demo, guardando todo en el navegador.",
      resultado: "Cada usuario ve en su panel cuántos entrenamientos lleva contra su meta de la semana, su racha y su peso, y en Progreso cómo suben sus cargas.",
    },
    tech: ["React", "TypeScript", "Vite", "Express", "PostgreSQL", "Zod"],
    photos: [
      { src: "/images/proyectos/fitpro-panel.webp", caption: "Panel: tu semana en anillos, racha, siguiente rutina y peso" },
      { src: "/images/proyectos/fitpro-movil.webp", caption: "En celular: progreso, panel y una sesión en curso" },
      { src: "/images/proyectos/fitpro-rutinas.webp", caption: "Rutinas por programa con sus ejercicios, series y repeticiones" },
      { src: "/images/proyectos/fitpro-sesion.webp", caption: "Sesión con cronómetro: marcas cada ejercicio y anotas los kilos" },
      { src: "/images/proyectos/fitpro-progreso.webp", caption: "Progreso: gráfica de peso, IMC, cargas por ejercicio y calendario" },
      { src: "/images/proyectos/fitpro-perfil.webp", caption: "Perfil: datos, objetivo, nivel, meta semanal y plan" },
      { src: "/images/proyectos/fitpro-inicio.webp", caption: "Página de inicio con los anillos de actividad" },
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
    featured: true,
    summary: "Monitorea parcelas con sensores: mapa, historial del clima y alertas.",
    role: "Hice la API con registro e inicio de sesión, y el panel con mapa, gráficas y alertas.",
    story: {
      reto: "En el campo hace falta saber a tiempo si una parcela tiene demasiado calor, poca humedad o lleva días sin riego, sin tener que ir a revisarla.",
      hice: "Hice la API en Express con registro, inicio de sesión y pregunta de seguridad, y el panel en React: mapa satelital con Mapbox, historial del clima con gráficas de temperatura, humedad, lluvia y radiación solar, y alertas con límites que el usuario ajusta.",
      resultado: "Las lecturas de cada parcela, su historial y sus alertas quedan en un mismo panel, con las alertas ordenadas por prioridad.",
    },
    tech: ["React", "TypeScript", "Express", "PostgreSQL", "Sequelize", "JWT", "Mapbox", "Recharts"],
    photos: [
      { src: "/images/proyectos/agrosense-resumen.webp", caption: "Resumen: lecturas del campo en vivo, clima de las últimas horas y alertas" },
      { src: "/images/proyectos/agrosense-mapa.webp", caption: "Mapa satelital con las parcelas y su estado" },
      { src: "/images/proyectos/agrosense-parcelas.webp", caption: "Parcelas: tabla con cultivo, responsable, riego y lecturas de cada sensor" },
      { src: "/images/proyectos/agrosense-historial.webp", caption: "Historial: gráficas de temperatura, humedad, lluvia y radiación solar" },
      { src: "/images/proyectos/agrosense-alertas.webp", caption: "Alertas por prioridad según los límites que configura el usuario" },
      { src: "/images/proyectos/agrosense-login.webp", caption: "Inicio de sesión" },
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
    featured: true,
    summary: "Detecta gas con un sensor conectado a un ESP32 y suena una alarma si hay peligro.",
    role: "Hice la API que recibe las lecturas del ESP32 y la app que las muestra en tiempo real.",
    story: {
      reto: "Una fuga de gas puede pasar desapercibida hasta que ya es peligrosa, sobre todo si nadie está mirando el sensor.",
      hice: "Hice la API en Express que recibe las lecturas del ESP32 y las guarda en PostgreSQL, y la app en React que las muestra: un medidor con niveles de seguro, precaución y peligro, la gráfica del voltaje del sensor, el historial de episodios de gas y una alarma sonora que se puede silenciar.",
      resultado: "La lectura se actualiza cada segundo y, en cuanto el nivel llega a peligro, la app muestra el aviso en rojo y suena la alarma.",
    },
    tech: ["React", "TypeScript", "Tailwind CSS", "Express", "PostgreSQL", "JWT"],
    photos: [
      { src: "/images/proyectos/airguard-monitor.webp", caption: "Monitor en precaución: medidor del nivel de gas, pico del día y últimas lecturas" },
      { src: "/images/proyectos/airguard-peligro.webp", caption: "Nivel de peligro: aviso en rojo, consejo de qué hacer y alarma sonora" },
      { src: "/images/proyectos/airguard-seguro.webp", caption: "Aire limpio: el monitor cuando no se detecta gas" },
      { src: "/images/proyectos/airguard-lecturas.webp", caption: "Lecturas: voltaje del sensor con zonas de seguro, precaución y peligro" },
      { src: "/images/proyectos/airguard-alertas.webp", caption: "Alertas: cada episodio de gas con su duración y pico" },
      { src: "/images/proyectos/airguard-ajustes.webp", caption: "Ajustes: alarma sonora, niveles del sensor y conexión con el ESP32" },
      { src: "/images/proyectos/airguard-login.webp", caption: "Inicio de sesión" },
    ],
    repo: "https://github.com/Giov0205/Sensor-IOT",
  },
  {
    id: "dontpetme",
    name: "DontPetMe",
    category: "juegos",
    area: "Videojuego · Plataformas 3D",
    year: "2026",
    status: "Terminado",
    featured: true,
    summary: "Videojuego de plataformas 3D en equipo, protagonizado por Mochi, un hámster.",
    role: "Modelé y animé en Blender a Mochi, Copo y Trufa, y los integré en Unity como jugador y NPC.",
    story: {
      reto: "Hacer en equipo un juego de plataformas completo, con personajes propios y varios niveles, mientras todos trabajamos al mismo tiempo sobre el mismo proyecto.",
      hice: "Modelé y animé en Blender a los personajes Mochi, Copo y Trufa, y los integré en Unity con C# como jugador y NPC. Para no pisarnos el trabajo, colaboramos con git usando una rama por función.",
      resultado: "El juego está terminado y publicado en itch.io, donde se puede descargar y jugar.",
    },
    tech: ["Unity", "C#", "Blender", "Git", "Trabajo en equipo"],
    photos: [
      { src: "/images/proyectos/dontpetme-portada.webp", caption: "Logo del juego, del póster que hicimos en Blender" },
      { src: "/images/proyectos/dontpetme-nivel0-jaula.webp", caption: "Nivel 0: la jaula de Mochi sobre la mesa del cuarto" },
      { src: "/images/proyectos/dontpetme-mochi.webp", caption: "Mochi, el hámster protagonista, y la araña" },
      { src: "/images/proyectos/dontpetme-enemigos.webp", caption: "Enemigos: la aspiradora robot, las hormigas y el ciempiés" },
      { src: "/images/proyectos/dontpetme-nivel0-escritorio.webp", caption: "Nivel 0: el escritorio con lápices, ratón y taza de café" },
      { src: "/images/proyectos/dontpetme-nivel1-cuarto.webp", caption: "Nivel 1: vista general del cuarto" },
      { src: "/images/proyectos/dontpetme-nivel1-hormiga-reina.webp", caption: "Nivel 1: la hormiga reina en el hormiguero" },
      { src: "/images/proyectos/dontpetme-nivel1-libros.webp", caption: "Nivel 1: libros colgantes que sirven de plataformas" },
      { src: "/images/proyectos/dontpetme-nivel2-aspiradora.webp", caption: "Nivel 2: la aspiradora robot patrulla el pasillo" },
      { src: "/images/proyectos/dontpetme-nivel2-alfombra.webp", caption: "Nivel 2: alfombra en zigzag y túnel de colores" },
    ],
    play: "https://iisunnyii29.itch.io/dont-petme", // Página de itch.io para descargar y jugar
    playLabel: "Descargar y jugar",
    repo: "https://github.com/BryanChuc2509/GDD-DONT-PET-ME", // Documento de diseño del juego (GDD)
    repoLabel: "Ver GDD",
  },
  {
    id: "brawl-dex",
    name: "Brawl Dex",
    category: "movil",
    area: "App móvil",
    year: "2026",
    status: "Terminado",
    featured: true,
    summary: "App móvil de Brawl Stars con los datos del juego en vivo: brawlers, gadgets y star powers.",
    role: "La hice con React Native y Expo, consumiendo la API pública de Brawlify.",
    story: {
      reto: "Fue una actividad de la UT Cancún: hacer una app móvil que consuma la API real de un videojuego y que se sienta parte del juego.",
      hice: "La hice con React Native y Expo: pantalla de carga animada, inicio con el brawler del día, lista con buscador y filtros por rareza, detalle de cada brawler con sus star powers y gadgets, y favoritos. Los datos vienen de la API de Brawlify, con una segunda dirección de respaldo, y se guardan en memoria para no descargarlos otra vez.",
      resultado: "Muestra en tiempo real los 108 brawlers con sus 216 gadgets y 216 star powers, con un estilo inspirado en el menú del juego.",
    },
    tech: ["React Native", "Expo", "JavaScript", "API REST (Brawlify)"],
    photos: [
      { src: "/images/proyectos/brawl-portada.webp", caption: "Lista de brawlers, inicio y detalle de un brawler" },
      { src: "/images/proyectos/brawl-inicio.webp", caption: "Pantalla de carga y pantalla de inicio con el brawler del día" },
      { src: "/images/proyectos/brawl-lista.webp", caption: "Lista de brawlers con buscador y filtros por rareza" },
      { src: "/images/proyectos/brawl-detalle.webp", caption: "Detalle de un brawler con su rareza, clase y star powers" },
    ],
    demo: { url: "/demos/brawl-dex/index.html", qr: "/images/proyectos/brawl-qr.svg" },
    repo: "", // Repositorio privado: si lo publicas, pon aquí el enlace.
    note: "Repositorio privado",
  },
];

/** CONTACTO */
export const contact = {
  intro: "¿Tienes una idea, un proyecto o una vacante? Escríbeme y coordinamos.",
  status: "Disponible",
  statusText: "Para colaboraciones y proyectos.",
  /** Si tienes LinkedIn, agrégalo: { label: "LinkedIn", handle: "linkedin.com/in/tu-usuario", href: "https://www.linkedin.com/in/tu-usuario/" } */
  linkedin: null as null | { label: string; handle: string; href: string },
};
