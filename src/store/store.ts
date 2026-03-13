import { configureStore } from '@reduxjs/toolkit';
import { albumsApi } from './services/albumsApi';
import {
  addByAmount,
  addByAmountAsync,
  counterSlice,
  decrement,
  increment,
} from './slices/counterSlice';
import {
  addTodo,
  clearCompleted,
  todosSlice,
  toggleTodo,
} from './slices/todosSlice';
import {
  fetchPostComments,
  postCommmentsSlice,
} from './slices/postCommmentsSlice';
import { login, logout, userSlice } from './slices/userSlice';

export const store = configureStore({
  reducer: {
    [albumsApi.reducerPath]: albumsApi.reducer,
    counter: counterSlice.reducer,
    todos: todosSlice.reducer,
    postComments: postCommmentsSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(albumsApi.middleware),
});

export {
  increment,
  decrement,
  addByAmount,
  addByAmountAsync,
  addTodo,
  toggleTodo,
  clearCompleted,
  fetchPostComments,
  login,
  logout,
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
