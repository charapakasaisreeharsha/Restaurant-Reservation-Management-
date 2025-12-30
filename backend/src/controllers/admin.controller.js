const Table = require("../models/Table");
const Reservation = require("../models/Reservation");

exports.seedTables = async (req, res) => {
  const tables = [
    { tableNumber: 1, capacity: 2 },
    { tableNumber: 2, capacity: 4 },
    { tableNumber: 3, capacity: 4 },
    { tableNumber: 4, capacity: 6 }
  ];

  await Table.deleteMany();
  await Table.insertMany(tables);

  res.json({ message: "Tables seeded successfully" });
};

exports.getAllReservations = async (req, res) => {
  const reservations = await Reservation.find()
    .populate("userId", "name email")
    .populate("tableId", "tableNumber capacity")
    .sort({ createdAt: -1 }); // Sort by newest first

  res.json(reservations);
};

exports.getReservationsByDate = async (req, res) => {
  const { date } = req.params;

  const reservations = await Reservation.find({ date })
    .populate("userId", "name email")
    .populate("tableId", "tableNumber capacity");

  res.json(reservations);
};

exports.cancelAnyReservation = async (req, res) => {
  const reservation = await Reservation.findByIdAndUpdate(
    req.params.id,
    { status: 'cancelled' },
    { new: true }
  );

  if (!reservation) {
    return res.status(404).json({ message: "Reservation not found" });
  }

  res.json({ message: "Reservation cancelled by admin", reservation });
};

// GET all tables
exports.getAllTables = async (req, res) => {
  const tables = await Table.find();
  res.json(tables);
};

// ADD new table
exports.addTable = async (req, res) => {
  const { tableNumber, capacity } = req.body;

  if (!tableNumber || !capacity) {
    return res.status(400).json({ message: "Missing table details" });
  }

  const exists = await Table.findOne({ tableNumber });
  if (exists) {
    return res.status(400).json({ message: "Table already exists, change the number" });
  }

  const table = await Table.create({ tableNumber, capacity });
  res.status(201).json(table);
};
