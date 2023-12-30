class ParkingLot {
    constructor(spotId, spotName, occupied, updatedAt, occupiedSince) {
      this.spotId = spotId;
      this.spotName = spotName;
      this.occupied = occupied;
      this.updatedAt = updatedAt;
      this.occupiedSince = occupiedSince;
    }
}
module.exports = ParkingLot;