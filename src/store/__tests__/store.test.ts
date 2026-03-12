import { configureStore } from '@reduxjs/toolkit';
import {
  addByAmount,
  addByAmountAsync,
  addTodo,
  clearCompleted,
  decrement,
  increment,
  login,
  logout,
  toggleTodo,
} from '@/store/store';
import { counterSlice } from '@/store/slices/counterSlice';
import { todosSlice } from '@/store/slices/todosSlice';
import { userSlice } from '@/store/slices/userSlice';

const createTestStore = () =>
  configureStore({
    reducer: {
      counter: counterSlice.reducer,
      todos: todosSlice.reducer,
      user: userSlice.reducer,
    },
  });

describe('redux store', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  test('handles counter sync actions', () => {
    const store = createTestStore();

    store.dispatch(increment());
    store.dispatch(addByAmount(4));
    store.dispatch(decrement());

    expect(store.getState().counter.value).toBe(4);
    expect(store.getState().counter.status).toBe('idle');
  });

  test('handles todos actions', () => {
    const store = createTestStore();

    store.dispatch(addTodo({ id: '1', text: 'First task' }));
    store.dispatch(addTodo({ id: '2', text: 'Second task' }));
    store.dispatch(toggleTodo('1'));
    store.dispatch(clearCompleted());

    expect(store.getState().todos).toHaveLength(1);
    expect(store.getState().todos[0]).toMatchObject({
      id: '2',
      text: 'Second task',
      completed: false,
    });
  });

  test('handles user login/logout actions', () => {
    const store = createTestStore();

    store.dispatch(login('Mauro'));
    expect(store.getState().user).toEqual({
      name: 'Mauro',
      isLoggedIn: true,
    });

    store.dispatch(logout());
    expect(store.getState().user).toEqual({
      name: '',
      isLoggedIn: false,
    });
  });

  test('handles addByAmountAsync lifecycle', async () => {
    jest.useFakeTimers();
    const store = createTestStore();

    const thunkPromise = store.dispatch(addByAmountAsync(3));
    expect(store.getState().counter.status).toBe('loading');

    jest.advanceTimersByTime(500);
    await thunkPromise;

    expect(store.getState().counter.status).toBe('idle');
    expect(store.getState().counter.value).toBe(3);
  });
});
