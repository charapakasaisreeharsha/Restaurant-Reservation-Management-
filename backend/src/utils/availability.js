const Reservation = require("../models/Reservation");

async function isTableAvailable(tableId, date, timeSlot) {
  const existing = await Reservation.findOne({
    tableId,
    date,
    timeSlot,
    status: 'active'
  });
  return !existing;
}

module.exports = { isTableAvailable };
