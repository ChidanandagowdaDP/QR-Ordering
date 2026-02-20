import { createSlice } from "@reduxjs/toolkit";

const savedTable = sessionStorage.getItem("table");

const tableSlice = createSlice({
  name: "table",
  initialState: {
    tableNumber: savedTable ? Number(savedTable) : null,
  },
  reducers: {
    setTable: (state, action) => {
      state.tableNumber = action.payload;
      sessionStorage.setItem("table", action.payload);
    },
    clearTable: (state) => {
      state.tableNumber = null;
      sessionStorage.removeItem("table");
    },
  },
});

export const { setTable, clearTable } = tableSlice.actions;
export default tableSlice.reducer;
