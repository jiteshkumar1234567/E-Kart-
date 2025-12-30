// import { User } from "../models/usermodel.js"
// import { Product } from "../models/productModel.js"
// import { Order } from "../models/orderModel.js"

// // Dashboard Stats
// export const getAdminStats = async (req, res) => {
//   try {
//     const totalUsers = await User.countDocuments({ role: "user" })
//     const totalProducts = await Product.countDocuments()

//     const paidOrders = await Order.aggregate([
//       { $match: { paymentStatus: "paid" } },
//       {
//         $group: {
//           _id: null,
//           totalOrders: { $sum: 1 },
//           totalSales: { $sum: "$totalAmount" },
//         },
//       },
//     ])

//     const totalOrders = paidOrders[0]?.totalOrders || 0
//     const totalSales = paidOrders[0]?.totalSales || 0

//     res.status(200).json({
//       success: true,
//       stats: { totalUsers, totalProducts, totalOrders, totalSales },
//     })
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message })
//   }
// }

// // Get all orders
// export const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().populate("userId").sort({ createdAt: -1 })
//     res.status(200).json({ success: true, orders })
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message })
//   }
// }

// // Get all users
// export const allUser = async (req, res) => {
//   try {
//     const users = await User.find({ role: "user" }).sort({ createdAt: -1 })
//     res.status(200).json({ success: true, users })
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message })
//   }
// }

// // Get all products
// export const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 })
//     res.status(200).json({ success: true, products })
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message })
//   }
// }


// export const getAdminProducts = async (req, res) => {
//   try {
//     const products = await Product.find({ createdBy: req.id }).sort({
//       createdAt: -1,
//     });

//     res.status(200).json({
//       success: true,
//       products,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };




// // export const addProduct = async (req, res) => {
// //   try {
// //     const { productName, productPrice, category, brand } = req.body

// //     if (!productName || !productPrice || !category || !brand) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "All fields are required",
// //       })
// //     }

// //     if (!req.files || req.files.length === 0) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Please upload at least one image",
// //       })
// //     }

// //     // TEMP image URLs (later Cloudinary laga sakte ho)
// //     const images = req.files.map((file) => ({
// //       url: `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
// //     }))

// //     const product = await Product.create({
// //       productName,
// //       productPrice,
// //       category,
// //       brand,
// //       productimg: images,
// //     })

// //     res.status(201).json({
// //       success: true,
// //       message: "Product added successfully",
// //       product,
// //     })
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     })
// //   }
// // }



// export const addProduct = async (req, res) => {
//   try {
//     let { productName, productPrice, category, brand } = req.body;

//     if (!productName || !productPrice || !category || !brand) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Please upload at least one image",
//       });
//     }

//     const images = req.files.map((file) => ({
//       url: `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
//     }));

//     const product = await Product.create({
//       productName: productName.trim(),
//       productPrice,
//       category: category.trim().toLowerCase(),
//       brand: brand.trim().toLowerCase(),
//       productimg: images,
//       createdBy: req.id, // 🔥 ADMIN ID
//     });

//     res.status(201).json({
//       success: true,
//       message: "Product added successfully",
//       product,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };



// // export const addProduct = async (req, res) => {
// //   try {
// //     let { productName, productPrice, category, brand } = req.body

// //     if (!productName || !productPrice || !category || !brand) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "All fields are required",
// //       })
// //     }

// //     // ✅ NORMALIZE DATA
// //     category = category.trim().toLowerCase()
// //     brand = brand.trim().toLowerCase()
// //     productName = productName.trim()

// //     if (!req.files || req.files.length === 0) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Please upload at least one image",
// //       })
// //     }

// //     const images = req.files.map((file) => ({
// //       url: `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
// //     }))

// //     const product = await Product.create({
// //       productName,
// //       productPrice,
// //       category,
// //       brand,
// //       productimg: images,
// //     })

// //     res.status(201).json({
// //       success: true,
// //       message: "Product added successfully",
// //       product,
// //     })
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     })
// //   }
// // }





// export const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     // 🔒 only owner admin
//     if (product.createdBy.toString() !== req.id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: "Not allowed",
//       });
//     }

//     await product.deleteOne();

//     res.status(200).json({
//       success: true,
//       message: "Product deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };



// export const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     if (product.createdBy.toString() !== req.id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: "Not allowed",
//       });
//     }

//     const { productName, productPrice, category, brand } = req.body;

