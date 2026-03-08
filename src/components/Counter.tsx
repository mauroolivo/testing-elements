'use client';

import React, { JSX, useState } from 'react';

export default function Counter(): JSX.Element {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Counter</h2>
      <p aria-label="count-value">{count}</p>

      <div>
        <button type="button" onClick={() => setCount((prev) => prev - 1)}>
          Decrement
        </button>
        <button type="button" onClick={() => setCount((prev) => prev + 1)}>
          Increment
        </button>
        <button type="button" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </div>
  );
}
