require('dotenv').config(); // Load environment variables from .env file

const emailConfig = {
  smtp: {
    service: 'SMTP',
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    },
    tls: {
        ciphers: 'SSLv3', // Adjust according to your server's requirements
      }
  },
  ses: {
    service: 'SES',
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  gmail: {
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
    }
  }
};

const getEmailConfig = () => {
  switch (process.env.EMAIL_SERVICE) {
    case 'smtp':
      return emailConfig.smtp;
    case 'ses':
      return emailConfig.ses;
    case 'gmail':
      return emailConfig.gmail;
    default:
      throw new Error('Invalid email service configuration');
  }
};

module.exports = getEmailConfig;
