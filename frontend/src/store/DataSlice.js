import {createSlice} from "@reduxjs/toolkit";

const DataSlice = createSlice({
  name: "API",
  initialState: [{}],
  reducers: {
    set(state, action) {
      return action.payload;
    },
    add(state, action) {
      state.unshift(action.payload);
      return state;
    },
    remove(state, action) {
      return state.filter((item) => item._id !== action.payload);
    },
    removeAll() {
      return null;
    },
    get(state, action) {
      const id = JSON.stringify(action.payload);
      console.log(typeof id);
      const currentstate = state;
      console.log("Target ID:", id);
      const data = currentstate.filter((item) => item._id === id);
      console.log("Matching object:", data);
      return data;
    },
  },
});

export const {set, add, remove, get, removeAll} = DataSlice.actions;
export default DataSlice.reducer;
