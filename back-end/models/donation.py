from flask import Blueprint, request, jsonify
from models import Donation
from database import db

donation_bp = Blueprint('donation', __name__)

@donation_bp.route('/donate', methods=['POST'])
def donate():
    data = request.json
    donation = Donation(**data)
    db.session.add(donation)
    db.session.commit()
    return jsonify(donation.to_dict()), 201