// =========================================================================
// Todos los snippets de codigo usados en el video de autenticacion
// Tomados directamente del proyecto template-full-stack
// =========================================================================

export const codeSnippets = {

  // ======================== BACKEND ========================

  // --- User Model ---
  userModel: `class User(db.Model):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    username: Mapped[str] = mapped_column(String(80), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(256), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(), default=datetime.utcnow)`,

  // --- Metodos bcrypt del User Model ---
  userModelBcrypt: `# Hashear password (al registrarse)
def set_password(self, password):
    password_bytes = password.encode('utf-8')
    hashed = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
    self.password = hashed.decode('utf-8')

# Verificar password (al hacer login)
def check_password(self, password):
    password_bytes = password.encode('utf-8')
    hashed_bytes = self.password.encode('utf-8')
    return bcrypt.checkpw(password_bytes, hashed_bytes)`,

  // --- User serialize ---
  userSerialize: `def serialize(self):
    return {
        "id": self.id,
        "email": self.email,
        "username": self.username,
        "is_active": self.is_active,
        "created_at": self.created_at.isoformat(),
    }`,

  // --- AuthService signup ---
  authServiceSignup: `class AuthService:

    @staticmethod
    def signup(data):
        # 1. Validar campos obligatorios
        required_fields = ["email", "username", "password"]
        for field in required_fields:
            if field not in data or not data[field]:
                abort(400, description=f"El campo '{field}' es obligatorio")

        # 2. Verificar que no exista el email/username
        if User.query.filter_by(email=data["email"]).first():
            abort(409, description="Ya existe un usuario con ese email")

        # 3. Crear usuario con password hasheado
        new_user = User(
            email=data["email"],
            username=data["username"],
            is_active=True
        )
        new_user.set_password(data["password"])
        db.session.add(new_user)
        db.session.commit()

        # 4. Generar token JWT
        access_token = create_access_token(identity=str(new_user.id))
        return { "user": new_user.serialize(), "token": access_token }`,

  // --- AuthService login ---
  authServiceLogin: `@staticmethod
def login(data):
    # 1. Validar que vengan email y password
    if "email" not in data or "password" not in data:
        abort(400, description="Email y password son obligatorios")

    # 2. Buscar usuario por email
    user = User.query.filter_by(email=data["email"]).first()
    if user is None:
        abort(401, description="Email o password incorrectos")

    # 3. Verificar que la cuenta este activa
    if not user.is_active:
        abort(401, description="La cuenta esta desactivada")

    # 4. Verificar password con bcrypt
    if not user.check_password(data["password"]):
        abort(401, description="Email o password incorrectos")

    # 5. Generar y devolver token JWT
    access_token = create_access_token(identity=str(user.id))
    return { "user": user.serialize(), "token": access_token }`,

  // --- AuthService get_current_user ---
  authServiceMe: `@staticmethod
def get_current_user(user_id):
    user = User.query.get(int(user_id))
    if user is None:
        abort(404, description="Usuario no encontrado")
    return user.serialize()`,

  // --- Auth Controller ---
  authController: `auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

# POST /api/auth/signup - Registrar nuevo usuario
@auth_bp.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    if not body:
        abort(400, description="El body no puede estar vacio")
    result = AuthService.signup(body)
    return jsonify(result), 201

# POST /api/auth/login - Iniciar sesion
@auth_bp.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    if not body:
        abort(400, description="El body no puede estar vacio")
    result = AuthService.login(body)
    return jsonify(result), 200

# GET /api/auth/me - Obtener usuario actual (PROTEGIDO)
@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_me():
    current_user_id = get_jwt_identity()
    user = AuthService.get_current_user(current_user_id)
    return jsonify(user), 200`,

  // --- Proteger rutas con @jwt_required ---
  protegerRutas: `from flask_jwt_extended import jwt_required

# Ruta PUBLICA - cualquiera puede acceder
@user_bp.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = UserService.get_by_id(user_id)
    return jsonify(user), 200

# Ruta PROTEGIDA - solo con token valido
@user_bp.route('', methods=['GET'])
@jwt_required()       # <-- Este decorador protege la ruta
def get_users():
    users = UserService.get_all()
    return jsonify(users), 200`,

  // --- JWT Config en app.py ---
  jwtConfig: `# Configuracion JWT en app.py
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

# Manejo de errores JWT
@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify({"message": "Token ha expirado"}), 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({"message": "Token invalido"}), 401

@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify({"message": "Token requerido"}), 401`,

  // ======================== FRONTEND ========================

  // --- Global Store ---
  globalStore: `export const initialStore = () => {
  return {
    // Leer token y user de localStorage al cargar
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: !!localStorage.getItem("token"),
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'login': {
      const { token, user } = action.payload;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return { ...store, token, user, isAuthenticated: true };
    }

    case 'logout':
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { ...store, token: null, user: null, isAuthenticated: false };

    case 'set_user':
      return { ...store, user: action.payload };

    default:
      throw Error('Unknown action.');
  }
}`,

  // --- Auth Service Frontend ---
  authServiceFront: `const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const loginService = async ({ email, password }) => {
  try {
    const response = await fetch(backendUrl + "/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) return [null, "Error al iniciar sesion"];
    const data = await response.json();
    return [data, null];
  } catch (err) {
    return [null, err.message];
  }
};

export const signupService = async ({ email, username, password }) => {
  try {
    const response = await fetch(backendUrl + "/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    });
    if (!response.ok) return [null, "Error al registrarse"];
    const data = await response.json();
    return [data, null];
  } catch (err) {
    return [null, err.message];
  }
};

export const getMeService = async (token) => {
  try {
    const response = await fetch(backendUrl + "/api/auth/me", {
      headers: { "Authorization": "Bearer " + token },
    });
    if (!response.ok) return [null, "Token invalido"];
    const data = await response.json();
    return [data, null];
  } catch (err) {
    return [null, err.message];
  }
};`,

  // --- Login Page ---
  loginPage: `export const Login = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [data, error] = await loginService(form);

    if (error) { alert(error); return; }

    // Guardar token y usuario en el store global
    dispatch({
      type: "login",
      payload: { token: data.token, user: data.user }
    });
    navigate("/");  // Redirigir al home
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" onChange={handleChange} />
      <input name="password" type="password" onChange={handleChange} />
      <button type="submit">Iniciar Sesion</button>
    </form>
  );
};`,

  // --- Signup Page ---
  signupPage: `export const Signup = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "", username: "", password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [data, error] = await signupService(form);

    if (error) { alert(error); return; }

    // Auto-login despues de registrarse
    dispatch({
      type: "login",
      payload: { token: data.token, user: data.user }
    });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" />
      <input name="username" type="text" />
      <input name="password" type="password" minLength={6} />
      <button type="submit">Registrarse</button>
    </form>
  );
};`,

  // --- PrivateRoute ---
  privateRoute: `import { Navigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const PrivateRoute = ({ children }) => {
  const { store } = useGlobalReducer();

  // Si NO esta autenticado, redirigir a /login
  if (!store.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si esta autenticado, mostrar el contenido
  return children;
};`,

  // --- Uso de PrivateRoute en routes.jsx ---
  routesConfig: `// routes.jsx - Configuracion de rutas
<Route path="/" element={<Layout />}>
  {/* Rutas publicas */}
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />

  {/* Ruta protegida - envuelta en PrivateRoute */}
  <Route path="/demo" element={
    <PrivateRoute>
      <Demo />
    </PrivateRoute>
  } />
</Route>`,

  // --- Layout con validacion de token ---
  layoutValidation: `export const Layout = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    // Si no hay token, no hacer nada
    if (!store.token) return;

    // Validar token contra el backend
    getMeService(store.token).then(([data, error]) => {
      if (error) {
        // Token invalido o expirado -> logout
        dispatch({ type: "logout" });
        return;
      }
      // Token valido -> actualizar datos del usuario
      dispatch({ type: "set_user", payload: data });
    });
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />  {/* Aqui se renderizan las paginas */}
      <Footer />
    </>
  );
};`,

  // --- Navbar con logica auth ---
  navbarAuth: `export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "logout" });
    navigate("/");
  };

  return (
    <nav>
      {store.isAuthenticated ? (
        <>
          <span>{store.user?.username}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
};`,
};
