# Autenticacion con JWT - Guia para Principiantes

## Que es JWT?

**JWT (JSON Web Token)** es un estandar para transmitir informacion de forma segura entre dos partes (cliente y servidor) como un objeto JSON firmado digitalmente.

Piensa en JWT como un **"pase VIP"**: cuando un usuario inicia sesion, el servidor le entrega un pase (token). Cada vez que el usuario quiere acceder a algo protegido, muestra su pase y el servidor verifica que sea autentico.

Un token JWT tiene este aspecto:

```
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U
```

Esta compuesto por tres partes separadas por puntos:
1. **Header** - Tipo de token y algoritmo de encriptacion
2. **Payload** - Datos del usuario (en nuestro caso, el `id` del usuario)
3. **Signature** - Firma que verifica que el token no fue alterado

---

## Flujo General de Autenticacion

```
 REGISTRO / LOGIN                    ACCESO A RUTA PROTEGIDA
 ================                    ========================

 [Usuario]                           [Usuario]
     |                                   |
     | email + password                  | peticion + token en header
     v                                   v
 [Frontend]                          [Frontend]
     |                                   |
     | POST /api/auth/login              | GET /api/auth/me
     | body: {email, password}           | Authorization: Bearer <token>
     v                                   v
 [Backend]                           [Backend]
     |                                   |
     | 1. Busca usuario por email        | 1. Extrae el token del header
     | 2. Verifica password con bcrypt   | 2. Verifica firma y expiracion
     | 3. Genera token JWT               | 3. Extrae el user_id del payload
     | 4. Devuelve {token, user}         | 4. Devuelve datos del usuario
     v                                   v
 [Frontend]                          [Frontend]
     |                                   |
     | Guarda token en localStorage      | Usa los datos del usuario
     | Actualiza estado global           |
```

---

## BACKEND (Flask + flask-jwt-extended)

### 1. Configuracion de JWT en la app

**Archivo: `src/app.py`**

Lo primero es configurar JWT en tu aplicacion Flask:

```python
from flask_jwt_extended import JWTManager
from datetime import timedelta

# Clave secreta para firmar los tokens - NUNCA la compartas ni la subas a git
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY", "super-secret-key-change-in-production")

# Tiempo de vida del token (1 hora en este caso)
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

# Inicializar JWT con la app
jwt = JWTManager(app)
```

Tambien configuramos manejadores de errores personalizados para cuando algo falla con el token:

```python
@jwt.expired_token_callback
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify({"message": "Token ha expirado"}), 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({"message": "Token invalido"}), 401

@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify({"message": "Token requerido"}), 401
```

> **Por que importa?** Sin estos manejadores, Flask devolveria errores genericos que no ayudan al frontend a entender que paso.

---

### 2. Modelo de Usuario con password hasheado

**Archivo: `src/api/models/user.py`**

**REGLA DE ORO: Nunca guardes passwords en texto plano.** Usamos `bcrypt` para hashear:

```python
import bcrypt

class User(db.Model):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    username: Mapped[str] = mapped_column(String(80), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(256), nullable=False)  # Aqui se guarda el HASH, no el password
    is_active: Mapped[bool] = mapped_column(Boolean(), default=True, nullable=False)

    def set_password(self, password):
        """Convierte 'mi_password_123' en '$2b$12$LJ3m...' (hash irreversible)"""
        password_bytes = password.encode('utf-8')
        hashed = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
        self.password = hashed.decode('utf-8')

    def check_password(self, password):
        """Compara un password en texto plano contra el hash almacenado"""
        password_bytes = password.encode('utf-8')
        hashed_bytes = self.password.encode('utf-8')
        return bcrypt.checkpw(password_bytes, hashed_bytes)

    def serialize(self):
        """Convierte el usuario a diccionario - NUNCA incluye el password"""
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "is_active": self.is_active,
        }
```

> **Que es hashear?** Es como meter un documento en una trituradora: puedes verificar que otro documento produce las mismas tiras, pero nunca puedes reconstruir el original. Si alguien roba tu base de datos, no podra ver los passwords.

---

### 3. Servicio de Autenticacion (logica de negocio)

