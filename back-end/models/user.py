from flask_sqlalchemy import SQLAlchemy
from flask import Blueprint, request, jsonify

db = SQLAlchemy()
user_bp = Blueprint('user', __name__)
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    date_joined = db.Column(db.DateTime, server_default=db.func.now())  # Automatically set to current time when user is created
 
    # Add more fields as needed

    def to_dict(self):
        return {'id': self.id, 'username': self.username}