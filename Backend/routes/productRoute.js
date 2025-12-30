// import express from "express"
// import { addProduct, deleteProduct, getAllProduct, updateProduct, getProductById  } from "../controllers/productController.js"
// import { isAuthenticated, isAdmin } from "../middleware/isAuthenticated.js"
// import { multipleUpload } from "../middleware/multer.js"

// const router = express.Router()

// router.post(
//   "/add",
//   isAuthenticated,
//   isAdmin,
//   multipleUpload,
//   addProduct
// )

// router.get("/getallproducts", getAllProduct)
// router.delete("/delete/:productsId", isAuthenticated, isAdmin, deleteProduct)
// router.put("/update/:productsId", isAuthenticated, isAdmin, multipleUpload, updateProduct)
// // Get single product by ID

// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id).populate("createdBy", "firstName lastName email");
//     if (!product) return res.status(404).json({ success: false, message: "Product not found" });
//     res.json({ success: true, product });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// router.get("/:id", getProductById); // ✅ ADD THIS LINE




// export default router

































import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
  getProductById
} from "../controllers/productController.js";
import { isAuthenticated, isAdmin } from "../middleware/isAuthenticated.js";
import { multipleUpload } from "../middleware/multer.js";

const router = express.Router();

// ADD PRODUCT
router.post(
  "/add",
  isAuthenticated,
  isAdmin,
  multipleUpload,
  addProduct
);

// GET ALL PRODUCTS
router.get("/getallproducts", getAllProduct);

// GET SINGLE PRODUCT ✅
router.get("/:id", getProductById);

// DELETE PRODUCT
router.delete("/delete/:productsId", isAuthenticated, isAdmin, deleteProduct);

// UPDATE PRODUCT
router.put(
  "/update/:productsId",
  isAuthenticated,
  isAdmin,
  multipleUpload,
  updateProduct
);

export default router;
