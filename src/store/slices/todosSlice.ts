import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    addTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      state.push({ ...action.payload, completed: false });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.find((item) => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    clearCompleted: (state) => state.filter((todo) => !todo.completed),
  },
});

export const { addTodo, toggleTodo, clearCompleted } = todosSlice.actions;
