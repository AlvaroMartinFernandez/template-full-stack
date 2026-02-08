// =========================================================================
// Datos educativos y conceptos para el video de Auth (version expandida 13min)
// =========================================================================

// --- Conceptos fundamentales ---
export const authConcepts = {
  queEsAuth: {
    title: 'Que es Autenticacion?',
    subtitle: 'Verificar la identidad de un usuario',
    points: [
      'Es el proceso de verificar "quien eres"',
      'Como mostrar tu DNI para entrar a un edificio',
      'El usuario demuestra su identidad con credenciales',
      'Email + Password es el metodo mas comun en la web',
      'Sin auth, cualquiera podria acceder a datos privados',
    ],
  },

  authVsAuthz: {
    title: 'Autenticacion vs Autorizacion',
    items: [
      { concept: 'Autenticacion (AuthN)', desc: 'Quien eres? -> Login con email y password', icon: '🔑' },
      { concept: 'Autorizacion (AuthZ)', desc: 'Que puedes hacer? -> Permisos y roles', icon: '🛡️' },
    ],
  },

  sessionVsToken: {
    title: 'Sessions vs Tokens',
    subtitle: 'Dos formas de mantener la sesion del usuario',
    session: {
      title: 'Sessions (Tradicional)',
      color: '#ff6b6b',
      points: [
        'El servidor guarda la sesion en memoria',
        'Envia una cookie al navegador',
        'Cada peticion envia la cookie automaticamente',
        'Problema: no escala bien con multiples servidores',
        'El servidor necesita recordar TODAS las sesiones',
      ],
    },
    token: {
      title: 'Tokens JWT (Moderno)',
      color: '#51cf66',
      points: [
        'El servidor genera un token firmado',
        'El cliente guarda el token (localStorage)',
        'Cada peticion envia el token en el header',
        'Ventaja: el servidor NO guarda estado (stateless)',
        'Escala facilmente con multiples servidores',
      ],
    },
  },

  queEsJWT: {
    title: 'Que es JWT?',
    subtitle: 'JSON Web Token - Tu pase VIP digital',
    points: [
      'Un token es como un "pase VIP" digital firmado',
      'Se genera en el servidor al hacer login exitoso',
      'El cliente lo envia en cada peticion protegida',
      'Tiene fecha de expiracion (1 hora en nuestro caso)',
      'Esta codificado en Base64, NO encriptado',
      'Cualquiera puede leer el contenido, pero no modificarlo',
    ],
  },

  jwtStructure: {
    title: 'Estructura de un JWT',
    subtitle: 'Tres partes separadas por puntos',
    parts: [
      {
        name: 'Header',
        color: '#ff6b6b',
        content: '{ "alg": "HS256", "typ": "JWT" }',
        description: 'Algoritmo de firma usado (HS256)',
        detail: 'Define como se firma el token. HS256 usa una clave secreta compartida.',
      },
      {
        name: 'Payload',
        color: '#845ef7',
        content: '{ "sub": "42", "exp": 1700000000 }',
        description: 'Datos del usuario (identity = user id)',
        detail: 'Contiene el "sub" (subject = ID del usuario) y "exp" (fecha de expiracion).',
      },
      {
        name: 'Signature',
        color: '#20c997',
        content: 'HMACSHA256(header + "." + payload, SECRET_KEY)',
        description: 'Firma para verificar que nadie lo modifico',
        detail: 'Se genera con la SECRET_KEY del servidor. Si alguien modifica el payload, la firma no coincide.',
      },
    ],
  },

  jwtExample: {
    encoded: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MiIsImV4cCI6MTcwMH0.abc123signature',
    decoded: {
      header: { alg: 'HS256', typ: 'JWT' },
      payload: { sub: '42', exp: 1700000000 },
    },
  },
};

