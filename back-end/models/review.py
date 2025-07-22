from flask import Blueprint, request, jsonify
from models import Review


review_bp = Blueprint('review', __name__)

@review_bp.route('/reviews', methods=['POST'])
def add_review():
    data = request.json
    review = Review(**data)
  
    return jsonify(review.to_dict()), 201

@review_bp.route('/reviews/<int:home_id>', methods=['GET'])
def get_reviews(home_id):
    reviews = Review.query.filter_by(home_id=home_id).all()
    return jsonify([r.to_dict() for r in reviews])