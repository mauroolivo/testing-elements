'use client';

import { useEffect } from 'react';
import { fetchAlbums } from '@/store/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function Albums() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.albums.items);
  const status = useAppSelector((state) => state.albums.status);
  const error = useAppSelector((state) => state.albums.error);

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchAlbums());
    }
  }, [dispatch, status]);

  return (
    <section className="mt-6 w-full max-w-2xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
      <h2 className="text-xl font-semibold">Albums</h2>

      {status === 'loading' && (
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
          Loading albums...
        </p>
      )}

      {status === 'failed' && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">
          Failed to load albums: {error}
        </p>
      )}

      {status === 'succeeded' && (
        <ul className="mt-4 space-y-2">
          {items.slice(0, 10).map((album) => (
            <li
              key={album.id}
              className="rounded-md border border-zinc-200 p-3 text-sm dark:border-zinc-700"
            >
              <span className="font-medium">#{album.id}</span> {album.title}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
