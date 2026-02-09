// =========================================================================
// Datos educativos para el video de Metodologias Agiles (8 minutos)
// =========================================================================

// --- Conceptos Fundamentales ---
export const agileConcepts = {
  queEsAgile: {
    title: 'Que son las Metodologias Agiles?',
    subtitle: 'Entregar valor constantemente y adaptarse a cambios',
    points: [
      'Filosofia de trabajo iterativa e incremental',
      'En los 90s, el 70% de los proyectos de software fallaban',
      'Waterfall: planificar TODO, construir TODO, entregar... y rezar',
      'Agile: construir un poco, mostrar, recibir feedback, repetir',
      'Cada 2 semanas hay algo funcional y entregable',
      'El cambio es bienvenido, no un problema',
    ],
  },

  waterfallVsAgile: {
    title: 'Waterfall vs Agile',
    subtitle: 'Dos formas de desarrollar software',
    waterfall: {
      title: 'Waterfall (Cascada)',
      color: '#95A5A6',
      points: [
        'Todo se planifica al inicio del proyecto',
        'Requisitos -> Diseno -> Dev -> Testing -> Entrega',
        '6+ meses antes de ver resultado',
        'Cambios a mitad de camino son MUY costosos',
        'Si el cliente no lo queria... ya es tarde',
      ],
    },
    agile: {
      title: 'Agile (Iterativo)',
      color: '#4A90D9',
      points: [
        'Se planifica en iteraciones cortas (Sprints)',
        'Sprint 1 -> Entrega -> Feedback -> Sprint 2...',
        'Cada 2 semanas hay algo funcional',
        'Cambios se integran naturalmente',
        'El cliente da feedback constante',
      ],
    },
  },

  manifiestoAgil: {
    title: 'El Manifiesto Agil (2001)',
    subtitle: '17 desarrolladores, Snowbird, Utah',
    values: [
      {
        valoramos: 'Individuos e interacciones',
        sobre: 'Procesos y herramientas',
        icon: '👥',
        color: '#3498DB',
      },
      {
        valoramos: 'Software funcionando',
        sobre: 'Documentacion extensiva',
        icon: '💻',
        color: '#2ECC71',
      },
      {
        valoramos: 'Colaboracion con el cliente',
        sobre: 'Negociacion contractual',
        icon: '🤝',
        color: '#F39C12',
      },
      {
        valoramos: 'Respuesta ante el cambio',
        sobre: 'Seguir un plan rigido',
        icon: '🔄',
        color: '#E74C3C',
      },
    ],
  },
};

// --- Comparacion de Metodologias ---
export const methodologies = {
  title: 'Scrum vs Kanban vs XP',
  subtitle: 'Las 3 metodologias agiles mas usadas',
  items: [
    {
      name: 'Scrum',
      icon: '🏈',
      color: '#4A90D9',
      tagline: 'La mas popular',
      points: [
        'Sprints de 2 semanas',
        'Roles: PO, SM, Dev Team',
        'Ceremonias estructuradas',
        'Incremento funcional cada Sprint',
      ],
    },
    {
      name: 'Kanban',
      icon: '📋',
      color: '#27AE60',
      tagline: 'Flujo continuo',
      points: [
        'Tablero visual: To Do | In Progress | Done',
        'Limitar el WIP (Work In Progress)',
        'No hay sprints fijos',
        'Ideal para soporte/mantenimiento',
      ],
    },
    {
      name: 'XP',
      icon: '💪',
      color: '#8E44AD',
      tagline: 'Extreme Programming',
      points: [
        'Pair Programming: 2 devs, 1 PC',
        'TDD: tests ANTES del codigo',
        'Integracion continua',
        'Releases pequenos y frecuentes',
      ],
    },
  ],
  recommendation: [
    { situation: 'Equipo nuevo aprendiendo Agile', rec: 'Scrum', color: '#4A90D9' },
    { situation: 'Soporte / mantenimiento continuo', rec: 'Kanban', color: '#27AE60' },
    { situation: 'Equipo tecnico y disciplinado', rec: 'XP', color: '#8E44AD' },
    { situation: 'Quieres combinar lo mejor', rec: 'Scrumban', color: '#1ABC9C' },
  ],
};

