import { createSlice } from "@reduxjs/toolkit";

// Use sessionStorage instead of localStorage
const savedStore = localStorage.getItem("storeId");

const storeSlice = createSlice({
  name: "store",
  initialState: {
    storeId: savedStore || "",
  },
  reducers: {
    setStore: (state, action) => {
      state.storeId = action.payload;
      localStorage.setItem("storeId", action.payload);
    },
    clearStore: (state) => {
      state.storeId = "";
      localStorage.removeItem("storeId");
    },
  },
});

export const { setStore, clearStore } = storeSlice.actions;
export default storeSlice.reducer;
