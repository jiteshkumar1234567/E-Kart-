// // import { Order } from "../models/orderModel.js";
// // import { Cart } from "../models/cartModel.js";

// // // export const createOrder = async (req, res) => {
// // //   try {
// // //     const userId = req.id;
// // //     const { items, address, totalAmount } = req.body;

// // //     if (!items || items.length === 0) {
// // //       return res.status(400).json({ success: false, message: "Cart empty" });
// // //     }

// // //     const formattedItems = items.map((item) => ({
// // //       product: item.productId._id,
// // //       quantity: item.quantity,
// // //       price: item.price,
// // //     }));

// // //     const order = await Order.create({
// // //       user: userId,
// // //       items: formattedItems,
// // //       address,
// // //       totalAmount,
// // //       paymentMethod: "COD",
// // //       paymentStatus: "pending",
// // //     });

// // //     // 🧹 Clear cart after order
// // //     await Cart.findOneAndUpdate(
// // //       { userId },
// // //       { items: [], totalPrice: 0 }
// // //     );

// // //     res.status(201).json({
// // //       success: true,
// // //       message: "Order placed successfully (COD)",
// // //       order,
// // //     });
// // //   } catch (error) {
// // //     res.status(500).json({ success: false, message: error.message });
// // //   }
// // // };

// // // GET USER ORDERS

// // export const createOrder = async (req, res) => {
// //   try {
// //     const userId = req.id;
// //     const { items, address, totalAmount } = req.body;

// //     if (!items || items.length === 0) {
// //       return res.status(400).json({ success: false, message: "Cart empty" });
// //     }

// //     // 🔥 find admin from product
// //     const product = await Product.findById(items[0].productId._id);
// //     const adminId = product.createdBy;

// //     const formattedItems = items.map((item) => ({
// //       product: item.productId._id,
// //       quantity: item.quantity,
// //       price: item.price,
// //     }));

// //     const order = await Order.create({
// //       user: userId,
// //       admin: adminId, // ✅ VERY IMPORTANT
// //       items: formattedItems,
// //       address,
// //       totalAmount,
// //       paymentMethod: "COD",
// //       paymentStatus: "paid",
// //     });

// //     await Cart.findOneAndUpdate(
// //       { userId },
// //       { items: [], totalPrice: 0 }
// //     );

// //     res.status(201).json({
// //       success: true,
// //       message: "Order placed successfully",
// //       order,
// //     });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };


// // export const getMyOrders = async (req, res) => {
// //   try {
// //     const orders = await Order.find({ user: req.id })
// //       .populate("items.product")
// //       .sort({ createdAt: -1 });

// //     res.status(200).json({ success: true, orders });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };






































// import { Order } from "../models/orderModel.js";
// import { Cart } from "../models/cartModel.js";
// import { Product } from "../models/productModel.js"; // ✅ FIX 1

// // export const createOrder = async (req, res) => {
// //   console.log("ADDRESS RECEIVED 👉", address);

// //   try {
// //     const userId = req.id;
// //     const { items, address, totalAmount } = req.body;

// //     if (!items || items.length === 0) {
// //       return res.status(400).json({ success: false, message: "Cart empty" });
// //     }

// //     // 🔥 admin nikal rahe hain product se
// //     const product = await Product.findById(items[0].productId._id);
// //     if (!product) {
// //       return res.status(404).json({ success: false, message: "Product not found" });
// //     }

// //     const adminId = product.createdBy;

// //     const formattedItems = items.map((item) => ({
// //       product: item.productId._id,
// //       quantity: item.quantity,
// //       price: item.price,
// //     }));

// //     const order = await Order.create({
// //       user: userId,
// //       admin: adminId, // ✅ FIX 2
// //       items: formattedItems,
// //       address,
// //       totalAmount,
// //       paymentMethod: "COD",
// //       paymentStatus: "pending",
// //     });

// //     await Cart.findOneAndUpdate(
// //       { userId },
// //       { items: [], totalPrice: 0 }
// //     );

// //     res.status(201).json({
// //       success: true,
// //       message: "Order placed successfully",
// //       order,
// //     });
// //   } catch (error) {
// //     console.error("ORDER ERROR:", error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };



// export const createOrder = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { items, address, totalAmount } = req.body;

