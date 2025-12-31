import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "sonner"
import { Minus, Plus, Trash2, Tag, ShoppingCart } from "lucide-react"
import { setCart } from "@/redux/productSlice"
import { useState,useEffect } from "react"

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cart } = useSelector((store) => store.product)
  const token = localStorage.getItem("accessToken")

  const [loading, setLoading] = useState(true)
  const [promo, setPromo] = useState("")
  const [discount, setDiscount] = useState(0)

  // fetch cart from backend
  const fetchCart = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`http://localhost:8000/api/v1/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      dispatch(setCart(res.data.cart))
    } catch (err) {
      console.error(err)
      toast.error("Failed to fetch cart")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const updateQty = async (productId, type) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/cart/update`,
        { productId, type },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      dispatch(setCart(res.data.cart))
    } catch {
      toast.error("Quantity update failed")
    }
  }

  const removeItem = async (productId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/cart/remove`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { productId },
        }
      )
      dispatch(setCart(res.data.cart))
      toast.success("Item removed")
    } catch {
      toast.error("Remove failed")
    }
  }

  const applyPromo = () => {
    if (promo.toUpperCase() === "SAVE10") {
      const discountAmount = Math.round(cart.totalPrice * 0.1)
      setDiscount(discountAmount)
      toast.success("Promo code applied 🎉")
    } else {
      setDiscount(0)
      toast.error("Invalid promo code")
    }
  }

  const handleCheckout = () => {
    toast.success("Welcome To Checkout Page")
    // navigate("/Processorder")
    navigate("/checkout")

  }

  if (loading) {
    return (
      <div className="pt-28 text-center text-gray-500 text-lg">
        Loading your cart...
      </div>
    )
  }

  // CART EMPTY VIEW
  if (!cart?.items?.length) {
    return (
      <div className="pt-28 text-center flex flex-col items-center gap-4">
        <ShoppingCart size={64} className="text-gray-400" />
        <h2 className="text-2xl font-semibold text-gray-700">🛒 Your cart is empty</h2>
        <p className="text-gray-500">Looks like you haven't added any products yet.</p>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 bg-pink-600 hover:bg-pink-500 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          Start Shopping
        </button>
      </div>
    )
  }

  const gst = Math.round((cart.totalPrice - discount) * 0.18)
  const finalTotal = cart.totalPrice - discount + gst

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <div className="flex gap-6 items-start">
        {/* LEFT */}
        <div className="w-[65%] space-y-4">
          {cart.items.map((item) => {
            const product = item.productId
            if (!product) return null

            return (
              <div key={product._id} className="flex gap-4 bg-white p-4 rounded-xl shadow">
                <img
                  src={product?.productimg?.[0]?.url}
                  alt={product.productName}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{product.productName}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {product.description?.slice(0, 90) || "Premium quality product"}...
                  </p>

                  <p className="text-pink-600 font-bold mt-1">₹{item.price}</p>

                  <div className="flex items-center gap-3 mt-3">
                    <button onClick={() => updateQty(product._id, "decrease")} className="p-1 border rounded">
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQty(product._id, "increase")} className="p-1 border rounded">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(product._id)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-600 font-medium"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            )
          })}
        </div>

        {/* RIGHT */}
        <div className="w-[35%] sticky top-28 space-y-4">
          {/* PROMO */}
          <div className="bg-white p-5 rounded-xl shadow border">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Tag size={18} /> Apply Promo Code
            </h3>

            <div className="flex gap-2">
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Enter code (SAVE10)"
                className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none"
              />
              <button
                onClick={applyPromo}
                className="bg-pink-600 hover:bg-pink-500 text-white px-4 rounded-lg text-sm"
              >
                Apply
              </button>
            </div>

            {discount > 0 && (
              <p className="text-green-600 text-sm mt-2">🎉 You saved ₹{discount}</p>
            )}
          </div>

          {/* PRICE DETAILS */}
          <div className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-2xl shadow-md border">
            <h2 className="font-semibold text-lg mb-4">Price Details</h2>

            <div className="flex justify-between text-sm mb-2">
              <span>Sub Total</span>
              <span>₹{cart.totalPrice}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-sm mb-2 text-green-600">
                <span>Promo Discount</span>
                <span>- ₹{discount}</span>
              </div>
            )}

            <div className="flex justify-between text-sm mb-3">
              <span>GST (18%)</span>
              <span>₹{gst}</span>
            </div>

            <div className="border-t border-dashed my-3"></div>

            <div className="flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span className="text-pink-600">₹{finalTotal}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-5 w-full bg-pink-600 hover:bg-pink-500 text-white py-3 rounded-xl font-semibold"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate("/products")}
              className="mt-3 w-full border border-pink-600 text-pink-600 hover:bg-pink-50 py-3 rounded-xl font-semibold"
            >
              Continue Shopping
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              🔒 Secure checkout • 100% safe payments
            </p>
            <hr className="my-2" />
            <div className="mt-3 text-xs text-gray-500 space-y-1">
              <p>✅ 7-days easy replacement</p>
              <p>✅ 24/7 customer support</p>
              <p>✅ Fast & safe delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