**Archivo: `src/api/services/auth_service.py`**

#### Registro (signup)

```python
from flask_jwt_extended import create_access_token

class AuthService:

    @staticmethod
    def signup(data):
        # 1. Validar que vengan todos los campos
        required_fields = ["email", "username", "password"]
        for field in required_fields:
            if field not in data or not data[field]:
                abort(400, description=f"El campo '{field}' es obligatorio")

        # 2. Verificar que no exista un usuario con ese email o username
        if User.query.filter_by(email=data["email"]).first():
            abort(409, description="Ya existe un usuario con ese email")

        if User.query.filter_by(username=data["username"]).first():
            abort(409, description="Ya existe un usuario con ese username")

        # 3. Crear el usuario con password hasheado
        new_user = User(
            email=data["email"],
            username=data["username"],
            is_active=True
        )
        new_user.set_password(data["password"])  # <-- Hashea el password
        db.session.add(new_user)
        db.session.commit()

        # 4. Generar token JWT con el ID del usuario como "identity"
        access_token = create_access_token(identity=str(new_user.id))

        # 5. Devolver token + datos del usuario
        return {
            "user": new_user.serialize(),
            "token": access_token
        }
```

> **Que es `identity`?** Es el dato que se guarda DENTRO del token. Cuando despues decodifiquemos el token, recuperaremos este valor. Usamos el `id` del usuario porque es unico e inmutable.

#### Login

```python
    @staticmethod
    def login(data):
        # 1. Validar campos
        if "email" not in data or "password" not in data:
            abort(400, description="Email y password son obligatorios")

        # 2. Buscar usuario por email
        user = User.query.filter_by(email=data["email"]).first()
        if user is None:
            abort(401, description="Email o password incorrectos")
            # OJO: mensaje generico a proposito, no decimos "email no encontrado"
            # para no revelar que emails existen en la base de datos

        # 3. Verificar que la cuenta este activa
        if not user.is_active:
            abort(401, description="La cuenta esta desactivada")

        # 4. Verificar password
        if not user.check_password(data["password"]):
            abort(401, description="Email o password incorrectos")

        # 5. Generar y devolver token
        access_token = create_access_token(identity=str(user.id))
        return {
            "user": user.serialize(),
            "token": access_token
        }
```

#### Obtener usuario actual

```python
    @staticmethod
    def get_current_user(user_id):
        """A partir del ID que viene en el token, devuelve los datos del usuario"""
        user = User.query.get(int(user_id))
        if user is None:
            abort(404, description="Usuario no encontrado")
        return user.serialize()
```

---

### 4. Controlador (endpoints HTTP)

**Archivo: `src/api/controllers/auth_controller.py`**

```python
from flask import Blueprint, request, jsonify, abort
from flask_jwt_extended import jwt_required, get_jwt_identity

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

# RUTA PUBLICA - Cualquiera puede acceder
@auth_bp.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    result = AuthService.signup(body)
    return jsonify(result), 201

# RUTA PUBLICA - Cualquiera puede acceder
@auth_bp.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    result = AuthService.login(body)
    return jsonify(result), 200

# RUTA PROTEGIDA - Solo usuarios con token valido
@auth_bp.route('/me', methods=['GET'])
@jwt_required()          # <-- Este decorador EXIGE un token valido
def get_me():
    current_user_id = get_jwt_identity()  # <-- Extrae el "identity" del token (el user id)
    user = AuthService.get_current_user(current_user_id)
    return jsonify(user), 200
```

### Como proteger cualquier endpoint del backend

Solo necesitas dos cosas:

```python
from flask_jwt_extended import jwt_required, get_jwt_identity

@app.route('/api/mi-ruta-protegida', methods=['GET'])
@jwt_required()  # 1. Agregar este decorador
def mi_ruta():
    user_id = get_jwt_identity()  # 2. Obtener el ID del usuario autenticado
    # ... tu logica aqui
    return jsonify({"message": f"Hola usuario {user_id}!"})
```

Si alguien intenta acceder sin token o con un token invalido, Flask devolvera automaticamente un error 401.

---

## FRONTEND (React + React Router)

### 5. Estado global (store)

**Archivo: `src/front/store.js`**

