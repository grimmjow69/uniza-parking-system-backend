const NotificationRepository = require("../repositories/notification-repository");
const NotificationService = require("../services/notification-service");
const db = require("../db-connection");
const notificationRepository = new NotificationRepository(db);
const notificationService = new NotificationService(notificationRepository);
const OperationStatus = require("../enums/operation-status");
const OperationType = require("../enums/operation-type");
const ResultMessage = require("../enums/result-message");

// Subscribe to notification for specific parking lot changes
exports.subscribeToNotifications = async (req, res) => {
  try {
    const userId = req.body.userId;
    const parkingLotId = req.body.parkingLotId;
    await notificationService.addNotification(parkingLotId, userId);
    res.status(200).json({
      operation: OperationType.SUBSCRIBE_NOTIFICATION,
      result: OperationStatus.SUCCESS,
      message: ResultMessage.SUBSCRIBE_NOTIFICATINON_SUCCESS,
    });
  } catch (error) {
    res.status(500).json({
      operation: OperationType.SUBSCRIBE_NOTIFICATION,
      result: OperationStatus.FAILED,
      message: ResultMessage.SUBSCRIBE_NOTIFICATINON_FAILED,
    });
  }
};

// Unsubscribe from a specific notification
exports.unsubscribeFromNotification = async (req, res) => {
  try {
    const notificationId = req.params.notificationId;
    notificationService.deleteNotification(notificationId);
    res.status(200).json({
      operation: OperationType.UNSUBSCRIBE_NOTIFICATION,
      result: OperationStatus.SUCCESS,
      message: ResultMessage.UNSUBSCRIBE_NOTIFICATION_SUCCESS,
    });
  } catch (error) {
    res.status(500).json({
      operation: OperationType.UNSUBSCRIBE_NOTIFICATION,
      result: OperationStatus.FAILED,
      message: ResultMessage.UNSUBSCRIBE_NOTIFICATION_FAILED,
    });
  }
};

// Get all user's notifications
exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.params.userId;
    const notifications = await notificationService.getNotificationsByUserId(
      userId
    );
    res.status(200).json({
      operation: OperationType.GET_USER_NOTIFICATIONS,
      result: OperationStatus.SUCCESS,
      content: notifications,
    });
  } catch (error) {
    res.status(500).json({
      operation: OperationType.GET_USER_NOTIFICATIONS,
      result: OperationStatus.FAILED,
      message: ResultMessage.GET_USER_NOTIFICATIONS_FAILED,
    });
  }
};
