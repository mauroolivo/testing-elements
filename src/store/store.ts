import { configureStore } from '@reduxjs/toolkit';
import {
  addByAmount,
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
import { login, logout, userSlice } from './slices/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    todos: todosSlice.reducer,
    user: userSlice.reducer,
  },
});

export {
  increment,
  decrement,
  addByAmount,
  addTodo,
  toggleTodo,
  clearCompleted,
  login,
  logout,
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
