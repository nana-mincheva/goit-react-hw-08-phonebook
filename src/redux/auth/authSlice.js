// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import * as authOperation from '../auth/authOperation';

// export const registerUser = createAsyncThunk('auth/register', authOperation.register);
// export const logInUser = createAsyncThunk('auth/login', authOperation.logIn);
// export const logOutUser = createAsyncThunk('auth/logout', authOperation.logOut);
// export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', authOperation.fetchCurrentUser);

// const initialState = {
//   user: { name: null, email: null },
//   token: null,
//   isloggedIn: false,
//   isRefreshing: false,
// };

// const AuthSlice = createSlice({
//   name: 'auth',
//   initialState,
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isloggedIn = true;
//         state.isRefreshing = false;
//       })
//     .addCase(logInUser.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isloggedIn = true;
//         state.isRefreshing = false;
//       })
//    .addCase(logInUser.rejected, (state) => {
//         state.isRefreshing = false;
//       })
//     .addCase(logOutUser.fulfilled, (state) => {
//         state.user = { name: null, email: null };
//         state.token = null;
//         state.isloggedIn = false;
//         state.isRefreshing = false;
//       })
//     .addCase(fetchCurrentUser.pending, (state) => {
//         state.isRefreshing = true;
//       })
//    .addCase(fetchCurrentUser.fulfilled, (state, action) => {
//         state.user = { ...action.payload };
//         state.isloggedIn = true;
//         state.isRefreshing = false;
        
//       })
//       .addCase(fetchCurrentUser.rejected, (state) => {
//         state.isRefreshing = false;
//       });
//   },
// });

// export default AuthSlice.reducer;

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