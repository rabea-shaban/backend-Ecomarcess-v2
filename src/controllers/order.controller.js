const Order = require("../models/order.model");

// POST /orders — إنشاء أوردر جديد
const createOrder = async (req, res) => {
  try {
    const { items, billing, paymentMethod, total } = req.body;

    if (!items?.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      billing,
      paymentMethod,
      total,
    });

    return res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    return res.status(500).json({ message: "Failed to place order", error: error.message });
  }
};

// GET /orders — جلب أوردرات الـ user
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get orders", error: error.message });
  }
};

// PATCH /orders/:id/cancel — إلغاء أوردر
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id });

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status !== "pending")
      return res.status(400).json({ message: "Only pending orders can be cancelled" });

    order.status = "cancelled";
    await order.save();

    return res.status(200).json({ message: "Order cancelled successfully", order });
  } catch (error) {
    return res.status(500).json({ message: "Failed to cancel order", error: error.message });
  }
};

module.exports = { createOrder, getMyOrders, cancelOrder };
