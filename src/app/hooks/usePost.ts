import { useEffect, useState, useCallback } from 'react';

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type UsePostResult = {
  data: Post | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export default function usePost(id: number | string | null): UsePostResult {
  const [data, setData] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState(0);

  const refetch = useCallback(() => {
    setVersion((v) => v + 1);
  }, []);

  useEffect(() => {
    if (id === null || id === undefined || id === '') return;

    let cancelled = false;
    const abortCtrl = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`,
          {
            signal: abortCtrl.signal,
          }
        );
        if (!res.ok) throw new Error(String(res.status));
        const json = (await res.json()) as Post;
        if (!cancelled) setData(json);
      } catch (err: unknown) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : String(err);
          setError(message || 'Failed to load post');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();

    return () => {
      cancelled = true;
      abortCtrl.abort();
    };
  }, [id, version]);

  return { data, loading, error, refetch };
}
