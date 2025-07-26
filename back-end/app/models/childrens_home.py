from datetime import datetime
from app import db

class ChildrensHome(db.Model):
    __tablename__ = 'childrens_homes'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    location = db.Column(db.String(200), nullable=False)
    address = db.Column(db.Text)
    phone_number = db.Column(db.String(20))
    email = db.Column(db.String(120))
    capacity = db.Column(db.Integer)
    current_children_count = db.Column(db.Integer, default=0)
    established_date = db.Column(db.Date)
    contact_person = db.Column(db.String(100))
    website = db.Column(db.String(200))
    image_url = db.Column(db.String(500))
    needs_description = db.Column(db.Text)  # What they need most
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    donations = db.relationship('Donation', backref='home', lazy=True)
    reviews = db.relationship('Review', backref='home', lazy=True)
    visits = db.relationship('Visit', backref='home', lazy=True)
    
    @property
    def average_rating(self):
        if not self.reviews:
            return 0
        return sum(review.rating for review in self.reviews) / len(self.reviews)
    
    @property
    def total_donations_received(self):
        return sum(donation.amount for donation in self.donations if donation.status == 'completed')
    
    @property
    def total_visits(self):
        return len(self.visits)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'location': self.location,
            'address': self.address,
            'phone_number': self.phone_number,
            'email': self.email,
            'capacity': self.capacity,
            'current_children_count': self.current_children_count,
            'established_date': self.established_date.isoformat() if self.established_date else None,
            'contact_person': self.contact_person,
            'website': self.website,
            'image_url': self.image_url,
            'needs_description': self.needs_description,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'average_rating': self.average_rating,
            'total_donations_received': self.total_donations_received,
            'total_visits': self.total_visits,
            'reviews_count': len(self.reviews)
        }
    
    def __repr__(self):
        return f'<ChildrensHome {self.name}>'