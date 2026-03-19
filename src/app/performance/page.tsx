'use client';

import { memo, useCallback, useState } from 'react';

type RowItem = {
  id: number;
  value: string;
};

type RenderCounts = Record<number, number>;

type NaiveRowProps = {
  row: RowItem;
  renderCount: number;
  onChange: (id: number, value: string) => void;
};

type OptimizedRowProps = {
  row: RowItem;
  renderCount: number;
  onChange: (id: number, value: string) => void;
};

function createRows() {
  return Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    value: `Row ${index + 1}`,
  }));
}

function createRenderCounts() {
  return Object.fromEntries(
    Array.from({ length: 10 }, (_, index) => [index + 1, 1])
  ) as RenderCounts;
}

function RenderCountBadge({ count }: { count: number }) {
  return (
    <span className="rounded-full bg-zinc-900 px-2 py-1 text-xs font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
      Render count: {count}
    </span>
  );
}

function NaiveRowComponent({ row, renderCount, onChange }: NaiveRowProps) {
  return (
    <article className="grid gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Row {row.id}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            This row rerenders whenever the parent list rerenders.
          </p>
        </div>
        <RenderCountBadge count={renderCount} />
      </div>

      <label className="grid gap-2 text-sm text-zinc-700 dark:text-zinc-200">
        Value
        <input
          aria-label={`Naive row ${row.id} value`}
          className="rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 transition outline-none focus:border-sky-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          value={row.value}
          onChange={(event) => onChange(row.id, event.target.value)}
        />
      </label>
    </article>
  );
}

const OptimizedRowComponent = memo(function OptimizedRowComponent({
  row,
  renderCount,
  onChange,
}: OptimizedRowProps) {
  return (
    <article className="grid gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Row {row.id}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            This row rerenders only when its own props change.
          </p>
        </div>
        <RenderCountBadge count={renderCount} />
      </div>

      <label className="grid gap-2 text-sm text-zinc-700 dark:text-zinc-200">
        Value
        <input
          aria-label={`Optimized row ${row.id} value`}
          className="rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 transition outline-none focus:border-sky-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          value={row.value}
          onChange={(event) => onChange(row.id, event.target.value)}
        />
      </label>
    </article>
  );
});

export default function PerformancePage() {
  const [naiveRows, setNaiveRows] = useState<RowItem[]>(() => createRows());
  const [naiveRenderCounts, setNaiveRenderCounts] = useState<RenderCounts>(() =>
    createRenderCounts()
  );
  const [optimizedRows, setOptimizedRows] = useState<RowItem[]>(() =>
    createRows()
  );
  const [optimizedRenderCounts, setOptimizedRenderCounts] =
    useState<RenderCounts>(() => createRenderCounts());

  const handleNaiveRowChange = (id: number, value: string) => {
    setNaiveRows((currentRows) =>
      currentRows.map((currentRow) =>
        currentRow.id === id ? { ...currentRow, value } : currentRow
      )
    );
    setNaiveRenderCounts(
      (currentCounts) =>
        Object.fromEntries(
          Object.entries(currentCounts).map(([rowId, count]) => [
            rowId,
            count + 1,
          ])
        ) as RenderCounts
    );
  };

  const handleOptimizedRowChange = useCallback((id: number, value: string) => {
    setOptimizedRows((currentRows) =>
      currentRows.map((currentRow) =>
        currentRow.id === id ? { ...currentRow, value } : currentRow
      )
    );
    setOptimizedRenderCounts((currentCounts) => ({
      ...currentCounts,
      [id]: currentCounts[id] + 1,
    }));
  }, []);

  return (
    <main className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col gap-8 px-6 py-10">
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <p className="text-sm tracking-[0.2em] text-zinc-500 uppercase dark:text-zinc-400">
          Performance
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
          Row rerender comparison
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-zinc-600 dark:text-zinc-300">
          The first list is intentionally naive: updating one row rerenders
          every row. The second list keeps row props stable and memoizes each
          row so only the changed item rerenders.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section
          aria-label="Naive list"
          className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-800"
        >
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Naive list
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Every row refreshes after a single update.
          </p>
          <div className="mt-5 grid gap-4">
            {naiveRows.map((row) => (
              <NaiveRowComponent
                key={row.id}
                row={row}
                renderCount={naiveRenderCounts[row.id]}
                onChange={handleNaiveRowChange}
              />
            ))}
          </div>
        </section>

        <section
          aria-label="Optimized list"
          className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-800"
        >
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Optimized list
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            Unchanged rows keep the same props and skip rerendering.
          </p>
          <div className="mt-5 grid gap-4">
            {optimizedRows.map((row) => (
              <OptimizedRowComponent
                key={row.id}
                row={row}
                renderCount={optimizedRenderCounts[row.id]}
                onChange={handleOptimizedRowChange}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
