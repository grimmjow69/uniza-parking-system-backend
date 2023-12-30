const ParkingLotRepository = require("../repositories/parking-lot-repository");
const ParkingLotService = require("../services/parking-lot-sevice");
const db = require("../db-connection");
const parkingLotRepository = new ParkingLotRepository(db);
const parkingLotService = new ParkingLotService(parkingLotRepository);
const OperationStatus = require("../enums/operation-status");
const OperationType = require("../enums/operation-type");
const ResultMessage = require("../enums/result-message");

// Get a list of parking lots with their current capacity
exports.getParkingLots = async (req, res) => {
  try {
    const actualParkingLots =
      await parkingLotService.getAllLatestParkingSpots();
    res.status(200).json({
      operation: OperationType.ACTUAL_STATE_OF_PARKING_LOTS,
      result: OperationStatus.SUCCESS,
      content: actualParkingLots,
    });
  } catch (error) {
    res.status(500).json({
      operation: OperationType.ACTUAL_STATE_OF_PARKING_LOTS,
      result: OperationStatus.FAILED,
      message: ResultMessage.GET_PARKING_LOTS_FAILED,
    });
  }
};

// Get detailed information about a specific parking lot
exports.getParkingLotById = async (req, res) => {
  try {
    const parkingLotId = req.params.id;
    const parkingLot = await parkingLotService.getById(parkingLotId);
    if (!parkingLot) {
      return res.status(404).json({
        operation: OperationType.GET_PARKING_LOT,
        result: OperationStatus.FAILED,
        message: ResultMessage.PARKING_LOT_NOT_FOUND,
      });
    }
    res.status(200).json({
      operation: OperationType.GET_PARKING_LOT,
      result: OperationStatus.SUCCESS,
      content: parkingLot,
    });
  } catch (error) {
    res.status(500).json({
      operation: OperationType.GET_USER,
      result: OperationStatus.FAILED,
      message: ResultMessage.GET_PARKING_LOT_FAILED,
    });
  }
};

// Get the usage history of parking lost for heatmap visualization
// exports.getParkingLotHeatmap = (req, res) => {};
