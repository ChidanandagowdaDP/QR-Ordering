import { createSlice } from "@reduxjs/toolkit";

// Use sessionStorage instead of localStorage
const savedStore = sessionStorage.getItem("storeId");

const storeSlice = createSlice({
  name: "store",
  initialState: {
    storeId: savedStore || "",
  },
  reducers: {
    setStore: (state, action) => {
      state.storeId = action.payload;
      loStorage.setItem("storeId", action.payload);
    },
    clearStore: (state) => {
      state.storeId = "";
      sessionStorage.removeItem("storeId");
    },
  },
});

export const { setStore, clearStore } = storeSlice.actions;
export default storeSlice.reducer;
