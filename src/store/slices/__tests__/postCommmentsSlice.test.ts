import { configureStore } from '@reduxjs/toolkit';
import {
  postCommmentsSlice,
  fetchPostComments,
  postCommmentsState,
} from '../postCommmentsSlice';

describe('postCommmentsSlice reducer', () => {
  const initialState: postCommmentsState = {
    comments: [],
    status: 'idle',
    error: null,
  };

  it('returns the initial state', () => {
    const state = postCommmentsSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('handles pending', () => {
    const state = postCommmentsSlice.reducer(initialState, {
      type: fetchPostComments.pending.type,
    });
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('handles fulfilled', () => {
    const payload = [{ postId: 1, id: 1, name: 'n', email: 'e', body: 'b' }];
    const state = postCommmentsSlice.reducer(initialState, {
      type: fetchPostComments.fulfilled.type,
      payload,
    });
    expect(state.status).toBe('succeeded');
    expect(state.comments).toEqual(payload);
  });

  it('handles rejected with payload', () => {
    const action = {
      type: fetchPostComments.rejected.type,
      payload: 'some error',
      error: { message: 'ignored' },
    } as unknown as ReturnType<typeof fetchPostComments.rejected>;
    const state = postCommmentsSlice.reducer(initialState, action);
    expect(state.status).toBe('failed');
    expect(state.error).toBe('some error');
  });

  it('handles rejected without payload', () => {
    const action = {
      type: fetchPostComments.rejected.type,
      error: { message: 'network' },
    } as unknown as ReturnType<typeof fetchPostComments.rejected>;
    const state = postCommmentsSlice.reducer(initialState, action);
    expect(state.status).toBe('failed');
    expect(state.error).toBe('network');
  });
});

describe('fetchPostComments thunk (integration)', () => {
  const globalWithFetch = globalThis as unknown as { fetch?: jest.Mock };
  const originalFetch = globalWithFetch.fetch;

  beforeEach(() => {
    jest.useFakeTimers();
    globalWithFetch.fetch = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
    globalWithFetch.fetch = originalFetch;
  });

  it('dispatches fulfilled and stores comments on success', async () => {
    const comments = [{ postId: 1, id: 1, name: 'n', email: 'e', body: 'b' }];

    globalWithFetch.fetch!.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(comments),
    });

    const store = configureStore({
      reducer: { postComments: postCommmentsSlice.reducer },
    });

    const promise = store.dispatch(fetchPostComments(1));
    // advance the artificial delay inside the thunk
    jest.advanceTimersByTime(1000);
    await promise;

    const state = store.getState().postComments;
    expect(state.status).toBe('succeeded');
    expect(state.comments).toEqual(comments);
  });

  it('dispatches rejected on non-ok response', async () => {
    globalWithFetch.fetch!.mockResolvedValueOnce({ ok: false, status: 500 });

    const store = configureStore({
      reducer: { postComments: postCommmentsSlice.reducer },
    });

    const promise = store.dispatch(fetchPostComments(1));
    jest.advanceTimersByTime(1000);
    await promise;

    const state = store.getState().postComments;
    expect(state.status).toBe('failed');
    expect(state.error).toMatch(/Request failed/);
  });
});
