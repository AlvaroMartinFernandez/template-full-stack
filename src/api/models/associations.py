"""
=============================================================================
              TABLA DE ASOCIACION: article_tags (Muchos a Muchos PURA)
=============================================================================

Usa db.Table cuando SOLO necesitas conectar dos tablas (sin campos extra).
Usa una Clase (como OrderItem) cuando necesitas campos adicionales.
"""

from sqlalchemy import Integer, ForeignKey, Table, Column
from api.models import db

article_tags = Table(
    'article_tags',
    db.metadata,
    Column(
        'article_id',
        Integer,
        ForeignKey('articles.id'),
        primary_key=True
    ),
    Column(
        'tag_id',
        Integer,
        ForeignKey('tags.id'),
        primary_key=True
    )
)