//     if (productName) product.productName = productName.trim();
//     if (productPrice) product.productPrice = productPrice;
//     if (category) product.category = category.trim().toLowerCase();
//     if (brand) product.brand = brand.trim().toLowerCase();

//     if (req.files && req.files.length > 0) {
//       product.productimg = req.files.map((file) => ({
//         url: `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
//       }));
//     }

//     await product.save();

//     res.status(200).json({
//       success: true,
//       message: "Product updated successfully",
//       product,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };








































// import { Product } from "../models/productModel.js"

// // ✅ ADD PRODUCT
// export const addProduct = async (req, res) => {
//   try {
//     const { productName, productPrice, category, brand, description } = req.body

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Images required",
//       })
//     }

//     const images = req.files.map((file) => ({
//       url: `/uploads/${file.filename}`,
//     }))

//     const product = await Product.create({
//       productName,
//       productPrice,
//       category,
//       brand,
//       description,
//       productimg: images,
//       createdBy: req.user._id, // ✅ VERY IMPORTANT
//     })

//     res.status(201).json({
//       success: true,
//       product,
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

// // ✅ GET ADMIN PRODUCTS
// export const getAdminProducts = async (req, res) => {
//   try {
//     const products = await Product.find({
//       createdBy: req.user._id, // ✅ FIXED
//     }).sort({ createdAt: -1 })

//     res.status(200).json({
//       success: true,
//       products,
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

// // ✅ DELETE PRODUCT
// export const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id)

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       })
//     }

//     await product.deleteOne()

//     res.status(200).json({
//       success: true,
//       message: "Product deleted",
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

// // ✅ UPDATE PRODUCT
// export const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id)

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       })
//     }

//     const { productName, productPrice, category, brand, description } = req.body

//     if (productName) product.productName = productName
//     if (productPrice) product.productPrice = productPrice
//     if (category) product.category = category
//     if (brand) product.brand = brand
//     if (description) product.description = description

//     if (req.files && req.files.length > 0) {
//       product.productimg = req.files.map((file) => ({
//         url: `/uploads/${file.filename}`,
//       }))
//     }

//     await product.save()

//     res.status(200).json({
//       success: true,
//       product,
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }


// // GET ALL PRODUCTS (for Admin dashboard)
// export const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 })
//     res.status(200).json({ success: true, products })
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message })
//   }
// }

// // GET ADMIN STATS
// export const getAdminStats = async (req, res) => {
//   try {
//     const totalUsers = await User.countDocuments()
//     const totalProducts = await Product.countDocuments()
//     const totalOrders = await Order.countDocuments()
//     const totalSalesAgg = await Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalPrice" } } }])
//     const totalSales = totalSalesAgg[0]?.total || 0

//     res.status(200).json({ success: true, stats: { totalUsers, totalProducts, totalOrders, totalSales } })
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message })
//   }
// }





















// import { Product } from "../models/productModel.js"
// import { User } from "../models/usermodel.js"
// import { Order } from "../models/orderModel.js"

// // ✅ ADD PRODUCT
// export const addProduct = async (req, res) => {
//   try {
//     const { productName, productPrice, category, brand } = req.body

//     if (!req.files || req.files.length === 0)
//       return res.status(400).json({ success: false, message: "Images required" })

//     const images = req.files.map(file => ({
//       url: file.originalname // 🔥 Cloudinary URL yaha ayega
//     }))

//     const product = await Product.create({
//       productName,
//       productPrice,
//       category,
//       brand,
//       productimg: images,
//       createdBy: req.user._id,
//     })

//     res.status(201).json({ success: true, product })
//   } catch (e) {
//     res.status(500).json({ success: false, message: e.message })
//   }
// }

// // ✅ ADMIN OWN PRODUCTS
// export const getAdminProducts = async (req, res) => {
//   const products = await Product.find({ createdBy: req.user._id }).sort({ createdAt: -1 })
//   res.json({ success: true, products })
// }

// // ✅ ALL PRODUCTS (ADMIN TABLE)
// export const getAllProducts = async (req, res) => {
//   const products = await Product.find().sort({ createdAt: -1 })
//   res.json({ success: true, products })
// }

// // ✅ DELETE
// export const deleteProduct = async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id)
//   res.json({ success: true })
// }

// // ✅ UPDATE
// export const updateProduct = async (req, res) => {
//   const product = await Product.findById(req.params.id)

