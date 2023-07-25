import {createSlice} from "@reduxjs/toolkit";

const DataSlice = createSlice({
  name: "API",
  initialState: {
    data: [],
  },
  reducers: {
    set(state, action) {
      state.data = action.payload;
      return;
    },
    add(state, action) {
      state.data.unshift(action.payload);
      return;
    },
    remove(state, action) {
      state.data = state.data.filter((item) => item._id !== action.payload);
      return;
    },
    removeAll() {
      return null;
    },
  },
});

export const {set, add, remove, removeAll} = DataSlice.actions;
export default DataSlice.reducer;
