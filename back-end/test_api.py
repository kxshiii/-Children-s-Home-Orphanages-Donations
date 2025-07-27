#!/usr/bin/env python3
"""
Simple API test script to verify endpoints are working.
Run this after starting the Flask server.
"""

import requests
import json

BASE_URL = "http://localhost:5000"

def test_api():
    print("Testing Children's Home & Orphanages Donations API")
    print("=" * 50)
    
    # Test 1: API Root
    print("\n1. Testing API root endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")
    
    # Test 2: User Registration
    print("\n2. Testing user registration...")
    user_data = {
        "username": "testuser",
        "email": "test@example.com",
        "password": "testpass123",
        "first_name": "Test",
        "last_name": "User"
    }
    try:
        response = requests.post(f"{BASE_URL}/api/auth/register", json=user_data)
        print(f"Status: {response.status_code}")
        if response.status_code == 201:
            data = response.json()
            print("Registration successful!")
            token = data.get('access_token')
            print(f"Token received: {token[:20]}...")
            return token
        else:
            print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")
    
    return None

def test_authenticated_endpoints(token):
    if not token:
        print("No token available, skipping authenticated tests")
        return
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Test 3: Get Profile
    print("\n3. Testing get profile...")
    try:
        response = requests.get(f"{BASE_URL}/api/auth/profile", headers=headers)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")
    
    # Test 4: Get Homes
    print("\n4. Testing get homes...")
    try:
        response = requests.get(f"{BASE_URL}/api/homes/")
        print(f"Status: {response.status_code}")
        data = response.json()
        print(f"Found {len(data.get('homes', []))} homes")
    except Exception as e:
        print(f"Error: {e}")

def test_admin_login():
    print("\n5. Testing admin login...")
    admin_data = {
        "username": "admin",
        "password": "adminpass"
    }
    try:
        response = requests.post(f"{BASE_URL}/api/auth/login", json=admin_data)
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print("Admin login successful!")
            token = data.get('access_token')
            
            # Test admin analytics
            print("\n6. Testing admin analytics...")
            headers = {"Authorization": f"Bearer {token}"}
            response = requests.get(f"{BASE_URL}/api/admin/analytics/overview", headers=headers)
            print(f"Analytics Status: {response.status_code}")
            if response.status_code == 200:
                analytics = response.json()
                print(f"Total users: {analytics['overview']['total_users']}")
                print(f"Total homes: {analytics['overview']['total_homes']}")
        else:
            print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    # Run basic tests
    token = test_api()
    test_authenticated_endpoints(token)
    test_admin_login()
    
    print("\n" + "=" * 50)
    print("API testing completed!")
    print("If you see errors, make sure:")
    print("1. Flask server is running on localhost:5000")
    print("2. Database is initialized (flask init-db)")
    print("3. Sample data is seeded (flask seed-db)")