const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const {
  seedTables,
  getAllReservations,
  getReservationsByDate,
  cancelAnyReservation,
  getAllTables,
  addTable
} = require("../controllers/admin.controller");

router.post("/seed-tables", auth, role("ADMIN"), seedTables);
router.get("/tables", auth, role("ADMIN"), getAllTables);
router.post("/tables", auth, role("ADMIN"), addTable);
router.get("/reservations", auth, role("ADMIN"), getAllReservations);
router.get("/reservations/:date", auth, role("ADMIN"), getReservationsByDate);
router.put("/reservations/:id/cancel", auth, role("ADMIN"), cancelAnyReservation);

module.exports = router;
