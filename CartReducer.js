import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
    name:"cart",
    initialState:{
        cart:[],
    },
    reducers:{
        addToCart: (state, action) => {
            const itemPresent = state.cart.find((item) => item.id === action.payload.id);
            
            if (itemPresent) {
                itemPresent.quantity++;
            } else {
                // Initialize quantity to 1 for a new item
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        
        removeFromCart:(state,action) => {
            const removeItem = state.cart.filter((item) => item.id !== action.payload.id);
            state.cart = removeItem;
        },
        incrementQuantity:(state,action) => {
            const itemPresent = state.cart.find((item) => item.id === action.payload.id);
            itemPresent.quantity++;
        },
        decrementQuantity: (state, action) => {
            const itemPresent = state.cart.find((item) => item.id === action.payload.id);
            
            // Ensure quantity doesn't go below 0
            itemPresent.quantity = Math.max(0, itemPresent.quantity - 1);
            
            if (itemPresent.quantity === 0) {
                const removeItem = state.cart.filter((item) => item.id !== action.payload.id);
                state.cart = removeItem;
            }
        },
        
        cleanCart:(state) => {
            state.cart = [];
        }
    }
});


export const {addToCart,removeFromCart,incrementQuantity,decrementQuantity,cleanCart} = CartSlice.actions;

export default CartSlice.reducer;
