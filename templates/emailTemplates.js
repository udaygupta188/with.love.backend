const { sendEmail } = require('../services/emailService');

const sendRegistrationEmail = async (to, userName, otp) => {
    const subject = 'Welcome to Our Service';
    const text = `Hi ${userName},\n\nThank you for registering with us!`;
    const html = `<p>Hi ${userName},</p><p>Thank you for registering with us!\n Please submit this otp for registeration complete ${otp}</p>`;
  
    await sendEmail(to, subject, text, html);
  };
  
  const sendForgotPasswordEmail = async (to, resetUrl) => {
    const subject = 'Password Reset Request';
    const text = `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`;
    const html = `<p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p><p>Please click on the following link, or paste this into your browser to complete the process:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;
  
    await sendEmail(to, subject, text, html);
  };
  

module.exports = { sendRegistrationEmail, sendForgotPasswordEmail };
