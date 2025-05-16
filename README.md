# TASK 

This is a full-stack web application built with the MERN stack (MongoDB, Express.js, React, and Node.js). It allows users to sign up, log in, and view their details on a protected dashboard page.

---

## 🚀 Features

- User registration with form validation
- Secure login with token-based authentication
- Password visibility toggle on login and signup forms
- Protected dashboard route to display logged-in user details
- Responsive and modern UI built with Tailwind CSS
- Persistent login using localStorage

---

## 📁 Project Structure

root/
├── backend/ # Express.js + MongoDB server
│ └── ...
├── frontend/ # React.js client app
│ └── ...
├── README.md
└── package.json

## 🛠️ Tech Stack

### Frontend:
- React
- React Router DOM
- Axios
- Tailwind CSS

### Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mern-auth-app.git
cd mern-auth-app

2. Setup the backend

cd backend
npm install

Create a .env file in the backend directory with the following:

PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


Start the backend server:

npm run dev

3. Setup the frontend
Open a new terminal tab/window:

cd frontend
npm install
npm start

Available Routes

Frontend

Route	            Description
/ or/login	        Login page
/signup	            User registration page
/dashboard	        Protected user info page


Backend (API)
Endpoint	              Method	Description
/api/v1/auth/register	  POST	    Register a new user
/api/v1/auth/login	      POST	    Authenticate user
/api/v1/auth/register	  GET	    Get all USER


Author
Built ADITYA BAHMAN
