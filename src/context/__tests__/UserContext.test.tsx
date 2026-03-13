import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UserProvider, useUser } from '@/context/UserContext';

function UserConsumer() {
  const { userName, permissions, loading, handleSignIn, handleSignOut } =
    useUser();

  return (
    <div>
      <p>Name: {userName ?? 'Guest'}</p>
      <p>Permissions: {permissions?.join(', ') ?? 'none'}</p>
      <p>Status: {loading ? 'loading' : 'idle'}</p>
      <button type="button" onClick={() => handleSignIn('Mauro', ['read'])}>
        Sign in
      </button>
      <button type="button" onClick={() => handleSignOut()}>
        Sign out
      </button>
    </div>
  );
}

describe('UserProvider', () => {
  it('exposes default guest state through the provider', () => {
    render(
      <UserProvider>
        <UserConsumer />
      </UserProvider>
    );

    expect(screen.getByText('Name: Guest')).toBeInTheDocument();
    expect(screen.getByText('Permissions: none')).toBeInTheDocument();
    expect(screen.getByText('Status: idle')).toBeInTheDocument();
  });

  it('updates the context on sign in and sign out', async () => {
    const user = userEvent.setup();

    render(
      <UserProvider>
        <UserConsumer />
      </UserProvider>
    );

    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText('Name: Mauro')).toBeInTheDocument();
      expect(screen.getByText('Permissions: read')).toBeInTheDocument();
      expect(screen.getByText('Status: idle')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /sign out/i }));

    await waitFor(() => {
      expect(screen.getByText('Name: Guest')).toBeInTheDocument();
      expect(screen.getByText('Permissions: none')).toBeInTheDocument();
      expect(screen.getByText('Status: idle')).toBeInTheDocument();
    });
  });
});
