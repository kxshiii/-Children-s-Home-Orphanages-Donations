#!/bin/bash

# Children's Home & Orphanages Donations API Startup Script

echo "Starting Children's Home & Orphanages Donations API..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Set environment variables if .env doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file from example..."
    cp .env.example .env
    echo "Please edit .env file with your database credentials before running again."
    exit 1
fi

# Load environment variables
export $(cat .env | xargs)

# Initialize database if needed
echo "Initializing database..."
flask init-db

# Seed database with sample data
echo "Seeding database with sample data..."
flask seed-db

# Start the application
echo "Starting Flask application..."
echo "API will be available at http://localhost:5000"
echo "Press Ctrl+C to stop the server"
python run.py