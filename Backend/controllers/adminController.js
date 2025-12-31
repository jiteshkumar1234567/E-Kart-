
import { Product } from "../models/productModel.js"
import { User } from "../models/usermodel.js"
import { Order } from "../models/orderModel.js"
import cloudinary from "../Utils/Cloudinary.js" // 🔥 FIX 1

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
