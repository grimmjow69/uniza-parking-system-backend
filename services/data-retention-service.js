class DataRetentionService {
  constructor(parkingLotRepository) {
    this.parkingLotRepository = parkingLotRepository;
  }

  async cleanUpOldParkingLots() {
    try {
      const deletedRows = await this.parkingLotRepository.deleteOldParkingLots();
      console.log(`Data retention policy: Deleted ${deletedRows} old parking lot records.`);
    } catch (error) {
      console.error(`Data retention service error: ${error.message}`);
      throw error;
    }
  }
}

export default DataRetentionService;