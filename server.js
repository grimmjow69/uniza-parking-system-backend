const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

// connection to postgre server
const db = require("./db-connection");

// services
const UserRepository = require("./repositories/user-repository");
const NotificationRepository = require("./repositories/notification-repository");
const ParkingLotRepository = require("./repositories/parking-lot-repository");

const userRepository = new UserRepository(db);
const notificationRepository = new NotificationRepository(db);
const parkingLotRepository = new ParkingLotRepository(db);

// services
const DataRetentionService = require("./services/data-retention-service");
const NotificationService = require("./services/notification-service");
const ExternalApiService = require("./services/external-api-service");
const ParkingLotService = require("./services/parking-lot-sevice");
const UserService = require("./services/user-service");

const dataRetentionService = new DataRetentionService(parkingLotRepository);
const notificationService = new NotificationService(notificationRepository);
const externalApiService = new ExternalApiService(parkingLotRepository);
const parkingLotService = new ParkingLotService(parkingLotRepository);
const userService = new UserService(userRepository);

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
