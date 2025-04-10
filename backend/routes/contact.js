const express = require('express');
const router = express.Router();

// Import controller xử lý lưu vào MongoDB
const { sendContactMessage } = require('../controllers/contactcontroller');

// POST /api/contact
router.post('/', sendContactMessage);

module.exports = router;