// --- Roles del Equipo Scrum ---
export const scrumTeam = {
  title: 'Roles del Equipo Scrum',
  subtitle: '3 roles fundamentales | Equipo ideal: 3-9 devs',
  roles: [
    {
      name: 'Product Owner',
      tagline: '"El QUE" - La voz del cliente',
      icon: '👔',
      color: '#E67E22',
      responsibilities: [
        'Crea y prioriza el Product Backlog',
        'Comunica la vision del producto',
        'Representa a los stakeholders',
        'Decide QUE se construye y en que orden',
        'Acepta o rechaza el trabajo del equipo',
      ],
    },
    {
      name: 'Scrum Master',
      tagline: '"El COMO" - Lider servicial, NO un jefe',
      icon: '🛡️',
      color: '#2ECC71',
      responsibilities: [
        'Facilita las ceremonias Scrum',
        'Elimina impedimentos del equipo',
        'Protege al equipo de interrupciones',
        'Coaching del proceso Scrum',
        'NO asigna tareas ni decide por el equipo',
      ],
    },
    {
      name: 'Dev Team',
      tagline: '"QUIENES lo construyen" - Autoorganizados',
      icon: '👩‍💻',
      color: '#3498DB',
      responsibilities: [
        'Deciden COMO construir cada item',
        'Estiman el esfuerzo de las tareas',
        'Entregan incrementos cada Sprint',
        'Se autoorganizan: dividen el trabajo',
        'Mantienen la calidad del codigo',
      ],
    },
  ],
};

// --- Sprint ---
export const sprintInfo = {
  title: 'Que es un Sprint?',
  subtitle: 'Periodo fijo donde el equipo completa un conjunto de tareas',
  characteristics: [
    'Duracion: 1-4 semanas (lo mas comun: 2 semanas)',
    'Es fijo: una vez empezado, NO cambia',
    'Tiene Sprint Goal: meta clara y definida',
    'Entregable: incremento potencialmente desplegable',
    'Consecutivo: empieza inmediatamente tras el anterior',
  ],
  rules: [
    'No se agregan tareas a mitad del Sprint',
    'No se cambia el Sprint Goal una vez empezado',
    'Solo el PO puede cancelar un Sprint (extremo)',
    'Tareas no terminadas vuelven al Product Backlog',
  ],
};

// --- Ciclo del Sprint (FlowDiagram) ---
export const sprintCycle = [
  { label: 'Product\nBacklog', icon: '📋', color: '#8E44AD', description: 'Lista priorizada' },
  { label: 'Sprint\nPlanning', icon: '📅', color: '#3498DB', description: 'Planificar Sprint' },
  { label: 'Sprint\n(2 sem)', icon: '🏃', color: '#1ABC9C', description: 'Desarrollo + Daily' },
  { label: 'Sprint\nReview', icon: '🎬', color: '#2ECC71', description: 'Demo al cliente' },
  { label: 'Sprint\nRetro', icon: '🔄', color: '#E74C3C', description: 'Que mejorar?' },
];

// --- Ceremonias ---
export const ceremonies = {
  planning: {
    name: 'Sprint Planning',
    icon: '📅',
    color: '#3498DB',
    when: 'Primer dia del Sprint',
    duration: '~2 horas',
    steps: [
      'PO presenta items prioritarios del Backlog',
      'El equipo pregunta y aclara dudas',
      'Estiman y seleccionan lo que pueden completar',
      'Definen el Sprint Goal',
      'Descomponen items en tareas concretas',
      'Crean el Sprint Backlog',
    ],
  },
  daily: {
    name: 'Daily Standup',
    icon: '☀️',
    color: '#F1C40F',
    when: 'Cada dia, misma hora',
    duration: '15 min MAXIMO',
    questions: [
      'Que hice AYER que ayudo al Sprint Goal?',
      'Que hare HOY para avanzar al Sprint Goal?',
      'Hay algun IMPEDIMENTO que me bloquee?',
    ],
    rules: [
      'Se hace de pie (para que sea rapido)',
      'No es un reporte al jefe',
      'Temas largos se discuten DESPUES',
      '15 minutos. Punto.',
    ],
  },
  review: {
    name: 'Sprint Review',
    icon: '🎬',
    color: '#2ECC71',
    when: 'Ultimo dia del Sprint',
    duration: '30-60 minutos',
    steps: [
      'El equipo DEMUESTRA funcionalidad real',
      'Stakeholders prueban y dan FEEDBACK',
      'Se ajustan prioridades del Backlog',
    ],
  },
  retro: {
    name: 'Sprint Retrospective',
    icon: '🔄',
    color: '#E74C3C',
    when: 'Despues del Review',
    duration: '30-45 minutos',
    columns: [
      {
        title: 'Que salio bien?',
        icon: '✅',
        color: '#2ECC71',
        items: ['Code reviews rapidos', 'Buena comunicacion', 'Sprint Goal cumplido'],
      },
      {
        title: 'Que no salio bien?',
        icon: '❌',
        color: '#E74C3C',
        items: ['Deploy fallo 2 veces', 'Faltaron tests', 'Daily muy largo'],
      },
      {
        title: 'Que mejorar?',
        icon: '💡',
        color: '#F39C12',
        items: ['Tests e2e al CI', 'Pair programming', 'Timer para el daily'],
      },
    ],
  },
};

