const nodemailer = require('nodemailer');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const getEmailConfig = require('../configs/mail.config');

let transporter;

const initializeTransporter = () => {
  const config = getEmailConfig();

  if (config.service === 'SES') {
    // Initialize AWS SES client
    const sesClient = new SESClient({
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey
      }
    });

    // Create a Nodemailer transport for AWS SES
    transporter = nodemailer.createTransport({
      SES: { ses: sesClient, aws: require('@aws-sdk/client-ses') }
    });
  } else {
    transporter = nodemailer.createTransport(config);
  }
};
 
// Ensure transporter is initialized
initializeTransporter();

const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM, // Sender address
    to,
    subject,
    text,
    html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendEmail };
