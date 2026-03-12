import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type PostComment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

type postCommmentsState = {
  comments: PostComment[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: postCommmentsState = {
  comments: [],
  status: 'idle',
  error: null,
};

const DEBUG_COMMENTS_DELAY_MS = 1000;

export const fetchPostComments = createAsyncThunk(
  'postComments/fetchPostComments',
  async (postId: number, { rejectWithValue }) => {
    try {
      await new Promise((resolve) =>
        setTimeout(resolve, DEBUG_COMMENTS_DELAY_MS)
      );

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return (await response.json()) as PostComment[];
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

export const postCommmentsSlice = createSlice({
  name: 'postComments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostComments.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchPostComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          (action.payload as string | undefined) ??
          action.error.message ??
          'Unknown error';
      });
  },
});
