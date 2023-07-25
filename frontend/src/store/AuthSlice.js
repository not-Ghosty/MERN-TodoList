import {createSlice} from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "UserData",
  initialState: {
    user: null,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      return;
    },
    logout(state) {
      state.user = null;
      return;
    },
  },
});

export const {login, logout} = AuthSlice.actions;
export default AuthSlice.reducer;
