import { render, waitFor } from '@testing-library/react';
import usePost, { Post } from '../usePost';

// Minimal local renderHook helper using the project's testing library
function renderHook<T>(callback: () => T) {
  const result: { current?: T } = { current: undefined };

  function Test() {
    result.current = callback();
    return null;
  }

  render(<Test />);
  return { result };
}

describe('usePost', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('loads post data on success', async () => {
    const mockData: Post = { userId: 1, id: 1, title: 'Hello', body: 'World' };
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });
    globalThis.fetch = mockFetch as unknown as typeof globalThis.fetch;

    const { result } = renderHook(() => usePost(1));

    await waitFor(() => expect(result.current).toBeDefined());

    // wait until data is available
    await waitFor(() => expect(result.current!.data).toEqual(mockData));

    expect(result.current!.loading).toBe(false);
    expect(result.current!.error).toBeNull();
  });

  it('sets error when fetch fails (non-ok)', async () => {
    const mockFail = jest.fn().mockResolvedValue({ ok: false, status: 500 });
    globalThis.fetch = mockFail as unknown as typeof globalThis.fetch;

    const { result } = renderHook(() => usePost(123));

    await waitFor(() => expect(result.current).toBeDefined());

    await waitFor(() => expect(result.current!.error).toBeTruthy());

    expect(result.current!.data).toBeNull();
    expect(result.current!.loading).toBe(false);
  });
});
