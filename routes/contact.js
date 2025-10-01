var express = require('express');
var router = express.Router();
const { handleProfessionalContactForm } = require('../controllers/professionalContact');

router.post('/send_email', handleProfessionalContactForm);

module.exports = router;