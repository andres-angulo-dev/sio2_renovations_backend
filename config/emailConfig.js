const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true, // Use of SSL
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  logger: false, // Enable detailed logs
  debug: false,
  tls: {
    rejectUnauthorized: false, // Ignore invalid or self-signed certificates
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("Error during SMTP verification :", error);
  } else {
    console.log("✅ The SMTP server is ready to send messages" , success);
  }
});
    
module.exports = transporter;