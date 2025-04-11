const express = require('express');
const router = express.Router();


const { sendContactMessage } = require('../controllers/contactcontroller');


router.post('/', sendContactMessage);

module.exports = router;
