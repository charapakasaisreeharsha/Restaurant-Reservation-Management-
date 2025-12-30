const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const reservationRoutes = require("./routes/reservation.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Restaurant Reservation API is running");
});

module.exports = app;
