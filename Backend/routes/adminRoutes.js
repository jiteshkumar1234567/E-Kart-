// import express from "express"
// import { isAuthenticated, isAdmin } from "../middleware/isAuthenticated.js"
// import {
//   getAdminStats,
//   getAllOrders,
//   allUser,
//   getAllProducts
// } from "../controllers/adminController.js"

// const router = express.Router()

// router.get("/stats", isAuthenticated, isAdmin, getAdminStats)
// router.get("/orders", isAuthenticated, isAdmin, getAllOrders)
// router.get("/users", isAuthenticated, isAdmin, allUser)
// router.get("/products", isAuthenticated, isAdmin, getAllProducts)

// export default router






















// import express from "express"
// import { isAuthenticated, isAdmin } from "../middleware/isAuthenticated.js"
// import {
//   getAdminStats,
//   getAllOrders,
//   allUser,
//   getAllProducts,
//   addProduct
// } from "../controllers/adminController.js"
// import { multipleUpload } from "../middleware/multer.js"

// const router = express.Router()

// router.get("/stats", isAuthenticated, isAdmin, getAdminStats)
// router.get("/orders", isAuthenticated, isAdmin, getAllOrders)
// router.get("/users", isAuthenticated, isAdmin, allUser)
// router.get("/products", isAuthenticated, isAdmin, getAllProducts)

// // ✅ ADD PRODUCT ROUTE
// router.post(
//   "/add-product",
//   isAuthenticated,
//   isAdmin,
//   multipleUpload,
//   addProduct
// )

// export default router












// import express from "express"
// import { isAuthenticated, isAdmin } from "../middleware/isAuthenticated.js"
// import {
//   addProduct,
//   getAdminProducts,
//   deleteProduct,
//   updateProduct,
//   getAdminStats,
//   getAllProducts,
// } from "../controllers/adminController.js"
// import { multipleUpload } from "../middleware/multer.js"

// const router = express.Router()

// // ✅ ADD PRODUCT (MULTIPLE IMAGES)
// router.post(
//   "/add-product",
//   isAuthenticated,
//   isAdmin,
//   multipleUpload,
//   addProduct
// )

// // ✅ GET LOGGED-IN ADMIN PRODUCTS ONLY
// router.get(
//   "/my-products",
//   isAuthenticated,
//   isAdmin,
//   getAdminProducts
// )

// // ✅ DELETE PRODUCT
// router.delete(
//   "/delete-product/:id",
//   isAuthenticated,
//   isAdmin,
//   deleteProduct
// )

// // ✅ UPDATE PRODUCT (OPTIONAL NEW IMAGES)
// router.put(
//   "/update-product/:id",
//   isAuthenticated,
//   isAdmin,
//   multipleUpload,
//   updateProduct
// )


// router.get("/stats", isAuthenticated, isAdmin, getAdminStats)
// router.get("/products", isAuthenticated, isAdmin, getAllProducts)

// export default router






















// import express from "express"
// import { isAuthenticated, isAdmin } from "../middleware/isAuthenticated.js"
// import {
//   addProduct,
//   getAdminProducts,
//   deleteProduct,
//   updateProduct,
//   getAdminStats,
//   getAllProducts,
// } from "../controllers/adminController.js"
// import { multipleUpload } from "../middleware/multer.js"

// const router = express.Router()

// router.post("/add-product", isAuthenticated, isAdmin, multipleUpload, addProduct)

// router.get("/my-products", isAuthenticated, isAdmin, getAdminProducts)

// router.get("/products", isAuthenticated, isAdmin, getAllProducts)

// router.delete("/delete-product/:id", isAuthenticated, isAdmin, deleteProduct)

// router.put("/update-product/:id", isAuthenticated, isAdmin, multipleUpload, updateProduct)

// router.get("/stats", isAuthenticated, isAdmin, getAdminStats)

// export default router

































// import express from "express"
// import { isAuthenticated, isAdmin } from "../middleware/isAuthenticated.js"
// import {
//   addProduct,
//   getAdminProducts,
 
//   deleteProduct,
//   updateProduct,
//   getAdminStats,
//   getSingleProduct,
//   getAllUsers,
// } from "../controllers/adminController.js"
// import { multipleUpload } from "../middleware/multer.js"

// const router = express.Router()

// router.post("/add-product", isAuthenticated, isAdmin, multipleUpload, addProduct)
// router.get("/my-products", isAuthenticated, isAdmin, getAdminProducts)
// // router.get("/products", isAuthenticated, isAdmin, getAllProducts)
// router.delete("/delete-product/:id", isAuthenticated, isAdmin, deleteProduct)
// router.put("/update-product/:id", isAuthenticated, isAdmin, multipleUpload, updateProduct)
// router.get("/stats", isAuthenticated, isAdmin, getAdminStats)
// router.get("/product/:id", isAuthenticated, isAdmin, getSingleProduct)
// // GET all users (admins only)
// router.get("/users", isAuthenticated, isAdmin, getAllUsers);


// export default router



























import express from "express"
import { isAuthenticated, isAdmin } from "../middleware/isAuthenticated.js"
import {
  addProduct,
  getAdminProducts,
  deleteProduct,
  updateProduct,
  getAdminStats,
  getAllUsers,
} from "../controllers/adminController.js"
import { multipleUpload } from "../middleware/multer.js"

const router = express.Router()

router.post("/add-product", isAuthenticated, isAdmin, multipleUpload, addProduct)
router.get("/my-products", isAuthenticated, isAdmin, getAdminProducts)
router.delete("/delete-product/:id", isAuthenticated, isAdmin, deleteProduct)
router.put("/update-product/:id", isAuthenticated, isAdmin, multipleUpload, updateProduct)
router.get("/stats", isAuthenticated, isAdmin, getAdminStats)
router.get("/users", isAuthenticated, isAdmin, getAllUsers)

export default router
