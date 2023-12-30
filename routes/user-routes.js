const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller.js");

// Get user's profile information
router.get("/profile/:id", userController.getUserProfileById);

// Update current user's profile information (name, picture, etc.)
router.put("/update-profile", userController.updateUserProfile);

// Set a favorite parking spot for the user
router.post("/favorites", userController.setFavoriteParkingSpot);

// Unregister user (delete)
router.delete("/unregister", userController.deleteUser);

module.exports = router;