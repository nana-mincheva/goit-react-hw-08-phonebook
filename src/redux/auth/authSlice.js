import { createSlice } from '@reduxjs/toolkit';
import * as authOperation from '../auth/authOperation';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isloggedIn: false,
  isRefreshing: false,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [authOperation.register.pending](state) {
      state.isRegisterLoading = true;
    },
    [authOperation.register.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isloggedIn = true;
    },
    [authOperation.register.rejected](state, { payload }) {
      state.error = `${payload}`;
      state.isRegisterLoading = false;
    },
    [authOperation.logIn.pending](state, action) {
      state.isLoggingIn = true;
      state.error = null;
    },
    [authOperation.logIn.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isloggedIn = true;
    },
    [authOperation.logIn.rejected](state, { payload }) {
      state.error = `${payload}`;
    },
    [authOperation.logOut.pending](state) {
      state.isLoggingOut = true;
    },
    [authOperation.logOut.fulfilled](state, _) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isloggedIn = false;
    },
    [authOperation.logOut.rejected](state, action) {
      state.error = action.payload;
      state.isLoggingOut = false;
    },
      [authOperation.fetchCurrentUser.pending](state) {
      state.isCurrentUserLoading = true;
    },
    [authOperation.fetchCurrentUser.fulfilled](state, action) {
      state.user = { ...action.payload };
      state.isloggedIn = true;
    },
     [authOperation.fetchCurrentUser.rejected](state) {
      state.isCurrentUserLoading = false;
    },
  },
});

export default AuthSlice.reducer;