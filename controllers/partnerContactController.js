const { sendPartnerContactEmail, sendAcknowledgmentEmail } = require('../services/emailService');
const { checkBody } = require('../modules/checkBody');

exports.handlePartnerContactForm = async (req, res) => {
    if (!checkBody(req.body, ['lastName', 'email', 'message',])) {
        res.json({ result: false, error: 'Missing or empty fields'});
        return;
    }

    const { lastName, firstName, email, company, phone, message } = req.body;

    const patternMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailCheck = patternMail.test(email);

    if (emailCheck) {
        try {
            await sendPartnerContactEmail({ lastName, firstName, email, company, phone, message });

            try {
                await sendAcknowledgmentEmail({ firstName, lastName, email, message });
            } catch(error) {
                console.warn('Acknowledgment email was not sent:' , error.measage);
            }

            return res.status(200).json({ result: true, success: 'Email sent successfully'}) //, message: sendPartnerContactEmail.message})
        
        } catch(error) {
            console.error('❌ Error details: ', error); // Log full error
            return res.status(500).json({ result: false, error: 'Failed to send email', details: error.message});
        }   
    } else {
        res.json({ result: false, error: 'Email is not valid' });
    }
}