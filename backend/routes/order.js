const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/ordercontroller');


router.post('/', createOrder);

module.exports = router;
