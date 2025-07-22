from flask import Blueprint, request, jsonify
from models import Donation

donation_bp = Blueprint('donation', __name__)

@donation_bp.route('/donate', methods=['POST'])
def donate():
    data = request.json
    donation = Donation(**data)
    
    return jsonify(donation.to_dict()), 201