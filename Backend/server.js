import express from "express"
import "dotenv/config"
import connectDB from "./database/db.js"
import userRoute from "./routes/userRoute.js"
import cors from "cors"
import productRoute from "./routes/productRoute.js"
import cartRoute from "./routes/cartRoute.js"
import adminRoutes from "./routes/adminRoutes.js"
import orderRoutes from "./routes/orderRoutes.js";


const app = express()
const PORT = process.env.PORT || 8000

// Middleware
app.use(express.json())

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))


// ✅ ROOT ROUTE (ADD THIS)
app.get("/", (req, res) => {
  res.send("E-Kart Backend API is running 🚀");
});

app.use("/api/v1/user", userRoute)
app.use("/api/v1/product", productRoute)
app.use("/api/v1/cart", cartRoute)
app.use("/api/v1/admin", adminRoutes)
app.use("/api/v1/order", orderRoutes)



// http://localhost:8000/api/v1/user/register
// http://localhost:8000/api/v1/product/add

app.listen(PORT, () => {
  connectDB()
  console.log(`Server running on port ${PORT}`)
})




