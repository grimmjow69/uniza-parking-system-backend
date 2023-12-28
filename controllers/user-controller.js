const {
  getUserProfile,
  updateUserProfile,
  setFavoriteParkingSpot,
} = require("../services/user-service");

exports.getUserProfileById = (req, res) => {
  try {
    const userId = req.user.id;
    const userProfile = getUserProfile(userId);
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getUserProfileByLogin = (req, res) => {
  try {
    const login = req.user.login;
    const userProfile = getUserProfile(login);
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateUserProfile = (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;
    const updatedProfile = updateUserProfile(userId, updateData);
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.setFavoriteParkingSpot = (req, res) => {
  try {
    const userId = req.user.id;
    const { parkingSpotId } = req.body;

    if (!parkingSpotId) {
      return res.status(400).send("Parking spot ID must be provided.");
    }

    const favoriteSetResult = setFavoriteParkingSpot(userId, parkingSpotId);

    res.status(201).json(favoriteSetResult);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
