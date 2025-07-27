from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, date
from sqlalchemy import func, desc
from app import db
from app.models.user import User
from app.models.childrens_home import ChildrensHome
from app.models.donation import Donation
from app.models.review import Review
from app.models.visit import Visit

admin_bp = Blueprint('admin', __name__)


def admin_required(f):
    def decorated_function(*args, **kwargs):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user or user.role != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        return f(*args, **kwargs)
    decorated_function.__name__ = f.__name__
    return decorated_function


@admin_bp.route('/users', methods=['GET'])
@jwt_required()
@admin_required
def get_users():
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        search = request.args.get('search', '')
        
        query = User.query
        
        if search:
            query = query.filter(
                (User.username.ilike(f'%{search}%')) |
                (User.email.ilike(f'%{search}%')) |
                (User.first_name.ilike(f'%{search}%')) |
                (User.last_name.ilike(f'%{search}%'))
            )
        
        users_pagination = query.order_by(User.date_joined.desc()).paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )
        
        users = [user.to_dict() for user in users_pagination.items]
        
        return jsonify({
            'users': users,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': users_pagination.total,
                'pages': users_pagination.pages,
                'has_prev': users_pagination.has_prev,
                'has_next': users_pagination.has_next
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/users', methods=['POST'])
@jwt_required()
@admin_required
def create_user():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['username', 'email', 'password', 'first_name', 'last_name']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Check if user already exists
        if User.query.filter_by(username=data['username']).first():
            return jsonify({'error': 'Username already exists'}), 400
        
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already exists'}), 400
        
        
        user = User(
            username=data['username'],
            email=data['email'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            role=data.get('role', 'user')
        )
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        
        return jsonify({
            'message': 'User created successfully',
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/users/<int:user_id>', methods=['PUT'])
@jwt_required()
@admin_required
def update_user(user_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        data = request.get_json()
        
        
        if 'first_name' in data:
            user.first_name = data['first_name']
        if 'last_name' in data:
            user.last_name = data['last_name']
        if 'email' in data:
            
            existing_user = User.query.filter(User.email == data['email'], User.id != user_id).first()
            if existing_user:
                return jsonify({'error': 'Email already exists'}), 400
            user.email = data['email']
        if 'role' in data:
            user.role = data['role']
        if 'is_active' in data:
            user.is_active = data['is_active']
        
        db.session.commit()
        
        return jsonify({
            'message': 'User updated successfully',
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@admin_bp.route('/homes', methods=['GET'])
@jwt_required()
@admin_required
def get_all_homes():
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        search = request.args.get('search', '')
        
        query = ChildrensHome.query
        
        if search:
            query = query.filter(
                (ChildrensHome.name.ilike(f'%{search}%')) |
                (ChildrensHome.location.ilike(f'%{search}%'))
            )
        
        homes_pagination = query.order_by(ChildrensHome.created_at.desc()).paginate(
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

@admin_bp.route('/homes', methods=['POST'])
@jwt_required()
@admin_required
def create_home():
    try:
        data = request.get_json()
        
        
        required_fields = ['name', 'location']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        
        established_date = None
        if data.get('established_date'):
            try:
                established_date = datetime.strptime(data['established_date'], '%Y-%m-%d').date()
            except ValueError:
                return jsonify({'error': 'Invalid established_date format. Use YYYY-MM-DD'}), 400
        
       
        home = ChildrensHome(
            name=data['name'],
            description=data.get('description'),
            location=data['location'],
            address=data.get('address'),
            phone_number=data.get('phone_number'),
            email=data.get('email'),
            capacity=data.get('capacity'),
            current_children_count=data.get('current_children_count', 0),
            established_date=established_date,
            contact_person=data.get('contact_person'),
            website=data.get('website'),
            image_url=data.get('image_url'),
            needs_description=data.get('needs_description'),
            is_active=data.get('is_active', True)
        )
        
        db.session.add(home)
        db.session.commit()
        
        return jsonify({
            'message': 'Children\'s home created successfully',
            'home': home.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/homes/<int:home_id>', methods=['PUT'])
@jwt_required()
@admin_required
def update_home(home_id):
    try:
        home = ChildrensHome.query.get(home_id)
        if not home:
            return jsonify({'error': 'Children\'s home not found'}), 404
        
        data = request.get_json()
        
        
        if 'name' in data:
            home.name = data['name']
        if 'description' in data:
            home.description = data['description']
        if 'location' in data:
            home.location = data['location']
        if 'address' in data:
            home.address = data['address']
        if 'phone_number' in data:
            home.phone_number = data['phone_number']
        if 'email' in data:
            home.email = data['email']
        if 'capacity' in data:
            home.capacity = data['capacity']
        if 'current_children_count' in data:
            home.current_children_count = data['current_children_count']
        if 'established_date' in data:
            if data['established_date']:
                try:
                    home.established_date = datetime.strptime(data['established_date'], '%Y-%m-%d').date()
                except ValueError:
                    return jsonify({'error': 'Invalid established_date format. Use YYYY-MM-DD'}), 400
            else:
                home.established_date = None
        if 'contact_person' in data:
            home.contact_person = data['contact_person']
        if 'website' in data:
            home.website = data['website']
        if 'image_url' in data:
            home.image_url = data['image_url']
        if 'needs_description' in data:
            home.needs_description = data['needs_description']
        if 'is_active' in data:
            home.is_active = data['is_active']
        
        home.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Children\'s home updated successfully',
            'home': home.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/homes/<int:home_id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_home(home_id):
    try:
        home = ChildrensHome.query.get(home_id)
        if not home:
            return jsonify({'error': 'Children\'s home not found'}), 404
        
        
        home.is_active = False
        home.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({'message': 'Children\'s home deactivated successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@admin_bp.route('/analytics/overview', methods=['GET'])
@jwt_required()
@admin_required
def get_analytics_overview():
    try:
       
        total_users = User.query.count()
        total_homes = ChildrensHome.query.filter_by(is_active=True).count()
        total_donations = Donation.query.count()
        total_visits = Visit.query.count()
        total_reviews = Review.query.count()
        
        
        total_donation_amount = db.session.query(func.sum(Donation.amount)).filter_by(status='completed').scalar() or 0
        pending_donations = Donation.query.filter_by(status='pending').count()
        
        
        from datetime import timedelta
        thirty_days_ago = datetime.utcnow() - timedelta(days=30)
        
        new_users_30_days = User.query.filter(User.date_joined >= thirty_days_ago).count()
        new_donations_30_days = Donation.query.filter(Donation.created_at >= thirty_days_ago).count()
        new_visits_30_days = Visit.query.filter(Visit.created_at >= thirty_days_ago).count()
        
        return jsonify({
            'overview': {
                'total_users': total_users,
                'total_homes': total_homes,
                'total_donations': total_donations,
                'total_visits': total_visits,
                'total_reviews': total_reviews,
                'total_donation_amount': float(total_donation_amount),
                'pending_donations': pending_donations,
                'new_users_30_days': new_users_30_days,
                'new_donations_30_days': new_donations_30_days,
                'new_visits_30_days': new_visits_30_days
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/analytics/homes', methods=['GET'])
@jwt_required()
@admin_required
def get_homes_analytics():
    try:
        
        most_visited = db.session.query(
            ChildrensHome.id,
            ChildrensHome.name,
            ChildrensHome.location,
            func.count(Visit.id).label('visit_count')
        ).join(Visit).group_by(ChildrensHome.id).order_by(desc('visit_count')).limit(10).all()
        
        
        most_donated = db.session.query(
            ChildrensHome.id,
            ChildrensHome.name,
            ChildrensHome.location,
            func.sum(Donation.amount).label('total_donations'),
            func.count(Donation.id).label('donation_count')
        ).join(Donation).filter(Donation.status == 'completed').group_by(ChildrensHome.id).order_by(desc('total_donations')).limit(10).all()
        
        
        least_donated = db.session.query(
            ChildrensHome.id,
            ChildrensHome.name,
            ChildrensHome.location,
            func.coalesce(func.sum(Donation.amount), 0).label('total_donations')
        ).outerjoin(Donation, (Donation.home_id == ChildrensHome.id) & (Donation.status == 'completed')).filter(ChildrensHome.is_active == True).group_by(ChildrensHome.id).order_by('total_donations').limit(10).all()
        
       
        best_rated = db.session.query(
            ChildrensHome.id,
            ChildrensHome.name,
            ChildrensHome.location,
            func.avg(Review.rating).label('average_rating'),
            func.count(Review.id).label('review_count')
        ).join(Review).filter(Review.is_approved == True).group_by(ChildrensHome.id).having(func.count(Review.id) >= 3).order_by(desc('average_rating')).limit(10).all()
        
        return jsonify({
            'analytics': {
                'most_visited': [
                    {
                        'id': home.id,
                        'name': home.name,
                        'location': home.location,
                        'visit_count': home.visit_count
                    } for home in most_visited
                ],
                'most_donated': [
                    {
                        'id': home.id,
                        'name': home.name,
                        'location': home.location,
                        'total_donations': float(home.total_donations),
                        'donation_count': home.donation_count
                    } for home in most_donated
                ],
                'most_in_need': [
                    {
                        'id': home.id,
                        'name': home.name,
                        'location': home.location,
                        'total_donations': float(home.total_donations)
                    } for home in least_donated
                ],
                'best_rated': [
                    {
                        'id': home.id,
                        'name': home.name,
                        'location': home.location,
                        'average_rating': round(float(home.average_rating), 2),
                        'review_count': home.review_count
                    } for home in best_rated
                ]
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@admin_bp.route('/visits', methods=['GET'])
@jwt_required()
@admin_required
def get_all_visits():
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        status = request.args.get('status', '')
        
        query = Visit.query
        
        if status:
            query = query.filter_by(status=status)
        
        visits_pagination = query.order_by(Visit.visit_date.desc()).paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )
        
        visits = [visit.to_dict() for visit in visits_pagination.items]
        
        return jsonify({
            'visits': visits,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': visits_pagination.total,
                'pages': visits_pagination.pages,
                'has_prev': visits_pagination.has_prev,
                'has_next': visits_pagination.has_next
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/visits/<int:visit_id>/status', methods=['PUT'])
@jwt_required()
@admin_required
def update_visit_status(visit_id):
    try:
        visit = Visit.query.get(visit_id)
        if not visit:
            return jsonify({'error': 'Visit not found'}), 404
        
        data = request.get_json()
        
        if not data.get('status'):
            return jsonify({'error': 'status is required'}), 400
        
        valid_statuses = ['pending', 'confirmed', 'completed', 'cancelled']
        if data['status'] not in valid_statuses:
            return jsonify({'error': f'status must be one of: {", ".join(valid_statuses)}'}), 400
        
        visit.status = data['status']
        if data.get('admin_notes'):
            visit.admin_notes = data['admin_notes']
        
        visit.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Visit status updated successfully',
            'visit': visit.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500