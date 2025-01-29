const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-specific-password'
  }
});

exports.sendNewLockNotification = functions.https.onRequest(async (req, res) => {
  const { lockId, title, adminEmail } = req.body;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: adminEmail,
    subject: 'New Lock Submission',
    html: `
      <h2>New Lock Submission Received</h2>
      <p>A new lock has been submitted by: ${title}</p>
      <p>Click here to review: your-admin-url/locks/${lockId}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Notification sent successfully');
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).send('Error sending notification');
  }
});
