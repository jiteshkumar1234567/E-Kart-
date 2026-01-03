
import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAdminOrders,
  markDelivered,
} from "../controllers/orderController.js";

import { isAuthenticated, isAdmin } from "../middleware/isAuthenticated.js";

const router = express.Router();

/* USER */
router.post("/create", isAuthenticated, createOrder);
router.get("/my-orders", isAuthenticated, getMyOrders);
router.get("/:id", isAuthenticated, getOrderById);

/* ADMIN */
router.get("/admin/all", isAuthenticated, isAdmin, getAdminOrders);
router.put("/admin/deliver/:orderId", isAuthenticated, isAdmin, markDelivered);

export default router;
