'use client';

import { useEffect } from 'react';
import { fetchPostComments } from '@/store/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

type PostCommentsProps = {
  postId: number;
};

export default function PostComments({ postId }: PostCommentsProps) {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => state.postComments.comments);
  const status = useAppSelector((state) => state.postComments.status);
  const error = useAppSelector((state) => state.postComments.error);

  useEffect(() => {
    void dispatch(fetchPostComments(postId));
  }, [dispatch, postId]);

  return (
    <section className="mt-6 w-full max-w-2xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
      <h2 className="text-xl font-semibold">Post {postId} Comments</h2>

      {status === 'loading' && (
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
          Loading comments...
        </p>
      )}

      {status === 'failed' && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">
          Failed to load comments: {error}
        </p>
      )}

      {status === 'succeeded' && (
        <ul className="mt-4 space-y-3">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="rounded-md border border-zinc-200 p-3 dark:border-zinc-700"
            >
              <p className="text-sm font-medium">{comment.name}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {comment.email}
              </p>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
                {comment.body}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
