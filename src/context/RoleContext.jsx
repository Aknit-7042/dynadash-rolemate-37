
import React, { createContext, useContext } from 'react';
import { useReduxRole } from '@/hooks/useReduxRole';

const RoleContext = createContext(null);

export const RoleProvider = ({ children }) => {
  const role = useReduxRole();
  
  return (
    <RoleContext.Provider value={role || {}}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === null) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
