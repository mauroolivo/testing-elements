'use client';

import { Provider } from 'react-redux';
import { UserProvider } from '@/context/UserContext';
import { store } from '@/store/store';

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <UserProvider>{children}</UserProvider>
    </Provider>
  );
}
