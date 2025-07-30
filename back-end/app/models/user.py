from datetime import datetime
from app import db, bcrypt

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    role = db.Column(db.String(20), default='user')  
    is_active = db.Column(db.Boolean, default=True)
    date_joined = db.Column(db.DateTime, default=datetime.utcnow)
    
    
    donations = db.relationship('Donation', backref='donor', lazy=True)
    reviews = db.relationship('Review', backref='reviewer', lazy=True)
    visits = db.relationship('Visit', backref='visitor', lazy=True)
    
    def set_password(self, password):
        # Security validation: Ensure password is provided and valid
        if not password or not isinstance(password, str) or len(password.strip()) == 0:
            raise ValueError("Password cannot be empty or None")
        
        # Generate secure hash
        hash_bytes = bcrypt.generate_password_hash(password)
        if not hash_bytes:
            raise ValueError("Failed to generate password hash")
            
        self.password_hash = hash_bytes.decode('utf-8')
        
        # Verify the hash was set correctly
        if not self.password_hash or len(self.password_hash.strip()) == 0:
            raise ValueError("Password hash was not set correctly")
    
    def check_password(self, password):
        # Security fix: Ensure password_hash exists and is not empty
        if not self.password_hash or not isinstance(self.password_hash, str) or len(self.password_hash.strip()) == 0:
            return False
        
        # Additional security: Ensure password is provided
        if not password or not isinstance(password, str):
            return False
            
        try:
            return bcrypt.check_password_hash(self.password_hash, password)
        except Exception:
            # If bcrypt fails for any reason, deny access
            return False
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'role': self.role,
            'is_active': self.is_active,
            'date_joined': self.date_joined.isoformat() if self.date_joined else None
        }
    
    def __repr__(self):
        return f'<User {self.username}>'