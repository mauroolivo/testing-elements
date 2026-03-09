import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import useScreenSize from '../useScreenSize';

type ScreenSize = {
  width: number;
  height: number;
  breakpoint: string;
};

// Minimal local renderHook helper using the project's testing library
function renderHook(callback: () => ScreenSize) {
  const result: { current?: ScreenSize } = { current: undefined };

  function Test() {
    result.current = callback();
    return null;
  }

  render(<Test />);
  return { result };
}

describe('useScreenSize (renderHook)', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768,
    });
  });

  it('provides initial size and updates on resize', async () => {
    const { result } = renderHook(() => useScreenSize());

    // effect runs after mount; wait for the hook to sync
    await waitFor(() => expect(result.current).toBeDefined());

    expect(result.current!.width).toBe(1024);
    expect(result.current!.height).toBe(768);
    expect(result.current!.breakpoint).toBe('lg');

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1400,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 900,
      });
      window.dispatchEvent(new Event('resize'));
    });

    await waitFor(() => expect(result.current!.width).toBe(1400));

    expect(result.current!.height).toBe(900);
    expect(result.current!.breakpoint).toBe('xl');
  });
});
