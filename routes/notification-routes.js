const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification-controller");

// Subscribe to notification for specific parking lot changes
router.post("/", notificationController.subscribeToNotifications);

// Get user's notifications
router.get("/:userId", notificationController.getUserNotifications);

// Unsubscribe from a notification for specific parking lot
router.delete("/:id", notificationController.unsubscribeFromNotification);

module.exports = router;
