import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataAccount: [],
  userAccount: {
    username: "",
  },
};

const accountSlice = createSlice({
  initialState,
  name: "bokings",
  reducers: {
    setDataAccount: (state, action) => {
      state.dataAccount = action.payload;
    },
    setUserAccount: (state, action) => {
      state.userAccount = action.payload;
    },
  },
});

export const { setDataAccount, setUserAccount } = accountSlice.actions;
export default accountSlice.reducer;
