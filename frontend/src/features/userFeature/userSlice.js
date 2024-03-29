import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  UserData: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      (state.UserData = action.payload), (state.loading = false);
      state.error = null;
    },
    loginFailiure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.UserData = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      deleteUserSuccess: (state,action) => {
        state.UserData = action.payload;
        state.loading = false;
        state.error = null;
      },
      deleteUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      LogoutSuccess: (state) => {
        state.UserData = null;
        state.error = null;
        state.loading = false;
      },
  },
});

export const {
  loginFailiure,
  loginStart,
  loginSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  LogoutSuccess
} = userSlice.actions;

export default userSlice.reducer;
