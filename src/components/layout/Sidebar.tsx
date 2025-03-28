
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useRole } from '@/context/RoleContext';
import { NavigationItem, Role } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  BarChart4, Users, Calendar, FileText, UserCog, 
  CheckSquare, Briefcase, Receipt, Bell, Settings, 
  CreditCard, Clock, ChevronLeft, ChevronRight,
  ClipboardList, Menu
} from 'lucide-react';

const navigation: NavigationItem[] = [
  { name: 'Overview', href: '/dashboard', icon: BarChart4, roles: ['hr', 'manager', 'employee'] },
  { name: 'Employees', href: '/dashboard/employees', icon: Users, roles: ['hr'] },
  { name: 'Leaves', href: '/dashboard/leave', icon: Calendar, roles: ['employee'] },
  { name: 'Expenses', href: '/dashboard/expenses', icon: CreditCard, roles: ['employee'] },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText, roles: ['hr'] },
  { name: 'Tasks', href: '/dashboard/tasks', icon: ClipboardList, roles: [] },
  { name: 'Team', href: '/dashboard/team', icon: Briefcase, roles: ['manager'] },
  { name: 'Attendance', href: '/dashboard/attendance', icon: Clock, roles: ['hr', 'manager', 'employee'] },
  { name: 'Payroll', href: '/dashboard/payroll', icon: Receipt, roles: ['hr'] },
  { name: 'My Payslips', href: '/dashboard/payroll', icon: Receipt, roles: ['employee'] },
  { name: 'Updates', href: '/dashboard/updates', icon: Bell, roles: [] },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings, roles: [] },
];

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const { currentRole, roleColor } = useRole();
  const [collapsed, setCollapsed] = useState(false);

  if (!user || !currentRole) return null;

  const filteredNavigation = navigation.filter(
    (item) => item.roles.includes(currentRole)
  );

  const getRoleGradient = () => {
    switch (currentRole) {
      case 'hr':
        return 'from-hr/20 to-hr/5';
      case 'manager':
        return 'from-manager/20 to-manager/5';
      case 'employee':
        return 'from-employee/20 to-employee/5';
      default:
        return 'from-primary/20 to-primary/5';
    }
  };

  return (
    <div 
      className={cn(
        "relative flex flex-col border-r bg-gradient-to-b backdrop-blur-sm h-screen transition-all duration-300",
        getRoleGradient(),
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex items-center justify-between p-4 border-b h-16">
        {!collapsed ? (
          <div className="flex items-center space-x-2">
            <div className={cn("w-8 h-8 rounded-md flex items-center justify-center", roleColor)}>
              {currentRole === 'hr' && <Users className="h-4 w-4" />}
              {currentRole === 'manager' && <Briefcase className="h-4 w-4" />}
              {currentRole === 'employee' && <UserCog className="h-4 w-4" />}
            </div>
            <span className="font-medium text-sm tracking-tight animate-fade-in capitalize">
              {currentRole} Portal
            </span>
          </div>
        ) : (
          <div className={cn("mx-auto w-8 h-8 rounded-md flex items-center justify-center", roleColor)}>
            {currentRole === 'hr' && <Users className="h-4 w-4" />}
            {currentRole === 'manager' && <Briefcase className="h-4 w-4" />}
            {currentRole === 'employee' && <UserCog className="h-4 w-4" />}
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "absolute -right-3 top-16 z-10 rounded-full border shadow-md",
            "flex items-center justify-center bg-background size-6",
            collapsed && "left-auto"
          )}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-6">
        <TooltipProvider delayDuration={0}>
          <nav className="space-y-2">
            {filteredNavigation.map((item) => (
              <Tooltip key={item.name} delayDuration={100}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        'group flex items-center py-2 px-3 rounded-md text-sm font-medium transition-all',
                        'hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
                        isActive 
                          ? 'bg-background shadow-sm text-foreground' 
                          : 'text-foreground/70 hover:text-foreground hover:bg-white/40',
                        collapsed ? 'justify-center px-0' : 'justify-start',
                        isActive && !collapsed && cn('border-l-2', {
                          'border-hr': currentRole === 'hr',
                          'border-manager': currentRole === 'manager',
                          'border-employee': currentRole === 'employee',
                        })
                      )
                    }
                  >
                    <div className="flex items-center relative">
                      <item.icon className={cn(
                        "size-5 shrink-0",
                        collapsed ? "m-auto" : ""
                      )} />
                      {!collapsed && (
                        <span className={cn(
                          "ml-3 relative",
                          "after:absolute after:bottom-0 after:left-0 after:bg-current after:h-px after:w-0 after:transition-all after:duration-300",
                          "group-hover:after:w-full"
                        )}>
                          {item.name}
                        </span>
                      )}
                    </div>
                  </NavLink>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right" className="bg-background border-border shadow-md">
                    {item.name}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </nav>
        </TooltipProvider>
      </ScrollArea>
      
      <div className={cn(
        "p-4 border-t mt-auto",
        collapsed ? "text-center" : "flex items-center justify-between"
      )}>
        {!collapsed ? (
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded-full bg-muted/50 flex items-center justify-center">
              <span className="text-xs font-medium">{user.name?.charAt(0) || 'U'}</span>
            </div>
            <span className="text-xs font-medium truncate">{user.name || user.email}</span>
          </div>
        ) : (
          <div className="h-6 w-6 mx-auto rounded-full bg-muted/50 flex items-center justify-center">
            <span className="text-xs font-medium">{user.name?.charAt(0) || 'U'}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
