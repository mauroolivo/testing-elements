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
  return (
    <div>
      <div aria-label="date-now">{new Date().toLocaleString()}</div>
      <ul aria-label="verbs-list">
        {VERBS.map((v) => (
          <li key={v}>{v}</li>
        ))}
      </ul>
    </div>
  );
}

export { VERBS };
