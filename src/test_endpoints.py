"""
Script para testear todos los endpoints de la API.
Ejecutar con: pipenv run test

Uso:
    python src/test_endpoints.py                          (usa http://localhost:3001)
    python src/test_endpoints.py https://mi-url.com       (usa URL personalizada)
"""
import sys
import json
import urllib.request
import urllib.error

BASE_URL = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3001"
BASE_URL = BASE_URL.rstrip("/")

# =====================================================================
#                        HELPERS
# =====================================================================
passed = 0
failed = 0
total = 0
TOKEN = None  # JWT token para endpoints protegidos


def request(method, path, body=None, expected_status=200, auth=False):
    global passed, failed, total
    total += 1
    url = f"{BASE_URL}{path}"

    data = None
    if body is not None:
        data = json.dumps(body).encode("utf-8")

    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Content-Type", "application/json")

    if auth and TOKEN:
        req.add_header("Authorization", f"Bearer {TOKEN}")

    try:
        response = urllib.request.urlopen(req)
        status = response.status
        resp_body = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        status = e.code
        try:
            resp_body = json.loads(e.read().decode("utf-8"))
        except Exception:
            resp_body = None

    ok = status == expected_status
    icon = "PASS" if ok else "FAIL"

    if ok:
        passed += 1
    else:
        failed += 1

    lock = "[AUTH]" if auth else "      "
    print(f"  [{icon}] {lock} {method:6} {path:40} -> {status} (esperado {expected_status})")

    if not ok and resp_body:
        print(f"         Respuesta: {resp_body}")

    return resp_body, status


def section(title):
    print(f"\n{'='*60}")
    print(f"  {title}")
    print(f"{'='*60}")


# =====================================================================
#                        TESTS
# =====================================================================

print(f"\n  Testeando API en: {BASE_URL}\n")

# ----- AUTH -----
section("AUTH")

# POST /api/auth/signup - crear cuenta
signup_data, _ = request("POST", "/api/auth/signup", {
    "email": "test_auth@test.com",
    "username": "test_auth",
    "password": "123456"
}, expected_status=201)

if signup_data and "token" in signup_data:
    print(f"         -> Signup OK, token recibido")

# POST /api/auth/signup - email duplicado (409)
request("POST", "/api/auth/signup", {
    "email": "test_auth@test.com",
    "username": "otro",
    "password": "123456"
}, expected_status=409)

# POST /api/auth/signup - campo faltante (400)
request("POST", "/api/auth/signup", {
    "email": "nuevo@test.com"
}, expected_status=400)

# POST /api/auth/login - login correcto
login_data, _ = request("POST", "/api/auth/login", {
    "email": "test_auth@test.com",
    "password": "123456"
})

if login_data and "token" in login_data:
    TOKEN = login_data["token"]
    print(f"         -> Login OK, token guardado para siguientes tests")

# POST /api/auth/login - password incorrecta (401)
request("POST", "/api/auth/login", {
    "email": "test_auth@test.com",
    "password": "wrongpassword"
}, expected_status=401)

# POST /api/auth/login - usuario inexistente (401)
request("POST", "/api/auth/login", {
    "email": "noexiste@test.com",
    "password": "123456"
}, expected_status=401)

# POST /api/auth/login - campo faltante (400)
request("POST", "/api/auth/login", {
    "email": "test_auth@test.com"
}, expected_status=400)

# GET /api/auth/me - con token valido
me_data, _ = request("GET", "/api/auth/me", auth=True)
if me_data:
    print(f"         -> Me: {me_data.get('username', me_data.get('email'))}")

# GET /api/auth/me - sin token (401)
request("GET", "/api/auth/me", expected_status=401)


# ----- USERS -----
section("USERS")

# GET /api/users - protegido
data, _ = request("GET", "/api/users", auth=True)
user_count = len(data) if data else 0
print(f"         -> {user_count} usuarios encontrados")

# GET /api/users - sin token (401)
request("GET", "/api/users", expected_status=401)

# POST /api/users - crear usuario de test (protegido)
test_user, _ = request("POST", "/api/users", {
    "email": "test_script@test.com",
    "username": "test_script",
    "password": "123456"
}, expected_status=201, auth=True)

test_user_id = test_user["id"] if test_user else None

# GET /api/users/:id - publico
request("GET", f"/api/users/{test_user_id}")

# POST /api/users - email duplicado (409)
request("POST", "/api/users", {
    "email": "test_script@test.com",
    "username": "otro",
    "password": "123456"
}, expected_status=409, auth=True)

# POST /api/users - campo faltante (400)
request("POST", "/api/users", {
    "email": "nuevo@test.com",
    "username": "nuevo"
}, expected_status=400, auth=True)

# POST /api/users - body vacio (400)
request("POST", "/api/users", {}, expected_status=400, auth=True)

