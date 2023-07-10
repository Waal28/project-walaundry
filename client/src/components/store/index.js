import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./account";

export default configureStore({
  reducer: {
    account: accountSlice,
  },
});