//   if (!product) return res.status(404).json({ success: false })

//   Object.assign(product, req.body)

//   if (req.files?.length)
//     product.productimg = req.files.map(f => ({ url: f.originalname }))

//   await product.save()
//   res.json({ success: true, product })
// }

// // ✅ DASHBOARD STATS
// export const getAdminStats = async (req, res) => {
//   const totalUsers = await User.countDocuments()
//   const totalProducts = await Product.countDocuments()
//   const totalOrders = await Order.countDocuments()
//   const totalSalesAgg = await Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalPrice" } } }])

//   res.json({
//     success: true,
//     stats: {
//       totalUsers,
//       totalProducts,
//       totalOrders,
//       totalSales: totalSalesAgg[0]?.total || 0,
//     },
//   })
// }






































// import { Product } from "../models/productModel.js"
// import { User } from "../models/usermodel.js"
// import { Order } from "../models/orderModel.js"
// import cloudinary from "../utils/Cloudinary.js"

// // ================= ADD PRODUCT =================
// export const addProduct = async (req, res) => {
//   try {
//     const { productName, productPrice, category, brand, description } = req.body

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ success: false, message: "Images required" })
//     }

//     // 🔥 upload to cloudinary
//     const uploadedImages = []

//     for (const file of req.files) {
//       const result = await cloudinary.uploader.upload(
//         `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
//         { folder: "products" }
//       )

//       uploadedImages.push({
//         url: result.secure_url,
//         public_id: result.public_id,
//       })
//     }

//     const product = await Product.create({
//       productName: productName.trim(),
//       productPrice,
//       category: category.trim().toLowerCase(),
//       brand: brand.trim().toLowerCase(),
//       description,
//       productimg: uploadedImages,
//       createdBy: req.user._id,
//     })

//     res.status(201).json({ success: true, product })
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ success: false, message: err.message })
//   }
// }

// // ================= ADMIN PRODUCTS =================
// export const getAdminProducts = async (req, res) => {
//   const products = await Product.find({ createdBy: req.user._id }).sort({ createdAt: -1 })
//   res.json({ success: true, products })
// }

// // ================= DELETE PRODUCT =================
// export const deleteProduct = async (req, res) => {
//   const product = await Product.findById(req.params.id)
//   if (!product) return res.status(404).json({ success: false })

//   // delete images from cloudinary
//   for (const img of product.productimg) {
//     if (img.public_id) {
//       await cloudinary.uploader.destroy(img.public_id)
//     }
//   }

//   await product.deleteOne()
//   res.json({ success: true })
// }

// // ================= UPDATE PRODUCT =================
// export const updateProduct = async (req, res) => {
//   const product = await Product.findById(req.params.id)
//   if (!product) return res.status(404).json({ success: false })

//   Object.assign(product, req.body)

//   if (req.files && req.files.length > 0) {
//     const uploadedImages = []

//     for (const file of req.files) {
//       const result = await cloudinary.uploader.upload(
//         `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
//         { folder: "products" }
//       )

//       uploadedImages.push({
//         url: result.secure_url,
//         public_id: result.public_id,
//       })
//     }

//     product.productimg = uploadedImages
//   }

//   await product.save()
//   res.json({ success: true, product })
// }

// // ================= DASHBOARD STATS =================
// export const getAdminStats = async (req, res) => {
//   const totalUsers = await User.countDocuments()
//   const totalProducts = await Product.countDocuments()
//   const totalOrders = await Order.countDocuments()
//   const salesAgg = await Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalPrice" } } }])

//   res.json({
//     success: true,
//     stats: {
//       totalUsers,
//       totalProducts,
//       totalOrders,
//       totalSales: salesAgg[0]?.total || 0,
//     },
//   })
// }



// // ================= ALL PRODUCTS (PUBLIC) =================
// export const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 })
//     res.json({ success: true, products })
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message })
//   }
// }



















// import { Product } from "../models/productModel.js"
// import { User } from "../models/usermodel.js"
// import { Order } from "../models/orderModel.js"
// // import cloudinary from "../utils/cloudinary.js"

// /* ================= ADD PRODUCT ================= */
// export const addProduct = async (req, res) => {
//   try {
//     const { productName, productPrice, category, brand } = req.body

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Images required",
//       })
//     }

//     const uploadedImages = []

//     for (const file of req.files) {
//       const result = await cloudinary.uploader.upload(
//         `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
//         { folder: "products" }
//       )

