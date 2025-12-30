# 🍽️ Restaurant Reservation Management System

A full-stack **Restaurant Reservation Management System** built as part of a technical assessment.  
The application supports **role-based authentication**, **slot-based table booking**, and **capacity-aware table allocation** with a clean user and admin experience.

---

## 🔗 Live Application URLs

- 🌐 **Frontend (Vercel)**  
  👉 https://restraunt-mangervzkb.vercel.app/

- ⚙️ **Backend API (Render)**  
  👉 https://restaurant-reservation-management.onrender.com

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React.js
- 🌐 Axios
- 🎨 Custom CSS (no UI libraries)

### Backend
- 🟢 Node.js
- 🚀 Express.js
- 🍃 MongoDB Atlas
- 📦 Mongoose
- 🔐 JWT Authentication

---

## 👥 User Roles & Access Control

### 👤 Customer (USER)
- Register & login securely
- Book a table by selecting:
  - 📅 Date
  - ⏰ Time slot
  - 👨‍👩‍👧 Number of guests
- Provide 📞 mobile number & 📝 optional special request
- View upcoming reservations
- Cancel reservations
- ❌ Cannot book already occupied time slots

---

### 🛠️ Administrator (ADMIN)
- Login with admin privileges
- View all reservations
- See table number, date & time slot for each booking
- View total, booked & available tables
- Add new tables dynamically

---

## 📅 Reservation & Availability Logic

- The system follows **slot-based reservation logic**
- A time slot can be booked **only once per date**
- Once booked:
  - The slot is **disabled (greyed out)** for all users
- The same time slot is available again on a **different date**
- Tables are assigned automatically based on:
  - Guest count
  - Table capacity
  - Availability

✅ This prevents double booking and ensures fair table usage.

---

## 🪑 Table Management

- Each table includes:
  - `tableNumber`
  - `capacity`
- Initial tables are added manually via MongoDB Atlas
- Admins can add additional tables from the dashboard
- Table assignment is handled fully by backend logic

---

## 🔐 Authentication & Security

- JWT-based authentication
- Protected routes for users and admins
- Role-based authorization
- Sensitive credentials stored securely as backend environment variables

---


## 🗄️ Database Models

### 👤 User
```js
{
  email,
  password,
  role: "USER" | "ADMIN"
}
```
###🪑 Table
```js

{
  tableNumber,
  capacity
}
```
📋 Reservation
```js

{
  userId,
  tableId,
  date,
  timeSlot,
  guests,
  mobileNumber,
  specialRequest
}
```
