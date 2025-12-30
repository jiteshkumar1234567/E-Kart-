// import { Cart } from "../models/cartModel.js";
// import { Product } from "../models/productModel.js";
// export const getCart = async (req, res) => {
//   try {
//     const userId = req.id;

//     const cart = await Cart.findOne({ userId }).populate("items.productId");
//     if (!cart) {
//       return res.json({
//         success: true,
//        cart: {
//   items: [],
//   totalPrice: 0,
// },
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       cart,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const addToCart = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { productId } = req.body;

//     //check if product exist
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "product not found",
//       });
//     }

//     // find the users cart if exist
//     let cart = await Cart.findOne(userId);

//     // if cart doesn't exist create a new one
//     if (!cart) {
//       cart = new Cart({
//         userId,
//         items: { productId, quantity: 1, price: productPrice },
//         totalPrice: product.productPrice,
//       });
//     } else {
//       //find if product is already in cart
//       const itemIndex = cart.items.findIndex(
//         (item) => item.productId.toString() === productId
//       );
//       if (itemIndex > -1) {
//         //if product exist - just increase quantity
//         card.items(itemIndex).quantity += 1;
//       } else {
//         // if new product - push to cart
//         card.items.push({
//           productId,
//           quantity: 1,
//           price: product.productPrice,
//         });
//       }

//       // recalculate price
//       cart.totalPrice = cart.items.reduce(
//         (acc, item) => acc + item.price * item.quantity
//       );
//     }

//     // save updated cart
//     await cart.save();

//     // populate product details before sending response
//     const populatedCart = await Cart.findById(cart._id).populate(
//       "items.productId"
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Product added to cart successfully",
//       cart: populatedCart,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const updateQuantity = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { productId, type } = req.body;

//     let cart = await Cart.findOne({ userId });
//     if (!cart) {
//       return res.status(404).json({
//         success: false,
//         message: "Cart not found",
//       });
//     }
//     const item = cart.item.find(
//       (item) => item.productId.toString() === productId
//     );
//     if (!item)
//       return res.status(404).json({
//         success: false,
//         message: "item not found",
//       });

//     if (type === "increase") item.quantity += 1;
//     if (type === "decrease" && item.quantity > 1) item.quantity -= 1;

//     cart.totalPrice = cart.items.reduce(
//       (acc, item) => acc + item.price * item.quantity,
//       0
//     );

//     await cart.save();
//     cart = await card.populate("items.productId");

//     return res.status(200).json({
//       success: true,
//       cart,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const removeFromCart = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { product } = req.body;

//     let cart = await Cart.findOne({ userId });
//     if (!cart)
//       return res.status(404).json({
//         success: false,
//         message: "Cart not found",
//       });

//     cart.items = cart.items.filter(
//       (item) => item.productId.toString() !== productId
//     );
//     cart.totalPrice = cart.item.reduce(
//       (acc, item) => acc + item.price * item.quantity,
//       0
//     );

//     await cart.save();
//     return res.status(200).json({
//       success: true,
//       cart,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };






































// import { Cart } from "../models/cartModel.js";
// import { Product } from "../models/productModel.js";

// /* ================= GET CART ================= */
// export const getCart = async (req, res) => {
//   try {
//     const userId = req.id;

//     let cart = await Cart.findOne({ userId }).populate("items.productId");

//     if (!cart) {
//       return res.status(200).json({
//         success: true,
//         cart: {
//           items: [],
//           totalPrice: 0,
//         },
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       cart,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// /* ================= ADD TO CART ================= */
// export const addToCart = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { productId } = req.body;

//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       cart = new Cart({
//         userId,
//         items: [
//           {
//             productId,
//             quantity: 1,
//             price: product.productPrice,
//           },
//         ],
//         totalPrice: product.productPrice,
//       });
//     } else {
//       const itemIndex = cart.items.findIndex(
//         (item) => item.productId.toString() === productId
//       );

//       if (itemIndex > -1) {
//         cart.items[itemIndex].quantity += 1;
//       } else {
//         cart.items.push({
//           productId,
//           quantity: 1,
//           price: product.productPrice,
//         });
//       }

