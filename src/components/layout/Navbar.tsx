
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useRole } from '@/context/RoleContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import TopNavSection from './TopNavSection';

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
  const { user } = useAuth();
  const { currentRole, switchRole } = useRole();
  
  if (!user || !currentRole) return null;

  return (
    <header className="h-16 border-b bg-white shadow-sm top-0 z-30 w-full">
      <div className="h-full flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Medhir</h1>
          
          <div className="flex items-center gap-2">
            {user.roles.map(role => (
              <Button
                key={role}
                variant={role === currentRole ? "default" : "outline"}
                size="sm"
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                  role === currentRole && roleColors[role]
                )}
                onClick={() => switchRole(role)}
              >
                {roleLabels[role]}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center">
          <TopNavSection />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
