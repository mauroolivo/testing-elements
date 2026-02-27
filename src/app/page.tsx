'use client';
import LoginForm from '@/components/LoginForm';
import FakeLinks from '@/components/FakeLinks';
import StatusBadge from '@/components/StatusBadge';

/**
 * a11y
 * 1st: eslint plugin
 * 2nd: axe-core for runtime testing in dev (see below)
 * 3rd: browser extensions for manual testing
 */
import React from 'react';
import ReactDOM from 'react-dom';
import EventsTrigger from '@/components/EventsTrigger';
import SquareGame from '@/components/SquareGame';
console.log('Loading axe-core for accessibility testing...');
if (process.env.NODE_ENV !== 'production') {
  import('@axe-core/react').then((axe) => {
    axe.default(React, ReactDOM, 1000);
  });
}

export default function Home() {
  function handleLogin(data: { username: string; password: string }) {
    // placeholder handler for the demo page
    // in real app, call your auth API here
    console.log('login', data);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
      <main className="flex w-full max-w-3xl flex-col items-center justify-center px-6 py-12 sm:items-start">
        <div className="mx-auto w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
          <h1 className="text-2xl font-semibold">Demo Page</h1>

          <div className="mb-4 flex items-center justify-between">
            <StatusBadge status="success" />
            <div className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">
              Testing Elements
            </div>
          </div>
          <h2 className="mb-6 text-2xl font-semibold">Sign in</h2>
          <div className="space-y-6">
            <LoginForm onSubmit={handleLogin} />
            <div>
              <h3 className="mb-3 text-lg font-medium">Quick links</h3>
              <div className="rounded-md border border-dashed border-zinc-100 p-4 dark:border-zinc-700">
                <FakeLinks />
              </div>
            </div>
            <div className="pt-2">
              <EventsTrigger />
            </div>
            <SquareGame />
          </div>
        </div>
      </main>
    </div>
  );
}
