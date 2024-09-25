import Notification from '../models/notification.model.js';
import webpush from 'web-push';

class NotificationService {
  async sendNotification(subscription, payload) {
    try {
      await webpush.sendNotification(subscription, JSON.stringify(payload));
      return { success: true };
    } catch (error) {
      console.error('Error sending notification:', error);
      return { success: false, error };
    }
  }

  async saveNotification(data) {
    try {
      const notification = new Notification(data);
      await notification.save();
      return notification;
    } catch (error) {
      console.error('Error saving notification:', error);
      throw error;
    }
  }
}

export default new NotificationService();
