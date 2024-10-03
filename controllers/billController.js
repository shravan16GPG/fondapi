const Bill = require('../models/billModel');
const Order = require('../models/orderModel');

// Create a new bill
exports.createBill = async (req, res) => {
  try {
    const { userId, orderId, totalAmount } = req.body;

    // Validate input
    if (!userId || !orderId || !totalAmount) {
      return res.status(400).json({ message: 'Please provide userId, orderId, and totalAmount' });
    }

    // Check if order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Create a new bill
    const bill = await Bill.create({
      user: userId,
      order: orderId,
      totalAmount,
    });

    res.status(201).json({
      status: 'success',
      data: {
        bill,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Get bill by ID
exports.getBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id).populate('user').populate('order');

    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        bill,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Update payment status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    if (!paymentStatus) {
      return res.status(400).json({ message: 'Payment status is required' });
    }

    const bill = await Bill.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true, runValidators: true }
    );

    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        bill,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
