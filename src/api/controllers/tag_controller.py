"""
Controlador de tags - Endpoints /api/tags
"""

from flask import Blueprint, request, jsonify, abort
from flask_jwt_extended import jwt_required
from api.services.tag_service import TagService

tag_bp = Blueprint('tags', __name__, url_prefix='/tags')


# GET /api/tags - Obtener todos los tags
@tag_bp.route('', methods=['GET'])
def get_tags():
    tags = TagService.get_all()
    return jsonify(tags), 200


# GET /api/tags/<id> - Obtener un tag por ID (con sus articulos)
@tag_bp.route('/<int:tag_id>', methods=['GET'])
def get_tag(tag_id):
    tag = TagService.get_by_id(tag_id)
    return jsonify(tag), 200


# POST /api/tags - Crear un nuevo tag (protegido)
@tag_bp.route('', methods=['POST'])
@jwt_required()
def create_tag():
    body = request.get_json()
    if not body:
        abort(400, description="El body no puede estar vacio")
    tag = TagService.create(body)
    return jsonify(tag), 201


# PUT /api/tags/<id> - Editar un tag (protegido)
@tag_bp.route('/<int:tag_id>', methods=['PUT'])
@jwt_required()
def update_tag(tag_id):
    body = request.get_json()
    if not body:
        abort(400, description="El body no puede estar vacio")
    tag = TagService.update(tag_id, body)
    return jsonify(tag), 200


# DELETE /api/tags/<id> - Eliminar un tag (protegido)
@tag_bp.route('/<int:tag_id>', methods=['DELETE'])
@jwt_required()
def delete_tag(tag_id):
    result = TagService.delete(tag_id)
    return jsonify(result), 200
