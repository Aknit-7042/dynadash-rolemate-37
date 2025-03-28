
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useRole } from '@/context/RoleContext';
import { Badge } from '@/components/ui/badge';

const roleLabels = {
  hr: 'HR',
  manager: 'Manager',
  employee: 'Employee',
};

const roleColors = {
  hr: 'bg-hr text-hr-foreground',
  manager: 'bg-manager text-manager-foreground',
  employee: 'bg-employee text-employee-foreground',
};

const Navbar: React.FC = () => {
  const { currentRole } = useRole();
  
  if (!currentRole) return null;

  return (
    <header className="h-16 border-b bg-white shadow-sm top-0 z-30 w-full">
      <div className="h-full flex items-center px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <Badge className={`bg-${currentRole} text-${currentRole}-foreground text-sm py-1 px-3`}>
            {roleLabels[currentRole]} Role
          </Badge>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
