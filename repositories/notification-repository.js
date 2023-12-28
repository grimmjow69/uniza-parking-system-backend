class NotificationRepository {
  constructor(db) {
    this.db = db;
  }

  async addNotification(spotId, userId) {
    const query = `
            INSERT INTO public."notification" (spot_id, user_id)
            VALUES ($1, $2)
            RETURNING notification_id;
        `;
    const values = [spotId, userId];

    try {
      const { rows } = await this.db.query(query, values);
      if (rows.length > 0) {
        const { notification_id } = rows[0];
        return new Notification(notification_id, spotId, userId);
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Unable to add notification: ${error.message}`);
    }
  }

  async deleteNotification(notificationId) {
    const query = `
            DELETE FROM public."notification"
            WHERE notification_id = $1;
        `;
    const values = [notificationId];

    try {
      await this.db.query(query, values);
      return true;
    } catch (error) {
      throw new Error(`Unable to delete notification: ${error.message}`);
    }
  }

  async getNotificationById(notificationId) {
    const query = `
      SELECT notification_id, spot_id, user_id
      FROM public."notification"
      WHERE notification_id = $1;
    `;
    const values = [notificationId];

    try {
      const { rows } = await this.db.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error(`Unable to retrieve notification: ${error.message}`);
    }
  }

  async getNotificationsByUserId(userId) {
    const query = `
      SELECT notification_id, spot_id, user_id
      FROM public."notification"
      WHERE user_id = $1;
    `;
    const values = [userId];

    try {
      const { rows } = await this.db.query(query, values);
      return rows;
    } catch (error) {
      throw new Error(`Unable to retrieve notifications: ${error.message}`);
    }
  }
}

export default NotificationRepository;