//       uploadedImages.push({
//         url: result.secure_url,
//         public_id: result.public_id,
//       })
//     }

//     const product = await Product.create({
//       productName: productName.trim(),
//       productPrice,
//       category: category.trim().toLowerCase(),
//       brand: brand.trim().toLowerCase(),
//       productimg: uploadedImages,
//       createdBy: req.user._id, // ✅ FIXED
//     })

//     res.status(201).json({
//       success: true,
//       product,
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

// /* ================= ADMIN PRODUCTS (ONLY HIS) ================= */
// export const getAdminProducts = async (req, res) => {
//   try {
//     const products = await Product.find({
//       createdBy: req.user._id,
//     }).sort({ createdAt: -1 })

//     res.json({
//       success: true,
//       products,
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

// /* ================= DELETE PRODUCT ================= */
// export const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id)

//     if (!product) {
//       return res.status(404).json({ success: false })
//     }

//     // 🔒 SECURITY: only owner admin can delete
//     if (product.createdBy.toString() !== req.user._id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: "Not allowed",
//       })
//     }

//     for (const img of product.productimg) {
//       if (img.public_id) {
//         await cloudinary.uploader.destroy(img.public_id)
//       }
//     }

//     await product.deleteOne()

//     res.json({ success: true })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

// /* ================= UPDATE PRODUCT ================= */
// export const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id)

//     if (!product) {
//       return res.status(404).json({ success: false })
//     }

//     // 🔒 SECURITY
//     if (product.createdBy.toString() !== req.user._id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: "Not allowed",
//       })
//     }

//     const { productName, productPrice, category, brand } = req.body

//     if (productName) product.productName = productName
//     if (productPrice) product.productPrice = productPrice
//     if (category) product.category = category.toLowerCase()
//     if (brand) product.brand = brand.toLowerCase()

//     if (req.files && req.files.length > 0) {
//       const uploadedImages = []

//       for (const file of req.files) {
//         const result = await cloudinary.uploader.upload(
//           `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
//           { folder: "products" }
//         )

//         uploadedImages.push({
//           url: result.secure_url,
//           public_id: result.public_id,
//         })
//       }

//       product.productimg = uploadedImages
//     }

//     await product.save()

//     res.json({
//       success: true,
//       product,
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

// /* ================= ADMIN DASHBOARD STATS (ADMIN-WISE) ================= */
// export const getAdminStats = async (req, res) => {
//   try {
//     const adminId = req.user._id

//     const totalProducts = await Product.countDocuments({
//       createdBy: adminId,
//     })

//     const totalOrders = await Order.countDocuments({
//       "items.admin": adminId,
//       paymentStatus: "paid",
//     })

//     const salesAgg = await Order.aggregate([
//       { $unwind: "$items" },
//       {
//         $match: {
//           "items.admin": adminId,
//           paymentStatus: "paid",
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           total: {
//             $sum: {
//               $multiply: ["$items.price", "$items.quantity"],
//             },
//           },
//         },
//       },
//     ])

//     const totalSales = salesAgg[0]?.total || 0

//     res.json({
//       success: true,
//       stats: {
//         totalProducts,
//         totalOrders,
//         totalSales,
//       },
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

// /* ================= SINGLE PRODUCT ================= */
// export const getSingleProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id)

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       })
//     }

//     res.json({
//       success: true,
//       product,
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

// /* ================= ALL USERS (ADMIN ONLY) ================= */
// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select(
//       "firstName lastName profilePic role"
//     )

//     res.status(200).json({
//       success: true,
//       users,
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }








































import { Product } from "../models/productModel.js"
import { User } from "../models/usermodel.js"
import { Order } from "../models/orderModel.js"
import cloudinary from "../utils/Cloudinary.js" // 🔥 FIX 1