//     console.log("ADDRESS RECEIVED 👉", address);
//     console.log("ITEMS RECEIVED 👉", items);

//     if (!items || items.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Cart empty",
//       });
//     }

//     // ✅ FIX: productId is STRING now
//     const firstProductId = items[0].productId;

//     const product = await Product.findById(firstProductId);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     if (!product.createdBy) {
//       return res.status(400).json({
//         success: false,
//         message: "Product admin not found",
//       });
//     }

//     const adminId = product.createdBy;

//     const formattedItems = items.map((item) => ({
//       product: item.productId, // ✅ direct ID
//       quantity: item.quantity,
//       price: item.price,
//     }));

//     const order = await Order.create({
//       user: userId,
//       admin: adminId, // ✅ NOW VALID
//       items: formattedItems,
//       address,
//       totalAmount,
//       paymentMethod: "COD",
//       paymentStatus: "pending",
//     });

//     await Cart.findOneAndUpdate(
//       { userId },
//       { items: [], totalPrice: 0 }
//     );

//     res.status(201).json({
//       success: true,
//       message: "Order placed successfully",
//       order,
//     });
//   } catch (error) {
//     console.error("ORDER ERROR:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };




// // export const createOrder = async (req, res) => {
// //   try {
// //     const userId = req.id;
// //     const { items, address, totalAmount } = req.body;

// //     console.log("ADDRESS RECEIVED 👉", address); // ✅ NOW OK

// //     if (!items || items.length === 0) {
// //       return res.status(400).json({ success: false, message: "Cart empty" });
// //     }

// //     if (!address) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Address missing",
// //       });
// //     }

// //     const product = await Product.findById(items[0].productId._id);
// //     if (!product) {
// //       return res.status(404).json({ success: false, message: "Product not found" });
// //     }

// //     const adminId = product.createdBy;

// //     const formattedItems = items.map((item) => ({
// //       product: item.productId._id,
// //       quantity: item.quantity,
// //       price: item.price,
// //     }));

// //     const order = await Order.create({
// //       user: userId,
// //       admin: adminId,
// //       items: formattedItems,
// //       address, // ✅ SAVED NOW
// //       totalAmount,
// //       paymentMethod: "COD",
// //       paymentStatus: "pending",
// //     });

// //     await Cart.findOneAndUpdate(
// //       { userId },
// //       { items: [], totalPrice: 0 }
// //     );

// //     res.status(201).json({
// //       success: true,
// //       message: "Order placed successfully",
// //       order,
// //     });
// //   } catch (error) {
// //     console.error("ORDER ERROR:", error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };



// export const getMyOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.id })
//       .populate("items.product")
//       .sort({ createdAt: -1 });

//     res.json({ success: true, orders });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findOne({
//       _id: req.params.id,
//       user: req.id, // 🔐 only owner can see
//     }).populate("items.product");

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     res.json({ success: true, order });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };




































// import { Order } from "../models/orderModel.js";
// import { Cart } from "../models/cartModel.js";
// import { Product } from "../models/productModel.js";

// /* ================= CREATE ORDER ================= */
// // export const createOrder = async (req, res) => {
// //   try {
// //     const userId = req.id;
// //     const { items, address, totalAmount } = req.body;

// //     console.log("ADDRESS RECEIVED 👉", address);
// //     console.log("ITEMS RECEIVED 👉", items);

// //     if (!items || items.length === 0) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Cart is empty",
// //       });
// //     }

// //     // ✅ productId ab STRING aa raha hai
// //     const firstProductId = items[0].productId;

// //     const product = await Product.findById(firstProductId);
// //     if (!product) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Product not found",
// //       });
// //     }

// //     if (!product.createdBy) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Admin not found for this product",
// //       });
// //     }

// //     const adminId = product.createdBy;

// //     const formattedItems = items.map((item) => ({
// //       product: item.productId, // ✅ direct ID
// //       quantity: item.quantity,
// //       price: item.price,
// //     }));

// //     const order = await Order.create({
// //       user: userId,
// //       admin: adminId,
// //       items: formattedItems,
// //       address,
// //       totalAmount,
// //       paymentMethod: "COD",
// //       paymentStatus: "pending",
// //     });

// //     await Cart.findOneAndUpdate(
// //       { userId },
// //       { items: [], totalPrice: 0 }
// //     );

