'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export default function ProtectedPage() {
  const router = useRouter();
  const { userName, permissions, loading } = useUser();
  const isLoggedIn = Boolean(userName);

  useEffect(() => {
    if (loading || isLoggedIn) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      router.replace('/');
    }, 2000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isLoggedIn, loading, router]);

  return (
    <main className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-4xl flex-col gap-6 px-6 py-10">
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <p className="text-sm tracking-[0.2em] text-zinc-500 uppercase dark:text-zinc-400">
          Protected
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
          Protected page
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-zinc-600 dark:text-zinc-300">
          This route reads the shared user session from context and shows
          whether the current visitor is allowed into protected content.
        </p>

        <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-700 dark:bg-zinc-800">
          <p className="text-xs tracking-[0.18em] text-zinc-500 uppercase dark:text-zinc-400">
            Access status
          </p>

          {loading ? (
            <p className="mt-3 text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Checking session...
            </p>
          ) : isLoggedIn ? (
            <div className="mt-3 space-y-3">
              <p className="text-sm text-zinc-700 dark:text-zinc-200">
                Signed in as <span className="font-semibold">{userName}</span>.
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                Permissions:{' '}
                {permissions?.length ? permissions.join(', ') : 'none'}
              </p>
            </div>
          ) : (
            <div className="mt-3 space-y-3">
              <p className="text-sm text-zinc-700 dark:text-zinc-200">
                You must sign in before accessing protected content.
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                Redirecting to login in 2 seconds...
              </p>
              <Link
                href="/profile"
                className="inline-flex w-fit items-center justify-center rounded-full bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-800"
              >
                Go to login now
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
