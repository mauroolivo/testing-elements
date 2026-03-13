import { configureStore } from '@reduxjs/toolkit';
import { albumsSlice, fetchAlbums } from './slices/albumsSlice';
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
    albums: albumsSlice.reducer,
    counter: counterSlice.reducer,
    todos: todosSlice.reducer,
    postComments: postCommmentsSlice.reducer,
    user: userSlice.reducer,
  },
});

export {
  increment,
  decrement,
  addByAmount,
  addByAmountAsync,
  addTodo,
  toggleTodo,
  clearCompleted,
  fetchAlbums,
  fetchPostComments,
  login,
  logout,
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
