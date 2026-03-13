'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type UserContextValue = {
  userName: string | undefined;
  permissions: string[] | undefined;
  loading: boolean;
  handleSignIn: (userName: string, permissions?: string[]) => Promise<void>;
  handleSignOut: () => Promise<void>;
};

export const UserContext = createContext<UserContextValue>({
  userName: undefined,
  permissions: undefined,
  loading: false,
  handleSignIn: async () => {},
  handleSignOut: async () => {},
});

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [userName, setUserName] = useState<string>();
  const [permissions, setPermissions] = useState<string[]>();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (
    nextUserName: string,
    nextPermissions: string[] = []
  ) => {
    setLoading(true);

    try {
      await Promise.resolve();
      setUserName(nextUserName);
      setPermissions(nextPermissions);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);

    try {
      await Promise.resolve();
      setUserName(undefined);
      setPermissions(undefined);
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      userName,
      permissions,
      loading,
      handleSignIn,
      handleSignOut,
    }),
    [userName, permissions, loading]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
