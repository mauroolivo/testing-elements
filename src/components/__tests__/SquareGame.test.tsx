import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SquareGame from '@/components/SquareGame';

test('SquareGame resizes from 100x100 to 150x150 on click', async () => {
  render(<SquareGame />);

  const square = screen.getByTestId('square');
  expect(square).toBeInTheDocument();

  // initial dimensions (inline styles)
  expect(square).toHaveStyle('width: 100px');
  expect(square).toHaveStyle('height: 100px');

  square.getBoundingClientRect = () => {
    const w = parseFloat(square.style.width) || 0;
    const h = parseFloat(square.style.height) || 0;
    return {
      width: w,
      height: h,
      top: 0,
      left: 0,
      right: w,
      bottom: h,
      x: 0,
      y: 0,
      toJSON: () => {},
    } as DOMRect;
  };

  // initial computed dimensions (stubbed)
  let rect = square.getBoundingClientRect();
  console.log('Initial rect:', rect);
  expect(rect.width).toBe(100);
  expect(rect.height).toBe(100);

  const btn = screen.getByRole('button', { name: /grow/i });
  await userEvent.click(btn);

  // after click dimensions should update (inline styles)
  expect(square).toHaveStyle('width: 150px');
  expect(square).toHaveStyle('height: 150px');

  // and computed dimensions should reflect the change
  await waitFor(() => {
    rect = square.getBoundingClientRect();
    expect(rect.width).toBe(150);
    expect(rect.height).toBe(150);
  });
});
