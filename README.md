### 🎉 Eventify — Full Stack Event Management Platform

Eventify is a full-stack web application that allows users to create, discover, and RSVP to events with strict capacity enforcement and secure authentication.
It is built as part of a Full Stack Intern assessment to demonstrate real-world backend logic, frontend UI/UX, and deployment skills.

### 🚀 Live Demo

Frontend: https://infotech-frontend.onrender.com

Backend API: https://infotech-backend-z4sk.onrender.com

### 🧩 Features

# 🔐 User Authentication

    Secure user registration & login

    JWT-based authentication

    Protected routes for authenticated users

# 📅 Event Management

    Create events with:

    Title

    Description

    Date & Time

    Location

    Capacity

    Image upload

    View all upcoming events

    Edit / Delete events (creator only)

# 🧑‍🤝‍🧑 RSVP System (Core Business Logic)

    RSVP to events

    Leave events

    Strict capacity enforcement

    Prevents duplicate RSVPs

    Backend logic prevents overbooking

# 🎨 Modern UI / UX

    Responsive design (Desktop, Tablet, Mobile)

    Hero section with background image

    Floating event cards

    “Our Tools” showcase carousel for other projects

    Clean, SaaS-style interface

# 🧰 Portfolio Showcase

    “Our Tools” section highlights other projects

    Large image carousel with left/right navigation

    Click → opens project in new tab

# 🛠️ Tech Stack
    #Frontend

        React.js

        React Router

        Axios

        CSS (custom, no UI libraries)

    #Backend

        Node.js

        Express.js

        MongoDB (MongoDB Atlas)

        Mongoose

        JWT Authentication

        Multer + Cloudinary (Image uploads)

        Deployment

## Frontend: Render

## Backend: Render

## Database: MongoDB Atlas

### 🧠 Key Technical Highlights

    Concurrency-safe RSVP logic to avoid race conditions

    Defensive UI (no undefined data shown)

    RESTful API design

    Secure environment variable handling

    Clean component-based architecture

    Fully deployed and production-ready

### 📂 Project Structure


infotech/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── data/
│   │   └── services/
│   └── public/
│
└── README.md


### 🧪 Running Locally

## Backend
cd backend
npm install
npm start

## Frontend
cd frontend
npm install
npm start


### 👤 Author
Hrushikesh Mattapally

GitHub: https://github.com/hrushikeshmattapally

LinkedIn: https://www.linkedin.com/in/mattapally-hrushikesh-45183a274/
