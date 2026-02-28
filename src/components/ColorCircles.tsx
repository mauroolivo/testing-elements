import React from 'react';

export default function ColorCircles() {
  const colors = ['red', 'green', 'blue', 'yellow', 'purple'];

  return (
    <div className="flex gap-4" aria-label="color-circles">
      {colors.map((c, i) => (
        <div
          key={c}
          data-testid={`circle-${i + 1}`}
          role="img"
          aria-label={`circle-${i + 1}`}
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: c,
            borderRadius: '50px',
          }}
        />
      ))}
    </div>
  );
}
