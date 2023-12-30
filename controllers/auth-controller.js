const UserService = require("../services/user-service");
const UserRepository = require("../repositories/user-repository");
const db = require("../db-connection");
const userRepository = new UserRepository(db);
const userService = new UserService(userRepository);
const OperationStatus = require("../enums/operation-status");
const OperationType = require("../enums/operation-type");
const ResultMessage = require("../enums/result-message");
const ExtecptionType = require("../enums/exception-type");

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const userDetail = req.body;
    const userId = await userService.addUser(userDetail);

    res.status(201).json({
      OperationType: OperationType.REGISTRATION,
      OperationStatus: OperationStatus.SUCCESS,
      message: ResultMessage.SUCCESFULL_REGISTRATION,
      // TODO CONTENT
      content: {},
    });
  } catch (error) {
    console.error(`Registration failed - ${error.message}`);
    if (error.message === ExtecptionType.USERNAME_TAKEN) {
      return res.status(409).json({
        OperationType: OperationType.REGISTRATION,
        OperationStatus: OperationStatus.FAILED,
        message: ResultMessage.USERNAME_AREADY_TAKEN,
      });
    } else if (error.message === ExtecptionType.EMAIL_TAKEN) {
      return res.status(409).json({
        OperationType: OperationType.REGISTRATION,
        OperationStatus: OperationStatus.FAILED,
        message: ResultMessage.EMAIL_AREADY_TAKEN,
      });
    }
    res.status(500).json({
      OperationType: OperationType.REGISTRATION,
      OperationStatus: OperationStatus.FAILED,
      message: ResultMessage.REGISTRATION_ERROR,
    });
  }
};

// Authenticate a user and return a token
exports.loginUser = async (req, res) => {
  try {
    const userDetail = req.body;
    const user = await userService.loginUser(userDetail);

    if (user) {
      res.status(200).json({
        OperationType: OperationType.LOGIN,
        OperationStatus: OperationStatus.SUCCESS,
        message: ResultMessage.LOGIN_SUCESSFULL,
        user: user,
      });
    } else {
      res.status(401).json({
        OperationType: OperationType.LOGIN,
        OperationStatus: OperationStatus.FAILED,
        message: ResultMessage.INVALID_CREDENTIALS,
      });
    }
  } catch (error) {
    console.error(`Registration failed - ${error.message}`);
    if (
      error.message === ExtecptionType.USER_NOT_FOUND ||
      error.message === ExtecptionType.INCORRECT_PASSWORD
    ) {
      res.status(401).json({
        OperationType: OperationType.LOGIN,
        OperationStatus: OperationStatus.FAILED,
        message: ResultMessage.INVALID_CREDENTIALS,
      });
    } else {
      res.status(500).json({
        OperationType: OperationType.LOGIN,
        OperationStatus: OperationStatus.FAILED,
        message: ResultMessage.LOGIN_FAILED,
      });
    }
  }
};

// Log out the user (invalidate the token)
exports.logoutUser = (req, res) => {};
