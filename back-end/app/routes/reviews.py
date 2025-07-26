from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from app import db
from app.models.review import Review
from app.models.childrens_home import ChildrensHome
from app.models.user import User

reviews_bp = Blueprint('reviews', __name__)

@reviews_bp.route('/', methods=['POST'])
@jwt_required()
def create_review():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['home_id', 'rating']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Validate home exists
        home = ChildrensHome.query.filter_by(id=data['home_id'], is_active=True).first()
        if not home:
            return jsonify({'error': 'Children\'s home not found'}), 404
        
        # Validate rating
        try:
            rating = int(data['rating'])
            if rating < 1 or rating > 5:
                return jsonify({'error': 'Rating must be between 1 and 5'}), 400
        except ValueError:
            return jsonify({'error': 'Invalid rating format'}), 400
        
        # Check if user has already reviewed this home
        existing_review = Review.query.filter_by(user_id=user_id, home_id=data['home_id']).first()
        if existing_review:
            return jsonify({'error': 'You have already reviewed this children\'s home'}), 400
        
        # Parse visit_date if provided
        visit_date = None
        if data.get('visit_date'):
            try:
                visit_date = datetime.strptime(data['visit_date'], '%Y-%m-%d').date()
            except ValueError:
                return jsonify({'error': 'Invalid visit_date format. Use YYYY-MM-DD'}), 400
        
        # Create review
        review = Review(
            user_id=user_id,
            home_id=data['home_id'],
            rating=rating,
            title=data.get('title'),
            comment=data.get('comment'),
            visit_date=visit_date,
            anonymous=data.get('anonymous', False)
        )
        
        db.session.add(review)
        db.session.commit()
        
        return jsonify({
            'message': 'Review created successfully',
            'review': review.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@reviews_bp.route('/my-reviews', methods=['GET'])
@jwt_required()
def get_my_reviews():
    try:
        user_id = get_jwt_identity()
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        reviews_pagination = Review.query.filter_by(user_id=user_id).order_by(
            Review.created_at.desc()
        ).paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )
        
        reviews = [review.to_dict() for review in reviews_pagination.items]
        
        return jsonify({
            'reviews': reviews,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': reviews_pagination.total,
                'pages': reviews_pagination.pages,
                'has_prev': reviews_pagination.has_prev,
                'has_next': reviews_pagination.has_next
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@reviews_bp.route('/<int:review_id>', methods=['GET'])
@jwt_required()
def get_review_details(review_id):
    try:
        user_id = get_jwt_identity()
        review = Review.query.filter_by(id=review_id, user_id=user_id).first()
        
        if not review:
            return jsonify({'error': 'Review not found'}), 404
        
        return jsonify({'review': review.to_dict()}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@reviews_bp.route('/<int:review_id>', methods=['PUT'])
@jwt_required()
def update_review(review_id):
    try:
        user_id = get_jwt_identity()
        review = Review.query.filter_by(id=review_id, user_id=user_id).first()
        
        if not review:
            return jsonify({'error': 'Review not found'}), 404
        
        data = request.get_json()
        
        # Update allowed fields
        if 'rating' in data:
            try:
                rating = int(data['rating'])
                if rating < 1 or rating > 5:
                    return jsonify({'error': 'Rating must be between 1 and 5'}), 400
                review.rating = rating
            except ValueError:
                return jsonify({'error': 'Invalid rating format'}), 400
        
        if 'title' in data:
            review.title = data['title']
        
        if 'comment' in data:
            review.comment = data['comment']
        
        if 'visit_date' in data:
            if data['visit_date']:
                try:
                    review.visit_date = datetime.strptime(data['visit_date'], '%Y-%m-%d').date()
                except ValueError:
                    return jsonify({'error': 'Invalid visit_date format. Use YYYY-MM-DD'}), 400
            else:
                review.visit_date = None
        
        if 'anonymous' in data:
            review.anonymous = data['anonymous']
        
        review.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Review updated successfully',
            'review': review.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@reviews_bp.route('/<int:review_id>', methods=['DELETE'])
@jwt_required()
def delete_review(review_id):
    try:
        user_id = get_jwt_identity()
        review = Review.query.filter_by(id=review_id, user_id=user_id).first()
        
        if not review:
            return jsonify({'error': 'Review not found'}), 404
        
        db.session.delete(review)
        db.session.commit()
        
        return jsonify({'message': 'Review deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@reviews_bp.route('/home/<int:home_id>', methods=['GET'])
def get_home_reviews(home_id):
    try:
        home = ChildrensHome.query.filter_by(id=home_id, is_active=True).first()
        
        if not home:
            return jsonify({'error': 'Children\'s home not found'}), 404
        
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        # Get approved reviews only for public view
        reviews_pagination = Review.query.filter_by(
            home_id=home_id, 
            is_approved=True
        ).order_by(Review.created_at.desc()).paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )
        
        reviews = [review.to_dict() for review in reviews_pagination.items]
        
        # Calculate rating distribution
        rating_counts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
        all_reviews = Review.query.filter_by(home_id=home_id, is_approved=True).all()
        
        for review in all_reviews:
            rating_counts[review.rating] += 1
        
        average_rating = sum(r.rating for r in all_reviews) / len(all_reviews) if all_reviews else 0
        
        return jsonify({
            'reviews': reviews,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': reviews_pagination.total,
                'pages': reviews_pagination.pages,
                'has_prev': reviews_pagination.has_prev,
                'has_next': reviews_pagination.has_next
            },
            'rating_summary': {
                'average_rating': round(average_rating, 2),
                'total_reviews': len(all_reviews),
                'rating_distribution': rating_counts
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500