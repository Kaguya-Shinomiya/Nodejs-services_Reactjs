const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/ordercontroller');

// POST /api/order
router.post('/', createOrder);

module.exports = router;
