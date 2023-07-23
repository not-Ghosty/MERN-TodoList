import {configureStore} from "@reduxjs/toolkit";
import DataSlice from "./DataSlice";
import AuthSlice from "./AuthSlice";

const store = configureStore({
  reducer: {
    APIData: DataSlice,
    UserData: AuthSlice,
  },
});

export default store;
