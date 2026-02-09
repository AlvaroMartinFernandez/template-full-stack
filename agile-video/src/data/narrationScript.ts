// Script de narracion para el video de Metodologias Agiles
// Cada segmento se sincroniza con las escenas visuales

export interface NarrationSegment {
  id: string;
  section: string;
  text: string;
  startFrame: number;
  durationFrames: number;
  audioFile?: string;
}

export const narrationScript: NarrationSegment[] = [
  // ====== ACTO 1: Que es Agile ======
  {
    id: 'act1-intro',
    section: 'Intro',
    text: 'Metodologias Agiles. Scrum, Kanban, Sprints y todas las herramientas que usan los equipos profesionales para desarrollar software. Si alguna vez te preguntaste como se trabaja en un equipo real de desarrollo, este video es para ti.',
    startFrame: 0,
    durationFrames: 600,
  },
  {
    id: 'act1-que-es-agile',
    section: 'Que es Agile',
    text: 'En los anos 90, el 70 por ciento de los proyectos de software fallaban. El problema era el modelo Waterfall o cascada: planificabas todo al inicio, desarrollabas durante meses, y al final entregabas. Si el cliente queria algo diferente, ya era tarde. Agile propone lo contrario: construir un poco, mostrarlo, recibir feedback, y repetir. Cada dos semanas tienes algo funcional.',
    startFrame: 600,
    durationFrames: 750,
  },
  {
    id: 'act1-manifiesto',
    section: 'Manifiesto Agil',
    text: 'En 2001, diecisiete desarrolladores se reunieron y crearon el Manifiesto Agil con cuatro valores fundamentales. Primero: individuos e interacciones sobre procesos y herramientas. Segundo: software funcionando sobre documentacion extensiva. Tercero: colaboracion con el cliente sobre negociacion contractual. Y cuarto: respuesta ante el cambio sobre seguir un plan rigido.',
    startFrame: 1350,
    durationFrames: 750,
  },
  {
    id: 'act1-scrum-kanban-xp',
    section: 'Scrum vs Kanban vs XP',
    text: 'Existen tres metodologias agiles principales. Scrum es la mas popular: divide el trabajo en Sprints de dos semanas con roles y ceremonias definidas. Kanban usa un tablero visual con flujo continuo, ideal para equipos de soporte. Y Extreme Programming o XP se enfoca en practicas tecnicas como pair programming y TDD.',
    startFrame: 2100,
    durationFrames: 900,
  },
  {
    id: 'act1-cual-usar',
    section: 'Cual usar',
    text: 'Si tu equipo es nuevo en Agile, empieza con Scrum. Si haces soporte o mantenimiento, Kanban. Y en la practica, muchos equipos combinan ambos en lo que se llama Scrumban. Nosotros nos enfocaremos en Scrum por ser la mas completa.',
    startFrame: 3000,
    durationFrames: 600,
  },

  // ====== ACTO 2: Equipo y Sprint ======
  {
    id: 'act2-intro',
    section: 'Intro Acto 2',
    text: 'Ahora veamos como funciona un equipo Scrum: los roles, los sprints y las ceremonias.',
    startFrame: 3600,
    durationFrames: 300,
  },
  {
    id: 'act2-roles',
    section: 'Roles',
    text: 'Un equipo Scrum tiene tres roles. El Product Owner es la voz del cliente: decide QUE se construye y prioriza el backlog. El Scrum Master es un lider servicial, no un jefe. Facilita las ceremonias, elimina bloqueos y protege al equipo. Y el Dev Team, de tres a nueve personas, decide COMO construir cada funcionalidad. Son autoorganizados: ellos dividen el trabajo entre si.',
    startFrame: 3900,
    durationFrames: 1050,
  },
  {
    id: 'act2-que-es-sprint',
    section: 'Que es Sprint',
    text: 'Un Sprint es un periodo fijo de tiempo, generalmente dos semanas, donde el equipo trabaja para completar un conjunto definido de tareas. Cada Sprint tiene un Sprint Goal claro, la duracion no cambia una vez empezado, y al final se entrega un incremento potencialmente desplegable.',
    startFrame: 4950,
    durationFrames: 750,
  },
  {
    id: 'act2-ciclo-sprint',
    section: 'Ciclo Sprint',
    text: 'El ciclo de un Sprint es asi: del Product Backlog se seleccionan items en el Sprint Planning. Durante el Sprint se desarrolla con Daily Standups diarios. Al final, Sprint Review para mostrar el trabajo y Retrospectiva para mejorar el proceso.',
    startFrame: 5700,
    durationFrames: 450,
  },
  {
    id: 'act2-ceremonias1',
    section: 'Planning y Daily',
    text: 'El Sprint Planning se hace el primer dia del Sprint. El Product Owner presenta las prioridades, el equipo estima y selecciona lo que puede completar, y se define el Sprint Goal. El Daily Standup es una reunion diaria de maximo quince minutos donde cada persona dice que hizo ayer, que hara hoy, y si tiene algun bloqueo.',
    startFrame: 6150,
    durationFrames: 750,
  },
  {
    id: 'act2-ceremonias2',
    section: 'Review y Retro',
    text: 'El Sprint Review es el ultimo dia del Sprint. El equipo demuestra funcionalidad real a los stakeholders, no slides ni mockups. Reciben feedback y se ajustan prioridades. La Retrospectiva es donde el equipo reflexiona: que salio bien, que no, y que pueden mejorar. Es el motor de la mejora continua.',
    startFrame: 6900,
    durationFrames: 900,
  },

  // ====== ACTO 3: Backlog y Estimacion ======
  {
    id: 'act3-intro',
    section: 'Intro Acto 3',
    text: 'Ahora hablemos de como se organizan las tareas, como se estiman y cuando algo esta realmente terminado.',
    startFrame: 7800,
    durationFrames: 300,
  },
  {
    id: 'act3-backlogs',
    section: 'Backlogs',
    text: 'El Product Backlog es la lista maestra de todo lo que necesita el producto. Lo gestiona el Product Owner y esta priorizado. El Sprint Backlog es el subconjunto seleccionado para el Sprint actual, con tareas concretas y detalladas. Lo gestiona el equipo de desarrollo.',
    startFrame: 8100,
    durationFrames: 750,
  },
  {
    id: 'act3-user-stories',
    section: 'User Stories',
    text: 'Las historias de usuario describen funcionalidades desde la perspectiva del usuario. El formato es: Como tipo de usuario, quiero una accion, para obtener un beneficio. Por ejemplo: como visitante, quiero registrarme con email, para acceder a la plataforma. Los criterios INVEST aseguran que cada historia sea independiente, negociable, valiosa, estimable, pequena y testeable.',
    startFrame: 8850,
    durationFrames: 900,
  },
  {
    id: 'act3-story-points',
    section: 'Story Points',
    text: 'Los Story Points estiman la dificultad relativa de una tarea usando la secuencia de Fibonacci: uno, dos, tres, cinco, ocho, trece. No representan horas, sino complejidad, esfuerzo e incertidumbre combinados. Con el Planning Poker, cada miembro elige una carta en secreto, todos revelan al mismo tiempo, y los extremos explican su razonamiento hasta llegar a consenso.',
    startFrame: 9750,
    durationFrames: 900,
  },
  {
    id: 'act3-dod',
    section: 'Definition of Done',
    text: 'La Definition of Done es un checklist compartido que define cuando algo esta realmente terminado. Sin ella, terminado significa algo diferente para cada persona. El checklist tipico incluye: codigo con linter, code review aprobado, tests pasando, funciona en staging, y el Product Owner aprobo la funcionalidad.',
    startFrame: 10650,
    durationFrames: 750,
  },

  // ====== ACTO 4: GitHub y Ejemplo ======
  {
    id: 'act4-intro',
    section: 'Intro Acto 4',
    text: 'Finalmente, veamos como llevar todo esto a la practica con GitHub Projects.',
    startFrame: 11400,
    durationFrames: 300,
  },
  {
    id: 'act4-github-projects',
    section: 'GitHub Projects',
    text: 'GitHub Projects es la herramienta de gestion de proyectos integrada en GitHub. Creas un tablero con columnas como Backlog, To Do, In Progress, In Review y Done. Puedes agregar campos personalizados como prioridad, story points y sprints como iteraciones de dos semanas. Ademas, puedes configurar automatizaciones para que los issues se muevan automaticamente entre columnas.',
    startFrame: 11700,
    durationFrames: 750,
  },
  {
    id: 'act4-github-issues',
    section: 'GitHub Issues',
    text: 'Cada historia de usuario se convierte en un GitHub Issue. Le agregas labels como feature, bug, prioridad y area. Los milestones agrupan issues por Sprint y muestran progreso. Y cuando un PR dice Closes numero de issue, el issue se cierra automaticamente al mergear.',
    startFrame: 12450,
    durationFrames: 600,
  },
  {
    id: 'act4-sprint-sim',
    section: 'Sprint Simulation',
    text: 'Simulemos un Sprint completo. Sprint Goal: los usuarios pueden registrarse y loguearse. Dia uno: Ana empieza con el Signup backend, Carlos con Login, Maria prepara el frontend. Dia siete: todos tienen PRs abiertos. Sprint Review: todo funciona, el PO aprueba. Retrospectiva: la accion de mejora es que cada PR tenga review en menos de veinticuatro horas.',
    startFrame: 13050,
    durationFrames: 900,
  },
  {
    id: 'act4-conclusion',
    section: 'Conclusion',
    text: 'Y eso es todo. Ahora ya sabes como trabajan los equipos profesionales de desarrollo. Recuerda: Agile no es un conjunto rigido de reglas, es una mentalidad de entregar valor constantemente y mejorar como equipo.',
    startFrame: 13950,
    durationFrames: 450,
  },
];
