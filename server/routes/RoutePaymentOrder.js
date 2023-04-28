const express = require('express');
const router = express.Router(); 
const payment = require('../controllers/PaymentController');

//Sign in user
router.post('/create-checkout-session', payment.payOrder) 

module.exports = router