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

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Ritusharma7011/Achievo.git
cd Achievo
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
```

### 4. Configure Environment Variables

Create the required `.env` files for the frontend and backend.

#### Frontend

```env
VITE_BASE_URL=http://localhost:4000/api/v1
```

#### Backend

Add the required environment variables:

```env
MONGODB_URL=
JWT_SECRET=
MAIL_HOST=
MAIL_USER=
MAIL_PASS=
RAZORPAY_KEY=
RAZORPAY_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

> ⚠️ Never commit `.env` files or expose secret keys in the repository.

### 5. Run the Application

From the project root:

```bash
npm run dev
```

This starts both the frontend and backend development servers.

**Frontend:**  
`http://localhost:5173`

**Backend:**  
`http://localhost:4000`

---

## 🔐 Security

Achievo implements several security mechanisms:

- JWT-based authentication
- Protected API routes
- Role-based authorization
- Bcrypt password hashing
- Expiring OTPs using MongoDB TTL
- Expiring password reset tokens
- Backend-side payment verification
- Environment variables for sensitive credentials

---

## 🌐 Deployment

The application is deployed using:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

### Live Application

[Achievo](https://achievo-ed-tech.vercel.app/)

---

## 📸 Screenshots

Screenshots of the application can be added here:

- Landing Page
- Course Catalog
- Course Details
- Login / Signup
- Student Dashboard
- Instructor Dashboard
- Course Creation
- Payment Flow

---

## 🔮 Future Improvements

Planned improvements include:

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
