'use client';

import { useState } from 'react';

type LoginFormProps = {
  onSubmit?: (credentials: { username: string; password: string }) => void;
};

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit?.({ username, password });
  }

  return (
    <form onSubmit={handleSubmit} aria-label="form">
      <h3 id="login-form-heading" className="sr-only">
        Sign in
      </h3>

      <div>
        <label htmlFor="login-username">Username</label>
        <input
          id="login-username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-label="username"
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="password"
          aria-required="true"
        />
      </div>

      <button type="submit" aria-label="Sign in">
        Sign in
      </button>
    </form>
  );
}
