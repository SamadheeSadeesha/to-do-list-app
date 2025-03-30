# 📝 To-Do List App
A simple CRUD application developed using the MERN stack to store and manage to-do tasks.


---


## 🛠️ Tech Stack
This application is built using the MERN stack:

##### 📌 Frontend – React.js (React Router, React Toastify (toast notifications), React Datepicker)
##### 📌 Backend – Node.js + Express + MongoDB (with JWT, bcrypt, and nodemailer)
##### 📌 Database – MongoDB (with Mongoose)
##### 📌 API Handling – Axios (for making HTTP requests)


---


## 🚀 Features
##### 📌 User Registration & Login
##### 📌 Change, Forgot & Reset password
##### 📌 Protected Dashboard & Routes
##### 📌 Create, Read, Update, Delete Tasks
##### 📌 Sort – Sort tasks by date and time.
##### 📌 Filter – Highlight today's tasks by filtering.


---


## 📦 Installation & Setup

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/your-repo-name.git
cd to-do-list-app
```

### **2. Set Up Environment Variables**
Create a `.env` file inside the `/backend` directory with the following:

```env
PORT=5000
MONGO_URI=your_mongo_uri
JWT_KEY=your_jwt_secret
EMAIL=your_email@gmail.com
EMAIL_PASSWORD=your_email_app_password
```

### **3. Install Dependencies and Run the Application**
Backend
```bash
cd backend
npm install
npm run dev
``` 
Frontend
```bash
cd frontend
npm install
npm start
```
