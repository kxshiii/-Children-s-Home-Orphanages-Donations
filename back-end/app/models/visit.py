from datetime import datetime
from app import db

class Visit(db.Model):
    __tablename__ = 'visits'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    home_id = db.Column(db.Integer, db.ForeignKey('childrens_homes.id'), nullable=False)
    visit_date = db.Column(db.Date, nullable=False)
    visit_time = db.Column(db.Time)
    number_of_visitors = db.Column(db.Integer, default=1)
    purpose = db.Column(db.String(200))  
    special_requests = db.Column(db.Text)
    status = db.Column(db.String(20), default='pending')  
    contact_phone = db.Column(db.String(20))
    notes = db.Column(db.Text)
    admin_notes = db.Column(db.Text) 
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'home_id': self.home_id,
            'visit_date': self.visit_date.isoformat() if self.visit_date else None,
            'visit_time': self.visit_time.strftime('%H:%M') if self.visit_time else None,
            'number_of_visitors': self.number_of_visitors,
            'purpose': self.purpose,
            'special_requests': self.special_requests,
            'status': self.status,
            'contact_phone': self.contact_phone,
            'notes': self.notes,
            'admin_notes': self.admin_notes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'visitor_name': f"{self.visitor.first_name} {self.visitor.last_name}" if self.visitor else None,
            'home_name': self.home.name if self.home else None,
            'home_location': self.home.location if self.home else None
        }
    
    def __repr__(self):
        return f'<Visit to {self.home.name if self.home else "Unknown"} on {self.visit_date}>'