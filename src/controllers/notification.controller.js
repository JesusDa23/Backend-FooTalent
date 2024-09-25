import nodemailer from 'nodemailer';
import { NODEMAILER_PASS, EMAIL_NOTIFICATION } from '../config/env.config.js';
import NotificationService from '../services/notification.service.js';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  service: 'gmail',
  auth: {
    user: EMAIL_NOTIFICATION,
    pass: NODEMAILER_PASS,
  },
});

export const sendEmail = async (email, subject, message) => {
  console.log('INFO:', email, subject, message);
  const mailOptions = {
    from: `Footalent <${EMAIL_NOTIFICATION}>`,
    to: email,
    subject,
    html: `
      <h1>${subject}</h1>
      <p>${message}</p>
    `,
  };
  const infoNotification = await transporter.sendMail(mailOptions);
  return infoNotification;
};

export const sendPushNotification = async (req, res) => {
  const { subscription, payload } = req.body;

  try {
    const result = await NotificationService.sendNotification(subscription, payload);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: 'Failed to send notification' });
  }
};

export const saveNotification = async (req, res) => {
  const notificationData = req.body;

  try {
    const notification = await NotificationService.saveNotification(notificationData);
    res.status(201).json(notification);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: 'Failed to save notification' });
  }
};
