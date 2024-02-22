import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
  },
  reducers: {
    getProducts: (state, action) => {
      state.product.push({ ...action.payload });
    },
    incrementQty: (state, action) => {
      const itemPresent = state.product.find((item) => item.id === action.payload.id);
      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.product.push({ ...action.payload, quantity: 1 });
      }
    },
    decrementQty: (state, action) => {
      const itemPresent = state.product.find((item) => item.id === action.payload.id);
      if (itemPresent) {
        if (itemPresent.quantity === 0) {
          const updatedProducts = state.product.filter((item) => item.id !== action.payload.id);
          state.product = updatedProducts;
        } else {
          itemPresent.quantity--;
        }
      }
    },
  },
});

export const { getProducts, incrementQty, decrementQty } = productSlice.actions;

export default productSlice.reducer;
