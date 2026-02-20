import { createSlice } from "@reduxjs/toolkit";

const CART_KEY = "qr_cart";
const EXPIRY_KEY = "qr_cart_expiry";
const ONE_DAY = 24 * 60 * 60 * 1000;

// Load cart from localStorage
const loadCart = () => {
  const storedCart = localStorage.getItem(CART_KEY);
  const expiry = localStorage.getItem(EXPIRY_KEY);

  if (!storedCart || !expiry) return [];

  if (Date.now() > Number(expiry)) {
    localStorage.removeItem(CART_KEY);
    localStorage.removeItem(EXPIRY_KEY);
    return [];
  }

  return JSON.parse(storedCart);
};

const initialState = {
  items: loadCart(),
};

const saveCart = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  localStorage.setItem(EXPIRY_KEY, Date.now() + ONE_DAY);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }

      saveCart(state.items);
    },

    increaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.qty += 1;

      saveCart(state.items);
    },

    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.qty > 1) item.qty -= 1;

      saveCart(state.items);
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      saveCart(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem(CART_KEY);
      localStorage.removeItem(EXPIRY_KEY);
    },
  },
});

export const { addToCart, increaseQty, decreaseQty, removeItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
