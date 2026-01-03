
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
