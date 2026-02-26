import React from 'react';

type Variant = 'info' | 'success' | 'danger';

type PillProps = {
  variant?: Variant;
  label: string;
};

export default function Pill({ variant = 'info', label }: PillProps) {
  return (
    <span role="status" className={`pill pill-${variant}`}>
      {label}
    </span>
  );
}
