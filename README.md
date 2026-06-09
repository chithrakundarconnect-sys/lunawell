🌸 LunaWell — AI-Powered Women's Wellness & Health Tracking Platform

LunaWell is a full-stack AI-powered wellness platform designed to help women monitor, track, and improve their overall health through intelligent insights, personalized wellness guidance, and secure health data management.

The platform enables users to track essential wellness metrics including mood, sleep, hydration, skincare routines, menstrual health, and personal wellness journals while providing AI-driven recommendations and predictive health insights.

LunaWell combines modern web technologies, cloud services, machine learning, and Generative AI to create a comprehensive digital wellness companion.

---

🚀 Key Features

🔐 Secure Authentication & User Management

- User Signup and Login using Firebase Authentication
- Secure session management
- Protected routes and authenticated access
- Multi-user support with complete data isolation

💧 Wellness Tracking

- Water Intake Tracking
- Sleep Monitoring
- Mood & Stress Tracking
- Daily Skincare Routine Tracking
- Personal Health Journal
- Wellness Activity Dashboard

🩸 Menstrual Health Management

- Menstrual Cycle Tracking
- Period History Management
- Cycle Analytics
- Upcoming Cycle Estimation
- Personalized Health Planning Support

🤖 AI-Powered Wellness Assistant (Kiki)

- Powered by Gemini AI
- Personalized wellness guidance
- Self-care recommendations
- Hydration suggestions
- Stress management support
- General health and wellness assistance

🧠 Machine Learning Prediction Module

- Python FastAPI-based ML backend
- Menstrual cycle prediction system
- Health pattern analysis
- Predictive wellness insights

🔔 Smart Reminder & Notification System

- Hydration reminders
- Meal reminders
- Sleep reminders
- Wellness activity notifications
- User-configurable schedules

📊 Analytics & Insights

- Wellness summary dashboard
- Health trend monitoring
- Activity tracking analytics
- User progress visualization

🎨 User Experience Features

- Responsive design
- Dark Mode / Light Mode
- Multi-language Support
- Avatar Selection & Upload
- Mobile-Friendly Interface

🎗️ Awareness & Educational Features

- Breast Cancer Awareness Page
- Wellness Education Resources
- Health Awareness Content

---

🔐 Security & Privacy

LunaWell prioritizes user privacy and data protection.

Security Features

- Firebase Authentication
- Firestore Security Rules
- User-specific data access
- Secure cloud-based storage
- Protected routes
- Multi-account testing validation

Data Protection

- Users can only access their own data
- Role-based data isolation
- Secure authentication workflow
- Real-time database protection

---

🧠 Technology Stack

Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- ShadCN UI

Backend

- Firebase Authentication
- Cloud Firestore
- Python FastAPI

Artificial Intelligence

- Gemini API
- AI Wellness Assistant

Machine Learning

- Menstrual Cycle Prediction Model
- Predictive Health Analytics

Cloud & DevOps

- Firebase
- Firestore
- Vercel
- Git & GitHub

---

🏗️ System Architecture

User Interface (Next.js + React)

↓

Firebase Authentication

↓

Cloud Firestore Database

↓

Python FastAPI ML Service

↓

Machine Learning Prediction Engine

↓

Gemini AI Wellness Assistant

---

👤 Multi-User Architecture

Each user receives:

- Personal Dashboard
- Personal Journal
- Personal Wellness Records
- Personal Mood Tracking
- Personal Hydration Tracking
- Personal Menstrual Cycle Data

Firestore Security Rules ensure users cannot access or modify another user's data.

---

📂 Project Structure

app/                # Next.js App Router Pages
components/         # Reusable UI Components
context/            # Global State Management
lib/                # Firebase Configuration
public/             # Images and Static Assets
hooks/              # Custom React Hooks
services/           # API & Utility Services

⚙️ Installation

1. Clone Repository

git clone https://github.com/YOUR_USERNAME/LunaWell.git
cd LunaWell

2. Install Dependencies

npm install

3. Configure Firebase

Create a Firebase Project and enable:

- Firebase Authentication
- Cloud Firestore

4. Create Environment Variables

Create:

.env.local

Add:

NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID

GEMINI_API_KEY=YOUR_GEMINI_KEY

5. Start Development Server

npm run dev

Open:

http://localhost:3000

---

🧪 Testing

The application was tested for:

- Authentication Handling
- Multi-User Access Control
- Firestore Security Rules
- Real-Time Data Synchronization
- Notification System
- Machine Learning Integration
- UI Responsiveness
- Error Handling & Stability

All major functionality was successfully validated.

---
🔗 Project Repositories

Main Application

Frontend + Backend
https://github.com/chithrakundarconnect-sys/lunawell

Machine Learning Module
https://github.com/chaithra397/lunawell-ml

---

🎯 Final Year Project Objective

The objective of LunaWell is to empower women with a secure and intelligent digital wellness platform that combines health monitoring, machine learning predictions, AI-driven guidance, and personalized wellness insights.

The project demonstrates the integration of Full Stack Development, Cloud Computing, Machine Learning, and Generative AI to improve health awareness and promote healthier lifestyle habits.

---

👩‍💻 Developed By

Chithra Kundar

Computer Science Engineering Student

Full Stack Developer | Next.js | Firebase | AWS | AI Integration

---

📄 License

This project is developed for educational, academic, and learning purposes.
