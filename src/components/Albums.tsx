'use client';

import { useGetAlbumsQuery } from '@/store/services/albumsApi';

export default function Albums() {
  const { data, isLoading, isError, error, isSuccess } = useGetAlbumsQuery();

  return (
    <section className="mt-6 w-full max-w-2xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
      <h2 className="text-xl font-semibold">Albums</h2>

      {isLoading && (
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
          Loading albums...
        </p>
      )}

      {isError && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">
          Failed to load albums:{' '}
          {'status' in (error as object)
            ? JSON.stringify(error)
            : 'Unknown error'}
        </p>
      )}

      {isSuccess && (
        <ul className="mt-4 space-y-2">
          {data.slice(0, 10).map((album) => (
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
