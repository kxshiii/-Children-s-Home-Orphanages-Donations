from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import or_
from app import db
from app.models.childrens_home import ChildrensHome
from app.models.user import User

homes_bp = Blueprint('homes', __name__)

@homes_bp.route('/', methods=['GET'])
def get_homes():
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        search = request.args.get('search', '')
        location = request.args.get('location', '')
        
        query = ChildrensHome.query.filter_by(is_active=True)
        
        # Apply search filters
        if search:
            query = query.filter(
                or_(
                    ChildrensHome.name.ilike(f'%{search}%'),
                    ChildrensHome.description.ilike(f'%{search}%')
                )
            )
        
        if location:
            query = query.filter(ChildrensHome.location.ilike(f'%{location}%'))
        
        # Paginate results
        homes_pagination = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        homes = [home.to_dict() for home in homes_pagination.items]
        
        return jsonify({
            'homes': homes,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': homes_pagination.total,
                'pages': homes_pagination.pages,
                'has_prev': homes_pagination.has_prev,
                'has_next': homes_pagination.has_next
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@homes_bp.route('/<int:home_id>', methods=['GET'])
def get_home_details(home_id):
    try:
        home = ChildrensHome.query.filter_by(id=home_id, is_active=True).first()
        
        if not home:
            return jsonify({'error': 'Children\'s home not found'}), 404
        
        # Get recent reviews (limit to 5)
        recent_reviews = []
        for review in home.reviews[-5:]:
            if review.is_approved:
                recent_reviews.append(review.to_dict())
        
        home_data = home.to_dict()
        home_data['recent_reviews'] = recent_reviews
        
        return jsonify({'home': home_data}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@homes_bp.route('/search', methods=['GET'])
def search_homes():
    try:
        query_param = request.args.get('q', '')
        location_param = request.args.get('location', '')
        
        if not query_param and not location_param:
            return jsonify({'error': 'Search query or location is required'}), 400
        
        query = ChildrensHome.query.filter_by(is_active=True)
        
        if query_param:
            query = query.filter(
                or_(
                    ChildrensHome.name.ilike(f'%{query_param}%'),
                    ChildrensHome.description.ilike(f'%{query_param}%'),
                    ChildrensHome.needs_description.ilike(f'%{query_param}%')
                )
            )
        
        if location_param:
            query = query.filter(ChildrensHome.location.ilike(f'%{location_param}%'))
        
        homes = query.all()
        homes_data = [home.to_dict() for home in homes]
        
        return jsonify({
            'homes': homes_data,
            'count': len(homes_data)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@homes_bp.route('/locations', methods=['GET'])
def get_locations():
    try:
        # Get unique locations
        locations = db.session.query(ChildrensHome.location).filter_by(is_active=True).distinct().all()
        location_list = [location[0] for location in locations if location[0]]
        
        return jsonify({'locations': sorted(location_list)}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@homes_bp.route('/<int:home_id>/reviews', methods=['GET'])
def get_home_reviews(home_id):
    try:
        home = ChildrensHome.query.filter_by(id=home_id, is_active=True).first()
        
        if not home:
            return jsonify({'error': 'Children\'s home not found'}), 404
        
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        # Get approved reviews only
        reviews_query = db.session.query(home.reviews).filter_by(is_approved=True)
        reviews_pagination = reviews_query.paginate(
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