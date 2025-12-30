import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
 import productReducer from "./productSlice";

const store = configureStore({
  reducer: {          // ✅ correct key
    user: userReducer,
     product: productReducer, 
  }
})

export default store
