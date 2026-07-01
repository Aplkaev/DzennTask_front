import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/store/auth/useAuthStore';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/login');
  }, []);

  return (
    <div>
      <p>Выход из системы...</p>
    </div>
  );
}
