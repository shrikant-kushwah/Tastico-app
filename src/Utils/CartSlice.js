import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    id: null,
    data: []
  },
  reducers: {
    addItem: (state, action) => {
      if (!state.id) {
        state.id = action.payload.resId;
      }

      if (state.id !== action.payload.resId) {
        toast.error("Cannot add items from different restaurants.");
        return;
      }

      const existingItem = state.data.find(
        (item) => item.id === action.payload.info.id
      );

      if (!existingItem) {
        state.data.push({ ...action.payload.info, quantity: 1 });
        toast.success(`${action.payload.info.name} added to the cart`);
      } else {
        existingItem.quantity += 1;
        toast(`${action.payload.info.name} quantity updated`);
      }
    },

    removeItem: (state, action) => {
      if (!state.data.length) {
        toast.error("Cart is already empty.");
        return;
      }

      const itemIndex = state.data.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex === -1) {
        toast.error("Item not found in cart.");
        return;
      }

      if (state.data[itemIndex].quantity > 1) {
        state.data[itemIndex].quantity -= 1;
        toast(`${state.data[itemIndex].name} quantity decreased`);
      } else {
        const removedItem = state.data[itemIndex].name;
        state.data.splice(itemIndex, 1);
        toast.success(`${removedItem} removed from cart`);
      }
    },

    clearCart: (state) => {
      state.data = [];
      state.id = null;
      toast.success("Cart cleared");
    }
  }
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
