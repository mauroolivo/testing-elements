'use client';

import { startTransition, useState } from 'react';
import styles from './page.module.css';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type RequestPreset = {
  id: string;
  title: string;
  description: string;
  method: RequestMethod;
  url: string;
  buttonLabel: string;
  body?: Record<string, unknown>;
};

type RequestResult = {
  phase: 'idle' | 'loading' | 'success' | 'error';
  request: {
    method: RequestMethod;
    url: string;
    startedAt: string;
    body?: Record<string, unknown>;
  } | null;
  response: {
    status: number;
    statusText: string;
    durationMs: number;
    contentType: string | null;
  } | null;
  payload: unknown;
  error: string | null;
};

const presets: RequestPreset[] = [
  {
    id: 'featured-product',
    title: 'Featured product',
    description:
      'GET a single product record and inspect the compact response metadata.',
    method: 'GET',
    url: 'https://dummyjson.com/products/7',
    buttonLabel: 'Fetch product',
  },
  {
    id: 'search-phone',
    title: 'Search catalog',
    description:
      'GET a filtered collection using query params to compare payload size and timing.',
    method: 'GET',
    url: 'https://dummyjson.com/products/search?q=phone',
    buttonLabel: 'Search phone',
  },
  {
    id: 'create-todo',
    title: 'Create todo',
    description:
      'POST a small JSON body and review how the service echoes the created resource.',
    method: 'POST',
    url: 'https://dummyjson.com/todos/add',
    buttonLabel: 'Create todo',
    body: {
      todo: 'Review MSW 2 request handling',
      completed: false,
      userId: 12,
    },
  },
  {
    id: 'delete-todo',
    title: 'Delete todo',
    description:
      'DELETE a resource and inspect the minimal confirmation payload returned by the API.',
    method: 'DELETE',
    url: 'https://dummyjson.com/todos/13',
    buttonLabel: 'Delete todo 13',
  },
];

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

function getElapsedClock(): number {
  return globalThis.performance?.now?.() ?? Date.now();
}

function createLoadingResult(preset: RequestPreset): RequestResult {
  return {
    phase: 'loading',
    request: {
      method: preset.method,
      url: preset.url,
      startedAt: new Date().toISOString(),
      body: preset.body,
    },
    response: null,
    payload: null,
    error: null,
  };
}

function formatPayload(payload: unknown): string {
  if (payload === null || payload === undefined) {
    return 'No JSON payload returned.';
  }

  return JSON.stringify(payload, null, 2);
}

function getMethodClasses(method: RequestMethod): string {
  switch (method) {
    case 'GET':
      return 'bg-sky-100 text-sky-700 ring-1 ring-sky-200 dark:bg-sky-500/20 dark:text-sky-200 dark:ring-sky-400/30';
    case 'POST':
      return 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-200 dark:ring-emerald-400/30';
    case 'PUT':
      return 'bg-amber-100 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-500/20 dark:text-amber-200 dark:ring-amber-400/30';
    case 'DELETE':
      return 'bg-rose-100 text-rose-700 ring-1 ring-rose-200 dark:bg-rose-500/20 dark:text-rose-200 dark:ring-rose-400/30';
  }
}

