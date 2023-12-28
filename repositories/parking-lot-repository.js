class ParkingLotRepository {
  constructor(db) {
    this.db = db;
  }

  async getParkingLotById(spotId) {
    const query = `
        SELECT spot_id, spot_name, occupied, updated_at, occupied_since
        FROM public."parking_lot"
        WHERE spot_id = $1;
      `;
    const values = [spotId];

    try {
      const { rows } = await this.db.query(query, values);
      if (rows.length > 0) {
        const row = rows[0];
        return new ParkingLot({
          spotId: row.spot_id,
          spotName: row.spot_name,
          occupied: row.occupied,
          updatedAt: row.updated_at,
          occupiedSince: row.occupied_since,
        });
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Unable to retrieve parking lot: ${error.message}`);
    }
  }

  async getAllLatestParkingLots() {
    const query = `
      WITH LatestUpdates AS (
        SELECT spot_id, 
               MAX(updated_at) AS max_updated_at
        FROM public."parking_lot"
        GROUP BY spot_id
      )
      SELECT p.spot_id, 
             p.spot_name, 
             p.occupied, 
             p.updated_at, 
             p.occupied_since
      FROM public."parking_lot" p
      INNER JOIN LatestUpdates lu ON p.spot_id = lu.spot_id AND p.updated_at = lu.max_updated_at;
    `;

    try {
      const { rows } = await this.db.query(query);
      return rows.map(
        (row) =>
          new ParkingLot({
            spotId: row.spot_id,
            spotName: row.spot_name,
            occupied: row.occupied,
            updatedAt: row.updated_at,
            occupiedSince: row.occupied_since,
          })
      );
    } catch (error) {
      throw new Error(
        `Unable to retrieve latest parking lot states: ${error.message}`
      );
    }
  }

  async addParkingLot(parkingLot) {
    const query = `
      INSERT INTO public."parking_lot" (spot_id, spot_name, occupied, occupied_since)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [
      parkingLot.spotId,
      parkingLot.spotName,
      parkingLot.occupied,
      parkingLot.occupiedSince,
    ];

    try {
      const { rows } = await this.db.query(query, values);
      if (rows.length > 0) {
        return rows[0];
      } else {
        throw new Error("Insert of parking lot failed, no rows affected.");
      }
    } catch (error) {
      throw new Error(`Unable to add new parking lot: ${error.message}`);
    }
  }

  async deleteParkingLot(spotId) {
    const query = `
        DELETE FROM public."parking_lot"
        WHERE spot_id = $1;
      `;
    const values = [spotId];

    try {
      const result = await this.db.query(query, values);
      return result.rowCount > 0;
    } catch (error) {
      throw new Error(`Unable to delete parking lot: ${error.message}`);
    }
  }

  async deleteOldParkingLots() {
    const query = `
        DELETE FROM public."parking_lot"
        WHERE updated_at < NOW() - INTERVAL '1 weeks';
      `;

    try {
      const result = await this.db.query(query);
      return result.rowCount;
    } catch (error) {
      throw new Error(`Unable to delete old parking lots: ${error.message}`);
    }
  }
}

module.exports = ParkingLotRepository;
