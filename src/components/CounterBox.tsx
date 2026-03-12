'use client';

import {
  addByAmount,
  addByAmountAsync,
  decrement,
  increment,
} from '@/store/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function CounterBox() {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.counter.value);
  const status = useAppSelector((state) => state.counter.status);

  return (
    <section className="w-full max-w-2xl rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
      <h1 className="text-2xl font-semibold">Redux Counter</h1>
      <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
        Current value
      </p>
      <p className="text-4xl font-bold">{value}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => dispatch(increment())}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Increment
        </button>
        <button
          type="button"
          onClick={() => dispatch(decrement())}
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          Decrement
        </button>
        <button
          type="button"
          onClick={() => dispatch(addByAmount(5))}
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          Add 5
        </button>
        <button
          type="button"
          onClick={() => dispatch(addByAmountAsync(3))}
          disabled={status === 'loading'}
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          {status === 'loading' ? 'Adding...' : 'Add 3 Async'}
        </button>
      </div>
    </section>
  );
}