export default function RequestLabPage() {
  const [results, setResults] = useState<Record<string, RequestResult>>({});

  async function runPreset(preset: RequestPreset) {
    setResults((current) => ({
      ...current,
      [preset.id]: createLoadingResult(preset),
    }));

    const startedAt = new Date().toISOString();
    const started = getElapsedClock();

    try {
      const response = await fetch(preset.url, {
        method: preset.method,
        headers: preset.body
          ? { 'Content-Type': 'application/json' }
          : undefined,
        body: preset.body ? JSON.stringify(preset.body) : undefined,
        cache: 'no-store',
      });

      const durationMs = Math.round(getElapsedClock() - started);
      const contentType = response.headers.get('content-type');
      let payload: unknown = null;

      if (contentType?.includes('application/json')) {
        payload = await response.json();
      } else {
        const text = await response.text();
        payload = text ? { raw: text } : null;
      }

      startTransition(() => {
        setResults((current) => ({
          ...current,
          [preset.id]: {
            phase: response.ok ? 'success' : 'error',
            request: {
              method: preset.method,
              url: preset.url,
              startedAt,
              body: preset.body,
            },
            response: {
              status: response.status,
              statusText:
                response.statusText || (response.ok ? 'OK' : 'Request failed'),
              durationMs,
              contentType,
            },
            payload,
            error: response.ok
              ? null
              : `Request failed with status ${response.status}`,
          },
        }));
      });
    } catch (error: unknown) {
      const durationMs = Math.round(getElapsedClock() - started);
      const message =
        error instanceof Error ? error.message : 'Network request failed';

      startTransition(() => {
        setResults((current) => ({
          ...current,
          [preset.id]: {
            phase: 'error',
            request: {
              method: preset.method,
              url: preset.url,
              startedAt,
              body: preset.body,
            },
            response: {
              status: 0,
              statusText: 'Network error',
              durationMs,
              contentType: null,
            },
            payload: null,
            error: message,
          },
        }));
      });
    }
  }

  return (
    <div
      className={`${styles.pageShell} px-6 py-10 text-zinc-900 dark:text-zinc-100`}
    >
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section
          className={`${styles.heroCard} overflow-hidden rounded-4xl border border-white/70 bg-white/80 p-8 backdrop-blur dark:border-white/10 dark:bg-slate-900/70`}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-semibold tracking-[0.3em] text-amber-600 uppercase dark:text-amber-300">
                Request Lab
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">
                Four external requests, one compact debugging surface.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
                This page talks to DummyJSON from the browser so you can inspect
                real request timing, status codes, payloads, and small JSON
                responses before introducing MSW 2 into your tests.
              </p>
            </div>
            <div className="grid gap-3 rounded-2xl border border-zinc-200/70 bg-zinc-950 px-5 py-4 text-sm text-zinc-100 dark:border-zinc-700 dark:bg-slate-950">
              <span className="font-medium text-zinc-300">Live endpoints</span>
              <span>2 GET</span>
              <span>1 POST</span>
              <span>1 DELETE</span>
            </div>
          </div>
        </section>

        <section className="grid gap-4">
          {presets.map((preset) => {
            const result = results[preset.id];
            const isLoading = result?.phase === 'loading';

            return (
              <article
                key={preset.id}
                className={`${styles.actionCard} grid gap-4 rounded-[1.75rem] border border-white/70 bg-white/85 p-5 backdrop-blur lg:grid-cols-[260px_minmax(0,1fr)] dark:border-white/10 dark:bg-slate-900/70`}
              >
                <div className="flex flex-col justify-between gap-4">
                  <div className="space-y-3">
                    <span
                      className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold tracking-[0.2em] uppercase ${getMethodClasses(
                        preset.method
                      )}`}
                    >
                      {preset.method}
                    </span>
                    <div>
                      <h2 className="text-xl font-semibold text-zinc-950 dark:text-white">
                        {preset.title}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                        {preset.description}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => void runPreset(preset)}
                    disabled={isLoading}
                    className="inline-flex items-center justify-center rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-wait disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                  >
                    {isLoading ? 'Calling service…' : preset.buttonLabel}
                  </button>
                </div>

                <div className="rounded-3xl border border-zinc-200 bg-zinc-50/90 p-4 dark:border-zinc-800 dark:bg-slate-950/70">
                  {!result && (
                    <div className="flex min-h-full flex-col justify-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                      <p className="font-medium text-zinc-700 dark:text-zinc-200">
                        No request fired yet.
                      </p>
                      <p>
                        Click the button to capture request method, URL, status,
                        duration, and the returned JSON body.
                      </p>
                    </div>
                  )}

                  {result && (
                    <div className="grid gap-4">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
                        <span
                          className={`rounded-full px-3 py-1 ${getMethodClasses(result.request?.method ?? preset.method)}`}
                        >
                          {result.request?.method ?? preset.method}
                        </span>
                        <span className="rounded-full bg-zinc-200 px-3 py-1 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                          {result.response
                            ? `${result.response.status} ${result.response.statusText}`
                            : 'Pending'}
                        </span>
                        <span className="rounded-full bg-zinc-200 px-3 py-1 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                          {result.response
                            ? `${result.response.durationMs} ms`
                            : 'Running'}
                        </span>
                        <span className="rounded-full bg-zinc-200 px-3 py-1 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                          {result.request
                            ? timeFormatter.format(
                                new Date(result.request.startedAt)
                              )
                            : 'Waiting'}
                        </span>
                      </div>

                      <dl className="grid gap-3 text-sm sm:grid-cols-2">
                        <div>
                          <dt className="font-medium text-zinc-500 dark:text-zinc-400">
                            Request URL
                          </dt>
                          <dd className="break-all text-zinc-800 dark:text-zinc-100">
                            {result.request?.url}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-medium text-zinc-500 dark:text-zinc-400">
                            Response type
                          </dt>
                          <dd className="text-zinc-800 dark:text-zinc-100">
                            {result.response?.contentType ?? 'No content type'}
                          </dd>
                        </div>
                      </dl>

                      {result.request?.body && (
                        <div className="grid gap-2 rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-slate-900">
                          <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase dark:text-zinc-400">
                            Request Body
                          </p>
                          <pre className="overflow-auto text-xs leading-6 text-zinc-700 dark:text-zinc-200">
                            {JSON.stringify(result.request.body, null, 2)}
                          </pre>
                        </div>
                      )}

                      <div className="grid gap-2 rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-slate-900">
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase dark:text-zinc-400">
                            Response JSON
                          </p>
                          {result.error && (
                            <span className="text-xs font-medium text-rose-600 dark:text-rose-300">
                              {result.error}
                            </span>
                          )}
                        </div>
                        <pre
                          className={`${styles.jsonPanel} overflow-auto text-xs leading-6 text-zinc-700 dark:text-zinc-200`}
                        >
                          {formatPayload(result.payload)}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}