// --- Flujos de autenticacion ---
export const authFlows = {
  signup: [
    { label: 'Usuario', icon: '👤', color: '#748ffc', description: 'Llena formulario de registro' },
    { label: 'Frontend', icon: '⚛️', color: '#61dafb', description: 'signupService() -> POST' },
    { label: 'POST /signup', icon: '📤', color: '#fcc419', description: 'Envia email + username + pass' },
    { label: 'Validar datos', icon: '✔️', color: '#20c997', description: 'Campos + duplicados' },
    { label: 'bcrypt.hashpw', icon: '🔒', color: '#ff6b6b', description: 'Hashear password' },
    { label: 'db.session.add', icon: '💾', color: '#845ef7', description: 'Guardar en DB' },
    { label: 'create_token', icon: '🎫', color: '#ffd700', description: 'Generar JWT' },
    { label: 'Respuesta', icon: '✅', color: '#51cf66', description: '{ user, token }' },
  ],

  login: [
    { label: 'Usuario', icon: '👤', color: '#748ffc', description: 'Ingresa email + password' },
    { label: 'Frontend', icon: '⚛️', color: '#61dafb', description: 'loginService() -> POST' },
    { label: 'POST /login', icon: '📤', color: '#fcc419', description: 'Envia credenciales' },
    { label: 'filter_by(email)', icon: '🔍', color: '#20c997', description: 'Buscar usuario en DB' },
    { label: 'bcrypt.checkpw', icon: '🔐', color: '#ff6b6b', description: 'Comparar password vs hash' },
    { label: 'create_token', icon: '🎫', color: '#ffd700', description: 'Generar nuevo JWT' },
    { label: 'Respuesta', icon: '✅', color: '#51cf66', description: '{ user, token }' },
  ],

  protectedRoute: [
    { label: 'Cliente React', icon: '🌐', color: '#748ffc', description: 'Tiene token en localStorage' },
    { label: 'fetch() + Header', icon: '📤', color: '#fcc419', description: 'Authorization: Bearer <token>' },
    { label: '@jwt_required()', icon: '🛡️', color: '#ff6b6b', description: 'Flask valida el token' },
    { label: 'get_jwt_identity()', icon: '🔑', color: '#20c997', description: 'Extrae user_id del payload' },
    { label: 'Query a DB', icon: '💾', color: '#845ef7', description: 'User.query.get(user_id)' },
    { label: 'Respuesta', icon: '✅', color: '#51cf66', description: 'Datos protegidos del usuario' },
  ],

  tokenValidation: [
    { label: 'App carga', icon: '🔄', color: '#748ffc', description: 'Layout useEffect' },
    { label: 'Leer localStorage', icon: '📦', color: '#fcc419', description: 'token = localStorage.getItem' },
    { label: 'GET /auth/me', icon: '📤', color: '#20c997', description: 'Enviar token al backend' },
    { label: 'Token valido?', icon: '🔐', color: '#ff6b6b', description: 'Si: set_user / No: logout' },
    { label: 'App lista', icon: '✅', color: '#51cf66', description: 'Usuario autenticado o no' },
  ],
};

// --- Respuestas de API de ejemplo ---
export const apiResponses = {
  signupRequest: {
    email: 'juan@email.com',
    username: 'juandev',
    password: 'miPassword123',
  },

  signupResponse: {
    user: {
      id: 1,
      email: 'juan@email.com',
      username: 'juandev',
      is_active: true,
    },
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.xxx',
  },

  loginRequest: {
    email: 'juan@email.com',
    password: 'miPassword123',
  },

  loginResponse: {
    user: {
      id: 1,
      email: 'juan@email.com',
      username: 'juandev',
      is_active: true,
    },
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.xxx',
  },

  meResponse: {
    id: 1,
    email: 'juan@email.com',
    username: 'juandev',
    is_active: true,
    created_at: '2024-01-15T10:30:00',
  },

  unauthorizedResponse: {
    message: 'Token requerido',
  },

  expiredResponse: {
    message: 'Token ha expirado',
  },
};

// --- Terminal commands ---
export const terminalCommands = {
  signup: {
    method: 'POST' as const,
    url: '/api/auth/signup',
    body: { email: 'juan@email.com', username: 'juandev', password: 'miPassword123' },
    response: {
      user: { id: 1, email: 'juan@email.com', username: 'juandev' },
      token: 'eyJhbG...xxx',
    },
    status: 201,
  },

  login: {
    method: 'POST' as const,
    url: '/api/auth/login',
    body: { email: 'juan@email.com', password: 'miPassword123' },
    response: {
      user: { id: 1, email: 'juan@email.com', username: 'juandev' },
      token: 'eyJhbG...xxx',
    },
    status: 200,
  },

  me: {
    method: 'GET' as const,
    url: '/api/auth/me',
    headers: { 'Authorization': 'Bearer eyJhbG...xxx' },
    response: { id: 1, email: 'juan@email.com', username: 'juandev', is_active: true },
    status: 200,
  },

  unauthorized: {
    method: 'GET' as const,
    url: '/api/users',
    response: { message: 'Token requerido' },
    status: 401,
  },

  expired: {
    method: 'GET' as const,
    url: '/api/auth/me',
    headers: { 'Authorization': 'Bearer eyJhbG...expired' },
    response: { message: 'Token ha expirado' },
    status: 401,
  },
};

// --- Checklist final ---
export const authChecklist = {
  backend: [
    'User Model con bcrypt (set_password / check_password)',
    'Configuracion JWT en app.py (SECRET_KEY, expiracion)',
    'Manejadores de error JWT (expired, invalid, missing)',
    'AuthService con signup() y login()',
    'AuthService con get_current_user()',
    'AuthController con endpoints /signup, /login, /me',
    'Rutas protegidas con @jwt_required()',
  ],
  frontend: [
    'Store global con token, user, isAuthenticated',
    'Persistencia en localStorage (sobrevive refresh)',
    'Acciones: login, logout, set_user',
    'AuthService con loginService, signupService, getMeService',
    'Pagina Login con formulario y dispatch',
    'Pagina Signup con formulario y auto-login',
    'PrivateRoute para proteger rutas en React',
    'Layout valida token al cargar la app (useEffect)',
    'Navbar muestra Login/Signup o Username/Logout',
  ],
};

// --- Conceptos de seguridad ---
export const securityConcepts = [
  'NUNCA guardar passwords en texto plano',
  'Usar bcrypt con salt para hashear',
  'JWT_SECRET_KEY debe ser secreta y larga',
  'Tokens deben tener fecha de expiracion',
  'Validar token en cada peticion protegida',
  'Limpiar localStorage al hacer logout',
];
