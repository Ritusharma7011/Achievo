# Achievo – EdTech Learning Platform

Achievo is a full-stack EdTech platform designed to provide students with a complete online learning experience while allowing instructors to create, manage, and monetize their courses.

## 🚀 Live Demo

[Visit Achievo](https://achievo-ed-tech.vercel.app/)

## 📌 Features

### 👤 Authentication & Authorization
- User registration with OTP-based email verification
- JWT-based authentication
- Protected routes and role-based authorization
- Secure password reset workflow
- Cryptographically generated password reset tokens
- Automatic OTP expiration using MongoDB TTL
- Bcrypt-based password hashing
- Persistent authentication state using Redux Toolkit

### 📚 Course Management
- Browse and explore available courses
- Course categories and catalog pages
- Instructor-side course creation and management
- Course editing and deletion
- Hierarchical course structure with:
  - Sections
  - Subsections
  - Lectures
- Course thumbnail and lecture media uploads
- Student enrollment and learning workflows

### 🎓 Learning & Progress
- Enrolled courses for students
- Lecture completion tracking
- Course progress tracking
- Instructor dashboard
- Course ratings and reviews

### 💳 Payment
- Razorpay payment integration
- Backend payment verification
- Automated payment-success email notifications
- Course enrollment after successful payment verification

### 🖼️ Media Management
- Cloudinary integration for media storage
- Course thumbnails
- Lecture videos
- Profile images

### 📱 Responsive UI
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
- OTP-based verification
- Token expiration

### Integrations
- Razorpay – Payment processing
- Cloudinary – Media storage
- Nodemailer – Email services

### Development Tools
- Git
- GitHub
- Postman
- VS Code

### Deployment
- Vercel – Frontend
- Render – Backend
- MongoDB Atlas – Database

---

## 🏗️ Project Architecture

```text
Achievo
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── redux/
│   │   ├── hooks/
│   │   └── utils/
│   │
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
└── README.md
