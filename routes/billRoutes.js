const express = require('express');
const billController = require('../controllers/billController');
const router = express.Router();

// Create a new bill
router.post('/create', billController.createBill);

// Get a bill by ID
router.get('/:id', billController.getBill);

// Update payment status
router.patch('/:id', billController.updatePaymentStatus);

module.exports = router;
