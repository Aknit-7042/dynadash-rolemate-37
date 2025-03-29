
import React, { createContext, useContext } from 'react';
import { useReduxAuth } from '@/hooks/useReduxAuth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const auth = useReduxAuth();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