Necesitamos un lugar centralizado para guardar el token y los datos del usuario:

```javascript
export const initialStore = () => {
  return {
    // Al cargar la app, intentamos recuperar la sesion de localStorage
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: !!localStorage.getItem("token"), // true si hay token, false si no
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case 'login': {
      const { token, user } = action.payload;
      // Guardar en localStorage para que persista al refrescar la pagina
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return {
        ...store,
        token,
        user,
        isAuthenticated: true,
      };
    }

    case 'logout':
      // Limpiar todo
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...store,
        token: null,
        user: null,
        isAuthenticated: false,
      };

    case 'set_user':
      return {
        ...store,
        user: action.payload,
      };

    default:
      throw Error('Unknown action.');
  }
}
```

> **Por que localStorage?** Porque los datos persisten incluso si el usuario cierra el navegador. Sin localStorage, perderia la sesion cada vez que refresca la pagina.

---

### 6. Login y Signup (paginas)

**Archivo: `src/front/pages/Login.jsx`**

```jsx
const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Enviar credenciales al backend
    const response = await fetch(backendUrl + "/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesion");
    }

    // 2. Guardar token y usuario en el estado global
    dispatch({
        type: "login",
        payload: { token: data.token, user: data.user }
    });

    // 3. Redirigir al usuario a la pagina principal
    navigate("/");
};
```

El flujo de **Signup** (`src/front/pages/Signup.jsx`) es identico, solo que envia un campo extra (`username`) y apunta a `/api/auth/signup`.

---

### 7. Proteger rutas en el frontend (PrivateRoute)

**Archivo: `src/front/components/PrivateRoute.jsx`**

Este es el componente clave para proteger paginas:

```jsx
import { Navigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const PrivateRoute = ({ children }) => {
    const { store } = useGlobalReducer();

    // Si NO esta autenticado, redirigir al login
    if (!store.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Si esta autenticado, mostrar el contenido protegido
    return children;
};
```

> **Como funciona?** Es un componente "envoltorio". Si hay token, renderiza lo que tenga dentro (`children`). Si no, redirige a `/login`.

### Como usarlo en las rutas

**Archivo: `src/front/routes.jsx`**

```jsx
<Route path="/" element={<Layout />}>
    {/* Rutas publicas - cualquiera puede acceder */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />

    {/* Ruta protegida - solo usuarios autenticados */}
    <Route path="/demo" element={
        <PrivateRoute>
            <Demo />
        </PrivateRoute>
    } />
</Route>
```

Para proteger cualquier ruta nueva, simplemente envuelvela con `<PrivateRoute>`:

```jsx
<Route path="/mi-pagina-secreta" element={
    <PrivateRoute>
        <MiPaginaSecreta />
    </PrivateRoute>
} />
```

---

### 8. Validacion del token al cargar la app

**Archivo: `src/front/pages/Layout.jsx`**

Cuando el usuario refresca la pagina, el token sigue en localStorage, pero podria haber expirado. Por eso validamos al cargar:

```jsx
useEffect(() => {
    // Si no hay token, no hacer nada
    if (!store.token) return;

    // Verificar que el token siga siendo valido
    fetch(backendUrl + "/api/auth/me", {
        headers: {
            "Authorization": "Bearer " + store.token  // <-- Asi se envia el token
        }
    })
    .then(res => {
        if (!res.ok) throw new Error("Token invalido");
        return res.json();
    })
    .then(data => {
        // Token valido: actualizar datos del usuario
        dispatch({ type: "set_user", payload: data });
    })
    .catch(() => {
        // Token invalido o expirado: cerrar sesion automaticamente
        dispatch({ type: "logout" });
    });
}, []);
```

> **Importante:** El formato del header es siempre `"Bearer "` + el token. La palabra "Bearer" es un estandar que indica que estamos usando un token de tipo portador.

---

### 9. Navbar con logica de autenticacion

**Archivo: `src/front/components/Navbar.jsx`**

