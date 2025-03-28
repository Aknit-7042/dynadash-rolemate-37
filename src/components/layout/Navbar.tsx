
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useRole } from '@/context/RoleContext';
import { Badge } from '@/components/ui/badge';
import RoleSwitcher from './RoleSwitcher';

const Navbar: React.FC = () => {
  const { currentRole } = useRole();
  
  if (!currentRole) return null;

  return (
    <header className="h-16 border-b bg-white shadow-sm top-0 z-30 w-full">
      <div className="h-full flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <RoleSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