// --- Backlogs ---
export const backlogs = {
  title: 'Product Backlog vs Sprint Backlog',
  product: {
    title: 'Product Backlog',
    subtitle: 'Lista MAESTRA de TODO lo que necesita el producto',
    color: '#8E44AD',
    icon: '📚',
    points: [
      'Lo gestiona el Product Owner',
      'Esta priorizado (lo importante arriba)',
      'Es dinamico - cambia constantemente',
      'Items arriba mas detallados que abajo',
      'Existe toda la vida del proyecto',
    ],
    example: [
      { priority: 'ALTA', story: 'Registro con email', sprint: 'Sprint 1' },
      { priority: 'ALTA', story: 'Login de usuario', sprint: 'Sprint 1' },
      { priority: 'MEDIA', story: 'Editar perfil', sprint: 'Sprint 2' },
      { priority: 'BAJA', story: 'Modo oscuro', sprint: 'Futuro' },
    ],
  },
  sprint: {
    title: 'Sprint Backlog',
    subtitle: 'Subconjunto seleccionado para ESTE Sprint',
    color: '#2980B9',
    icon: '📝',
    points: [
      'Lo gestiona el equipo de desarrollo',
      'Solo existe durante un Sprint',
      'Tareas muy detalladas y concretas',
      'Relativamente fijo durante el Sprint',
    ],
    tasks: [
      'Crear modelo User en la BD',
      'Crear endpoint POST /signup',
      'Hash de password con bcrypt',
      'Crear formulario Signup en React',
      'Conectar formulario con API',
      'Tests unitarios',
    ],
  },
};

// --- User Stories ---
export const userStories = {
  title: 'Historias de Usuario',
  subtitle: 'Funcionalidades desde la perspectiva del usuario',
  format: {
    parts: [
      { label: 'QUIEN?', content: 'Como [usuario registrado]', color: '#3498DB' },
      { label: 'QUE?', content: 'quiero [cambiar mi password]', color: '#2ECC71' },
      { label: 'POR QUE?', content: 'para [mantener mi cuenta segura]', color: '#F39C12' },
    ],
  },
  examples: [
    {
      role: 'visitante del sitio',
      action: 'registrarme con email y password',
      benefit: 'acceder a la plataforma',
      icon: '📝',
    },
    {
      role: 'usuario registrado',
      action: 'iniciar sesion con mi email',
      benefit: 'acceder a mi cuenta',
      icon: '🔑',
    },
    {
      role: 'usuario logueado',
      action: 'que mi sesion persista al recargar',
      benefit: 'no logearme cada vez',
      icon: '🔄',
    },
    {
      role: 'usuario no autenticado',
      action: 'ser redirigido al login en ruta protegida',
      benefit: 'entender que necesito cuenta',
      icon: '🛡️',
    },
  ],
  invest: [
    { letter: 'I', name: 'Independiente', desc: 'No depende de otras historias' },
    { letter: 'N', name: 'Negociable', desc: 'Se puede discutir y ajustar' },
    { letter: 'V', name: 'Valiosa', desc: 'Aporta valor real al usuario' },
    { letter: 'E', name: 'Estimable', desc: 'El equipo puede estimar esfuerzo' },
    { letter: 'S', name: 'Small', desc: 'Cabe en un Sprint' },
    { letter: 'T', name: 'Testeable', desc: 'Se puede verificar que funciona' },
  ],
};

