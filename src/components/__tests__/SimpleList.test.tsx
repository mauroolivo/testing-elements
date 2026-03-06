import React from 'react';
import { render } from '@testing-library/react';
import SimpleList from '../SimpleList';

describe('SimpleList', () => {
  test('matches snapshot', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-03-06T12:34:56Z'));
    const { asFragment } = render(<SimpleList />);
    expect(asFragment()).toMatchSnapshot();
    jest.useRealTimers();
  });
});
