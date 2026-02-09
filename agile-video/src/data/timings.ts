// Configuracion de timings del video (30 fps)
// 1 segundo = 30 frames
// Video total: 8 minutos (480 segundos = 14400 frames)

const FPS = 30;

export const TIMINGS = {
  // =========================================================================
  // Acto 1: Que es Agile + Manifiesto + Metodologias (0-120s = 3600 frames)
  // =========================================================================
  act1: {
    start: 0,
    end: 3600,

    // Intro - Titulo y hook (0-20s)
    intro: {
      start: 0,
      duration: 600,
    },

    // Que es Agile? Waterfall vs Agile (20-45s)
    queEsAgile: {
      start: 600,
      duration: 750,
    },

    // Manifiesto Agil - 4 valores (45-70s)
    manifiestoAgil: {
      start: 1350,
      duration: 750,
    },

    // Scrum vs Kanban vs XP (70-100s)
    scrumKanbanXP: {
      start: 2100,
      duration: 900,
    },

    // Cual usar? + Transicion (100-120s)
    cualUsar: {
      start: 3000,
      duration: 600,
    },
  },

  // =========================================================================
  // Acto 2: Equipo, Sprint y Ceremonias (120-260s = 4200 frames)
  // =========================================================================
  act2: {
    start: 3600,
    end: 7800,

    // Intro Acto 2 (120-130s)
    intro: {
      start: 3600,
      duration: 300,
    },

    // Roles del equipo: PO, SM, Dev Team (130-165s)
    roles: {
      start: 3900,
      duration: 1050,
    },

    // Que es un Sprint? (165-190s)
    queEsSprint: {
      start: 4950,
      duration: 750,
    },

    // Ciclo del Sprint - FlowDiagram (190-205s)
    cicloSprint: {
      start: 5700,
      duration: 450,
    },

    // Ceremonias: Planning + Daily (205-230s)
    ceremonias1: {
      start: 6150,
      duration: 750,
    },

    // Ceremonias: Review + Retro (230-260s)
    ceremonias2: {
      start: 6900,
      duration: 900,
    },
  },

  // =========================================================================
  // Acto 3: Backlog, User Stories, Estimacion, DoD (260-380s = 3600 frames)
  // =========================================================================
  act3: {
    start: 7800,
    end: 11400,

    // Intro Acto 3 (260-270s)
    intro: {
      start: 7800,
      duration: 300,
    },

    // Product Backlog vs Sprint Backlog (270-295s)
    backlogs: {
      start: 8100,
      duration: 750,
    },

    // User Stories + INVEST (295-325s)
    userStories: {
      start: 8850,
      duration: 900,
    },

    // Story Points + Planning Poker (325-355s)
    storyPoints: {
      start: 9750,
      duration: 900,
    },

    // Definition of Done (355-380s)
    definitionOfDone: {
      start: 10650,
      duration: 750,
    },
  },

  // =========================================================================
  // Acto 4: GitHub Projects + Ejemplo Practico (380-480s = 3000 frames)
  // =========================================================================
  act4: {
    start: 11400,
    end: 14400,

    // Intro Acto 4 (380-390s)
    intro: {
      start: 11400,
      duration: 300,
    },

    // GitHub Projects: board, vistas, campos (390-415s)
    githubProjects: {
      start: 11700,
      duration: 750,
    },

    // GitHub Issues: labels, milestones, PRs (415-435s)
    githubIssues: {
      start: 12450,
      duration: 600,
    },

    // Simulacion Sprint completo (435-465s)
    sprintSimulation: {
      start: 13050,
      duration: 900,
    },

    // Conclusion y resumen final (465-480s)
    conclusion: {
      start: 13950,
      duration: 450,
    },
  },
};

export const VIDEO_CONFIG = {
  fps: FPS,
  width: 1920,
  height: 1080,
  durationInFrames: 14400, // 8 minutos (480 segundos)
};
