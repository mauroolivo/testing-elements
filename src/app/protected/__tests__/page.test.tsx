import { act, render, screen } from '@testing-library/react';

import ProtectedPage from '@/app/protected/page';
import { useUser, type UserContextValue } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

jest.mock('@/context/UserContext', () => ({
  useUser: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockedUseUser = useUser as jest.MockedFunction<typeof useUser>;
const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe('ProtectedPage', () => {
  const replace = jest.fn();

  const buildUserValue = (
    overrides: Partial<UserContextValue> = {}
  ): UserContextValue => ({
    userName: undefined,
    permissions: undefined,
    loading: false,
    handleSignIn: jest.fn().mockResolvedValue(undefined),
    handleSignOut: jest.fn().mockResolvedValue(undefined),
    ...overrides,
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockedUseRouter.mockReturnValue({ replace } as unknown as ReturnType<
      typeof useRouter
    >);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('redirects unauthenticated users after 2 seconds', () => {
    mockedUseUser.mockReturnValue(buildUserValue());

    render(<ProtectedPage />);

    expect(
      screen.getByText(/you must sign in before accessing protected content/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/redirecting to login in 2 seconds/i)
    ).toBeInTheDocument();
    expect(replace).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(replace).toHaveBeenCalledWith('/');
  });

  it('does not redirect authenticated users', () => {
    mockedUseUser.mockReturnValue(
      buildUserValue({
        userName: 'Mauro',
        permissions: ['read', 'write'],
      })
    );

    render(<ProtectedPage />);

    expect(screen.getByText(/signed in as/i)).toBeInTheDocument();
    expect(screen.getByText('Mauro')).toBeInTheDocument();
    expect(screen.getByText(/read, write/i)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(replace).not.toHaveBeenCalled();
  });
});
