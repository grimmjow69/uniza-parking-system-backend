const express = require("express");
const router = express.Router();
const parkingController = require("../controllers/parking-controller");

// Get a list of parking lots with their current capacity
router.get("/", parkingController.getParkingLots);

// Get detailed information about a specific parking lot
router.get("/:id", parkingController.getParkingLotById);

// Get heatmap data from all parking lots
// router.get("/heatmap", parkingController.getParkingLotHeatmap);

module.exports = router;