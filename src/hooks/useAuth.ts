// Hook personalizado para autenticação
import { useState, useEffect } from 'react';
import { userStorage } from '../utils/storage';
import { User, AuthState } from '../types';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const [userData, token] = await Promise.all([
        userStorage.getUserData(),
        userStorage.getToken(),
      ]);

      if (userData && token) {
        setAuthState({
          user: userData,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
        }));
      }
    } catch (error) {
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'Erro ao verificar autenticação',
      });
    }
  };

  const login = async (userData: User, token: string) => {
    try {
      await Promise.all([
        userStorage.saveUserData(userData),
        userStorage.saveToken(token),
      ]);

      setAuthState({
        user: userData,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: 'Erro ao fazer login',
      }));
    }
  };

  const logout = async () => {
    try {
      await userStorage.clearUserData();
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: 'Erro ao fazer logout',
      }));
    }
  };

  return {
    ...authState,
    login,
    logout,
    checkAuthStatus,
  };
};
