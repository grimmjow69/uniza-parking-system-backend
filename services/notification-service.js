class NotificationService {
  constructor(notificationRepository) {
    this.notificationRepository = notificationRepository;
  }

  async addNotification(spotId, userId) {
    try {
      return await this.notificationRepository.addNotification(spotId, userId);
    } catch (error) {
      console.error(`Failed to add notification - ${error.message}`);
      throw error;
    }
  }

  async deleteNotification(notificationId) {
    try {
      return await this.notificationRepository.deleteNotificationById(notificationId);
    } catch (error) {
      console.error(`Failed to delete notification - ${error.message}`);
      throw error;
    }
  }

  async deleteAllUserNotifications(userId) {
    try {
      return await this.notificationRepository.deleteNotificationByUserId(userId);
    } catch (error) {
      console.error(`Failed to delete user notifications - ${error.message}`);
      throw error;
    }
  }

  async getNotificationById(notificationId) {
    try {
      return await this.notificationRepository.getNotificationById(notificationId);
    } catch (error) {
      console.error(`Failed to retrieve notification - ${error.message}`);
      throw error;
    }
  }

  async getNotificationsByUserId(userId) {
    try {
      return await this.notificationRepository.getNotificationsByUserId(userId);
    } catch (error) {
      console.error(`Failed to retrieve notifications - ${error.message}`);
      throw error;
    }
  }
}

module.exports = NotificationService;