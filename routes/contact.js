var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer();
const { handlePartnerContactForm } = require('../controllers/partnerContactController');
const { handleCustomerContactForm } = require('../controllers/customerContactController');

router.post('/send_partner_email', handlePartnerContactForm);

router.post('/send_customer_email', upload.array('files'), handleCustomerContactForm);

module.exports = router;