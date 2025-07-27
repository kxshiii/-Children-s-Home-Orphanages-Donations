# API Examples

This document provides example requests and responses for the Children's Home & Orphanages Donations API.

## Authentication Examples

### User Registration
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "johnsmith",
  "email": "john@example.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Smith"
}
```

Response:
```json
{
  "message": "User created successfully",
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "username": "johnsmith",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Smith",
    "role": "user",
    "is_active": true,
    "date_joined": "2024-01-15T10:30:00"
  }
}
```

### User Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "johnsmith",
  "password": "password123"
}
```

Response:
```json
{
  "message": "Login successful",
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "username": "johnsmith",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Smith",
    "role": "user",
    "is_active": true,
    "date_joined": "2024-01-15T10:30:00"
  }
}
```

## Children's Homes Examples

### List All Homes
```bash
GET /api/homes/?page=1&per_page=10&search=hope&location=nairobi
```

Response:
```json
{
  "homes": [
    {
      "id": 1,
      "name": "Hope Children's Home",
      "description": "A loving home providing care and education to orphaned children.",
      "location": "Nairobi, Kenya",
      "address": "123 Hope Street, Nairobi",
      "phone_number": "+254700123456",
      "email": "info@hopechildrenshome.org",
      "capacity": 50,
      "current_children_count": 32,
      "established_date": "2010-05-15",
      "contact_person": "Mary Johnson",
      "website": null,
      "image_url": null,
      "needs_description": "We need educational materials, food supplies, and clothing for children aged 5-15.",
      "is_active": true,
      "created_at": "2024-01-15T10:30:00",
      "updated_at": "2024-01-15T10:30:00",
      "average_rating": 4.5,
      "total_donations_received": 15000.00,
      "total_visits": 25,
      "reviews_count": 8
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 10,
    "total": 1,
    "pages": 1,
    "has_prev": false,
    "has_next": false
  }
}
```

### Get Home Details
```bash
GET /api/homes/1
```

Response:
```json
{
  "home": {
    "id": 1,
    "name": "Hope Children's Home",
    "description": "A loving home providing care and education to orphaned children.",
    "location": "Nairobi, Kenya",
    "address": "123 Hope Street, Nairobi",
    "phone_number": "+254700123456",
    "email": "info@hopechildrenshome.org",
    "capacity": 50,
    "current_children_count": 32,
    "established_date": "2010-05-15",
    "contact_person": "Mary Johnson",
    "needs_description": "We need educational materials, food supplies, and clothing for children aged 5-15.",
    "average_rating": 4.5,
    "total_donations_received": 15000.00,
    "total_visits": 25,
    "reviews_count": 8,
    "recent_reviews": [
      {
        "id": 1,
        "rating": 5,
        "title": "Amazing place!",
        "comment": "The children are well cared for and the staff is wonderful.",
        "reviewer_name": "Jane Doe",
        "created_at": "2024-01-10T14:20:00"
      }
    ]
  }
}
```

## Donations Examples

### Create Single Donation
```bash
POST /api/donations/
Authorization: Bearer <token>
Content-Type: application/json

{
  "home_id": 1,
  "amount": 500.00,
  "donation_type": "monetary",
  "description": "Monthly donation for educational supplies",
  "payment_method": "card",
  "anonymous": false,
  "message_to_home": "Keep up the great work!"
}
```

Response:
```json
{
  "message": "Donation created successfully",
  "donation": {
    "id": 1,
    "user_id": 1,
    "home_id": 1,
    "amount": 500.00,
    "donation_type": "monetary",
    "description": "Monthly donation for educational supplies",
    "status": "pending",
    "payment_method": "card",
    "anonymous": false,
    "message_to_home": "Keep up the great work!",
    "created_at": "2024-01-15T15:30:00",
    "donor_name": "John Smith",
    "home_name": "Hope Children's Home"
  }
}
```

### Create Multiple Donations
```bash
POST /api/donations/multiple
Authorization: Bearer <token>
Content-Type: application/json

{
  "donations": [
    {
      "home_id": 1,
      "amount": 300.00,
      "donation_type": "monetary",
      "message_to_home": "For educational supplies"
    },
    {
      "home_id": 2,
      "amount": 200.00,
      "donation_type": "monetary",
      "message_to_home": "For medical supplies"
    }
  ]
}
```

Response:
```json
{
  "message": "2 donations created successfully",
  "donations": [
    {
      "id": 2,
      "home_id": 1,
      "amount": 300.00,
      "donor_name": "John Smith",
      "home_name": "Hope Children's Home",
      "status": "pending"
    },
    {
      "id": 3,
      "home_id": 2,
      "amount": 200.00,
      "donor_name": "John Smith",
      "home_name": "Sunshine Orphanage",
      "status": "pending"
    }
  ]
}
```

## Reviews Examples

### Create Review
```bash
POST /api/reviews/
Authorization: Bearer <token>
Content-Type: application/json

{
  "home_id": 1,
  "rating": 5,
  "title": "Excellent care for children",
  "comment": "I visited this home and was impressed by the quality of care provided to the children. The staff is dedicated and the facilities are well-maintained.",
  "visit_date": "2024-01-10",
  "anonymous": false
}
```

