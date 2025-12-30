const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  createReservation,
  getMyReservations,
  cancelReservation,
  getBookedSlots
} = require("../controllers/reservation.controller");

router.post("/", auth, createReservation);
router.get("/my", auth, getMyReservations);
router.delete("/:id", auth, cancelReservation);

// ✅ SLOT AVAILABILITY
router.get("/booked-slots", auth, getBookedSlots);

module.exports = router;
