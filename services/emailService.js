const tranporter = require('../config/emailConfig');
const { buildPartnerTemplate } = require('../services/templates/partnerTemplate');
const { buildCustomerTemplate } = require('../services/templates/customerTemplate');

// Sending the partner form to your own mailbox
async function sendPartnerContactEmail(data) {
  const mailOptions = {
    from: `"${data.lastName}" <${data.email}>`,
    to: process.env.MAIL,
    subject: `PARTNER FORM - New contact message by ${data.lastName}`,
    text: `
    LastName: ${data.lastName}
    FirstName: ${data.firstName}
    Company: ${data.company || "N/A"}
    Phone: ${data.phone || "N/A"}

    ${data.message}
    `
  };
  
  return tranporter.sendMail(mailOptions);
};

// Sending the customer form to your own mailbox
async function sendCustomerContactEmail(data) {
  const mailOptions = {
    from: `"${data.lastName}" <${data.email}>`,
    to: process.env.MAIL,
    subject: `CUSTOMER FORM - New contact message by ${data.lastName} : ${data.requestType}`,
    text: `
      LastName: ${data.lastName}
      FirstName: ${data.firstName}
      Company: ${data.company || "N/A"}
      Phone: ${data.phone || "N/A"}

      Requet type: ${data.requestType}
      Type of work: ${data.typeWork}
      Start date: ${data.startDate}
      localisation: ${data.address}

      ${data.message}
    `
  };
  
  return tranporter.sendMail(mailOptions);
}

// Acknowledgment of receipt to the customer
async function sendAcknowledgmentEmail(data) {
  const html = data.requestType == null ? buildPartnerTemplate(data) : buildCustomerTemplate(data);

  const mailOptions = {
    from: `"${process.env.COMPANY}" <${process.env.MAIL}>`,
    to: data.email,
    subject: `Accusé de réception automatique`,
    html: html
  }

   return tranporter.sendMail(mailOptions);
}

module.exports = { sendPartnerContactEmail, sendCustomerContactEmail, sendAcknowledgmentEmail };