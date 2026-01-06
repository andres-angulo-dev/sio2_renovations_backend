var express = require('express');
var router = express.Router();
var multer = require('multer');
const storage = multer.memoryStorage();
var upload = multer({
    storage, 
    limits: {
        fileSize: 4.5 * (1024*1024) // File size limit 4.5MB
    }
});
const { handlePartnerContactForm } = require('../controllers/partnerContactController');
const { handleCustomerContactForm } = require('../controllers/customerContactController');

router.post('/send_partner_email', handlePartnerContactForm);

router.post('/send_customer_email', (req, res, next) => {
    upload.array('files')(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({result: false, error: 'Error: maximum file size exceeded'})
            }
        }
        next(err)
    });
}, handleCustomerContactForm);

module.exports = router;