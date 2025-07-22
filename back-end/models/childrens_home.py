from flask import Blueprint, request, jsonify
from models import ChildrenHome


home_bp = Blueprint('home', __name__)

@home_bp.route('/homes', methods=['GET'])
def list_homes():
    homes = ChildrenHome.query.all()
    return jsonify([home.to_dict() for home in homes])

@home_bp.route('/homes', methods=['POST'])
def add_home():
    data = request.json
    home = ChildrenHome(**data)
    if not home.name or not home.location:
        return jsonify({'error': 'Name and location are required'}), 400
    return jsonify(home.to_dict()), 201

@home_bp.route('/homes/<int:id>', methods=['GET'])
def get_home(id):
    home = ChildrenHome.query.get_or_404(id)
    return jsonify(home.to_dict())