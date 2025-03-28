
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
  { name: 'Tasks', href: '/dashboard/tasks', icon: ClipboardList, roles: [] }, // Removed 'employee'
  { name: 'Team', href: '/dashboard/team', icon: Briefcase, roles: ['manager'] },
  { name: 'Attendance', href: '/dashboard/attendance', icon: Clock, roles: ['hr', 'manager', 'employee'] },
  { name: 'Payroll', href: '/dashboard/payroll', icon: Receipt, roles: ['hr'] },
  { name: 'My Payslips', href: '/dashboard/payroll', icon: Receipt, roles: ['employee'] },
  { name: 'Updates', href: '/dashboard/updates', icon: Bell, roles: [] }, // Removed 'employee'
  { name: 'Settings', href: '/dashboard/settings', icon: Settings, roles: [] }, // Removed 'employee'
];

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const { currentRole } = useRole();
  const [collapsed, setCollapsed] = useState(false);

  if (!user || !currentRole) return null;

  const filteredNavigation = navigation.filter(
    (item) => item.roles.includes(currentRole)
  );

  return (
    <div 
      className={cn(
        "relative flex flex-col border-r bg-background h-screen transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex items-center justify-between p-4 border-b h-16">
        {!collapsed ? (
          <span className="font-semibold text-xl tracking-tight animate-fade-in">
            RoleMate
          </span>
        ) : (
          <span className="flex justify-center w-full">
            <Menu className="h-5 w-5" />
          </span>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "absolute -right-4 top-16 z-10 rounded-full border shadow-md",
            "flex items-center justify-center bg-background",
            collapsed && "left-auto"
          )}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-2 py-4">
          <TooltipProvider delayDuration={0}>
            <nav className="space-y-6">
              {filteredNavigation.map((item) => (
                <Tooltip key={item.name} delayDuration={100}>
                  <TooltipTrigger asChild>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors',
                          'hover:bg-accent hover:text-accent-foreground hover:shadow',
                          isActive ? 'bg-accent' : 'transparent',
                          collapsed ? 'justify-center px-0' : 'justify-start'
                        )
                      }
                    >
                      <div className="flex items-center">
                        <item.icon className="h-5 w-5 shrink-0" />
                        {!collapsed && <span className="ml-3">{item.name}</span>}
                      </div>
                    </NavLink>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      {item.name}
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </nav>
          </TooltipProvider>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
