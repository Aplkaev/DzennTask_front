import { useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  
  const login = async (email: string, password: string) => {
    // API-запрос
  };
  
  const register = async (email: string, password: string) => {
    // API-запрос
  };

  return { user, login, register };
}