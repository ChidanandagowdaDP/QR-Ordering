import { createSlice } from "@reduxjs/toolkit";

const savedTable = localStorage.getItem("table");

const tableSlice = createSlice({
  name: "table",
  initialState: {
    tableNumber: savedTable ? Number(savedTable) : null,
  },
  reducers: {
    setTable: (state, action) => {
      state.tableNumber = action.payload;
      localStorage.setItem("table", action.payload);
    },
    clearTable: (state) => {
      state.tableNumber = null;
      localStorage.removeItem("table");
    },
  },
});

export const { setTable, clearTable } = tableSlice.actions;
export default tableSlice.reducer;
