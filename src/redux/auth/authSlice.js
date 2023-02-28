import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authOperation from '../auth/authOperation';

export const registerUser = createAsyncThunk('auth/register', authOperation.register);
export const logInUser = createAsyncThunk('auth/login', authOperation.logIn);
export const logOutUser = createAsyncThunk('auth/logout', authOperation.logOut);
export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', authOperation.fetchCurrentUser);

const initialState = {
  user: { name: null, email: null },
  token: null,
  isloggedIn: false,
  isRefreshing: false,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isloggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(logInUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isloggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(logInUser.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(logOutUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isloggedIn = false;
        state.isRefreshing = false;
      })
      .addCase(logOutUser.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = { ...action.payload };
        state.isloggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export default AuthSlice.reducer;