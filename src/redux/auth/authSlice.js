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
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isloggedIn = true;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isloggedIn = true;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isloggedIn = false;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = { ...action.payload };
        state.isloggedIn = true;
      });
  },
});

export default AuthSlice.reducer;
