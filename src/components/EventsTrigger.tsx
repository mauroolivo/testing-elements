import React, { useState } from 'react';

export default function EventsTrigger() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    await new Promise((res) => setTimeout(res, 50));
    setError(null);
    setSuccess(true);
  };

  const triggerError = async () => {
    await new Promise((res) => setTimeout(res, 30));
    setSuccess(false);
    setError('Error');
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleClick}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:outline-none disabled:opacity-50"
        >
          Submit
        </button>

        <button
          type="button"
          onClick={triggerError}
          className="inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:ring-2 focus:ring-red-400 focus:ring-offset-1 focus:outline-none disabled:opacity-50"
        >
          Trigger error
        </button>
      </div>

      {success && (
        <div role="status" className="text-sm font-medium text-emerald-300">
          Success!
        </div>
      )}

      {error && (
        <div role="alert" className="text-sm font-medium text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}
