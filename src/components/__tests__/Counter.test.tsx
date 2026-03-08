import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '../Counter';

describe('Counter', () => {
  test('renders with initial value 0', () => {
    render(<Counter />);

    expect(screen.getByLabelText('count-value')).toHaveTextContent('0');
  });

  test('increments the counter', async () => {
    render(<Counter />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /increment/i }));

    expect(screen.getByLabelText('count-value')).toHaveTextContent('1');
  });

  test('decrements the counter', async () => {
    render(<Counter />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /decrement/i }));

    expect(screen.getByLabelText('count-value')).toHaveTextContent('-1');
  });

  test('resets the counter', async () => {
    render(<Counter />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /increment/i }));
    await user.click(screen.getByRole('button', { name: /increment/i }));
    await user.click(screen.getByRole('button', { name: /reset/i }));

    expect(screen.getByLabelText('count-value')).toHaveTextContent('0');
  });
});
