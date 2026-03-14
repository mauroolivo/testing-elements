'use client';

import type { ComponentProps } from 'react';

type FormSubmitEvent = Parameters<
  NonNullable<ComponentProps<'form'>['onSubmit']>
>[0];

export default function RateApplication() {
  const handleSubmit = (event: FormSubmitEvent) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = {
      userName: String(formData.get('userName') ?? ''),
      rating: Number(formData.get('rating') ?? 0),
    };

    console.log(payload);
  };

  return (
    <section className="w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div>
        <p className="text-sm tracking-[0.2em] text-zinc-500 uppercase dark:text-zinc-400">
          Feedback
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
          Rate Application
        </h2>
        <p className="mt-3 max-w-xl text-sm text-zinc-600 dark:text-zinc-300">
          Share your name and a score from 1 to 5. Submitting the form only logs
          the data for now.
        </p>
      </div>

      <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
        <label className="grid gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-100">
          User name
          <input
            type="text"
            name="userName"
            className="rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 transition outline-none focus:border-sky-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            placeholder="Your name"
            required
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-100">
          Rating (1-5)
          <input
            type="number"
            name="rating"
            min={1}
            max={5}
            className="rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 transition outline-none focus:border-sky-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            placeholder="5"
            required
          />
        </label>

        <button
          type="submit"
          className="mt-2 w-fit rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-500"
        >
          Submit rating
        </button>
      </form>
    </section>
  );
}
