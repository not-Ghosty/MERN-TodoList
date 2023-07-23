import {createSlice} from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "UserData",
  initialState: [
    {
      user: null,
    },
  ],
  reducers: {
    login(state, action) {
      return {user: action.payload};
    },
    logout(state) {
      return {user: null};
    },
  },
});

export const {login, logout} = AuthSlice.actions;
export default AuthSlice.reducer;
