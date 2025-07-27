# Project 7: Children’s Home & Orphanages Donations - Group 7

## Introduction & Problem Statement

Children's homes, also known as orphanages or residential care facilities, play a critical role in providing care and support to vulnerable children who are separated from their families. However, these homes face several challenges that impact the well-being and development of the children, including:

- **Limited access to education and skill-building opportunities:** Many children’s homes struggle to offer adequate educational resources and skill-building programs due to limited resources or staffing constraints, affecting the children’s growth and future prospects.

- **Fragmented or inadequate record-keeping and data management:** Manual or paper-based systems often lead to inefficient, error-prone documentation of vital information such as health, education, and personal history, hindering individualized care.

- **Privacy and data protection concerns:** Ensuring the confidentiality and privacy of children’s sensitive information remains a critical challenge for these institutions.

This project aims to leverage technology to address these challenges by providing:

- Innovative educational and skill-building programs
- Digital record-keeping and data management systems
- Tools for communication and coordination among stakeholders
- Telepsychology and tele-counseling support options
- Robust privacy and data protection measures

By doing so, children’s homes can optimize care, enhance support services, and improve outcomes for children in their care.

---

## MVP Features

### Users
- Account creation and login
- Browse and search children’s homes by location or name
- View detailed profiles of children’s homes
- Make donations to single or multiple homes
- Schedule visits by selecting available dates and locations
- Write reviews for children’s homes

### Admin
- User management (add/edit users)
- Perform CRUD operations on children’s home organizations
- View analytics such as:
  - Most visited homes
  - Homes in greatest need of donations and assistance

---

## Technology Stack & Technical Expectations

- **Backend:** Flask
- **Database:** PostgreSQL
- **Frontend:** React.js with Redux Toolkit for state management
- **Wireframes:** Designed in Figma with mobile-friendly focus
- **Testing Frameworks:** Jest (frontend) & Minitests (backend)

---

# Children's Home & Orphanages Donations Platform

A full-stack web application to support children's homes and orphanages through donations and volunteering.  
The **backend** is a Flask REST API managing users, homes, donations, visits, reviews, and admin analytics.  
The **frontend** is a React app built with Vite for an interactive, responsive user experience.

---

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Development](#development)
- [Production Deployment](#production-deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### User Features
- User registration and JWT-based authentication
- Browse and search children’s homes by name and location
- View detailed information on homes
- Make donations (single or multiple) to specific homes
- Schedule visits to homes
- Write and manage reviews
- View donation and visit history
- Volunteer application with skills and availability form

### Admin Features
- CRUD operations on children’s homes
- User and role management
- Analytics dashboard:
  - Most visited homes
  - Homes with most donations
  - Homes most in need
  - Best rated homes
- Manage visits and donations statuses
- System overview metrics

---

## Technology Stack

**Backend:**
- Python 3.8+
- Flask 2.3.3
- PostgreSQL with SQLAlchemy ORM
- JWT Authentication (Flask-JWT-Extended)
- Bcrypt for password hashing
- Flask-CORS for cross-origin requests

**Frontend:**
- React 18+
- Vite 4.5+
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide-react for icons
- Toast notifications for feedback

---

## Backend Setup

### Prerequisites
- Python 3.8+
- PostgreSQL 12+
- Virtual environment (recommended)

