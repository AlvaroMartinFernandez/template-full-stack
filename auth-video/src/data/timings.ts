// Configuracion de timings del video (30 fps)
// 1 segundo = 30 frames
// Video total: 13 minutos (780 segundos = 23400 frames)

const FPS = 30;

export const TIMINGS = {
  // =========================================================================
  // Acto 1: Fundamentos de Autenticacion y JWT (0-200s = 6000 frames)
  // =========================================================================
  act1: {
    start: 0,
    end: 6000,

    // Intro - Titulo y hook (0-30s)
    intro: {
      start: 0,
      duration: 900,
    },

    // Que es autenticacion? Concepto detallado (30-70s)
    queEsAuth: {
      start: 900,
      duration: 1200,
    },

    // Sessions vs Tokens - Comparacion (70-110s)
    sessionVsToken: {
      start: 2100,
      duration: 1200,
    },

    // Que es JWT? Header.Payload.Signature detallado (110-160s)
    queEsJWT: {
      start: 3300,
      duration: 1500,
    },

    // Flujo de autenticacion - Diagrama completo (160-200s)
    flujoAuth: {
      start: 4800,
      duration: 1200,
    },
  },

  // =========================================================================
  // Acto 2: Backend - Flask + JWT (200-440s = 7200 frames)
  // =========================================================================
  act2: {
    start: 6000,
    end: 13200,

    // Intro Acto 2 (200-210s)
    intro: {
      start: 6000,
      duration: 300,
    },

    // Configuracion JWT en app.py (210-250s)
    jwtConfig: {
      start: 6300,
      duration: 1200,
    },

    // User Model - columnas y relaciones (250-290s)
    userModel: {
      start: 7500,
      duration: 1200,
    },

    // Bcrypt - set_password y check_password detallado (290-320s)
    userModelBcrypt: {
      start: 8700,
      duration: 900,
    },

    // AuthService signup - paso a paso (320-360s)
    authServiceSignup: {
      start: 9600,
      duration: 1200,
    },

    // AuthService login - paso a paso (360-390s)
    authServiceLogin: {
      start: 10800,
      duration: 900,
    },

    // AuthController - endpoints + terminal demo (390-420s)
    authController: {
      start: 11700,
      duration: 900,
    },

    // Proteger rutas con @jwt_required (420-440s)
    protegerRutas: {
      start: 12600,
      duration: 600,
    },
  },

  // =========================================================================
  // Acto 3: Frontend - React (440-660s = 6600 frames)
  // =========================================================================
  act3: {
    start: 13200,
    end: 19800,

    // Intro Acto 3 (440-450s)
    intro: {
      start: 13200,
      duration: 300,
    },

    // Global Store - token, user, isAuthenticated, acciones (450-490s)
    globalStore: {
      start: 13500,
      duration: 1200,
    },

    // AuthService frontend - loginService, signupService, getMeService (490-530s)
    authServiceFront: {
      start: 14700,
      duration: 1200,
    },

    // Login Page - formulario completo (530-570s)
    loginPage: {
      start: 15900,
      duration: 1200,
    },

    // Signup Page - formulario + auto-login (570-600s)
    signupPage: {
      start: 17100,
      duration: 900,
    },

    // PrivateRoute - guardian de rutas (600-630s)
    privateRoute: {
      start: 18000,
      duration: 900,
    },

    // Layout validation + Navbar con auth (630-660s)
    layoutNavbar: {
      start: 18900,
      duration: 900,
    },
  },

  // =========================================================================
  // Acto 4: Flujo Completo y Conclusion (660-780s = 3600 frames)
  // =========================================================================
  act4: {
    start: 19800,
    end: 23400,

    // Flujo completo de registro (660-690s)
    flujoRegistro: {
      start: 19800,
      duration: 900,
    },

    // Flujo completo de login (690-720s)
    flujoLogin: {
      start: 20700,
      duration: 900,
    },

    // Flujo ruta protegida con token (720-750s)
    flujoProtected: {
      start: 21600,
      duration: 900,
    },

    // Conclusion y checklist final (750-780s)
    conclusion: {
      start: 22500,
      duration: 900,
    },
  },
};

export const VIDEO_CONFIG = {
  fps: FPS,
  width: 1920,
  height: 1080,
  durationInFrames: 23400, // 13 minutos (780 segundos)
};
