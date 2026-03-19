'use client';

import { List, useListRef, type RowComponentProps } from 'react-window';
import { useCallback, useMemo, useState } from 'react';

type Product = {
  id: number;
  name: string;
  category: 'Books' | 'Electronics' | 'Games';
  price: number;
};

type ProductRowProps = {
  items: Product[];
  selectedId: number | null;
  onSelect: (productId: number) => void;
};

const PRODUCTS: Product[] = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
  category:
    index % 3 === 0 ? 'Books' : index % 3 === 1 ? 'Electronics' : 'Games',
  price: 10 + ((index * 7) % 90),
}));

function ProductRow({
  ariaAttributes,
  index,
  style,
  items,
  selectedId,
  onSelect,
}: RowComponentProps<ProductRowProps>) {
  const product = items[index];
  const isSelected = product.id === selectedId;

  return (
    <div style={style} className="px-3 py-2">
      <button
        type="button"
        {...ariaAttributes}
        onClick={() => onSelect(product.id)}
        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
          isSelected
            ? 'border-sky-700 bg-sky-50 dark:border-sky-400 dark:bg-sky-500/10'
            : 'border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600'
        }`}
      >
        <div>
          <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            {product.name}
          </p>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
            {product.category}
          </p>
        </div>

        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
          ${product.price}
        </span>
      </button>
    </div>
  );
}

export default function ReactWindowPage() {
  const listRef = useListRef(null);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(25);
  const [visibleRows, setVisibleRows] = useState({
    startIndex: 0,
    stopIndex: 0,
  });

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return PRODUCTS;
    }

    return PRODUCTS.filter((product) =>
      product.name.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  const selectedIndex = selectedId
    ? filteredProducts.findIndex((product) => product.id === selectedId)
    : -1;

  const selectedProduct =
    filteredProducts.find((product) => product.id === selectedId) ?? null;

  const handleRowsRendered = useCallback(
    (visible: { startIndex: number; stopIndex: number }) => {
      setVisibleRows((currentRows) => {
        if (
          currentRows.startIndex === visible.startIndex &&
          currentRows.stopIndex === visible.stopIndex
        ) {
          return currentRows;
        }

        return visible;
      });
    },
    []
  );

  return (
    <main className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col gap-8 px-6 py-10">
      <section className="rounded-4xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <p className="text-sm tracking-[0.2em] text-zinc-500 uppercase dark:text-zinc-400">
          React Window
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-950 dark:text-zinc-50">
          Simple virtualized list example
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-zinc-600 dark:text-zinc-300">
          This page renders a large product list with `react-window`. Only the
          visible rows and a small overscan region are mounted, which keeps the
          list responsive even with 1,000 items.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(320px,420px)_minmax(0,1fr)]">
        <aside className="rounded-4xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-800">
          <label className="grid gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-100">
            Search product
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Type a product name"
              className="rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 transition outline-none focus:border-sky-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </label>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                if (selectedIndex >= 0) {
                  listRef.current?.scrollToRow({
                    align: 'center',
                    behavior: 'smooth',
                    index: selectedIndex,
                  });
                }
              }}
              className="rounded-full bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-800"
            >
              Scroll to selected
            </button>
          </div>

          <div className="mt-6 grid gap-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
              <p className="text-xs tracking-[0.18em] text-zinc-500 uppercase dark:text-zinc-400">
                Filtered items
              </p>
              <p className="mt-2 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
                {filteredProducts.length}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
              <p className="text-xs tracking-[0.18em] text-zinc-500 uppercase dark:text-zinc-400">
                Visible rows
              </p>
              <p className="mt-2 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                {visibleRows.startIndex} - {visibleRows.stopIndex}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
              <p className="text-xs tracking-[0.18em] text-zinc-500 uppercase dark:text-zinc-400">
                Selected product
              </p>
              {selectedProduct ? (
                <div className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
                  <p className="font-semibold">{selectedProduct.name}</p>
                  <p>{selectedProduct.category}</p>
                  <p>${selectedProduct.price}</p>
                </div>
              ) : (
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                  No selected product in the current filter.
                </p>
              )}
            </div>
          </div>
        </aside>

        <div className="overflow-hidden rounded-4xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <List
            rowComponent={ProductRow}
            rowCount={filteredProducts.length}
            rowHeight={76}
            rowProps={{
              items: filteredProducts,
              selectedId,
              onSelect: setSelectedId,
            }}
            listRef={listRef}
            onRowsRendered={handleRowsRendered}
            overscanCount={4}
            defaultHeight={560}
            style={{ height: 560 }}
          />
        </div>
      </section>
    </main>
  );
}