# POST /api/users - sin token (401)
request("POST", "/api/users", {
    "email": "sintoken@test.com",
    "username": "sintoken",
    "password": "123456"
}, expected_status=401)

# GET /api/users/999 - no encontrado (404)
request("GET", "/api/users/999", expected_status=404)

# PUT /api/users/:id - protegido
request("PUT", f"/api/users/{test_user_id}", {
    "username": "test_updated"
}, auth=True)

# PUT /api/users/:id - email duplicado (409)
if data and len(data) > 0:
    existing_email = data[0]["email"]
    request("PUT", f"/api/users/{test_user_id}", {
        "email": existing_email
    }, expected_status=409, auth=True)

# DELETE /api/users/:id - protegido
request("DELETE", f"/api/users/{test_user_id}", auth=True)

# DELETE /api/users/999 - no encontrado (404)
request("DELETE", "/api/users/999", expected_status=404, auth=True)


# ----- USERS ESPECIALES -----
section("USERS - ENDPOINTS ESPECIALES")

# POST /api/users/with-profile - protegido
user_profile, _ = request("POST", "/api/users/with-profile", {
    "email": "profile_test@test.com",
    "username": "profile_test",
    "password": "123456",
    "profile": {
        "first_name": "Test",
        "last_name": "Profile",
        "phone": "+34 600000000",
        "bio": "Soy un test"
    }
}, expected_status=201, auth=True)

user_profile_id = user_profile["id"] if user_profile else None

# POST /api/users/with-profile - duplicado (409)
request("POST", "/api/users/with-profile", {
    "email": "profile_test@test.com",
    "username": "otro",
    "password": "123456"
}, expected_status=409, auth=True)

# POST /api/users/with-profile - campo faltante (400)
request("POST", "/api/users/with-profile", {
    "email": "nuevo@test.com"
}, expected_status=400, auth=True)

# GET /api/users/:id/orders - publico
if data and len(data) > 0:
    first_user_id = data[0]["id"]
    request("GET", f"/api/users/{first_user_id}/orders")

# GET /api/users/999/orders - no encontrado (404)
request("GET", "/api/users/999/orders", expected_status=404)

# Limpiar usuario con perfil
if user_profile_id:
    request("DELETE", f"/api/users/{user_profile_id}", auth=True)


# ----- ARTICLES -----
section("ARTICLES")

# GET /api/articles - publico
articles_data, _ = request("GET", "/api/articles")
article_count = len(articles_data) if articles_data else 0
print(f"         -> {article_count} articulos encontrados")

# POST /api/articles - protegido
test_article, _ = request("POST", "/api/articles", {
    "name": "Articulo Test",
    "description": "Creado por el script de test",
    "price": 99.99,
    "stock": 10,
    "tag_ids": [1] if articles_data else []
}, expected_status=201, auth=True)

test_article_id = test_article["id"] if test_article else None

# GET /api/articles/:id - publico
request("GET", f"/api/articles/{test_article_id}")

# POST /api/articles - sin nombre (400)
request("POST", "/api/articles", {
    "description": "Sin nombre"
}, expected_status=400, auth=True)

# POST /api/articles - body vacio (400)
request("POST", "/api/articles", {}, expected_status=400, auth=True)

# POST /api/articles - sin token (401)
request("POST", "/api/articles", {
    "name": "Sin token",
    "price": 10
}, expected_status=401)

# GET /api/articles/999 - no encontrado (404)
request("GET", "/api/articles/999", expected_status=404)

# PUT /api/articles/:id - protegido
request("PUT", f"/api/articles/{test_article_id}", {
    "name": "Articulo Actualizado",
    "price": 149.99
}, auth=True)

# PUT /api/articles/:id - cambiar tags
request("PUT", f"/api/articles/{test_article_id}", {
    "tag_ids": [1, 2] if articles_data else []
}, auth=True)

# DELETE /api/articles/:id - protegido
request("DELETE", f"/api/articles/{test_article_id}", auth=True)

# DELETE /api/articles/999 - no encontrado (404)
request("DELETE", "/api/articles/999", expected_status=404, auth=True)


# ----- TAGS -----
section("TAGS")

# GET /api/tags - publico
tags_data, _ = request("GET", "/api/tags")
tag_count = len(tags_data) if tags_data else 0
print(f"         -> {tag_count} tags encontrados")

# POST /api/tags - protegido
test_tag, _ = request("POST", "/api/tags", {
    "name": "Tag Test",
    "color": "#ff0000"
}, expected_status=201, auth=True)

test_tag_id = test_tag["id"] if test_tag else None

# GET /api/tags/:id - publico
request("GET", f"/api/tags/{test_tag_id}")

# POST /api/tags - duplicado (409)
request("POST", "/api/tags", {
    "name": "Tag Test"
}, expected_status=409, auth=True)

# POST /api/tags - sin nombre (400)
request("POST", "/api/tags", {}, expected_status=400, auth=True)

