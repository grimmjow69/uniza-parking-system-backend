const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Register a new user
router.post("/register", authController.registerUser);

// Authenticate a user and return a token
router.post("/login", authController.loginUser);

// Log out the user (invalidate the token)
router.post("/logout", authController.logoutUser);

module.exports = router;
