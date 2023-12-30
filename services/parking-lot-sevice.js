class ParkingLotService {
  constructor(parkingLotRepository) {
    this.parkingLotRepository = parkingLotRepository;
  }

  async getAllLatestParkingSpots() {
    try {
      return await this.parkingLotRepository.getAllLatestParkingLots();
    } catch (error) {
      console.error(`Error fetching latest parking spots: ${error.message}`);
      throw error;
    }
  }

  async getById(spotId) {
    try {
      const parkingSpot = await this.parkingLotRepository.getParkingLotById(
        spotId
      );
      if (!parkingSpot) {
        throw new Error(`Parking spot with ID ${spotId} not found.`);
      }
      return parkingSpot;
    } catch (error) {
      console.error(`Error fetching parking spot by ID: ${error.message}`);
      throw error;
    }
  }

  async addParkingLot(parkingLotData) {
    try {
      const newParkingLot = await this.parkingLotRepository.addParkingLot(parkingLotData);
      return newParkingLot;
    } catch (error) {
      console.error(`Failed to add parking lot - ${error.message}`);
      throw error;
    }
  }

  async deleteParkingLot(spotId) {
    try {
      const result = await this.parkingLotRepository.deleteParkingLot(spotId);
      if (!result) {
        throw new Error("Parking lot not found or already deleted.");
      }
      return result;
    } catch (error) {
      console.error(`Failed to delete parking lot - ${error.message}`);
      throw error;
    }
  }

  async getParkingLotsUsageHistory() {
    try {
      return await this.parkingLotRepository.countOccupiedBySpotName();
    } catch (error) {
      console.error(`Error fetching occupancy count by spot name: ${error.message}`);
      throw error;
    }
  }
}

module.exports = ParkingLotService;
