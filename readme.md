# Mini CRM Application (MERN)

A **Mini CRM (Customer Relationship Management)** web application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
This project was developed as part of the **Full Stack Developer Assignment** for **Dev Innovations Labs**.

---

## 🚀 Features

### 🔐 Authentication
- User **Registration** & **Login**
- Passwords securely stored with hashing
- JWT-based authentication

### 👥 Customers
- Add new customers
- View list of customers (with pagination & search by name/email)
- View customer details (with associated leads)
- Update customer details
- Delete customers

### 📌 Leads Management
- Create, update, and delete leads under each customer
- Lead fields: `title`, `description`, `status (New, Contacted, Converted, Lost)`, `value`, `createdAt`
- Filter leads by status

### 📊 Dashboard
- Summary of customers & leads
- Pie chart → leads by status
- Bar chart → leads value by status

### 🛠️ Extras
- Form validation with **Yup + React Hook Form**
- International phone number input with flags
- Role-based access support (`user`, `admin`)
- Clean UI with **React + TailwindCSS**

---

## 🏗️ Tech Stack

- **Frontend:** React.js, TailwindCSS, Recharts  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **Auth:** JWT, bcrypt  
- **Validation:** Yup, React Hook Form  
- **Deployment:** (Optional) Render / Netlify  

---

## 📂 Project Structure

Mini-CRM/
├── backend/ # Express + MongoDB API
├── frontend/ # React App
├── screenshots/ # Demo screenshots
└── README.md


---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repo
```bash
git clone https://github.com/your-username/mini-crm.git
cd mini-crm


2️⃣ Backend Setup
cd backend
npm install

Create a .env file:
PORT=5000
MONGO_URI=your_mongodb_atlas_connection
JWT_SECRET=your_secret_key


Run backend:
npm run dev

3️⃣ Frontend Setup:
cd frontend
npm install
npm start


Frontend will run on http://localhost:3000
Backend will run on http://localhost:5000


## 📦 Deliverables

- Backend (Node + Express + MongoDB)  
- Frontend (React + TailwindCSS)  
- Authentication  
- Customers & Leads Management  
- Dashboard with Charts  
- MongoDB Atlas Integration  
- Validation (Yup + React Hook Form)  
- Deployment (Optional)  


 👨‍💻 Author

Ankit Rajput 
Full Stack Developer Candidate – Dev Innovations Labs