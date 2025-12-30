const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: true
  },
  date: {
    type: String,
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  guests: {
    type: Number,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  specialRequest: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ['active', 'cancelled'],
    default: 'active'
  }

}, { timestamps: true });

module.exports = mongoose.model("Reservation", reservationSchema);
