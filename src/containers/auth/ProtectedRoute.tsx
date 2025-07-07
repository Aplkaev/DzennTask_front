import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useIsAuthenticated, logout } from '@/store/auth/useAuthStore';

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  return useIsAuthenticated() ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
};

// дернуть запрос на проверку стух ли token

export default ProtectedRoute;
