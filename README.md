# Achievo – EdTech Learning Platform

Achievo is a full-stack EdTech platform that provides students with an interactive learning experience while enabling instructors to create, manage, and deliver online courses.

## 🚀 Live Demo

**[Visit Achievo](https://achievo-ed-tech.vercel.app/)**

## 📌 Features

### 👤 Authentication & Authorization

- User registration with OTP-based email verification
- JWT-based authentication
- Protected routes and role-based authorization
- Secure password reset workflow
- Cryptographically generated password reset tokens
- Automatic OTP expiration using MongoDB TTL
- Bcrypt-based password hashing
- Client-side authentication state management using Redux Toolkit

### 📚 Course Management

- Browse and explore available courses
- Course categories and catalog pages
- Instructor-side course creation and management
- Course editing and deletion
- Course organization using sections, subsections, and lectures
- Course thumbnail and lecture media uploads
- Student course enrollment

### 🎓 Learning & Progress

- View enrolled courses
- Lecture completion tracking
- Course progress tracking
- Instructor dashboard
- Course ratings and reviews

### 💳 Payment Integration

- Razorpay payment integration
- Backend payment verification
- Automated payment-success email notifications
- Course enrollment after successful payment verification

### 🖼️ Media Management

- Cloudinary integration for media storage
- Course thumbnails
- Lecture videos
- Profile images

### 📱 Responsive User Interface

- Responsive design for desktop and mobile devices
- Reusable React components
- Tailwind CSS-based styling
- Loading states and user-friendly interactions

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- REST APIs

### Database

- MongoDB
- Mongoose

### Authentication & Security

- JWT
- Bcrypt
- OTP-based email verification
- Token expiration
- Protected API routes
- Role-based authorization

### Third-Party Integrations

- Razorpay – Payment processing
- Cloudinary – Media storage
- Brevo – Email services

### Development Tools

- Git
- GitHub
- Postman

### Deployment

- Vercel – Frontend
- Render – Backend
- MongoDB Atlas – Database

---

## 🏗️ Project Structure

```text
Achievo/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── redux/
│   ├── hooks/
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── ...
│
├── public/
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB Atlas account
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Ritusharma7011/Achievo.git
cd Achievo
```

### 2. Install Frontend Dependencies

From the project root:

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### 4. Configure Environment Variables

Create the required `.env` files for the frontend and backend.

### Frontend Environment Variables

Create a `.env` file in the project root:

```env
VITE_BASE_URL=http://localhost:4000/api/v1
```

### Backend Environment Variables

Create a `.env` file inside the `server` folder and configure the required credentials:

```env
MONGODB_URL=
JWT_SECRET=

BREVO_API_KEY=
BREVO_SENDER_EMAIL=

RAZORPAY_KEY=
RAZORPAY_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

> **Important:** Never commit `.env` files or expose API keys, database credentials, or other sensitive information in the repository.

### 5. Run the Application

From the project root:

```bash
npm run dev
```

The development setup runs both the frontend and backend servers.

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:4000
```

---

## 🔐 Security

Achievo implements multiple security mechanisms to protect user accounts and application workflows:

- JWT-based authentication
- Protected API routes
- Role-based authorization
- Bcrypt password hashing
- OTP-based email verification
- MongoDB TTL-based OTP expiration
- Expiring password reset tokens
- Backend-side payment verification
- Environment variables for sensitive credentials

---

## 💳 Payment Flow

The payment workflow is implemented using Razorpay:

```text
Student selects course
        ↓
Payment initiated
        ↓
Razorpay checkout
        ↓
Payment completed
        ↓
Backend verifies payment
        ↓
Course enrollment
        ↓
Payment-success email
```

---

## 📚 Course Learning Flow

```text
Instructor
    ↓
Create Course
    ↓
Add Sections
    ↓
Add Subsections
    ↓
Add Lectures
    ↓
Publish Course
    ↓
Student Enrollment
    ↓
Watch Lectures
    ↓
Track Course Progress
```

---

## 🌐 Deployment

The application is deployed using:

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| Media Storage | Cloudinary |

### Live Application

**[https://achievo-ed-tech.vercel.app/](https://achievo-ed-tech.vercel.app/)**

---

## 📸 Screenshots

Screenshots of the application can be added here to showcase the major workflows:

- Landing Page
- Login / Signup
- Course Catalog
- Course Details
- Student Dashboard
- Instructor Dashboard
- Course Creation
- Course Learning
- Payment Flow
- Profile Management

---

## 🔮 Future Improvements

The following features are planned for future versions of Achievo:

- AI-powered quiz generation
- AI-based content summarization
- Personalized learning roadmaps
- Student project showcase
- Course completion certificates

---

## 👩‍💻 Author

**Ritu Kumari**

- GitHub: [Ritusharma7011](https://github.com/Ritusharma7011)
- LinkedIn: [Ritu Kumari](https://www.linkedin.com/in/ritu-kumari-069830290/)

---

## ⭐ Acknowledgements

Built as a full-stack project to explore real-world application development using the MERN stack, REST APIs, authentication, payment integration, cloud media storage, and deployment.

---
