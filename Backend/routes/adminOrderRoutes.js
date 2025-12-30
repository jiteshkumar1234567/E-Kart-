import express from "express";
import {
  getAdminOrders,
  getAdminOrderById,
  updateOrderStatus,
} from "../controllers/adminOrderController.js";
import { isAuthenticated, isAdmin } from "../middleware/isAuthenticated.js";

const router = express.Router();

// 🔹 Admin ke saare orders
router.get("/orders", isAuthenticated, isAdmin, getAdminOrders);

// 🔹 Single order details
router.get("/orders/:id", isAuthenticated, isAdmin, getAdminOrderById);

// 🔹 Update status
router.put("/orders/:id/status", isAuthenticated, isAdmin, updateOrderStatus);

export default router;
