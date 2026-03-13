'use client';

import { useDispatch } from 'react-redux';
import { useGetAlbumsQuery, albumsApi } from '@/store/services/albumsApi';

export default function Albums() {
  const dispatch = useDispatch();
  const { data, isLoading, isFetching, isError, error, isSuccess, refetch } =
    useGetAlbumsQuery();

  const handleInvalidate = () => {
    dispatch(albumsApi.util.invalidateTags([{ type: 'Albums', id: 'LIST' }]));
    refetch();
  };

  return (
    <section className="mt-6 w-full max-w-2xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Albums</h2>
        <button
          onClick={handleInvalidate}
          disabled={isFetching}
          className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 disabled:opacity-60"
        >
          {isFetching ? 'Refreshing…' : 'Invalidate & refetch'}
        </button>
      </div>

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
