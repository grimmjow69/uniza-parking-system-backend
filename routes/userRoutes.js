const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Get user's profile information
router.get("/profile", userController.getCurrentUserProfile);

// Update current user's profile information (name, picture, etc.)
router.put("/update-profile", userController.updateCurrentUserProfile);

// Set a favorite parking spot for the user
router.post("/favorites", userController.setFavoriteParkingSpot);

module.exports = router;