from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from app import db
from app.models.donation import Donation
from app.models.childrens_home import ChildrensHome
from app.models.user import User

donations_bp = Blueprint('donations', __name__)

@donations_bp.route('/', methods=['POST'])
@jwt_required()
def create_donation():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        
        required_fields = ['home_id', 'amount']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        
        home = ChildrensHome.query.filter_by(id=data['home_id'], is_active=True).first()
        if not home:
            return jsonify({'error': 'Children\'s home not found'}), 404
        
        
        try:
            amount = float(data['amount'])
            if amount <= 0:
                return jsonify({'error': 'Amount must be greater than 0'}), 400
        except ValueError:
            return jsonify({'error': 'Invalid amount format'}), 400
        
        
        donation = Donation(
            user_id=user_id,
            home_id=data['home_id'],
            amount=amount,
            donation_type=data.get('donation_type', 'monetary'),
            description=data.get('description'),
            payment_method=data.get('payment_method'),
            anonymous=data.get('anonymous', False),
            message_to_home=data.get('message_to_home'),
            status='pending'
        )
        
        db.session.add(donation)
        db.session.commit()
        
        return jsonify({
            'message': 'Donation created successfully',
            'donation': donation.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@donations_bp.route('/multiple', methods=['POST'])
@jwt_required()
def create_multiple_donations():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        if not data.get('donations') or not isinstance(data['donations'], list):
            return jsonify({'error': 'donations list is required'}), 400
        
        created_donations = []
        
        for donation_data in data['donations']:
            
            if not donation_data.get('home_id') or not donation_data.get('amount'):
                return jsonify({'error': 'home_id and amount are required for each donation'}), 400
            
           
            home = ChildrensHome.query.filter_by(id=donation_data['home_id'], is_active=True).first()
            if not home:
                return jsonify({'error': f'Children\'s home with id {donation_data["home_id"]} not found'}), 404
            
          
            try:
                amount = float(donation_data['amount'])
                if amount <= 0:
                    return jsonify({'error': 'Amount must be greater than 0'}), 400
            except ValueError:
                return jsonify({'error': 'Invalid amount format'}), 400
            
            
            donation = Donation(
                user_id=user_id,
                home_id=donation_data['home_id'],
                amount=amount,
                donation_type=donation_data.get('donation_type', 'monetary'),
                description=donation_data.get('description'),
                payment_method=donation_data.get('payment_method'),
                anonymous=donation_data.get('anonymous', False),
                message_to_home=donation_data.get('message_to_home'),
                status='pending'
            )
            
            db.session.add(donation)
            created_donations.append(donation)
        
        db.session.commit()
        
        return jsonify({
            'message': f'{len(created_donations)} donations created successfully',
            'donations': [donation.to_dict() for donation in created_donations]
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@donations_bp.route('/my-donations', methods=['GET'])
@jwt_required()
def get_my_donations():
    try:
        user_id = get_jwt_identity()
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        status = request.args.get('status', '')
        
        query = Donation.query.filter_by(user_id=user_id)
        
        if status:
            query = query.filter_by(status=status)
        
        donations_pagination = query.order_by(Donation.created_at.desc()).paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )
        
        donations = [donation.to_dict() for donation in donations_pagination.items]
        
        return jsonify({
            'donations': donations,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': donations_pagination.total,
                'pages': donations_pagination.pages,
                'has_prev': donations_pagination.has_prev,
                'has_next': donations_pagination.has_next
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@donations_bp.route('/<int:donation_id>', methods=['GET'])
@jwt_required()
def get_donation_details(donation_id):
    try:
        user_id = get_jwt_identity()
        donation = Donation.query.filter_by(id=donation_id, user_id=user_id).first()
        
        if not donation:
            return jsonify({'error': 'Donation not found'}), 404
        
        return jsonify({'donation': donation.to_dict()}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@donations_bp.route('/<int:donation_id>/status', methods=['PUT'])
@jwt_required()
def update_donation_status(donation_id):
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        if not data.get('status'):
            return jsonify({'error': 'status is required'}), 400
        
        valid_statuses = ['pending', 'completed', 'cancelled']
        if data['status'] not in valid_statuses:
            return jsonify({'error': f'status must be one of: {", ".join(valid_statuses)}'}), 400
        
        donation = Donation.query.filter_by(id=donation_id, user_id=user_id).first()
        
        if not donation:
            return jsonify({'error': 'Donation not found'}), 404
        
        donation.status = data['status']
        if data.get('transaction_reference'):
            donation.transaction_reference = data['transaction_reference']
        
        db.session.commit()
        
        return jsonify({
            'message': 'Donation status updated successfully',
            'donation': donation.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@donations_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_donation_stats():
    try:
        user_id = get_jwt_identity()
        
        
        total_donations = Donation.query.filter_by(user_id=user_id).count()
        completed_donations = Donation.query.filter_by(user_id=user_id, status='completed').count()
        total_amount = db.session.query(db.func.sum(Donation.amount)).filter_by(
            user_id=user_id, status='completed'
        ).scalar() or 0
        
       
        homes_donated_to = db.session.query(ChildrensHome).join(Donation).filter(
            Donation.user_id == user_id,
            Donation.status == 'completed'
        ).distinct().count()
        
        return jsonify({
            'stats': {
                'total_donations': total_donations,
                'completed_donations': completed_donations,
                'total_amount_donated': float(total_amount),
                'homes_supported': homes_donated_to
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500