# POST /api/tags - sin token (401)
request("POST", "/api/tags", {
    "name": "Sin Token"
}, expected_status=401)

# GET /api/tags/999 - no encontrado (404)
request("GET", "/api/tags/999", expected_status=404)

# PUT /api/tags/:id - protegido
request("PUT", f"/api/tags/{test_tag_id}", {
    "name": "Tag Actualizado",
    "color": "#00ff00"
}, auth=True)

# PUT /api/tags/:id - nombre duplicado (409)
if tags_data and len(tags_data) > 0:
    existing_tag_name = tags_data[0]["name"]
    request("PUT", f"/api/tags/{test_tag_id}", {
        "name": existing_tag_name
    }, expected_status=409, auth=True)

# DELETE /api/tags/:id - protegido
request("DELETE", f"/api/tags/{test_tag_id}", auth=True)

# DELETE /api/tags/999 - no encontrado (404)
request("DELETE", "/api/tags/999", expected_status=404, auth=True)


# ----- ORDERS -----
section("ORDERS")

# GET /api/orders - protegido
orders_data, _ = request("GET", "/api/orders", auth=True)
order_count = len(orders_data) if orders_data else 0
print(f"         -> {order_count} ordenes encontradas")

# GET /api/orders - sin token (401)
request("GET", "/api/orders", expected_status=401)

# Necesitamos un user_id y article_id existentes para crear ordenes
first_user_id = None
first_article_id = None

if data and len(data) > 0:
    first_user_id = data[0]["id"]
if articles_data and len(articles_data) > 0:
    for art in articles_data:
        if art.get("is_available") and art.get("stock", 0) > 0:
            first_article_id = art["id"]
            break

# POST /api/orders - protegido
test_order = None
if first_user_id and first_article_id:
    test_order, _ = request("POST", "/api/orders", {
        "user_id": first_user_id,
        "shipping_address": "Calle Test 123",
        "items": [
            {"article_id": first_article_id, "quantity": 1}
        ]
    }, expected_status=201, auth=True)

test_order_id = test_order["id"] if test_order else None

# GET /api/orders/:id - protegido
if test_order_id:
    request("GET", f"/api/orders/{test_order_id}", auth=True)

# POST /api/orders - sin user_id (400)
request("POST", "/api/orders", {
    "shipping_address": "Test"
}, expected_status=400, auth=True)

# POST /api/orders - usuario inexistente (404)
request("POST", "/api/orders", {
    "user_id": 999,
    "items": []
}, expected_status=404, auth=True)

# POST /api/orders - articulo no disponible (400)
unavailable = None
if articles_data:
    for art in articles_data:
        if not art.get("is_available"):
            unavailable = art["id"]
            break

if unavailable and first_user_id:
    request("POST", "/api/orders", {
        "user_id": first_user_id,
        "items": [{"article_id": unavailable, "quantity": 1}]
    }, expected_status=400, auth=True)

# POST /api/orders - body vacio (400)
request("POST", "/api/orders", {}, expected_status=400, auth=True)

# POST /api/orders - sin token (401)
request("POST", "/api/orders", {
    "user_id": 1,
    "items": []
}, expected_status=401)

# GET /api/orders/999 - no encontrado (404)
request("GET", "/api/orders/999", expected_status=404, auth=True)

# PUT /api/orders/:id - cambiar estado (protegido)
if test_order_id:
    request("PUT", f"/api/orders/{test_order_id}", {
        "status": "paid"
    }, auth=True)

# PUT /api/orders/:id - estado invalido (400)
if test_order_id:
    request("PUT", f"/api/orders/{test_order_id}", {
        "status": "invalido"
    }, expected_status=400, auth=True)

# DELETE /api/orders/:id - protegido
if test_order_id:
    request("DELETE", f"/api/orders/{test_order_id}", auth=True)

# DELETE /api/orders/999 - no encontrado (404)
request("DELETE", "/api/orders/999", expected_status=404, auth=True)


# ----- LIMPIAR AUTH USER -----
section("CLEANUP")

# Buscar y eliminar el usuario de auth creado al inicio
if signup_data and signup_data.get("user"):
    auth_user_id = signup_data["user"]["id"]
    request("DELETE", f"/api/users/{auth_user_id}", auth=True)
    print(f"         -> Usuario de auth (id={auth_user_id}) eliminado")


# =====================================================================
#                        RESUMEN
# =====================================================================
print(f"\n{'='*60}")
print(f"  RESUMEN")
print(f"{'='*60}")
print(f"  Total:    {total}")
print(f"  Pasados:  {passed}")
print(f"  Fallados: {failed}")
print(f"{'='*60}")

if failed > 0:
    print(f"\n  ** {failed} test(s) fallaron **\n")
    sys.exit(1)
else:
    print(f"\n  Todos los tests pasaron!\n")
    sys.exit(0)
