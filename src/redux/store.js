import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";

export default configureStore({
  reducer: {
    users: userReducer
  }
});
