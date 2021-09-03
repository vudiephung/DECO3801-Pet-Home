import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthService } from '../services';
import { User } from '../models/user';
import { Pet } from '../models/pet';
import { AppState, fromPets } from '.';

interface UserState {
  user: User | null;
  loading: boolean;
  didLogin: boolean;
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
  user: null,
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

export const doAddToWishlist = createAsyncThunk(
  '/addToWishlist',
  async (petId: Pet['petId'], { rejectWithValue }) => {
    try {
      // TODO
      return petId;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const doRemoveFromWishlist = createAsyncThunk(
  '/removeFromWishlist',
  async (petId: Pet['petId'], { rejectWithValue }) => {
    try {
      // TODO
      return petId;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const userSlice = createSlice({
  name: USER_FEATURE_KEY,
  initialState: createInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doSignin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(doSignin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.didLogin = true;
      state.loading = false;
    });
    builder.addCase(doSignin.rejected, (state, action) => {
      const { payload } = action;
      state.user = null;
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
      state.didLogin = true;
      state.user = null;
      state.loading = false;
    });
    builder.addCase(doAddToWishlist.fulfilled, (state, action) => {
      state.user?.favouritePets?.push(action.payload);
    });
    builder.addCase(doRemoveFromWishlist.fulfilled, (state, action) => {
      const index = state.user?.favouritePets?.indexOf(action.payload);
      if (index && index > -1) {
        state.user?.favouritePets?.splice(index, 1);
      }
    });
  },
});

const selectAuthFeature = (state: AppState) => state[USER_FEATURE_KEY];

export const selectIsAuthenticated = createSelector(
  selectAuthFeature,
  (userState) => userState.didLogin,
);

export const selectFavouritePets = createSelector(
  selectAuthFeature,
  fromPets.selectEntities,
  (userState, petEntities) => {
    return userState.user?.favouritePets?.map((i) => petEntities[i]);
  },
);

export default userSlice.reducer;
