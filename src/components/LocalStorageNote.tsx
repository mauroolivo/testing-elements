'use client';

import React, { JSX, useState } from 'react';

const STORAGE_KEY = 'favorite-note';

export default function LocalStorageNote(): JSX.Element {
  const [note, setNote] = useState(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY) ?? '';
    } catch {
      return '';
    }
  });

  const [savedMessage, setSavedMessage] = useState(() => {
    try {
      const n = window.localStorage.getItem(STORAGE_KEY) ?? '';
      return n ? `Saved note: ${n}` : 'No saved note yet.';
    } catch {
      return 'No saved note yet.';
    }
  });

  function handleSave() {
    window.localStorage.setItem(STORAGE_KEY, note);
    setSavedMessage(`Saved note: ${note}`);
  }

  return (
    <section>
      <h2>LocalStorage note</h2>

      <label htmlFor="note-input">Note</label>
      <input
        id="note-input"
        value={note}
        onChange={(event) => setNote(event.target.value)}
      />

      <button type="button" onClick={handleSave}>
        Save note
      </button>

      <p>{savedMessage}</p>
    </section>
  );
}
