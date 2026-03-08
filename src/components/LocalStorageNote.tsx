'use client';

import React, { JSX, useEffect, useState } from 'react';

const STORAGE_KEY = 'favorite-note';

export default function LocalStorageNote(): JSX.Element {
  const [state, setState] = useState(() => ({
    note: '',
    savedMessage: 'No saved note yet.',
  }));

  useEffect(() => {
    try {
      const n = window.localStorage.getItem(STORAGE_KEY);
      if (n) {
        // defer the state update to the next microtask to avoid
        // calling setState synchronously inside the effect which
        // can trigger cascading renders in some React versions.
        Promise.resolve().then(() =>
          setState((prev) =>
            prev.note === n
              ? prev
              : { note: n, savedMessage: `Saved note: ${n}` }
          )
        );
      }
    } catch {
      // ignore read errors
    }
  }, []);

  function handleSave() {
    window.localStorage.setItem(STORAGE_KEY, state.note);
    setState((s) => ({ ...s, savedMessage: `Saved note: ${s.note}` }));
  }

  return (
    <section>
      <h2>LocalStorage note</h2>

      <label htmlFor="note-input">Note</label>
      <input
        id="note-input"
        value={state.note}
        onChange={(event) =>
          setState((s) => ({ ...s, note: event.target.value }))
        }
      />

      <button type="button" onClick={handleSave}>
        Save note
      </button>

      <p>{state.savedMessage}</p>
    </section>
  );
}
