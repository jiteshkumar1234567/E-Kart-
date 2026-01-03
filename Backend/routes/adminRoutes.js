
// import express from "express"
// import { isAuthenticated, isAdmin } from "../middleware/isAuthenticated.js"
// import {
//   addProduct,
//   getAdminProducts,
//   deleteProduct,
//   updateProduct,
//   getAdminStats,
//   getAllUsers,
// } from "../controllers/adminController.js"
// import { multipleUpload } from "../middleware/multer.js"

// const router = express.Router()

// router.post("/add-product", isAuthenticated, isAdmin, multipleUpload, addProduct)
// router.get("/my-products", isAuthenticated, isAdmin, getAdminProducts)
// router.delete("/delete-product/:id", isAuthenticated, isAdmin, deleteProduct)
// router.put("/update-product/:id", isAuthenticated, isAdmin, multipleUpload, updateProduct)
// router.get("/stats", isAuthenticated, isAdmin, getAdminStats)
// router.get("/users", isAuthenticated, isAdmin, getAllUsers)

// export default router


























import express from "express";
import { isAuthenticated, isAdmin } from "../middleware/isAuthenticated.js";
import {
  addProduct,
  getAdminProducts,
  deleteProduct,
  updateProduct,
  getAdminStats,
  getAllUsers,
} from "../controllers/adminController.js";
import { multipleUpload } from "../middleware/multer.js";

const router = express.Router();

// ================= PRODUCTS =================
router.post(
  "/add-product",
  isAuthenticated,
  isAdmin,
  multipleUpload,
  addProduct
);

router.get(
  "/my-products",
  isAuthenticated,
  isAdmin,
  getAdminProducts
);

router.delete(
  "/delete-product/:id",
  isAuthenticated,
  isAdmin,
  deleteProduct
);

router.put(
  "/update-product/:id",
  isAuthenticated,
  isAdmin,
  multipleUpload,
  updateProduct
);

// ================= DASHBOARD =================
router.get(
  "/stats",
  isAuthenticated,
  isAdmin,
  getAdminStats
);

// ================= USERS =================
router.get(
  "/users",
  isAuthenticated,
  isAdmin,
  getAllUsers
);

export default router;
