const tranporter = require('../config/emailConfig');
const moment = require('moment');
require('moment/locale/fr');

moment.locale('fr');
const formattedDate = moment().format('D MMMM YYYY [à] HH:mm');

// Sending to your own mailbox
async function sendContactEmail({lastName, firstName, email, company, phone, message}) {
    const mailOptions = {
        from: `"${lastName}" <${email}>`,
        to: process.env.MAIL,
        subject: `PARTNER FORM - New contact message by ${lastName}`,
        text: `
            LastName: ${lastName}
            FirstName: ${firstName}
            Company: ${company || "N/A"}
            Phone: ${phone || "N/A"}

            ${message}
        `
    };

    return tranporter.sendMail(mailOptions);
};

// Acknowledgment of receipt to the customer
async function sendAcknowledgmentEmail({lastName, firstName, email, company, phone, message}) {
    const mailOptions = {
        from: `"${process.env.COMPANY}" <${process.env.MAIL}>`,
        to: email,
        subject: `Accusé de réception automatique`,
        html: `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; table-layout:fixed;">
          <tbody>
            <!-- line 1 -->
            <tr>
              <td width="20%" style="background-color:#f39220; height:60px;"></td> <!-- box n°1 -->
              
              <td width="60%" style="background-color:#f39220; height:60px;">
                <img src="https://raw.githubusercontent.com/andres-angulo-dev/sio2_renovations_backend/refs/heads/main/public/images/white_logo.png" alt="Logo" style="width:150px; vertical-align:middle; padding-top: 10px" />
              </td> <!-- box n°2 -->

              <td width="20%" style="background-color:#f39220; height:60px;"></td> <!-- box n°3 -->
            </tr>

            <!-- line 2 -->
            <tr>
              <td width="20%" style="background-color:#f39220; height:60px;"></td> <!-- box n°4 -->

              <td width="60%" style="background-color:#ffffff; height:60px; border-top:1px solid #cccccc; border-left:1px solid #cccccc; border-right:1px solid #cccccc; text-align:left; padding:20px; font-family:Arial, sans-serif; font-size:24px;">
                <p style="margin:20px 0 15px 0;">Bonjour ${firstName} ${lastName},</p>
              </td> <!-- box n°5 -->
              
              <td width="20%" style="background-color:#f39220; height:60px;"></td> <!-- box n°6 -->
            </tr>

            <!-- line 3 -->
            <tr>
              <td width="20%" style="background-color:#ffffff; height:200px;"></td> <!-- box n°7 -->
              
              <td width="60%" style="background-color:#ffffff; height:200px; border-bottom:1px solid #cccccc; border-left:1px solid #cccccc; border-right:1px solid #cccccc; padding: 0 20px 20px 20px; font-family:Arial, sans-serif; font-size:15px; color:#4a4a4a;">
                <p style="margin:0 0 15px 0;">Nous avons bien reçu votre message en date du ${formattedDate}.</p>
                <p style="margin:0 0 15px 0;">Nous vous remercions de votre intérêt et pour votre prise de contact.</p>
                <p style="margin:0 0 15px 0;">Nous reviendrons vers vous dans les plus brefs délais.</p>
                <p style="margin:0 0 20px 0;">Bien cordialement.<br>L’équipe ${process.env.COMPANY}</p>
                <p style="margin:0 0 15px 0; font-size:11px; font-style: italic">Message reçu : <br>"${message}"</p>
                <div style="width: 100%; height: 2px; background-color: rgba(0, 0, 0, 0.4)"></div>
                <p style="margin-top:20px; font-size:13px; color:#888;"><i>${process.env.COMPANY} ⓒ Tous droits réservés</i></p>
              </td> <!-- box n°8 -->

              <td width="20%" style="background-color:#ffffff; height:200px;"></td> <!-- box n°9 -->
            </tr>
          </tbody>
        </table>
        `
    }

    return tranporter.sendMail(mailOptions);
}

module.exports = { sendContactEmail, sendAcknowledgmentEmail };