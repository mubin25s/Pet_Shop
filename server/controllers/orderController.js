const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const { products, totalAmount, shippingAddress } = req.body;
    // req.userId comes from auth middleware
    const newOrder = new Order({
      user: req.userId,
      products,
      totalAmount,
      shippingAddress
    });
    
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    // Admin sees all, User sees own
    if (req.userRole === 'admin') {
      const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
      return res.status(200).json(orders);
    } else {
      const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });
      return res.status(200).json(orders);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getOrders };
