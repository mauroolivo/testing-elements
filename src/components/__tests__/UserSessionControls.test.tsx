import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UserSessionControls from '@/components/UserSessionControls';
import { useUser, type UserContextValue } from '@/context/UserContext';

jest.mock('@/context/UserContext', () => ({
  useUser: jest.fn(),
}));

const mockedUseUser = useUser as jest.MockedFunction<typeof useUser>;

describe('UserSessionControls', () => {
  const handleSignIn = jest.fn<Promise<void>, [string, string[] | undefined]>();
  const handleSignOut = jest.fn<Promise<void>, []>();

  const buildUserValue = (
    overrides: Partial<UserContextValue> = {}
  ): UserContextValue => ({
    userName: undefined,
    permissions: undefined,
    loading: false,
    handleSignIn,
    handleSignOut,
    ...overrides,
  });

  beforeEach(() => {
    jest.clearAllMocks();
    handleSignIn.mockResolvedValue(undefined);
    handleSignOut.mockResolvedValue(undefined);
  });

  it('renders guest state and triggers login', async () => {
    mockedUseUser.mockReturnValue(buildUserValue());

    render(<UserSessionControls />);
    const user = userEvent.setup();

    expect(screen.getByText('Guest')).toBeInTheDocument();
    expect(screen.getByText('No permissions')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(handleSignIn).toHaveBeenCalledTimes(1);
    expect(handleSignIn).toHaveBeenCalledWith('Mauro', ['read', 'write']);
  });

  it('renders authenticated state and permissions', () => {
    mockedUseUser.mockReturnValue(
      buildUserValue({
        userName: 'Mauro',
        permissions: ['read', 'write'],
      })
    );

    render(<UserSessionControls />);

    expect(screen.getByText('Mauro')).toBeInTheDocument();
    expect(screen.getByText('read, write')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('triggers logout when the user is logged in', async () => {
    mockedUseUser.mockReturnValue(
      buildUserValue({
        userName: 'Mauro',
        permissions: ['read'],
      })
    );

    render(<UserSessionControls />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /logout/i }));

    expect(handleSignOut).toHaveBeenCalledTimes(1);
  });

  it('shows loading state and disables the current action button', () => {
    mockedUseUser.mockReturnValue(
      buildUserValue({
        userName: 'Mauro',
        permissions: ['read'],
        loading: true,
      })
    );

    render(<UserSessionControls />);

    expect(screen.getByText('Updating session...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeDisabled();
  });
});