Response:
```json
{
  "message": "Review created successfully",
  "review": {
    "id": 1,
    "user_id": 1,
    "home_id": 1,
    "rating": 5,
    "title": "Excellent care for children",
    "comment": "I visited this home and was impressed by the quality of care provided to the children.",
    "visit_date": "2024-01-10",
    "anonymous": false,
    "is_approved": true,
    "created_at": "2024-01-15T16:45:00",
    "reviewer_name": "John Smith",
    "home_name": "Hope Children's Home"
  }
}
```

## Visits Examples

### Schedule Visit
```bash
POST /api/visits/
Authorization: Bearer <token>
Content-Type: application/json

{
  "home_id": 1,
  "visit_date": "2024-02-15",
  "visit_time": "14:00",
  "number_of_visitors": 2,
  "purpose": "donation_delivery",
  "special_requests": "Would like to meet with the director",
  "contact_phone": "+254700123456",
  "notes": "Bringing educational supplies and books"
}
```

Response:
```json
{
  "message": "Visit scheduled successfully",
  "visit": {
    "id": 1,
    "user_id": 1,
    "home_id": 1,
    "visit_date": "2024-02-15",
    "visit_time": "14:00",
    "number_of_visitors": 2,
    "purpose": "donation_delivery",
    "special_requests": "Would like to meet with the director",
    "contact_phone": "+254700123456",
    "notes": "Bringing educational supplies and books",
    "status": "pending",
    "created_at": "2024-01-15T17:00:00",
    "visitor_name": "John Smith",
    "home_name": "Hope Children's Home",
    "home_location": "Nairobi, Kenya"
  }
}
```

### Get Available Dates
```bash
GET /api/visits/available-dates/1
```

Response:
```json
{
  "home_id": 1,
  "home_name": "Hope Children's Home",
  "available_dates": [
    {
      "date": "2024-01-16",
      "available_slots": 3
    },
    {
      "date": "2024-01-17",
      "available_slots": 2
    },
    {
      "date": "2024-01-18",
      "available_slots": 3
    }
  ]
}
```

## Admin Examples

### Analytics Overview
```bash
GET /api/admin/analytics/overview
Authorization: Bearer <admin_token>
```

Response:
```json
{
  "overview": {
    "total_users": 25,
    "total_homes": 15,
    "total_donations": 120,
    "total_visits": 45,
    "total_reviews": 32,
    "total_donation_amount": 45000.00,
    "pending_donations": 8,
    "new_users_30_days": 5,
    "new_donations_30_days": 15,
    "new_visits_30_days": 8
  }
}
```

### Homes Analytics
```bash
GET /api/admin/analytics/homes
Authorization: Bearer <admin_token>
```

Response:
```json
{
  "analytics": {
    "most_visited": [
      {
        "id": 1,
        "name": "Hope Children's Home",
        "location": "Nairobi, Kenya",
        "visit_count": 25
      }
    ],
    "most_donated": [
      {
        "id": 1,
        "name": "Hope Children's Home",
        "location": "Nairobi, Kenya",
        "total_donations": 15000.00,
        "donation_count": 45
      }
    ],
    "most_in_need": [
      {
        "id": 3,
        "name": "Little Angels Home",
        "location": "Lagos, Nigeria",
        "total_donations": 2500.00
      }
    ],
    "best_rated": [
      {
        "id": 1,
        "name": "Hope Children's Home",
        "location": "Nairobi, Kenya",
        "average_rating": 4.8,
        "review_count": 12
      }
    ]
  }
}
```

### Create Children's Home (Admin)
```bash
POST /api/admin/homes
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "New Hope Children's Center",
  "description": "A newly established center for vulnerable children",
  "location": "Mombasa, Kenya",
  "address": "456 New Hope Road, Mombasa",
  "phone_number": "+254700987654",
  "email": "info@newhopecenter.org",
  "capacity": 60,
  "current_children_count": 15,
  "established_date": "2024-01-01",
  "contact_person": "Sarah Wilson",
  "needs_description": "We need furniture, educational materials, and medical supplies."
}
```

Response:
```json
{
  "message": "Children's home created successfully",
  "home": {
    "id": 4,
    "name": "New Hope Children's Center",
    "description": "A newly established center for vulnerable children",
    "location": "Mombasa, Kenya",
    "address": "456 New Hope Road, Mombasa",
    "phone_number": "+254700987654",
    "email": "info@newhopecenter.org",
    "capacity": 60,
    "current_children_count": 15,
    "established_date": "2024-01-01",
    "contact_person": "Sarah Wilson",
    "needs_description": "We need furniture, educational materials, and medical supplies.",
    "is_active": true,
    "created_at": "2024-01-15T18:00:00"
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "home_id is required"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid credentials"
}
```

### 403 Forbidden
```json
{
  "error": "Admin access required"
}
```

### 404 Not Found
```json
{
  "error": "Children's home not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Database connection failed"
}
```