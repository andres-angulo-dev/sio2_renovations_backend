var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer();
const { handlePartnerContactForm } = require('../controllers/partnerContactController');
const { handleCustomerContactForm } = require('../controllers/customerContactController');

router.post('/send_partner_email', handlePartnerContactForm);

// router.post('/send_customer_email', upload.array('files'), handleCustomerContactForm);

router.post('/send_customer_email', upload.array('files'), (req, res, next) => {
  console.log('--- /contact/send_customer_email ---');
  console.log('Time:', new Date().toISOString());
  console.log('Headers:', req.headers);
  console.log('Body keys:', Object.keys(req.body || {}));
  console.log('Files count:', req.files ? req.files.length : 0);

  return handleCustomerContactForm(req, res, next);
});

module.exports = router;