"""
Controlador de articulos - Endpoints /api/articles
"""

from flask import Blueprint, request, jsonify, abort
from flask_jwt_extended import jwt_required
from api.services.article_service import ArticleService

article_bp = Blueprint('articles', __name__, url_prefix='/articles')


# GET /api/articles - Obtener todos los articulos
@article_bp.route('', methods=['GET'])
def get_articles():
    articles = ArticleService.get_all()
    return jsonify(articles), 200


# GET /api/articles/<id> - Obtener un articulo por ID
@article_bp.route('/<int:article_id>', methods=['GET'])
def get_article(article_id):
    article = ArticleService.get_by_id(article_id)
    return jsonify(article), 200


# POST /api/articles - Crear un nuevo articulo (protegido)
@article_bp.route('', methods=['POST'])
@jwt_required()
def create_article():
    body = request.get_json()
    if not body:
        abort(400, description="El body no puede estar vacio")
    article = ArticleService.create(body)
    return jsonify(article), 201


# PUT /api/articles/<id> - Editar un articulo (protegido)
@article_bp.route('/<int:article_id>', methods=['PUT'])
@jwt_required()
def update_article(article_id):
    body = request.get_json()
    if not body:
        abort(400, description="El body no puede estar vacio")
    article = ArticleService.update(article_id, body)
    return jsonify(article), 200


# DELETE /api/articles/<id> - Eliminar un articulo (protegido)
@article_bp.route('/<int:article_id>', methods=['DELETE'])
@jwt_required()
def delete_article(article_id):
    result = ArticleService.delete(article_id)
    return jsonify(result), 200
