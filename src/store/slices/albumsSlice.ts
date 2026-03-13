import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type Album = {
  userId: number;
  id: number;
  title: string;
};

type AlbumsState = {
  items: Album[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: AlbumsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchAlbums = createAsyncThunk(
  'albums/fetchAlbums',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/albums'
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return (await response.json()) as Album[];
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          (action.payload as string | undefined) ??
          action.error.message ??
          'Unknown error';
      });
  },
});
