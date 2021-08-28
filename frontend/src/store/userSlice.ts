import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-extraneous-dependencies
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios, { AxiosResponse } from 'axios';
import { AuthService } from '../services';
import { User } from '../models/user';

interface AuthState {
  // user: User | null;
  userId: string | null;
  loading: boolean;
  didLogin: boolean;
  token: string | null;
  errors: any[];
}

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

export const createInitialState = (): AuthState => ({
  userId: null,
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
      // const { token } = user;
      // storeData(tokenKey, token);
      return { user };
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
  name: 'user',
  initialState: createInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doSignin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(doSignin.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.token = user.token;
      state.userId = user.userId;
      state.loading = false;
      state.didLogin = true;
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

export default usersSlice.reducer;
