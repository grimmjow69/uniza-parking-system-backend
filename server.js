const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const cron = require("node-cron");
const dataRetentionService = require("./services/data-retention-service");

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
