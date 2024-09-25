import express from 'express';
import { sendPushNotification, saveNotification } from '../controllers/notification.controller.js';

const router = express.Router();

// Route to send push notifications
router.post('/send', sendPushNotification);

// Route to save notifications to the database
router.post('/save', saveNotification);

export default router;
