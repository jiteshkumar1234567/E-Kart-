import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { createOrder, getMyOrders, getOrderById } from "../controllers/orderController.js";




const router = express.Router();

router.post("/create", isAuthenticated, createOrder);
router.get("/my-orders", isAuthenticated, getMyOrders);
router.get("/:id", isAuthenticated, getOrderById);

export default router;

