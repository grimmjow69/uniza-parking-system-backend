const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

app.use(express.json());

// connection to postgre server
const db = require("./db-connection");

// services
const ParkingLotRepository = require("./repositories/parking-lot-repository")
const DataRetentionService = require("./services/data-retention-service");
const parkingLotRepository = new ParkingLotRepository(db);
const dataRetentionService = new DataRetentionService(parkingLotRepository);

const cron = require("node-cron");

const authRoutes = require("./routes/auth-routes");
const notificationRoutes = require("./routes/notification-routes");
const parkingRoutes = require("./routes/parking-routes");
const userRoutes = require("./routes/user-routes");

app.use("/auth", authRoutes);
app.use("/notification", notificationRoutes);
app.use("/parking-lot", parkingRoutes);
app.use("/user", userRoutes);

cron.schedule(
  "0 0 * * 1",
  async () => {
    await dataRetentionService.cleanUpOldParkingLots();
  },
  {
    scheduled: true,
    timezone: process.env.TZ,
  }
);

app.listen(process.env.PORT, function () {
  console.log(`Server running on port ${process.env.PORT}`);
});
