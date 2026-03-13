'use client';

import { useUser } from '@/context/UserContext';

export default function UserSessionControls() {
  const { userName, permissions, loading, handleSignIn, handleSignOut } =
    useUser();

  const isLoggedIn = Boolean(userName);

  const onSignIn = async () => {
    await handleSignIn('Mauro', ['read', 'write']);
  };

  const onSignOut = async () => {
    await handleSignOut();
  };

  return (
    <div className="ml-auto flex items-center gap-3 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800">
      <div className="text-right text-xs leading-tight">
        <p className="font-semibold text-zinc-900 dark:text-zinc-100">
          {isLoggedIn ? userName : 'Guest'}
        </p>
        <p className="text-zinc-500 dark:text-zinc-400">
          {loading
            ? 'Updating session...'
            : permissions?.length
              ? permissions.join(', ')
              : 'No permissions'}
        </p>
      </div>

      {isLoggedIn ? (
        <button
          type="button"
          onClick={onSignOut}
          disabled={loading}
          className="rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Logout
        </button>
      ) : (
        <button
          type="button"
          onClick={onSignIn}
          disabled={loading}
          className="rounded-full bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Login
        </button>
      )}
    </div>
  );
}
