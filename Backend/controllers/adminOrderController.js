import { Order } from "../models/orderModel.js";

// 🔹 GET ALL ORDERS (Admin-wise)
export const getAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find({ admin: req.id })
      .populate("user", "firstName lastName email")
      .populate("items.product", "productName")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 GET SINGLE ORDER
export const getAdminOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      admin: req.id,
    })
      .populate("user", "firstName lastName email")
      .populate("items.product", "productName");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 UPDATE ORDER STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, admin: req.id },
      { paymentStatus: status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
