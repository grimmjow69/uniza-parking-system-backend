const UserService = require("../services/user-service");
const UserRepository = require("../repositories/user-repository");
const NotificationRepository = require("../repositories/notification-repository");
const NotificationService = require("../services/notification-service");
const User = require("../db-models/user");
const db = require("../db-connection");
const userRepository = new UserRepository(db);
const userService = new UserService(userRepository);
const notificationRepository = new NotificationRepository(db);
const notificationService = new NotificationService(notificationRepository);
const OperationStatus = require("../enums/operation-status");
const OperationType = require("../enums/operation-type");
const ResultMessage = require("../enums/result-message");

exports.getUserProfileById = async (req, res) => {
  try {
    const userId = req.params.id;
    const userProfile = await userService.getUserById(userId);
    if (!userProfile) {
      return res.status(404).json({
        operation: OperationType.GET_USER,
        result: OperationStatus.FAILED,
        message: ResultMessage.USER_NOT_FOUND,
      });
    }
    res.status(200).json({
      operation: OperationType.GET_USER,
      result: OperationStatus.SUCCESS,
      conent: userProfile,
    });
  } catch (error) {
    res.status(500).json({
      operation: OperationType.GET_USER,
      result: OperationStatus.FAILED,
      message: ResultMessage.USER_ERROR,
    });
  }
};

exports.getUserProfileByLogin = async (req, res) => {
  try {
    const userLogin = req.params.login;
    const userProfile = await userService.getUserByLogin(userLogin);
    if (!userProfile) {
      return res.status(404).json({
        operation: OperationType.GET_USER,
        result: OperationStatus.FAILED,
        message: `User with login ${userLogin} not found`,
      });
    }
    res.status(200).json({
      operation: OperationType.GET_USER,
      result: OperationStatus.FAILED,
      conent: userProfile,
    });
  } catch (error) {
    res.status(500).json({
      operation: OperationType.GET_USER,
      result: OperationStatus.FAILED,
      message: ResultMessage.USER_ERROR,
    });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const newUserData = req.body;
    const updatedProfile = await userService.updateUser(newUserData);
    res.status(200).json({
      operation: OperationType.UPDATE_PROFILE,
      result: OperationStatus.SUCCESS,
      message: ResultMessage.PROFILE_UPDATE_SUCCESFULL,
    });
  } catch (error) {
    res.status(500).json({
      operation: OperationType.UPDATE_PROFILE,
      result: OperationStatus.FAILED,
      message: ResultMessage.PROFILE_UPDATE_FAILED,
    });
  }
};

exports.setFavoriteParkingSpot = async (req, res) => {
  try {
    const userId = req.body.userId;
    const parkingLotId = req.body.parkingLotId;

    await userService.setFavoriteParkingSpot(userId, parkingLotId);

    res.status(201).json({
      operation: OperationType.SET_FAVOURITE_PARKING_SPOT,
      result: OperationStatus.SUCCESS,
      message: ResultMessage.FAVOURITE_SPOT_SET_SUCCESSFULL,
    });
  } catch (error) {
    res.status(500).json({
      operation: OperationType.SET_FAVOURITE_PARKING_SPOT,
      result: OperationStatus.FAILED,
      message: ResultMessage.FAVOURITE_SPOT_SET_FAILED,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.body.userId;
  try {
    await notificationService.deleteAllUserNotifications(userId);
    await userService.deleteUser(userId);

    res.status(200).json({
      operation: OperationType.UNREGISTRATION,
      result: OperationStatus.SUCCESS,
      message: ResultMessage.UNREGISTRATION_SUCCESS,
    });
  } catch (error) {
    console.error(
      `Unregistration of user with id ${userId} failed - ${error.message}`
    );
    if (error.message === `User with id ${userId} not found.`) {
      return res.status(404).json({
        operation: OperationType.UNREGISTRATION,
        result: OperationStatus.FAILED,
        message: ResultMessage.USER_NOT_FOUND,
      });
    }

    res.status(500).json({
      operation: OperationType.UNREGISTRATION,
      result: OperationStatus.FAILED,
      message: ResultMessage.UNREGISTRATION_FAILED,
    });
  }
};
