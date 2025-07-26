from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, date, time
from app import db
from app.models.visit import Visit
from app.models.childrens_home import ChildrensHome
from app.models.user import User

visits_bp = Blueprint('visits', __name__)

@visits_bp.route('/', methods=['POST'])
@jwt_required()
def schedule_visit():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['home_id', 'visit_date']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Validate home exists
        home = ChildrensHome.query.filter_by(id=data['home_id'], is_active=True).first()
        if not home:
            return jsonify({'error': 'Children\'s home not found'}), 404
        
        # Parse and validate visit_date
        try:
            visit_date = datetime.strptime(data['visit_date'], '%Y-%m-%d').date()
            if visit_date < date.today():
                return jsonify({'error': 'Visit date cannot be in the past'}), 400
        except ValueError:
            return jsonify({'error': 'Invalid visit_date format. Use YYYY-MM-DD'}), 400
        
        # Parse visit_time if provided
        visit_time = None
        if data.get('visit_time'):
            try:
                visit_time = datetime.strptime(data['visit_time'], '%H:%M').time()
            except ValueError:
                return jsonify({'error': 'Invalid visit_time format. Use HH:MM'}), 400
        
        # Validate number_of_visitors
        number_of_visitors = data.get('number_of_visitors', 1)
        try:
            number_of_visitors = int(number_of_visitors)
            if number_of_visitors < 1:
                return jsonify({'error': 'Number of visitors must be at least 1'}), 400
        except ValueError:
            return jsonify({'error': 'Invalid number_of_visitors format'}), 400
        
        # Create visit
        visit = Visit(
            user_id=user_id,
            home_id=data['home_id'],
            visit_date=visit_date,
            visit_time=visit_time,
            number_of_visitors=number_of_visitors,
            purpose=data.get('purpose'),
            special_requests=data.get('special_requests'),
            contact_phone=data.get('contact_phone'),
            notes=data.get('notes'),
            status='pending'
        )
        
        db.session.add(visit)
        db.session.commit()
        
        return jsonify({
            'message': 'Visit scheduled successfully',
            'visit': visit.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@visits_bp.route('/my-visits', methods=['GET'])
@jwt_required()
def get_my_visits():
    try:
        user_id = get_jwt_identity()
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        status = request.args.get('status', '')
        
        query = Visit.query.filter_by(user_id=user_id)
        
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

@visits_bp.route('/<int:visit_id>', methods=['GET'])
@jwt_required()
def get_visit_details(visit_id):
    try:
        user_id = get_jwt_identity()
        visit = Visit.query.filter_by(id=visit_id, user_id=user_id).first()
        
        if not visit:
            return jsonify({'error': 'Visit not found'}), 404
        
        return jsonify({'visit': visit.to_dict()}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@visits_bp.route('/<int:visit_id>', methods=['PUT'])
@jwt_required()
def update_visit(visit_id):
    try:
        user_id = get_jwt_identity()
        visit = Visit.query.filter_by(id=visit_id, user_id=user_id).first()
        
        if not visit:
            return jsonify({'error': 'Visit not found'}), 404
        
        # Check if visit can be updated (only pending visits)
        if visit.status not in ['pending']:
            return jsonify({'error': 'Only pending visits can be updated'}), 400
        
        data = request.get_json()
        
        # Update allowed fields
        if 'visit_date' in data:
            try:
                visit_date = datetime.strptime(data['visit_date'], '%Y-%m-%d').date()
                if visit_date < date.today():
                    return jsonify({'error': 'Visit date cannot be in the past'}), 400
                visit.visit_date = visit_date
            except ValueError:
                return jsonify({'error': 'Invalid visit_date format. Use YYYY-MM-DD'}), 400
        
        if 'visit_time' in data:
            if data['visit_time']:
                try:
                    visit.visit_time = datetime.strptime(data['visit_time'], '%H:%M').time()
                except ValueError:
                    return jsonify({'error': 'Invalid visit_time format. Use HH:MM'}), 400
            else:
                visit.visit_time = None
        
        if 'number_of_visitors' in data:
            try:
                number_of_visitors = int(data['number_of_visitors'])
                if number_of_visitors < 1:
                    return jsonify({'error': 'Number of visitors must be at least 1'}), 400
                visit.number_of_visitors = number_of_visitors
            except ValueError:
                return jsonify({'error': 'Invalid number_of_visitors format'}), 400
        
        if 'purpose' in data:
            visit.purpose = data['purpose']
        
        if 'special_requests' in data:
            visit.special_requests = data['special_requests']
        
        if 'contact_phone' in data:
            visit.contact_phone = data['contact_phone']
        
        if 'notes' in data:
            visit.notes = data['notes']
        
        visit.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Visit updated successfully',
            'visit': visit.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@visits_bp.route('/<int:visit_id>/cancel', methods=['PUT'])
@jwt_required()
def cancel_visit(visit_id):
    try:
        user_id = get_jwt_identity()
        visit = Visit.query.filter_by(id=visit_id, user_id=user_id).first()
        
        if not visit:
            return jsonify({'error': 'Visit not found'}), 404
        
        if visit.status == 'cancelled':
            return jsonify({'error': 'Visit is already cancelled'}), 400
        
        if visit.status == 'completed':
            return jsonify({'error': 'Cannot cancel a completed visit'}), 400
        
        visit.status = 'cancelled'
        visit.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Visit cancelled successfully',
            'visit': visit.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@visits_bp.route('/available-dates/<int:home_id>', methods=['GET'])
def get_available_dates(home_id):
    try:
        home = ChildrensHome.query.filter_by(id=home_id, is_active=True).first()
        
        if not home:
            return jsonify({'error': 'Children\'s home not found'}), 404
        
        # Get the next 30 days starting from today
        from datetime import timedelta
        start_date = date.today()
        end_date = start_date + timedelta(days=30)
        
        # Get existing visits for this home in the date range
        existing_visits = Visit.query.filter(
            Visit.home_id == home_id,
            Visit.visit_date >= start_date,
            Visit.visit_date <= end_date,
            Visit.status.in_(['pending', 'confirmed'])
        ).all()
        
        # Create a list of available dates (simple logic - exclude Sundays and dates with 3+ visits)
        available_dates = []
        current_date = start_date
        
        while current_date <= end_date:
            # Skip Sundays (weekday 6)
            if current_date.weekday() != 6:
                # Count visits on this date
                visits_on_date = len([v for v in existing_visits if v.visit_date == current_date])
                
                # Allow up to 3 visits per day
                if visits_on_date < 3:
                    available_dates.append({
                        'date': current_date.isoformat(),
                        'available_slots': 3 - visits_on_date
                    })
            
            current_date += timedelta(days=1)
        
        return jsonify({
            'home_id': home_id,
            'home_name': home.name,
            'available_dates': available_dates
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500