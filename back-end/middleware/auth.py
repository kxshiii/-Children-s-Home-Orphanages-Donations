from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models import User
from flask import Blueprint
# back-end/middleware/auth.py
# This file handles user authentication, including registration and login.
# It uses JWT for token generation and validation.
# back-end/middleware/auth.py
# back-end/middleware/auth.py
# back-end/middleware/auth.py
# back-end/middleware/auth.py
import jwt
import datetime
import os

auth_bp = Blueprint('auth', __name__)

# Load secret key from environment or fallback
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "default_secret_key")

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password required'}), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'error': 'Username already exists'}), 409

    hashed_pw = generate_password_hash(password)
    user = User(username=username, password=hashed_pw)
  
    return jsonify({'message': 'User registered successfully'}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password required'}), 400

    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, SECRET_KEY, algorithm='HS256')

        return jsonify({'token': token}), 200

    return jsonify({'error': 'Invalid credentials'}), 401
