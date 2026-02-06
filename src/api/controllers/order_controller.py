"""
Controlador de ordenes - Endpoints /api/orders
"""

from flask import Blueprint, request, jsonify, abort
from flask_jwt_extended import jwt_required
from api.services.order_service import OrderService

order_bp = Blueprint('orders', __name__, url_prefix='/orders')


# GET /api/orders - Obtener todas las ordenes (protegido)
@order_bp.route('', methods=['GET'])
@jwt_required()
def get_orders():
    orders = OrderService.get_all()
    return jsonify(orders), 200


# GET /api/orders/<id> - Obtener una orden por ID (protegido)
@order_bp.route('/<int:order_id>', methods=['GET'])
@jwt_required()
def get_order(order_id):
    order = OrderService.get_by_id(order_id)
    return jsonify(order), 200


# POST /api/orders - Crear una nueva orden (protegido)
@order_bp.route('', methods=['POST'])
@jwt_required()
def create_order():
    body = request.get_json()
    if not body:
        abort(400, description="El body no puede estar vacio")
    order = OrderService.create(body)
    return jsonify(order), 201


# PUT /api/orders/<id> - Actualizar estado de una orden (protegido)
@order_bp.route('/<int:order_id>', methods=['PUT'])
@jwt_required()
def update_order(order_id):
    body = request.get_json()
    if not body:
        abort(400, description="El body no puede estar vacio")
    order = OrderService.update(order_id, body)
    return jsonify(order), 200


# DELETE /api/orders/<id> - Eliminar una orden (protegido)
@order_bp.route('/<int:order_id>', methods=['DELETE'])
@jwt_required()
def delete_order(order_id):
    result = OrderService.delete(order_id)
    return jsonify(result), 200
