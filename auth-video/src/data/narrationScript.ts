// =========================================================================
// Script de narracion expandido para el video de Auth (13 minutos)
// Cada segmento se sincroniza con un archivo de audio en public/audio/
// =========================================================================

export interface NarrationSegment {
  id: string;
  section: string;
  text: string;
  startFrame: number;
  durationFrames: number;
  audioFile?: string;
}

export const narrationScript: NarrationSegment[] = [
  // ======================== ACTO 1: FUNDAMENTOS (0-200s) ========================
  {
    id: 'act1_intro',
    section: 'Introduccion',
    text: 'Bienvenidos! En este video vamos a aprender paso a paso como implementar autenticacion completa en una aplicacion full-stack. Usaremos Flask con JWT en el backend y React en el frontend. Al final del video, vas a saber como registrar usuarios, hacer login, proteger rutas y manejar sesiones de forma segura. Vamos a ver todo el codigo real de nuestro proyecto.',
    startFrame: 0,
    durationFrames: 900,
  },
  {
    id: 'act1_que_es_auth',
    section: 'Que es Autenticacion',
    text: 'Empecemos por lo basico. Que es la autenticacion? Es simplemente el proceso de verificar quien eres. Piensa en ello como cuando muestras tu DNI para entrar a un edificio. En la web, el usuario proporciona sus credenciales, normalmente email y password, y el servidor verifica si son correctas. Si lo son, le da acceso a los recursos protegidos. Es importante no confundir autenticacion con autorizacion. Autenticacion es verificar quien eres, como el login. Autorizacion es verificar que puedes hacer, como los permisos y roles. En este video nos enfocamos en la autenticacion.',
    startFrame: 900,
    durationFrames: 1200,
  },
  {
    id: 'act1_session_vs_token',
    section: 'Sessions vs Tokens',
    text: 'Ahora, hay dos formas principales de mantener la sesion de un usuario: sesiones tradicionales y tokens. Con sesiones, el servidor guarda la informacion en memoria y envia una cookie al navegador. El problema es que esto no escala bien: si tienes multiples servidores, cada uno necesita conocer todas las sesiones. Con tokens JWT, es diferente. El servidor genera un token firmado y se lo da al cliente. El cliente lo guarda en localStorage y lo envia en cada peticion. La ventaja clave es que el servidor no necesita guardar estado. Es stateless. Esto escala mucho mejor y es la forma moderna de hacer autenticacion en APIs REST. Nosotros vamos a usar JWT.',
    startFrame: 2100,
    durationFrames: 1200,
  },
  {
    id: 'act1_que_es_jwt',
    section: 'Que es JWT',
    text: 'Entonces, que es exactamente un JWT? Son las siglas de JSON Web Token. Piensa en el como un pase VIP digital firmado. Se genera en el servidor cuando haces login exitosamente, y tiene tres partes separadas por puntos. La primera parte es el Header, que dice que algoritmo se usa para la firma, en nuestro caso HS256. La segunda parte es el Payload, que contiene los datos importantes como el ID del usuario y la fecha de expiracion. Y la tercera parte es la Signature, la firma digital. Esta se genera usando la SECRET KEY del servidor. Si alguien intenta modificar el payload, la firma ya no coincide y el servidor lo rechaza. Importante: el JWT esta codificado en Base64, no encriptado. Cualquiera puede leer el contenido, pero nadie puede modificarlo sin la clave secreta. En nuestro proyecto, el token expira despues de una hora.',
    startFrame: 3300,
    durationFrames: 1500,
  },
  {
    id: 'act1_flujo_auth',
    section: 'Flujo de Auth',
    text: 'Veamos como funciona el flujo completo de autenticacion. Cuando el usuario hace login, el frontend envia las credenciales al backend con un POST. El backend busca al usuario por email, verifica el password con bcrypt, y si todo es correcto, genera un JWT con el ID del usuario. El token se devuelve al frontend, que lo guarda en localStorage. A partir de ahi, cada vez que el frontend necesita acceder a una ruta protegida, envia el token en el header Authorization con el formato Bearer seguido del token. El backend valida el token, extrae el ID del usuario, y procesa la peticion. Es un flujo limpio y seguro.',
    startFrame: 4800,
    durationFrames: 1200,
  },

  // ======================== ACTO 2: BACKEND (200-440s) ========================
  {
    id: 'act2_intro',
    section: 'Backend Intro',
    text: 'Ahora vamos al codigo del backend! Vamos a ver paso a paso el modelo de usuario, la configuracion de JWT, el servicio de autenticacion y el controlador con los endpoints.',
    startFrame: 6000,
    durationFrames: 300,
  },
  {
    id: 'act2_jwt_config',
    section: 'JWT Config',
    text: 'Lo primero es configurar JWT en nuestro archivo app punto py. Necesitamos tres cosas: la JWT SECRET KEY, que es la clave secreta para firmar los tokens. Esta debe ser una cadena larga y aleatoria, y NUNCA debe estar en el codigo, siempre en variables de entorno. Segundo, configuramos la expiracion del token a una hora con timedelta. Y tercero, inicializamos JWTManager con nuestra app. Tambien definimos tres manejadores de error: uno para cuando el token expira, otro para tokens invalidos, y otro cuando no se envia token. Cada uno devuelve un error 401 con un mensaje descriptivo.',
    startFrame: 6300,
    durationFrames: 1200,
  },
  {
    id: 'act2_user_model',
    section: 'User Model',
    text: 'El modelo User es la base de todo el sistema de autenticacion. Tiene seis columnas principales: id como primary key, email y username que son unicos y obligatorios, password que almacena el hash de 256 caracteres, is_active para desactivar cuentas sin borrarlas, y created_at con la fecha de creacion. Fijate que email y username tienen unique equals True. Esto garantiza en la base de datos que no puede haber duplicados. El password tiene 256 caracteres porque el hash de bcrypt es largo. Y el metodo serialize devuelve los datos del usuario sin incluir el password, que es muy importante por seguridad.',
    startFrame: 7500,
    durationFrames: 1200,
  },
  {
    id: 'act2_bcrypt',
    section: 'Bcrypt',
    text: 'Los metodos mas criticos del modelo son set_password y check_password. Aqui usamos bcrypt, una libreria de hashing disenada especificamente para passwords. Set password toma el password en texto plano, lo convierte a bytes, y usa bcrypt punto hashpw con un salt generado automaticamente. El resultado se guarda como string en la base de datos. Check password hace el proceso inverso: toma el password que ingreso el usuario, lo convierte a bytes, y usa bcrypt punto checkpw para compararlo contra el hash almacenado. La regla de oro es: NUNCA guardar passwords en texto plano. Siempre hashear con bcrypt.',
    startFrame: 8700,
    durationFrames: 900,
  },
  {
    id: 'act2_auth_service_signup',
    section: 'AuthService Signup',
    text: 'El AuthService contiene toda la logica de negocio. Veamos el metodo signup paso a paso. Primero, valida que los tres campos obligatorios esten presentes: email, username y password. Si falta alguno, retorna un error 400. Segundo, verifica que no exista otro usuario con el mismo email o username, y si existe, retorna un error 409 de conflicto. Tercero, crea el usuario, llama a set_password para hashear el password, y lo guarda en la base de datos con session.add y commit. Cuarto y ultimo, genera un token JWT usando create_access_token con el ID del usuario como identity, y retorna tanto el usuario serializado como el token. Asi el usuario queda logueado automaticamente al registrarse.',
    startFrame: 9600,
    durationFrames: 1200,
  },
  {
    id: 'act2_auth_service_login',
    section: 'AuthService Login',
    text: 'El metodo login sigue un flujo similar pero diferente. Primero valida que vengan email y password. Luego busca al usuario por email con filter_by. Si no encuentra nada, devuelve un error 401 generico de credenciales incorrectas. No decimos "email no existe" por seguridad, para no revelar que emails estan registrados. Despues verifica que la cuenta este activa. Y finalmente, compara el password usando check_password de bcrypt. Si todo es correcto, genera un nuevo JWT y lo devuelve con los datos del usuario.',
    startFrame: 10800,
    durationFrames: 900,
  },
  {
    id: 'act2_auth_controller',
    section: 'Auth Controller',
    text: 'El controlador define los endpoints que expone nuestra API. Creamos un Blueprint con el prefijo auth, asi las rutas quedan bajo api slash auth. Tenemos tres endpoints: POST signup que es publico y cualquiera puede registrarse. POST login que tambien es publico para iniciar sesion. Y GET me, que es la primera ruta protegida. Fijate en el decorador arroba jwt_required con parentesis antes de get_me. Este decorador es la magia: verifica automaticamente que el token sea valido. Dentro de la funcion, usamos get_jwt_identity para obtener el ID del usuario desde el payload del token.',
    startFrame: 11700,
    durationFrames: 900,
  },
  {
    id: 'act2_proteger_rutas',
    section: 'Proteger Rutas',
    text: 'Proteger cualquier ruta en Flask es increiblemente simple. Solo necesitas agregar el decorador arroba jwt_required con parentesis encima de la funcion. Mira la diferencia: la ruta GET user por ID es publica, cualquiera puede acceder. Pero la ruta GET users que lista todos los usuarios tiene jwt_required, asi que solo usuarios con un token valido pueden acceder. Si alguien intenta acceder sin token, recibe automaticamente un error 401 con el mensaje Token requerido. Asi de facil es proteger tus endpoints.',
    startFrame: 12600,
    durationFrames: 600,
  },

  // ======================== ACTO 3: FRONTEND (440-660s) ========================
  {
    id: 'act3_intro',
    section: 'Frontend Intro',
    text: 'Ahora pasemos al frontend con React! Veremos como manejar el estado de autenticacion de forma global, como conectar con la API, las paginas de login y signup, y como proteger rutas en React.',
    startFrame: 13200,
    durationFrames: 300,
  },
  {
    id: 'act3_global_store',
    section: 'Global Store',
    text: 'El corazon de la autenticacion en el frontend es el store global. Usamos useReducer con Context API para manejar el estado en toda la aplicacion. El estado inicial tiene tres propiedades clave: token, user e isAuthenticated. Lo importante es que al cargar la app, leemos el token y usuario de localStorage. Asi la sesion persiste aunque el usuario recargue la pagina. El reducer tiene tres acciones: login guarda el token y usuario tanto en el store como en localStorage, y pone isAuthenticated en true. Logout limpia todo: remueve token y usuario del store y de localStorage. Y set_user actualiza solo los datos del usuario, por ejemplo despues de validar el token al cargar la app.',
    startFrame: 13500,
    durationFrames: 1200,
  },
  {
    id: 'act3_auth_service_front',
    section: 'Auth Service Frontend',
    text: 'El auth service del frontend contiene las funciones que llaman a nuestra API. Usamos el patron de tupla para manejar errores: cada funcion retorna un array con data y error. Si todo salio bien, data tiene valor y error es null. Si hubo un problema, data es null y error tiene el mensaje. Login service hace un POST a api auth login enviando email y password como JSON. Signup service hace lo mismo pero a signup, con email, username y password. Y getMe service es diferente: hace un GET a api auth me, y en vez de enviar body, envia el token en el header Authorization con el formato Bearer seguido del token. Esta funcion es la que usamos para validar si el token sigue siendo valido.',
    startFrame: 14700,
    durationFrames: 1200,
  },
  {
    id: 'act3_login_page',
    section: 'Login Page',
    text: 'La pagina de login tiene un formulario con email y password. Cuando el usuario envia el formulario, handleSubmit se ejecuta. Primero previene el comportamiento por defecto del formulario. Luego llama a loginService pasandole el form con email y password. Si hay error, muestra un alert y sale. Si es exitoso, aqui viene lo importante: hace dispatch de la accion login con el token y el usuario que devolvio la API. Ese dispatch actualiza el store global Y guarda en localStorage al mismo tiempo. Finalmente, usa navigate para redirigir al home. El usuario ya esta autenticado y puede acceder a rutas protegidas.',
    startFrame: 15900,
    durationFrames: 1200,
  },
  {
    id: 'act3_signup_page',
    section: 'Signup Page',
    text: 'La pagina de signup es muy similar al login pero con un campo extra: username. El formulario tiene email, username y password con un minimo de 6 caracteres. Lo interesante es que despues de registrarse exitosamente, hace exactamente lo mismo que el login: dispatch de la accion login con el token y usuario. Esto es lo que llamamos auto-login: el usuario se registra y queda automaticamente logueado, sin necesidad de ir a la pagina de login despues. Es una mejor experiencia de usuario.',
    startFrame: 17100,
    durationFrames: 900,
  },
  {
    id: 'act3_private_route',
    section: 'PrivateRoute',
    text: 'El componente PrivateRoute es el guardian de las rutas protegidas en React. Es muy simple pero poderoso. Recibe children como prop, que son los componentes que quiere proteger. Dentro, accede al store global y revisa si isAuthenticated es true. Si no esta autenticado, usa Navigate para redirigir a login con replace para que no quede en el historial. Si esta autenticado, simplemente renderiza los children. Para usarlo, en el archivo de rutas envolvemos las rutas que queremos proteger. Fijate como Demo esta envuelta en PrivateRoute: si intentas acceder a slash demo sin estar logueado, te redirige automaticamente a slash login.',
    startFrame: 18000,
    durationFrames: 900,
  },
  {
    id: 'act3_layout_navbar',
    section: 'Layout y Navbar',
    text: 'Dos piezas finales muy importantes. El Layout es el componente que envuelve toda la app. Tiene un useEffect que se ejecuta al cargar. Si hay un token en el store, llama a getMeService para validarlo contra el backend. Si el token es valido, actualiza los datos del usuario con set_user. Si es invalido o expiro, hace logout automaticamente, limpiando todo. Esto garantiza que la sesion sea siempre valida. Y el Navbar muestra contenido diferente segun el estado de autenticacion. Si el usuario esta autenticado, muestra su username y un boton de logout. Si no esta autenticado, muestra botones de Login y Signup. Todo esto es reactivo gracias al store global.',
    startFrame: 18900,
    durationFrames: 900,
  },

  // ======================== ACTO 4: CONCLUSION (660-780s) ========================
  {
    id: 'act4_flujo_registro',
    section: 'Flujo Registro',
    text: 'Repasemos el flujo completo de registro de principio a fin. El usuario abre la pagina de signup y llena el formulario. El frontend llama a signupService que hace un POST a la API. El backend recibe los datos, valida los campos, verifica que no haya duplicados, hashea el password con bcrypt, guarda el nuevo usuario en la base de datos, genera un JWT con el ID del nuevo usuario, y devuelve tanto el usuario como el token. El frontend recibe la respuesta, guarda el token en localStorage con el dispatch login, y redirige al home. El usuario esta registrado y autenticado en un solo paso.',
    startFrame: 19800,
    durationFrames: 900,
  },
  {
    id: 'act4_flujo_login',
    section: 'Flujo Login',
    text: 'El flujo de login es similar pero un poco mas simple. El usuario ingresa email y password, el frontend envia un POST a api auth login. El backend busca al usuario por email, compara el password con bcrypt checkpw, y si es correcto genera un nuevo JWT. El frontend guarda el token y redirige al home. A partir de ahi, si el token expira despues de una hora, el Layout lo detecta automaticamente al cargar la app y hace logout, forzando al usuario a loguearse de nuevo. Esto es un mecanismo de seguridad importante.',
    startFrame: 20700,
    durationFrames: 900,
  },
  {
    id: 'act4_flujo_protected',
    section: 'Flujo Ruta Protegida',
    text: 'Cuando un usuario autenticado intenta acceder a una ruta protegida, este es el flujo. El PrivateRoute verifica isAuthenticated en el store. Como tiene token, deja pasar. Si la pagina necesita datos del backend, envia el token en el header Authorization. El backend recibe la peticion, el decorador jwt_required valida el token automaticamente, get_jwt_identity extrae el user ID del payload, y la funcion puede buscar al usuario en la base de datos y devolver los datos protegidos. Si alguien intenta acceder sin token o con un token expirado, recibe un error 401 y en el frontend seria redirigido al login.',
    startFrame: 21600,
    durationFrames: 900,
  },
  {
    id: 'act4_conclusion',
    section: 'Conclusion',
    text: 'Y eso es todo! Hemos implementado un sistema de autenticacion completo de principio a fin. En el backend: modelo de usuario con bcrypt para hashear passwords, configuracion de JWT con expiracion y manejadores de error, servicio de autenticacion con signup y login, controlador con los tres endpoints, y el decorador jwt_required para proteger rutas. En el frontend: store global con persistencia en localStorage, servicio con funciones para llamar a la API, paginas de login y signup con formularios, PrivateRoute para proteger rutas en React, Layout que valida el token al cargar, y Navbar reactivo al estado de autenticacion. Ahora tu aplicacion es segura! Gracias por ver el video.',
    startFrame: 22500,
    durationFrames: 900,
  },
];
