var express = require('express');
var router = express.Router();
const { handlePartnerContactForm } = require('../controllers/partnerContactController');
const { handleCustomerContactForm } = require('../controllers/customerContactController');

router.post('/send_partner_email', handlePartnerContactForm);

router.post('/send_customer_email', handleCustomerContactForm);

module.exports = router;