```jsx
const { store, dispatch } = useGlobalReducer();

const handleLogout = () => {
    dispatch({ type: "logout" });  // Limpia token y datos
    navigate("/");
};

// En el JSX:
{store.isAuthenticated ? (
    // Usuario logueado: mostrar nombre y boton de logout
    <>
        <span>{store.user?.username}</span>
        <button onClick={handleLogout}>Logout</button>
    </>
) : (
    // Usuario no logueado: mostrar botones de login y signup
    <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
    </>
)}
```

---

## Como enviar el token en cualquier peticion al backend

Cada vez que necesites acceder a un endpoint protegido, incluye el token en el header `Authorization`:

```javascript
const { store } = useGlobalReducer();

const fetchProtectedData = async () => {
    const response = await fetch(backendUrl + "/api/mi-ruta-protegida", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + store.token  // <-- CLAVE
        }
    });

    if (response.status === 401) {
        // Token expirado o invalido - redirigir al login
        dispatch({ type: "logout" });
        return;
    }

    const data = await response.json();
    // usar data...
};
```

---

## Resumen visual del sistema completo

```
+------------------+                      +------------------+
|    FRONTEND      |                      |     BACKEND      |
|   (React)        |                      |    (Flask)       |
|                  |                      |                  |
|  localStorage    |   POST /auth/login   |  Base de datos   |
|  +----------+    | -------------------> |  +----------+    |
|  | token    | <--|---- {token, user} ---|  | users    |    |
|  | user     |    |                      |  | (bcrypt) |    |
|  +----------+    |                      |  +----------+    |
|                  |                      |                  |
|  store           |   GET /auth/me       |  JWT             |
|  +----------+    |   Authorization:     |  +----------+    |
|  | token    | ---|-> Bearer <token> --->|  | verify() |    |
|  | user     | <--|---- {user data} ----|  | decode() |    |
|  | isAuth   |    |                      |  +----------+    |
|  +----------+    |                      |                  |
|                  |                      |                  |
|  PrivateRoute    |   GET /protegido     |  @jwt_required() |
|  +----------+    |   Authorization:     |  +----------+    |
|  | isAuth?  | ---|-> Bearer <token> --->|  | verify() |    |
|  | si: render|<--|---- {data} ---------|  | identity |    |
|  | no: /login|   |                      |  +----------+    |
|  +----------+    |                      |                  |
+------------------+                      +------------------+
```

---

## Checklist: pasos para agregar autenticacion a tu proyecto

### Backend
- [ ] Instalar dependencias: `flask-jwt-extended` y `bcrypt`
- [ ] Configurar `JWT_SECRET_KEY` y `JWT_ACCESS_TOKEN_EXPIRES` en `app.py`
- [ ] Crear modelo `User` con metodos `set_password()` y `check_password()`
- [ ] Crear servicio con logica de `signup`, `login` y `get_current_user`
- [ ] Crear endpoints `/auth/signup`, `/auth/login` y `/auth/me`
- [ ] Proteger endpoints sensibles con `@jwt_required()`

### Frontend
- [ ] Agregar `token`, `user` e `isAuthenticated` al estado global
- [ ] Crear acciones `login`, `logout` y `set_user` en el reducer
- [ ] Persistir token en `localStorage`
- [ ] Crear paginas de Login y Signup que llamen a la API
- [ ] Crear componente `PrivateRoute` que verifique autenticacion
- [ ] Envolver rutas protegidas con `<PrivateRoute>`
- [ ] Validar token al cargar la app (llamar a `/auth/me`)
- [ ] Enviar header `Authorization: Bearer <token>` en peticiones protegidas

---

## Errores comunes

| Error | Causa | Solucion |
|-------|-------|----------|
| `401 Token requerido` | No enviaste el header Authorization | Agrega `"Authorization": "Bearer " + token` |
| `401 Token ha expirado` | El token supero su tiempo de vida | Vuelve a hacer login para obtener uno nuevo |
| `401 Token invalido` | Token corrupto o firmado con otra clave | Verifica que `JWT_SECRET_KEY` sea la misma en desarrollo |
| `409 Ya existe un usuario` | Email o username duplicado | Usa un email/username diferente |
| CORS error | El backend no acepta peticiones del frontend | Configura `flask-cors` correctamente |
| Token desaparece al refrescar | No lo guardaste en localStorage | Usa `localStorage.setItem("token", token)` |