// //     res.status(201).json({
// //       success: true,
// //       message: "Order placed successfully",
// //       order,
// //     });
// //   } catch (error) {
// //     console.error("ORDER ERROR:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };


// export const createOrder = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { address } = req.body;

//     if (!address) {
//       return res.status(400).json({
//         success: false,
//         message: "Address missing",
//       });
//     }

//     const cart = await Cart.findOne({ userId }).populate("items.productId");
//     if (!cart || cart.items.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Cart empty",
//       });
//     }

//     const adminId = cart.items[0].productId.createdBy;

//     const order = await Order.create({
//       user: userId,
//       admin: adminId,
//       items: cart.items.map((item) => ({
//         product: item.productId._id,
//         quantity: item.quantity,
//         price: item.price,
//       })),
//       address, // ✅ IMPORTANT
//       totalAmount: cart.totalPrice,
//       paymentMethod: "COD",
//       paymentStatus: "pending", // ✅ ENUM FIX
//     });

//     await Cart.findOneAndDelete({ userId });

//     res.status(201).json({
//       success: true,
//       message: "Order placed successfully",
//       order,
//     });
//   } catch (error) {
//     console.error("ORDER ERROR:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };



// // export const createOrder = async (req, res) => {
// //   try {
// //     const userId = req.id;

// //     const cart = await Cart.findOne({ userId }).populate("items.productId");
// //     if (!cart || cart.items.length === 0) {
// //       return res.status(400).json({ success: false, message: "Cart empty" });
// //     }

// //     // 🔥 IMPORTANT FIX
// //     const adminId = cart.items[0].productId.createdBy;

// //     const order = await Order.create({
// //       user: userId,
// //       admin: adminId, // ✅ THIS LINE FIXES EVERYTHING
// //       items: cart.items.map((item) => ({
// //         product: item.productId._id,
// //         quantity: item.quantity,
// //         price: item.price,
// //       })),
// //       totalAmount: cart.totalPrice,
// //       paymentMethod: "COD",
// //       paymentStatus: "Pending",
// //     });

// //     await Cart.findOneAndDelete({ userId });

// //     res.status(201).json({
// //       success: true,
// //       order,
// //     });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };


// /* ================= MY ORDERS ================= */
// export const getMyOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.id })
//       .populate("items.product")
//       .sort({ createdAt: -1 });

//     res.json({ success: true, orders });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// /* ================= ORDER BY ID ================= */
// export const getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findOne({
//       _id: req.params.id,
//       user: req.id,
//     }).populate("items.product");

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     res.json({ success: true, order });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };






// export const markDelivered = async (req, res) => {
//   try {
//     const { orderId } = req.params;

//     const order = await Order.findById(orderId);
//     if (!order) return res.status(404).json({ success: false, message: "Order not found" });

//     order.paymentStatus = "delivered";
//     await order.save();

//     res.json({ success: true, message: "Order marked as delivered", order });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };





















































import { Order } from "../models/orderModel.js";
import { Cart } from "../models/cartModel.js";
import { Product } from "../models/productModel.js";

/* ================= CREATE ORDER (USER) ================= */
export const createOrder = async (req, res) => {
  try {
    const userId = req.id;
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address is required",
      });
    }

    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // 🔥 ADMIN ID PRODUCT SE
    const adminId = cart.items[0].productId.createdBy;

    const order = await Order.create({
      user: userId,
      admin: adminId,
      items: cart.items.map((item) => ({
        product: item.productId._id,
        quantity: item.quantity,
        price: item.price,
      })),
      address,
      totalAmount: cart.totalPrice,
      paymentMethod: "COD",
      paymentStatus: "pending",
    });

    await Cart.findOneAndDelete({ userId });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("ORDER ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= USER ORDERS ================= */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
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

/* ================= USER ORDER BY ID ================= */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.id,
    }).populate("items.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
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

/* ================= ADMIN ORDERS ================= */
export const getAdminOrders = async (req, res) => {
  try {
    const adminId = req.id;

    const orders = await Order.find({ admin: adminId })
      .populate("user", "firstName lastName email")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
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

/* ================= ADMIN MARK DELIVERED ================= */
export const markDelivered = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.paymentStatus = "delivered";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order marked as delivered",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
