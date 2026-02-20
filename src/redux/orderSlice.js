import { createSlice } from "@reduxjs/toolkit";

const ORDER_KEY = "qr_orders";
const ORDER_EXPIRY = "qr_orders_expiry";
const EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours

// Load orders from localStorage
const loadOrders = () => {
  const storedOrders = localStorage.getItem(ORDER_KEY);
  const expiry = localStorage.getItem(ORDER_EXPIRY);

  if (!storedOrders || !expiry) return [];

  if (Date.now() > Number(expiry)) {
    localStorage.removeItem(ORDER_KEY);
    localStorage.removeItem(ORDER_EXPIRY);
    return [];
  }

  return JSON.parse(storedOrders);
};

const saveOrders = (orders) => {
  localStorage.setItem(ORDER_KEY, JSON.stringify(orders));
  localStorage.setItem(ORDER_EXPIRY, Date.now() + EXPIRY_TIME);
};

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: loadOrders(),
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
      saveOrders(state.orders);
    },

    clearOrders: (state) => {
      state.orders = [];
      localStorage.removeItem(ORDER_KEY);
      localStorage.removeItem(ORDER_EXPIRY);
    },
  },
});

export const { addOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
