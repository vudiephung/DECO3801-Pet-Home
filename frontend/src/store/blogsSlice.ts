import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
  EntityState,
} from '@reduxjs/toolkit';

import { Blog } from '../models/blog';
import { BlogsService } from '../services';
import { reactBlog } from '../services/blogs';
import { BLOGS_FEATURE_KEY } from './keywords';

const BlogsAdapter = createEntityAdapter<Blog>({
  selectId: (blog) => blog._id,
});

interface BlogState extends EntityState<Blog> {
  loading: boolean;
  selectedId: Blog['_id'] | null;
}

export const createInitialState = (): BlogState =>
  BlogsAdapter.getInitialState({
    loading: false,
    selectedId: null,
  });

// eslint-disable-next-line consistent-return
export const doGetBlogs = createAsyncThunk('/getBlogs', async () => {
  try {
    const res = await BlogsService.getAllBlogs();
    return res;
  } catch (e) {
    console.log(`Cannot get blogs with error ${e}`);
  }
});

export const doReactBlog = createAsyncThunk(
  '/reactBlog',
  async (blogInfo: Blog, { rejectWithValue }) => {
    try {
      const res = await reactBlog(blogInfo);
      return res;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: createInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doGetBlogs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(doGetBlogs.fulfilled, (state, action) => {
      state.loading = false;
      BlogsAdapter.setAll(state, action.payload);
    });
    builder.addCase(doReactBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(doReactBlog.fulfilled, (state, action) => {
      state.loading = false;
      // BlogsAdapter.setAll(state, action.payload);
    });
  },
});

const selectBlogsFeature = (state: any) => state[BLOGS_FEATURE_KEY];

export const { selectAll: selectAllBlogs, selectEntities } =
  BlogsAdapter.getSelectors(selectBlogsFeature);

export const selectLoading = createSelector(selectBlogsFeature, (blogState) => blogState.loading);

export default blogsSlice.reducer;