//       cart.totalPrice = cart.items.reduce(
//         (acc, item) => acc + item.price * item.quantity,
//         0
//       );
//     }

//     await cart.save();
//     cart = await cart.populate("items.productId");

//     return res.status(200).json({
//       success: true,
//       message: "Product added to cart successfully",
//       cart,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// /* ================= UPDATE QUANTITY ================= */
// export const updateQuantity = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { productId, type } = req.body;

//     let cart = await Cart.findOne({ userId });
//     if (!cart) {
//       return res.status(404).json({
//         success: false,
//         message: "Cart not found",
//       });
//     }

//     const item = cart.items.find(
//       (item) => item.productId.toString() === productId
//     );

//     if (!item) {
//       return res.status(404).json({
//         success: false,
//         message: "Item not found",
//       });
//     }

//     if (type === "increase") item.quantity += 1;
//     if (type === "decrease" && item.quantity > 1) item.quantity -= 1;

//     cart.totalPrice = cart.items.reduce(
//       (acc, item) => acc + item.price * item.quantity,
//       0
//     );

//     await cart.save();
//     cart = await cart.populate("items.productId");

//     return res.status(200).json({
//       success: true,
//       cart,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// /* ================= REMOVE FROM CART ================= */
// export const removeFromCart = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { productId } = req.body;

//     let cart = await Cart.findOne({ userId });
//     if (!cart) {
//       return res.status(404).json({
//         success: false,
//         message: "Cart not found",
//       });
//     }

//     cart.items = cart.items.filter(
//       (item) => item.productId.toString() !== productId
//     );

//     cart.totalPrice = cart.items.reduce(
//       (acc, item) => acc + item.price * item.quantity,
//       0
//     );

//     await cart.save();
//     cart = await cart.populate("items.productId");

//     return res.status(200).json({
//       success: true,
//       cart,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };















































import { Cart } from "../models/cartModel.js";
import { Product } from "../models/productModel.js";

/* ================= CLEAN CART ================= */
const cleanCart = async (cart) => {
  cart.items = cart.items.filter(
    (item) => item.productId !== null
  );

  cart.totalPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  await cart.save();
  return cart;
};

/* ================= GET CART ================= */
export const getCart = async (req, res) => {
  try {
    const userId = req.id;

    let cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: { items: [], totalPrice: 0 },
      });
    }

    // 🔥 REMOVE DELETED PRODUCTS
    cart = await cleanCart(cart);

    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= ADD TO CART ================= */
export const addToCart = async (req, res) => {
  try {
    const userId = req.id;
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity: 1, price: product.productPrice }],
      });
    } else {
      const item = cart.items.find(
        (i) => i.productId.toString() === productId
      );

      if (item) {
        item.quantity += 1;
      } else {
        cart.items.push({
          productId,
          quantity: 1,
          price: product.productPrice,
        });
      }
    }

    cart.totalPrice = cart.items.reduce(
      (acc, i) => acc + i.price * i.quantity,
      0
    );

    await cart.save();
    cart = await cart.populate("items.productId");
    cart = await cleanCart(cart);

    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= UPDATE QUANTITY ================= */
export const updateQuantity = async (req, res) => {
  try {
    const { productId, type } = req.body;
    const userId = req.id;

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ success: false });

    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );
    if (!item) return res.status(404).json({ success: false });

    if (type === "increase") item.quantity += 1;
    if (type === "decrease" && item.quantity > 1) item.quantity -= 1;

    cart.totalPrice = cart.items.reduce(
      (acc, i) => acc + i.price * i.quantity,
      0
    );

    await cart.save();
    cart = await cart.populate("items.productId");
    cart = await cleanCart(cart);

    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

/* ================= REMOVE FROM CART ================= */
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.id;

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ success: false });

    cart.items = cart.items.filter(
      (i) => i.productId.toString() !== productId
    );

    cart.totalPrice = cart.items.reduce(
      (acc, i) => acc + i.price * i.quantity,
      0
    );

    await cart.save();
    cart = await cart.populate("items.productId");

    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};