// --- Story Points ---
export const storyPointsData = {
  title: 'Story Points y Planning Poker',
  subtitle: 'Estimacion relativa de dificultad',
  measures: [
    { label: 'Complejidad', desc: 'Que tan dificil es?', icon: '🧩' },
    { label: 'Esfuerzo', desc: 'Cuanto trabajo implica?', icon: '💪' },
    { label: 'Incertidumbre', desc: 'Cuanto riesgo hay?', icon: '❓' },
  ],
  referenceTable: [
    { points: 1, difficulty: 'Trivial', example: 'Cambiar texto de un boton', color: '#2ECC71' },
    { points: 2, difficulty: 'Simple', example: 'Agregar campo al modelo', color: '#27AE60' },
    { points: 3, difficulty: 'Moderada', example: 'Crear endpoint GET /me', color: '#F1C40F' },
    { points: 5, difficulty: 'Compleja', example: 'Login completo back+front', color: '#E67E22' },
    { points: 8, difficulty: 'Muy compleja', example: 'Recuperar password', color: '#E74C3C' },
    { points: 13, difficulty: 'Enorme', example: 'Sistema roles/permisos', color: '#C0392B' },
  ],
  planningPokerSteps: [
    { label: 'PO lee\nhistoria', icon: '📖', color: '#E67E22', description: 'Leer user story' },
    { label: 'Equipo\ndiscute', icon: '💬', color: '#3498DB', description: 'Preguntas y dudas' },
    { label: 'Eligen\ncarta', icon: '🃏', color: '#8E44AD', description: 'En SECRETO' },
    { label: 'Revelan\ntodos', icon: '🎴', color: '#F39C12', description: 'Al mismo tiempo' },
    { label: 'Extremos\nexplican', icon: '🗣️', color: '#E74C3C', description: 'Alto y bajo' },
    { label: 'Consenso\nfinal', icon: '✅', color: '#2ECC71', description: 'Re-estiman' },
  ],
};

// --- Definition of Done ---
export const definitionOfDone = {
  title: 'Definition of Done (DoD)',
  subtitle: 'Cuando algo esta REALMENTE terminado',
  problem: [
    { role: 'Dev', says: '"Escribi el codigo"', icon: '👨‍💻' },
    { role: 'QA', says: '"Pero no tiene tests"', icon: '🧪' },
    { role: 'PO', says: '"No lo puedo probar"', icon: '👔' },
    { role: 'DevOps', says: '"No pasa el CI/CD"', icon: '⚙️' },
  ],
  checklist: {
    codigo: ['Cumple con el linter', 'Sin warnings ni errores', 'Code Review aprobado'],
    testing: ['Tests unitarios pasando', 'Tests integracion si aplica', 'Pruebas manuales en staging'],
    despliegue: ['CI/CD pasa completamente', 'Funciona en staging', 'Sin regresiones'],
    producto: ['Criterios de aceptacion cumplidos', 'PO ha revisado y aprobado'],
  },
};

// --- GitHub Projects ---
export const githubProjectsData = {
  title: 'GitHub Projects',
  subtitle: 'Gestion agil integrada con tu codigo',
  boardColumns: [
    { name: 'BACKLOG', description: 'Futuras', color: '#30363D' },
    { name: 'TO DO', description: 'Este Sprint', color: '#3498DB' },
    { name: 'IN PROGRESS', description: 'Trabajando', color: '#F1C40F' },
    { name: 'IN REVIEW', description: 'Code review', color: '#8957E5' },
    { name: 'DONE', description: 'Completado', color: '#238636' },
  ],
  customFields: [
    { name: 'Priority', type: 'Single Select', values: 'Alta, Media, Baja' },
    { name: 'Story Points', type: 'Number', values: '1, 2, 3, 5, 8, 13' },
    { name: 'Sprint', type: 'Iteration', values: '2 semanas c/u' },
    { name: 'Type', type: 'Single Select', values: 'Feature, Bug, Chore' },
  ],
  automations: [
    { trigger: 'Issue se abre', action: 'Mover a Backlog', icon: '📥' },
    { trigger: 'PR se linkea', action: 'Mover a In Progress', icon: '🔗' },
    { trigger: 'PR se mergea', action: 'Mover a Done', icon: '✅' },
  ],
};

