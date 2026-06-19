# 📚 Study Planner Application

A full-stack Study Planner designed to help students organize their learning journey, track progress, manage revisions, maintain study streaks, and analyze productivity through interactive dashboards.

---

## Deployment

=> Frontend : Vercel

=> Backend : Render

=> Deployed URL : https://my-study-planner-mu.vercel.app/

---

##  Features

### Authentication & Security

* User Registration & Login
* JWT Authentication
* Refresh Token Rotation
* Persistent Login Sessions
* Cookie-Based Authentication
* Change Password
* Secure Logout

### Subject Management

* Create Subjects
* Update Subjects
* Delete Subjects (Soft Delete)
* Subject-wise Progress Tracking
* Color-Coded Subject Organization

### Topic Management

* Create Topics
* Edit Topics
* Delete Topics
* Topic Status Tracking
* Planned Study Dates
* Completion Tracking

### Revision System

* Revision Dashboard
* Revision Statistics
* Revision History Timeline
* Revision Insights
* Search & Filters
* Revision Tracking

### Analytics Dashboard

* Productivity Insights
* Status Distribution
* Weekly Activity Tracking
* Subject Progress Analysis
* Study Metrics Overview

### Streak Tracking

* Current Study Streak
* Longest Study Streak
* Monthly Study Days
* Total Study Days
* GitHub-Style Activity Heatmap
* Year-Based Activity Tracking

### User Settings

* Profile Management
* Security Settings
* Account Management
* Danger Zone Operations

### Search Functionality

* Global Topic Search
* Subject-Based Filtering
* Status Filtering

---

# Tech Stack

## Frontend

* React.js
* React Router
* Context API
* Axios
* Tailwind CSS
* Lucide React

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt

---

# Project Architecture

```text
Frontend (React)
        │
        ▼
REST APIs (Express)
        │
        ▼
MongoDB Database
```

### Key Architectural Features

* RESTful API Design
* JWT Authentication
* Refresh Token Rotation
* Soft Delete Strategy
* Reusable Component Architecture
* Context-Based State Management
* Protected Routes
* Aggregation-Based Analytics

---

# Project Structure

```text
Study-Planner/

├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── routes/
│   │   └── utils/
│   └── public/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── database/
│   └── server.js
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/AnilMende/Study-Plan-FullStack

cd study-planner
```

---

## Backend Setup

```bash
cd backend

npm install
```

Start Backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install
```

Start Frontend:

```bash
npm run dev
```

---

# Major Modules

## Dashboard

Displays:

* Total Topics
* Completed Today
* Pending Tasks
* Current Streak
* Today's Plan
* Recent Activity
* Subject Progress

---

## Revision Module

Supports:

* Revision Scheduling
* Revision Statistics
* Revision Insights
* Revision Timeline
* Revision History

---

## Analytics Module

Provides:

* Weekly Activity Tracking
* Productivity Insights
* Status Distribution
* Subject Performance Analysis

---

## Streak Module

Tracks:

* Current Streak
* Longest Streak
* Study Days
* Activity Heatmap
* Yearly Contributions

---

# Authentication Flow

```text
Login
   │
   ▼
Access Token 
   │
   ▼
Expired?
   │
   ▼
Refresh Token 
   │
   ▼
Generate New Access Token
```

---

# Future Improvements

* Email Verification
* Forgot Password
* Google Authentication
* Study Goals
* Notifications & Reminders
* Pomodoro Timer
* AI Study Assistant
* Export Analytics Reports
* Mobile App Version
* Real-Time Sync

---

# Learning Outcomes

This project demonstrates:

* Full Stack Development
* REST API Design
* Authentication Systems
* MongoDB Data Modeling
* React Component Architecture
* State Management
* Analytics Implementation
* Data Visualization
* Secure Session Management

---

# Author

**Anil Kumar Mende**

B.Tech - Artificial Intelligence & Data Science

Passionate about Full Stack Development, Artificial Intelligence, and Building Productivity Applications.

---
