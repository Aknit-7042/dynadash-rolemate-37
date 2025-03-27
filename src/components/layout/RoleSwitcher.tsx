
import React from 'react';
import { useRole } from '@/context/RoleContext';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { Role } from '@/lib/types';
import { Briefcase, User, Users } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const roleIcons = {
  hr: <Users className="h-4 w-4 mr-2" />,
  manager: <Briefcase className="h-4 w-4 mr-2" />,
  employee: <User className="h-4 w-4 mr-2" />,
};

const roleLabels = {
  hr: 'HR Dashboard',
  manager: 'Manager Dashboard',
  employee: 'Employee Dashboard',
};

const roleColors = {
  hr: 'bg-hr text-hr-foreground',
  manager: 'bg-manager text-manager-foreground',
  employee: 'bg-employee text-employee-foreground',
};

const RoleSwitcher: React.FC = () => {
  const { user } = useAuth();
  const { currentRole, switchRole, isRoleSwitching } = useRole();

  if (!user || !currentRole) return null;

  // Only show role switcher if user has multiple roles
  if (user.roles.length <= 1) {
    return (
      <Badge className={cn('rounded-full animate-fade-in', roleColors[user.roles[0]])}>
        {roleLabels[user.roles[0]]}
      </Badge>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={cn(
            'group gap-1 pl-3 pr-2 py-2 rounded-full border transition-all',
            'hover:shadow-md focus:shadow-md',
            isRoleSwitching ? 'animate-pulse' : 'animate-fade-in'
          )}
        >
          <Badge className={cn('rounded-full', roleColors[currentRole])}>
            {roleIcons[currentRole]}
            <span className="capitalize">{roleLabels[currentRole]}</span>
          </Badge>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1 text-muted-foreground transition-transform duration-200 group-hover:rotate-180"
          >
            <path
              d="M4.94 5.99609L8 9.05676L11.06 5.99609L12 6.93609L8 10.9361L4 6.93609L4.94 5.99609Z"
              fill="currentColor"
            />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-1 glass">
        <div className="grid gap-1">
          {user.roles.map((role) => (
            <Button
              key={role}
              variant={currentRole === role ? "default" : "ghost"}
              className={cn(
                'justify-start px-2 py-1.5 text-sm w-full transition-all cursor-pointer',
                'rounded-md hover:scale-105',
                currentRole === role && 'font-medium',
                currentRole === role && roleColors[role]
              )}
              onClick={() => switchRole(role)}
            >
              <div className="flex items-center">
                {roleIcons[role]}
                <span className="capitalize">{roleLabels[role]}</span>
              </div>
              {currentRole === role && (
                <div className="ml-auto bg-background/30 p-1 rounded">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.4 3.99609L6 11.3961L2.6 7.99609L1.4 9.19609L6 13.7961L14.6 5.19609L13.4 3.99609Z" fill="currentColor" />
                  </svg>
                </div>
              )}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default RoleSwitcher;
