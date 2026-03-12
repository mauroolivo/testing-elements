import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type CounterState = {
  value: number;
  status: 'idle' | 'loading' | 'failed';
};

const initialState: CounterState = {
  value: 0,
  status: 'idle',
};

export const addByAmountAsync = createAsyncThunk(
  'counter/addByAmountAsync',
  async (amount: number) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return amount;
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    addByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addByAmountAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addByAmountAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      })
      .addCase(addByAmountAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { increment, decrement, addByAmount } = counterSlice.actions;
