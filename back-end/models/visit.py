
from flask import Blueprint, request, jsonify
from models import Visit

visit_bp = Blueprint('visit', __name__)
@visit_bp.route('/visits', methods=['GET'])
def list_visits():
    visits = Visit.query.all()
    return jsonify([visit.to_dict() for visit in visits])

@visit_bp.route('/visits', methods=['POST'])
def schedule_visit():
    data = request.json
    visit = Visit(**data)
    if not visit.user_id or not visit.home_id:
        return jsonify({'error': 'User ID and Home ID are required'}), 400

    return jsonify(visit.to_dict()), 201

@visit_bp.route('/visits/<int:user_id>', methods=['GET'])
def get_user_visits(user_id):
    visits = Visit.query.filter_by(user_id=user_id).all()
    return jsonify([v.to_dict() for v in visits])