export const bodyParser = require('body-parser');
export const webPush = require('web-push');

const vapidKeys = {
    publicKey: 'BAeWX7N_MJx-3QNtLbU55xXxlda9AVTjqcLGhbC6eoUU9GZFqVxzjyNusIME9k_2OWp4IXbYMnlJlxzD0r5shlw',
    privateKey: '5neHDMYL7FWFx8tR8uHFp0EiPxxEvloeaEUQrjc08O0',
  };

webPush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

app.post('/sendNotification', (req, res) => {
  const payload = JSON.stringify({ title: 'Notification', body: 'This is a test notification' });

  Promise.all(
    subscriptions.map((sub) => webPush.sendNotification(sub, payload))
  )
    .then(() => res.status(200).json({ message: 'Notifications sent successfully' }))
    .catch((err) => {
      console.error('Error sending notification', err);
      res.status(500).json({ error: 'Error sending notification' });
    });
});