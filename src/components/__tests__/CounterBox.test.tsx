import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CounterBox from '@/components/CounterBox';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addByAmount, decrement, increment } from '@/store/store';
import type { RootState } from '@/store/store';

jest.mock('@/store/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockedUseAppDispatch = useAppDispatch as unknown as jest.MockedFunction<
  typeof useAppDispatch
>;
const mockedUseAppSelector = useAppSelector as unknown as jest.MockedFunction<
  typeof useAppSelector
>;

describe('CounterBox', () => {
  const dispatchMock = jest.fn();
  const baseState: RootState = {
    counter: { value: 0, status: 'idle' },
    todos: [],
    postComments: { comments: [], status: 'idle', error: null },
    user: { name: '', isLoggedIn: false },
    albums: { items: [], status: 'idle', error: null },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseAppDispatch.mockReturnValue(dispatchMock);
  });

  test('renders counter value and idle async button', () => {
    mockedUseAppSelector.mockImplementation(
      (selector: (state: RootState) => unknown) =>
        selector({
          ...baseState,
          counter: { value: 7, status: 'idle' },
        })
    );

    render(<CounterBox />);

    expect(screen.getByText('Redux Counter')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();

    const asyncButton = screen.getByRole('button', { name: /add 3 async/i });
    expect(asyncButton).toBeEnabled();
  });

  test('dispatches sync actions when buttons are clicked', async () => {
    mockedUseAppSelector.mockImplementation(
      (selector: (state: RootState) => unknown) =>
        selector({
          ...baseState,
          counter: { value: 0, status: 'idle' },
        })
    );

    render(<CounterBox />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /increment/i }));
    await user.click(screen.getByRole('button', { name: /decrement/i }));
    await user.click(screen.getByRole('button', { name: /add 5/i }));

    expect(dispatchMock).toHaveBeenCalledWith(increment());
    expect(dispatchMock).toHaveBeenCalledWith(decrement());
    expect(dispatchMock).toHaveBeenCalledWith(addByAmount(5));
  });

  test('dispatches async thunk and shows loading state', async () => {
    mockedUseAppSelector.mockImplementation(
      (selector: (state: RootState) => unknown) =>
        selector({
          ...baseState,
          counter: { value: 10, status: 'loading' },
        })
    );

    render(<CounterBox />);

    const asyncButton = screen.getByRole('button', { name: /adding.../i });
    expect(asyncButton).toBeDisabled();
  });

  test('dispatches async thunk when async button is clicked', async () => {
    mockedUseAppSelector.mockImplementation(
      (selector: (state: RootState) => unknown) =>
        selector({
          ...baseState,
          counter: { value: 2, status: 'idle' },
        })
    );

    render(<CounterBox />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /add 3 async/i }));

    expect(dispatchMock).toHaveBeenCalledWith(expect.any(Function));
  });
});
