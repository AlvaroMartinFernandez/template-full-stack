"""
Blueprint principal de la API.
Registra el endpoint base /hello y los sub-blueprints de cada controller.

Estructura de endpoints:
    /api/hello          -> routes.py (este archivo)
    /api/users/*        -> controllers/user_controller.py
    /api/articles/*     -> controllers/article_controller.py
    /api/orders/*       -> controllers/order_controller.py
    /api/tags/*         -> controllers/tag_controller.py
"""
from flask import jsonify, Blueprint
from api.utils import generate_sitemap, APIException
from api.controllers import register_controllers
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Registrar todos los sub-blueprints (controllers)
register_controllers(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200
