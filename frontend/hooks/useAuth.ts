import { useState, useEffect } from 'react';
import { authApi } from '@/lib/api';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Check for stored token and user
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      setAuthState({
        user: JSON.parse(user),
        token,
        loading: false,
        error: null,
      });
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    const { data, error } = await authApi.login(email, password);
    
    if (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error,
      }));
      return false;
    }

    if (data) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setAuthState({
        user: data.user,
        token: data.token,
        loading: false,
        error: null,
      });
      return true;
    }

    return false;
  };

  const register = async (email: string, password: string, name: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    const { data, error } = await authApi.register(email, password, name);
    
    if (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error,
      }));
      return false;
    }

    if (data) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setAuthState({
        user: data.user,
        token: data.token,
        loading: false,
        error: null,
      });
      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      token: null,
      loading: false,
      error: null,
    });
  };

  return {
    ...authState,
    login,
    register,
    logout,
  };
} 