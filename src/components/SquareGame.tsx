import React, { useState } from 'react';

export default function SquareGame() {
  const [expanded, setExpanded] = useState(false);
  const size = expanded ? 150 : 100;

  return (
    <div className="flex flex-col items-start gap-4">
      <div
        role="img"
        aria-label={`Square ${size} by ${size}`}
        data-testid="square"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background: 'linear-gradient(135deg,#60a5fa,#2563eb)',
          transition: 'width 300ms ease, height 300ms ease',
          borderRadius: 8,
          border: '2px solid rgba(2,6,23,0.06)',
        }}
      />

      <button
        type="button"
        onClick={() => setExpanded((s) => !s)}
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        aria-pressed={expanded}
      >
        {expanded ? 'Shrink' : 'Grow'}
      </button>
    </div>
  );
}
