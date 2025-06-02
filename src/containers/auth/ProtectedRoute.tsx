import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { authStore } from '@/store/auth/auth';

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const isAuthenticated = authStore.getState().isAuthenticated;
  console.log('protected route', authStore.getState(), isAuthenticated);
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;