import React, { JSX } from 'react';

const VERBS = [
  'be',
  'have',
  'do',
  'say',
  'get',
  'make',
  'go',
  'know',
  'take',
  'see',
  'come',
  'think',
  'look',
  'want',
  'give',
  'use',
  'find',
  'tell',
  'ask',
  'work',
];

export default function SimpleList(): JSX.Element {
  const now = new Date();
  const formatted = now.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return (
    <div>
      <div aria-label="date-now">{formatted}</div>
      <ul aria-label="verbs-list">
        {VERBS.map((v) => (
          <li key={v}>{v}</li>
        ))}
      </ul>
    </div>
  );
}

export { VERBS };
