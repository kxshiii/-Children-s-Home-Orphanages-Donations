from datetime import datetime
from app import db

class Donation(db.Model):
    __tablename__ = 'donations'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    home_id = db.Column(db.Integer, db.ForeignKey('childrens_homes.id'), nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    donation_type = db.Column(db.String(50), default='monetary')  # monetary, goods, services
    description = db.Column(db.Text)
    status = db.Column(db.String(20), default='pending')  # pending, completed, cancelled
    payment_method = db.Column(db.String(50))  # card, bank_transfer, mobile_money
    transaction_reference = db.Column(db.String(100))
    anonymous = db.Column(db.Boolean, default=False)
    message_to_home = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'home_id': self.home_id,
            'amount': float(self.amount),
            'donation_type': self.donation_type,
            'description': self.description,
            'status': self.status,
            'payment_method': self.payment_method,
            'transaction_reference': self.transaction_reference,
            'anonymous': self.anonymous,
            'message_to_home': self.message_to_home,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'donor_name': f"{self.donor.first_name} {self.donor.last_name}" if not self.anonymous and self.donor else "Anonymous",
            'home_name': self.home.name if self.home else None
        }
    
    def __repr__(self):
        return f'<Donation ${self.amount} to {self.home.name if self.home else "Unknown"}>'