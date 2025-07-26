# Children's Home & Orphanages Donations API

A Flask-based REST API for managing donations to children's homes and orphanages. This backend provides comprehensive functionality for user management, home listings, donations, reviews, visits, and administrative analytics.

## Features

### User Features
- User registration and authentication (JWT-based)
- Browse and search children's homes by name and location
- View detailed information about children's homes
- Make donations to individual or multiple homes
- Schedule visits to children's homes
- Write and manage reviews for visited homes
- View personal donation and visit history

### Admin Features
- Complete CRUD operations on children's homes
- User management and role assignment
- Analytics dashboard with insights on:
  - Most visited homes
  - Homes receiving most donations
  - Homes most in need of donations
  - Best-rated homes
- Visit management and status updates
- System overview with key metrics

## Technology Stack

- **Backend Framework**: Flask 2.3.3
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT (Flask-JWT-Extended)
- **Password Hashing**: Bcrypt
- **API Documentation**: RESTful endpoints
- **CORS**: Flask-CORS for cross-origin requests

## Setup Instructions

### Prerequisites
- Python 3.8+
- PostgreSQL 12+
- Virtual environment (recommended)

### Installation

1. **Clone the repository and navigate to backend**
   ```bash
   cd back-end
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your database credentials:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/childrens_home_db
   JWT_SECRET_KEY=your-secret-key-here
   FLASK_ENV=development
   FLASK_DEBUG=True
   ```

5. **Create PostgreSQL database**
   ```bash
   createdb childrens_home_db
   ```

6. **Initialize database**
   ```bash
   flask init-db
   ```

7. **Seed database with sample data (optional)**
   ```bash
   flask seed-db
   ```

8. **Run the application**
   ```bash
   python run.py
   ```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (requires auth)
- `PUT /api/auth/profile` - Update user profile (requires auth)

### Children's Homes
- `GET /api/homes/` - List all homes (with pagination and search)
- `GET /api/homes/{id}` - Get home details
- `GET /api/homes/search` - Search homes by query and location
- `GET /api/homes/locations` - Get all available locations
- `GET /api/homes/{id}/reviews` - Get reviews for a specific home

### Donations
- `POST /api/donations/` - Create single donation (requires auth)
- `POST /api/donations/multiple` - Create multiple donations (requires auth)
- `GET /api/donations/my-donations` - Get user's donations (requires auth)
- `GET /api/donations/{id}` - Get donation details (requires auth)
- `PUT /api/donations/{id}/status` - Update donation status (requires auth)
- `GET /api/donations/stats` - Get user's donation statistics (requires auth)

### Reviews
- `POST /api/reviews/` - Create review (requires auth)
- `GET /api/reviews/my-reviews` - Get user's reviews (requires auth)
- `GET /api/reviews/{id}` - Get review details (requires auth)
- `PUT /api/reviews/{id}` - Update review (requires auth)
- `DELETE /api/reviews/{id}` - Delete review (requires auth)
- `GET /api/reviews/home/{home_id}` - Get reviews for a home (public)

### Visits
- `POST /api/visits/` - Schedule visit (requires auth)
- `GET /api/visits/my-visits` - Get user's visits (requires auth)
- `GET /api/visits/{id}` - Get visit details (requires auth)
- `PUT /api/visits/{id}` - Update visit (requires auth)
- `PUT /api/visits/{id}/cancel` - Cancel visit (requires auth)
- `GET /api/visits/available-dates/{home_id}` - Get available visit dates

### Admin Endpoints (requires admin role)
- `GET /api/admin/users` - List all users
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/{id}` - Update user
- `GET /api/admin/homes` - List all homes (admin view)
- `POST /api/admin/homes` - Create children's home
- `PUT /api/admin/homes/{id}` - Update children's home
- `DELETE /api/admin/homes/{id}` - Deactivate children's home
- `GET /api/admin/analytics/overview` - System overview analytics
- `GET /api/admin/analytics/homes` - Homes analytics
- `GET /api/admin/visits` - List all visits
- `PUT /api/admin/visits/{id}/status` - Update visit status

## Sample Data

After running `flask seed-db`, you can use these credentials:

**Admin User:**
- Username: `admin`
- Password: `adminpass`

**Regular User:**
- Username: `johnsmith`
- Password: `password123`

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

The API returns consistent error responses:
```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Database Schema

The application uses the following main models:
- **User** - User accounts and authentication
- **ChildrensHome** - Children's home information
- **Donation** - Donation records
- **Review** - User reviews and ratings
- **Visit** - Scheduled visits

## Development

### Running Tests
```bash
# Tests will be implemented using pytest
pytest
```

### Database Migrations
```bash
# Initialize migrations (first time only)
flask db init

# Create migration
flask db migrate -m "Description of changes"

# Apply migration
flask db upgrade
```

## Production Deployment

For production deployment:
1. Set `FLASK_ENV=production`
2. Use a production WSGI server like Gunicorn
3. Set up proper database connection pooling
4. Configure logging
5. Set up SSL/HTTPS
6. Use environment variables for sensitive configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.