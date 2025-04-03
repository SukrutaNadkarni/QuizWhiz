import React, { createContext, useContext, useState } from 'react';
import { User } from '..';
import * as authService from '../services/authService';

// interface AuthContextType {
//   currentUser: User | null;
//   loading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   register: (email: string, password: string, displayName: string) => Promise<void>;
//   logout: () => Promise<void>;
// }

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const user = await authService.validateCredentials(email, password);
      setCurrentUser(user);
    } catch (error) {
      throw new Error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, displayName) => {
    setLoading(true);
    try {
      const user = await authService.createUser(email, password, displayName);
      setCurrentUser(user);
    } catch (error) {
      throw new Error('Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
