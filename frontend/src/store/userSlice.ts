import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-extraneous-dependencies
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios, { AxiosResponse } from 'axios';
import { AuthService } from '../services';
import { User } from '../models/user';
import { AppState } from '.';

interface UserState {
  userId: string | null;
  username: string | null;
  loading: boolean;
  didLogin: boolean;
  token: string | null;
  errors: any[];
}

export const USER_FEATURE_KEY = 'user';

const tokenKey: string = 'token';

const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(`Cannot store ${key}in storage`);
  }
};

const deleteData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(`Can not delete ${key} in storage`);
  }
};

export const createInitialState = (): UserState => ({
  userId: null,
  username: null,
  token: null,
  loading: false,
  didLogin: false,
  errors: [],
});

export const doSignin = createAsyncThunk(
  '/signin',
  async (
    credential: { userInfo: Parameters<typeof AuthService['signin']>[0] },
    { rejectWithValue },
  ) => {
    try {
      const user = await AuthService.signin(credential.userInfo);
      storeData(tokenKey, user.token);
      return user;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const doSignup = createAsyncThunk(
  '/signup',
  async (input: { userInfo: Parameters<typeof AuthService['signup']>[0] }, { rejectWithValue }) => {
    try {
      const user = await AuthService.signup(input.userInfo);
      return { user };
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const doSignout = createAsyncThunk('auth/signout', () => {
  deleteData(tokenKey);
});

const usersSlice = createSlice({
  name: USER_FEATURE_KEY,
  initialState: createInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doSignin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(doSignin.fulfilled, (state, action) => {
      state.didLogin = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.loading = false;
    });
    builder.addCase(doSignin.rejected, (state, action) => {
      const { payload } = action;
      state.userId = null;
      state.token = null;
      state.loading = false;
      deleteData(tokenKey);
      state.errors.push(payload);
    });
    builder.addCase(doSignup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(doSignup.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(doSignup.rejected, (state, action) => {
      const { payload } = action;
      state.loading = false;
      state.errors.push(payload);
    });
    builder.addCase(doSignout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(doSignout.fulfilled, (state) => {
      state.userId = null;
      state.token = null;
      state.loading = false;
    });
  },
});

const selectAuthFeature = (state: AppState) => state[USER_FEATURE_KEY];

export const selectIsAuthenticated = createSelector(
  selectAuthFeature,
  (userState) => userState.didLogin,
);

export default usersSlice.reducer;
