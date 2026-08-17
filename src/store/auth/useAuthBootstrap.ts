import { useEffect } from 'react';
import { getMe, useIsAuthenticated } from './useAuthStore';

export function useAuthBootstrap() {
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      getMe();
    }
  }, [isAuthenticated]);
}
