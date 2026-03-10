import React, { JSX } from 'react';
import usePost from '../app/hooks/usePost';

type Props = {
  id: number | string;
};

export default function PostViewer({ id }: Props): JSX.Element {
  const { data, loading, error, refetch } = usePost(id);

  return (
    <div className="mx-auto my-3 max-w-3xl rounded-lg border border-transparent bg-transparent p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="m-0 text-lg font-semibold text-gray-100">
          {loading ? 'Loading…' : error ? 'Error' : data?.title}
        </h3>

        <div className="flex items-center gap-2">
          <button
            onClick={refetch}
            className="rounded-md border border-gray-600 bg-gray-700 px-3 py-1 text-sm text-white hover:bg-gray-600"
          >
            Refresh
          </button>
        </div>
      </div>

      {loading && <p className="mt-3 text-gray-300">Fetching post #{id}…</p>}
      {error && <p className="mt-3 text-red-300">Error: {error}</p>}

      {data && (
        <div className="mt-3 text-gray-100">
          <p className="m-0 mb-2 leading-relaxed text-gray-200">{data.body}</p>
          <div className="mt-2 text-sm text-gray-400">
            <span className="mr-3">Post ID: {data.id}</span>
            <span>User ID: {data.userId}</span>
          </div>
        </div>
      )}
    </div>
  );
}
