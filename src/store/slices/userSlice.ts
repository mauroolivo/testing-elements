import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  name: string;
  isLoggedIn: boolean;
};

export const userSlice = createSlice({
  name: 'user',
  initialState: { name: '', isLoggedIn: false } as UserState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.name = '';
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