/* ================= ADD PRODUCT ================= */
export const addProduct = async (req, res) => {
  try {
    const { productName, productPrice, category, brand, description } = req.body

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Images required",
      })
    }

    const uploadedImages = []

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        { folder: "products" }
      )

      uploadedImages.push({
        url: result.secure_url,
        public_id: result.public_id,
      })
    }

    const product = await Product.create({
      productName: productName.trim(),
      productPrice,
      description, // 🔥 FIX 2
      category: category.trim().toLowerCase(),
      brand: brand.trim().toLowerCase(),
      productimg: uploadedImages,
      createdBy: req.user._id,
    })

    res.status(201).json({
      success: true,
      product,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

/* ================= ADMIN PRODUCTS ================= */
export const getAdminProducts = async (req, res) => {
  const products = await Product.find({
    createdBy: req.user._id,
  }).sort({ createdAt: -1 })

  res.json({ success: true, products })
}

/* ================= DELETE PRODUCT ================= */
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) return res.status(404).json({ success: false })

  if (product.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ success: false, message: "Not allowed" })
  }

  for (const img of product.productimg) {
    if (img.public_id) {
      await cloudinary.uploader.destroy(img.public_id)
    }
  }

  await product.deleteOne()
  res.json({ success: true })
}

/* ================= UPDATE PRODUCT ================= */
export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) return res.status(404).json({ success: false })

  if (product.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ success: false })
  }

  const { productName, productPrice, category, brand, description } = req.body

  if (productName) product.productName = productName
  if (productPrice) product.productPrice = productPrice
  if (description) product.description = description
  if (category) product.category = category.toLowerCase()
  if (brand) product.brand = brand.toLowerCase()

  await product.save()
  res.json({ success: true, product })
}

/* ================= ADMIN DASHBOARD ================= */

// export const getAdminStats = async (req, res) => {
//   try {
//     const adminId = req.user._id

//     const totalProducts = await Product.countDocuments({ createdBy: adminId })

//     const totalOrders = await Order.countDocuments({
//       paymentMethod: "COD",
//     })

//     const salesAgg = await Order.aggregate([
//       {
//         $group: {
//           _id: null,
//           total: { $sum: "$totalAmount" },
//         },
//       },
//     ])

//     const monthlySales = await Order.aggregate([
//       {
//         $group: {
//           _id: { $month: "$createdAt" },
//           sales: { $sum: "$totalAmount" },
//         },
//       },
//       { $sort: { _id: 1 } },
//     ])

//     const monthlyProducts = await Product.aggregate([
//       { $match: { createdBy: adminId } },
//       {
//         $group: {
//           _id: { $month: "$createdAt" },
//           count: { $sum: 1 },
//         },
//       },
//       { $sort: { _id: 1 } },
//     ])

//     const monthlyUsers = await User.aggregate([
//       {
//         $group: {
//           _id: { $month: "$createdAt" },
//           count: { $sum: 1 },
//         },
//       },
//       { $sort: { _id: 1 } },
//     ])

//     res.json({
//       success: true,
//       stats: {
//         totalProducts,
//         totalOrders,
//         totalSales: salesAgg[0]?.total || 0,
//         monthlySales,
//         monthlyProducts,
//         monthlyUsers,
//       },
//     })
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message })
//   }
// }


export const getAdminStats = async (req, res) => {
  try {
    const adminId = req.user._id;

    const totalProducts = await Product.countDocuments({
      createdBy: adminId,
    });

    // const totalOrders = await Order.countDocuments({
    //   admin: adminId,
    // });

    // const salesAgg = await Order.aggregate([
    //   { $match: { admin: adminId } },
    //   {
    //     $group: {
    //       _id: null,
    //       total: { $sum: "$totalAmount" },
    //     },
    //   },
    // ]);

    // const monthlySales = await Order.aggregate([
    //   { $match: { admin: adminId } },
    //   {
    //     $group: {
    //       _id: { $month: "$createdAt" },
    //       sales: { $sum: "$totalAmount" },
    //     },
    //   },
    //   { $sort: { _id: 1 } },
    // ]);


const totalOrders = await Order.countDocuments({
  admin: adminId,
});

const salesAgg = await Order.aggregate([
  { $match: { admin: adminId } },
  {
    $group: {
      _id: null,
      total: { $sum: "$totalAmount" },
    },
  },
]);

const monthlySales = await Order.aggregate([
  { $match: { admin: adminId } },
  {
    $group: {
      _id: { $month: "$createdAt" },
      sales: { $sum: "$totalAmount" },
    },
  },
  { $sort: { _id: 1 } },
]);



    const monthlyProducts = await Product.aggregate([
      { $match: { createdBy: adminId } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const monthlyUsers = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      stats: {
        totalProducts,
        totalOrders,
        totalSales: salesAgg[0]?.total || 0,
        monthlySales,
        monthlyProducts,
        monthlyUsers,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* ================= USERS ================= */
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("firstName lastName profilePic role")
  res.json({ success: true, users })
}
