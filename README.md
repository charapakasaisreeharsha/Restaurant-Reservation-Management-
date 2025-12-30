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

🌐 API Endpoints
🔐 Authentication

POST /api/auth/register

POST /api/auth/login
---
👤 Customer

POST /api/reservations

GET /api/reservations/my

DELETE /api/reservations/:id

GET /api/reservations/booked-slots?date=YYYY-MM-DD
---
🛠️ Admin

GET /api/admin/reservations

GET /api/admin/tables

POST /api/admin/tables
---
🧪 Validation & Error Handling

Prevents:

❌ Duplicate slot bookings

❌ Over-capacity reservations

❌ Unauthorized access

Uses proper HTTP status codes:

400 – Bad Request

401 – Unauthorized

403 – Forbidden
---
🖥️ UI Features

Single-page booking experience

Smooth date & slot selection

Dynamic slot disabling

Responsive layout (desktop & mobile)

Clean admin dashboard with summary cards
---
📌 Assumptions

Single restaurant system

Fixed predefined time slots

No payment gateway integration

Admin accounts are pre-created

Past reservations are retained for history
---
⚠️ Limitations

No automatic time-based cleanup

No table deletion feature

No notification system (SMS / Email)

🚀 Future Enhancements

✏️ Editable reservations (Admin)

📊 Booking analytics

🔔 Notification system

🏢 Multi-restaurant support

📅 Calendar-based booking UI
---
▶️ Local Setup Instructions
Backend
cd backend
npm install
npm run dev


Create .env file:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=5000

Frontend
cd frontend
npm install
npm start
---
✅ Submission Checklist

✔ Role-based authentication

✔ Slot-based reservation logic

✔ Capacity-aware table assignment

✔ Admin dashboard

✔ Deployed frontend & backend

✔ README documentation
---
👨‍💻 Author

Sai Sree Harsha Charapaka :)
