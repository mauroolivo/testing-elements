'use client';

import { useUser } from '@/context/UserContext';

export default function ProfileUserPanel() {
  const { userName, permissions, loading, handleSignIn, handleSignOut } =
    useUser();

  const isLoggedIn = Boolean(userName);

  return (
    <section className="w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm tracking-[0.2em] text-zinc-500 uppercase dark:text-zinc-400">
            Profile
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
            {isLoggedIn ? userName : 'Guest user'}
          </h1>
          <p className="mt-3 max-w-xl text-sm text-zinc-600 dark:text-zinc-300">
            {isLoggedIn
              ? 'The current session is active. Permissions shown below come from the shared user context.'
              : 'No active session. Sign in to populate the profile with the current user data.'}
          </p>
        </div>

        {isLoggedIn ? (
          <button
            type="button"
            onClick={handleSignOut}
            disabled={loading}
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => handleSignIn('Mauro', ['read', 'write'])}
            disabled={loading}
            className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        )}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
          <p className="text-xs tracking-[0.18em] text-zinc-500 uppercase dark:text-zinc-400">
            Username
          </p>
          <p className="mt-2 text-lg font-medium text-zinc-900 dark:text-zinc-100">
            {userName ?? 'Not signed in'}
          </p>
        </article>

        <article className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
          <p className="text-xs tracking-[0.18em] text-zinc-500 uppercase dark:text-zinc-400">
            Status
          </p>
          <p className="mt-2 text-lg font-medium text-zinc-900 dark:text-zinc-100">
            {loading
              ? 'Updating session'
              : isLoggedIn
                ? 'Authenticated'
                : 'Anonymous'}
          </p>
        </article>
      </div>

      <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
        <p className="text-xs tracking-[0.18em] text-zinc-500 uppercase dark:text-zinc-400">
          Permissions
        </p>
        {permissions?.length ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {permissions.map((permission) => (
              <li
                key={permission}
                className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900"
              >
                {permission}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            No permissions available for the current session.
          </p>
        )}
      </div>
    </section>
  );
}
