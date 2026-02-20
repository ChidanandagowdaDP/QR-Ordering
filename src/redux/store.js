import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.js";
import tableReducer from "./tableSlice.js";
import orderReducer from "./orderSlice.js";
import searchReducer from "./searchSlice.js";
import storeReducer from "./storeSlice.js";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    table: tableReducer,
    store: storeReducer,
    order: orderReducer,
    search: searchReducer,
  },
});