// --- GitHub Issues ---
export const githubIssuesData = {
  title: 'GitHub Issues como Tareas',
  subtitle: 'Cada historia de usuario = un Issue',
  labels: [
    { name: 'feature', color: '#238636' },
    { name: 'bug', color: '#F85149' },
    { name: 'priority: high', color: '#E67E22' },
    { name: 'priority: medium', color: '#F1C40F' },
    { name: 'frontend', color: '#58A6FF' },
    { name: 'backend', color: '#3498DB' },
  ],
  milestone: {
    name: 'Sprint 1 - Auth MVP',
    issues: [
      { title: 'Registro de usuario', points: 5, done: true },
      { title: 'Login de usuario', points: 5, done: true },
      { title: 'Pagina de perfil', points: 3, done: false },
      { title: 'PrivateRoute', points: 3, done: false },
      { title: 'Navbar auth', points: 2, done: false },
    ],
    progress: 55,
  },
  workflow: [
    { label: 'PO crea\nIssue', icon: '📝', color: '#E67E22', description: 'User Story' },
    { label: 'Sprint\nPlanning', icon: '📅', color: '#3498DB', description: 'Asignar' },
    { label: 'Dev crea\nbranch', icon: '🌿', color: '#238636', description: 'feature/...' },
    { label: 'Abre\nPR', icon: '📤', color: '#8957E5', description: 'Closes #issue' },
    { label: 'Code\nReview', icon: '👀', color: '#F1C40F', description: 'Aprobacion' },
    { label: 'Merge\nPR', icon: '✅', color: '#238636', description: 'Auto-close' },
  ],
};

// --- Sprint Simulation ---
export const sprintSimulation = {
  title: 'Ejemplo: Sprint 1',
  sprintGoal: 'Los usuarios pueden registrarse, loguearse y ver rutas protegidas',
  totalPoints: 16,
  issues: [
    { id: 1, title: 'Signup', points: 5, assignee: 'Ana', icon: '📝' },
    { id: 2, title: 'Login', points: 5, assignee: 'Carlos', icon: '🔑' },
    { id: 4, title: 'PrivateRoute', points: 3, assignee: 'Maria', icon: '🛡️' },
    { id: 5, title: 'Navbar', points: 2, assignee: 'Maria', icon: '🧭' },
    { id: 6, title: 'Logout', points: 1, assignee: 'Maria', icon: '🚪' },
  ],
  dailyDay1: [
    { name: 'Ana', task: 'Empiezo con Signup backend', icon: '👩‍💻' },
    { name: 'Carlos', task: 'Empiezo con Login backend', icon: '👨‍💻' },
    { name: 'Maria', task: 'Preparo estructura frontend', icon: '👩‍🎨' },
  ],
  dailyDay7: [
    { name: 'Ana', task: 'Signup completo, PR abierto', icon: '✅' },
    { name: 'Carlos', task: 'Login completo, PR abierto', icon: '✅' },
    { name: 'Maria', task: 'Navbar y logout listos', icon: '✅' },
  ],
  reviewResult: 'Todo funciona! PO aprueba',
  retroAction: '"Regla de <24h para code reviews en Sprint 2"',
};

// --- Checklist Final ---
export const agileChecklist = {
  conceptos: [
    'Agile: filosofia iterativa e incremental',
    'Manifiesto: 4 valores fundamentales',
    'Scrum: sprints + roles + ceremonias',
    'Sprint: 2 semanas, meta clara, entregable',
  ],
  proceso: [
    'Product Backlog priorizado por el PO',
    'Sprint Planning: seleccionar + estimar',
    'Daily Standup: 15 min, 3 preguntas',
    'Sprint Review: demo al cliente',
    'Retrospectiva: que mejorar?',
  ],
  herramientas: [
    'User Stories: Como [user] quiero [x] para [y]',
    'Story Points: Fibonacci (1,2,3,5,8,13)',
    'Definition of Done: checklist compartido',
    'GitHub Projects: tablero + iteraciones',
    'GitHub Issues: labels + milestones + PRs',
  ],
};
