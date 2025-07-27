from app import create_app, db
import os
app = create_app(os.getenv('FLASK_ENV', 'development'))

@app.cli.command()
def init_db():
    """Initialize the database."""
    db.create_all()
    print('Database initialized.')

@app.cli.command()
def seed_db():
    """Seed the database with sample data."""
    from app.models.user import User
    from app.models.childrens_home import ChildrensHome
    from datetime import date
    
    
    admin = User(
        username='admin',
        email='admin@example.com',
        first_name='Admin',
        last_name='User',
        role='admin'
    )
    admin.set_password('adminpass')
    
    
    user = User(
        username='johnsmith',
        email='john@example.com',
        first_name='John',
        last_name='Smith',
        role='user'
    )
    user.set_password('password123')
    
    
    home1 = ChildrensHome(
        name='Hope Children\'s Home',
        description='A loving home providing care and education to orphaned children.',
        location='Nairobi, Kenya',
        address='123 Hope Street, Nairobi',
        phone_number='+254700123456',
        email='info@hopechildrenshome.org',
        capacity=50,
        current_children_count=32,
        established_date=date(2010, 5, 15),
        contact_person='Mary Johnson',
        needs_description='We need educational materials, food supplies, and clothing for children aged 5-15.'
    )
    
    home2 = ChildrensHome(
        name='Sunshine Orphanage',
        description='Providing shelter, education, and healthcare to vulnerable children.',
        location='Kampala, Uganda',
        address='456 Sunshine Avenue, Kampala',
        phone_number='+256700789012',
        email='contact@sunshineorphanage.org',
        capacity=75,
        current_children_count=68,
        established_date=date(2008, 3, 20),
        contact_person='David Mukasa',
        needs_description='Urgent need for medical supplies, school uniforms, and recreational equipment.'
    )
    
    home3 = ChildrensHome(
        name='Little Angels Home',
        description='A safe haven for abandoned and orphaned children.',
        location='Lagos, Nigeria',
        address='789 Angel Road, Lagos',
        phone_number='+234800345678',
        email='info@littleangelshome.org',
        capacity=40,
        current_children_count=35,
        established_date=date(2015, 8, 10),
        contact_person='Grace Adebayo',
        needs_description='Looking for donations of books, computers, and nutritious food items.'
    )
    
    
    db.session.add_all([admin, user, home1, home2, home3])
    db.session.commit()
    
    print('Database seeded with sample data.')
    print('Admin credentials: admin / adminpass')
    print('User credentials: johnsmith / password123')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
