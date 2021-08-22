import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { User } from '../models/user';

interface AuthState {
  user: User | null;
  loading: boolean;
  didLogin: boolean;
}

export const createInitialState = (): AuthState => ({
  user: null,
  loading: false,
  didLogin: false,
});

export const doSignin = createAsyncThunk('auth/signin', async () => {
  try {
    // TODO
  } catch (e) {
    // TODO
  }
});

export const doSignup = createAsyncThunk('auth/signup', async () => {
  try {
    // TODO
  } catch (e) {
    // TODO
  }
});

export const doSignout = createAsyncThunk('auth/signout', async () => {
  try {
    // TODO
  } catch (e) {
    // TODO
  }
});

export const doResume = createAsyncThunk('auth/resume', async () => {
  try {
    // TODO
  } catch (e) {
    // TODO
  }
});

const usersSlice = createSlice({
  name: 'user',
  initialState: createInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doSignin.pending, (state) => {
      state.loading = true;
    });
  },
});

export default usersSlice.reducer;
