import React from 'react';
import { render, screen } from '@testing-library/react';

import ColorCircles from '@/components/ColorCircles';

test('ColorCircles renders five circles with correct colors', () => {
  render(<ColorCircles />);

  const expected = ['red', 'green', 'blue', 'yellow', 'purple'];

  expected.forEach((color, idx) => {
    const el = screen.getByTestId(`circle-${idx + 1}`);
    expect(el).toBeInTheDocument();
    // assert inline background color
    expect(el).toHaveStyle(`background-color: ${color}`);
    // size check (radius 50px -> diameter 100px)
    expect(el).toHaveStyle('width: 100px');
    expect(el).toHaveStyle('height: 100px');
  });
});
