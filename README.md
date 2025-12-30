# 🍽️ Restaurant Reservation Management System

A full-stack **Restaurant Reservation Management System** developed as part of a technical assessment.  
The system supports **role-based access**, **slot-based reservations**, and **capacity-aware table allocation**.

---

## 🔗 Live URLs

- **Frontend (Vercel):** [https://restraunt-mangervzkb.vercel.app/](https://restraunt-mangervzkb.vercel.app/)  
- **Backend (Render):** [https://restaurant-reservation-management.onrender.com](https://restaurant-reservation-management.onrender.com)

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- Axios  
- Custom CSS  

### Backend
- Node.js  
- Express.js  
- MongoDB Atlas  
- Mongoose  
- JWT Authentication  

---

## 👥 User Roles

### Customer (`USER`)
- Register & login  
- Book a table by selecting:  
  - Date  
  - Time slot  
  - Number of guests  
- Provide mobile number and optional special request  
- View upcoming reservations  
- Cancel reservations  
- **Cannot book already occupied time slots**

### Administrator (`ADMIN`)
- Login with admin privileges  
- View all reservations (table number, date, time slot)  
- View total, booked, and available tables  
- Add new tables dynamically  

---

## 📅 Reservation Logic

- Reservations are **slot-based**.
- A time slot can be booked **only once per date**.
- Once booked:
  - The slot is **disabled (greyed out)** for all users.
  - The same slot **remains available on other dates**.
- Tables are assigned **automatically** based on:
  - Guest count  
  - Table capacity  
  - Availability  
- Prevents double-booking and ensures fair usage.

---

## 🪑 Table Management

Each table has:
- `tableNumber`  
- `capacity`  

- Initial tables are added manually via **MongoDB Atlas**.  
- Admins can add tables via the **admin dashboard**.  
- Table assignment is handled **automatically by the backend**.

---

## 🔐 Authentication & Security

- **JWT-based authentication**  
- **Protected routes** for users and admins  
- **Role-based authorization**  
- Sensitive credentials stored securely in **backend environment variables**

---

## 🗄️ Database Models

### `User`
```json
{
  "email": "string",
  "password": "string",
  "role": "USER" | "ADMIN"
}
