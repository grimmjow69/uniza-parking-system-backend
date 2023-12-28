// Get user's profile information
const db = require('../db-connection');
exports.getCurrentUserProfile = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM public.user");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Upda user's profile information
exports.updateCurrentUserProfile = (req, res) => {};

// Set a favourite parking spot for the user
exports.setFavoriteParkingSpot = (req, res) => {};
