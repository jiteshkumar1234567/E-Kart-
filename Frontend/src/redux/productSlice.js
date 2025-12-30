import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    cart: {
      items: [],
      totalPrice: 0,
    },
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload ?? { items: [], totalPrice: 0 };
    },
  },
});

export const { setProducts, setCart } = productSlice.actions;
export default productSlice.reducer;
