from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_marshmallow import Marshmallow

from config.config import config

db = SQLAlchemy()
migrate = Migrate()
cors = CORS()
jwt = JWTManager()
bcrypt = Bcrypt()
ma = Marshmallow()

def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    
    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app, origins=["http://localhost:3000", "http://localhost:5173"])
    jwt.init_app(app)
    bcrypt.init_app(app)
    ma.init_app(app)
    
   
    from app.models import user, childrens_home, donation, review, visit
    
    
    from app.routes.auth import auth_bp
    from app.routes.homes import homes_bp
    from app.routes.donations import donations_bp
    from app.routes.reviews import reviews_bp
    from app.routes.visits import visits_bp
    from app.routes.admin import admin_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(homes_bp, url_prefix='/api/homes')
    app.register_blueprint(donations_bp, url_prefix='/api/donations')
    app.register_blueprint(reviews_bp, url_prefix='/api/reviews')
    app.register_blueprint(visits_bp, url_prefix='/api/visits')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    
    @app.route('/')
    def index():
        return {'message': "Children's Home & Orphanages Donations API"}
    
    return app