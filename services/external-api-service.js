import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const { EXTERNAL_API_URL, EXTERNAL_API_KEY } = process.env;

class ExternalApiService {
  constructor(parkingLotRepository) {
    this.parkingLotRepository = parkingLotRepository;
    this.apiClient = axios.create({
      baseURL: EXTERNAL_API_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${EXTERNAL_API_KEY}`,
      },
    });
  }

  async fetchAndUpdateParkingLotData() {
    try {
      const response = await this.apiClient.get("/parking-lots");
      const parkingLotData = response.data;

      return parkingLotData;
    } catch (error) {
      console.error(
        `Failed to fetch and update parking lot data - ${error.message}`
      );
      throw error;
    }
  }

  async updateParkingLotsWithNewData(newParkingLotData) {
    const currentParkingLotData =
      await this.parkingLotRepository.getAllLatestParkingLots();

    const currentParkingLotMap = new Map(
      currentParkingLotData.map((lot) => [lot.spot_name, lot])
    );

    for (const newLot of newParkingLotData) {
      const currentLot = currentParkingLotMap.get(newLot.spot_name);
      newLot.occupied_since = null;

      if (currentLot) {
        // If the spot was previously occupied and is still occupied, carry over the previous occupied_since
        if (currentLot.occupied && newLot.occupied) {
          newLot.occupied_since = currentLot.occupied_since;
        }
        // If the spot was not occupied before, but is now occupied, set occupied_since to now
        else if (!currentLot.occupied && newLot.occupied) {
          newLot.occupied_since = new Date();
        }
      } else {
        // If the spot did not exist before and is now occupied, set occupied_since to now
        if (newLot.occupied) {
          newLot.occupied_since = new Date();
        }
      }

      // Insert the new parking lot record into the database
      await this.parkingLotRepository.createParkingLot(newLot);
    }
  }
}

export default ExternalApiService;
