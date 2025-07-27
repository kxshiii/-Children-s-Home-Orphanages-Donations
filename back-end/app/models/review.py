from datetime import datetime
from app import db

class Review(db.Model):
    __tablename__ = 'reviews'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    home_id = db.Column(db.Integer, db.ForeignKey('childrens_homes.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)  
    title = db.Column(db.String(200))
    comment = db.Column(db.Text)
    visit_date = db.Column(db.Date)  
    anonymous = db.Column(db.Boolean, default=False)
    is_approved = db.Column(db.Boolean, default=True)  
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    
    __table_args__ = (db.UniqueConstraint('user_id', 'home_id', name='unique_user_home_review'),)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'home_id': self.home_id,
            'rating': self.rating,
            'title': self.title,
            'comment': self.comment,
            'visit_date': self.visit_date.isoformat() if self.visit_date else None,
            'anonymous': self.anonymous,
            'is_approved': self.is_approved,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'reviewer_name': f"{self.reviewer.first_name} {self.reviewer.last_name}" if not self.anonymous and self.reviewer else "Anonymous",
            'home_name': self.home.name if self.home else None
        }
    
    def __repr__(self):
        return f'<Review {self.rating} stars for {self.home.name if self.home else "Unknown"}>'