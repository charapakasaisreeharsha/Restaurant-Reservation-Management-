const Reservation = require("../models/Reservation");
const Table = require("../models/Table");
const { isTableAvailable } = require("../utils/availability");

exports.createReservation = async (req, res) => {
  try {
    const {
      date,
      timeSlot,
      guests,
      mobileNumber,
      specialRequest
    } = req.body;

    if (!date || !timeSlot || !guests || !mobileNumber) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check user's active reservations limit
    const userReservations = await Reservation.find({ userId: req.user.id });
    if (userReservations.length >= 2) {
      return res.status(400).json({
        message: "You can only have up to 2 active reservations"
      });
    }

    // 🔴 OPTION B: Global slot block
    const slotTaken = await Reservation.findOne({ date, timeSlot, status: 'active' });
    if (slotTaken) {
      return res.status(400).json({
        message: "This time slot is already booked"
      });
    }

    // 1️⃣ Tables that fit capacity
    const suitableTables = await Table.find({
      capacity: { $gte: guests }
    });

    if (!suitableTables.length) {
      return res.status(400).json({
        message: "No table fits guest count"
      });
    }

    // 2️⃣ Tables already booked for this slot
    const bookedReservations = await Reservation.find({
      date,
      timeSlot,
      status: 'active'
    });

    const bookedTableIds = bookedReservations.map(r =>
      r.tableId.toString()
    );

    // 3️⃣ Pick first FREE table
    const availableTable = suitableTables.find(
      t => !bookedTableIds.includes(t._id.toString())
    );

    if (!availableTable) {
      return res.status(400).json({
        message: "No tables available for this slot"
      });
    }

    // 4️⃣ Create reservation
    const reservation = await Reservation.create({
      userId: req.user.id,
      tableId: availableTable._id,
      date,
      timeSlot,
      guests,
      mobileNumber,
      specialRequest
    });

    return res.status(201).json(reservation);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Reservation failed" });
  }
};

exports.getMyReservations = async (req, res) => {
  const reservations = await Reservation.find({ userId: req.user.id })
    .populate("tableId");
  res.json(reservations);
};

exports.cancelReservation = async (req, res) => {
  const reservation = await Reservation.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id, status: 'active' },
    { status: 'cancelled' },
    { new: true }
  );

  if (!reservation) {
    return res.status(404).json({ message: "Reservation not found or already cancelled" });
  }

  res.json({ message: "Reservation cancelled", reservation });
};

exports.getBookedSlots = async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: "Date required" });
  }

  const reservations = await Reservation.find({ date, status: 'active' });

  res.json(
    reservations.map(r => ({
      tableId: r.tableId,
      timeSlot: r.timeSlot
    }))
  );
};
