import React, { createContext, useContext, useState, useEffect } from 'react';
import { Role } from '@/lib/types';
import { useAuth } from './AuthContext';

interface RoleContextType {
  currentRole: Role | null;
  switchRole: (role: Role) => void;
  roleColor: string;
  isRoleSwitching: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [isRoleSwitching, setIsRoleSwitching] = useState(false);
  
  // Set role colors based on the current role
  const getRoleColor = (role: Role | null): string => {
    switch (role) {
      case 'hr':
        return 'bg-hr text-hr-foreground';
      case 'manager':
        return 'bg-manager text-manager-foreground';
      case 'employee':
        return 'bg-employee text-employee-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const roleColor = getRoleColor(currentRole);

  useEffect(() => {
    if (user) {
      // Try to get previously selected role from localStorage
      const storedRole = localStorage.getItem('currentRole') as Role | null;
      
      // If stored role exists and user has this role, use it
      if (storedRole && user.roles.includes(storedRole)) {
        setCurrentRole(storedRole);
      } else {
        // Otherwise use the primary role
        setCurrentRole(user.primaryRole);
      }
    } else {
      setCurrentRole(null);
    }
  }, [user]);

  const switchRole = (role: Role) => {
    if (user?.roles.includes(role) && role !== currentRole) {
      setIsRoleSwitching(true);
      
      // Add a small delay to allow animation to complete
      setTimeout(() => {
        setCurrentRole(role);
        localStorage.setItem('currentRole', role);
        
        // Allow time for animation to complete
        setTimeout(() => {
          setIsRoleSwitching(false);
        }, 600);
      }, 300);
    }
  };

  return (
    <RoleContext.Provider value={{ currentRole, switchRole, roleColor, isRoleSwitching }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
