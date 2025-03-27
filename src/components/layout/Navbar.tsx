
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import { 
  Bell, 
  Calendar, 
  Receipt, 
  CheckSquare, 
  Settings,
  User,
  FileText,
  DollarSign,
  Users,
  BarChart4
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useRole } from '@/context/RoleContext';
import { Badge } from '@/components/ui/badge';
import { Role } from '@/lib/types';

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
  const { user, logout } = useAuth();
  const { currentRole, switchRole, isRoleSwitching } = useRole();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Navigation items for HR role
  const hrNavigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart4 },
    { name: 'Employees', href: '/dashboard/employees', icon: Users },
    { name: 'Attendance', href: '/dashboard/attendance', icon: Calendar },
    { name: 'Payroll', href: '/dashboard/payroll', icon: Receipt },
  ];

  // Navigation items for other roles
  const standardNavigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart4 },
    { name: 'Leaves', href: '/dashboard/leave', icon: Calendar },
    { name: 'Expenses', href: '/dashboard/expenses', icon: FileText },
    { name: 'Attendance', href: '/dashboard/attendance', icon: Calendar },
    { name: 'Payroll', href: '/dashboard/payroll', icon: Receipt },
    { name: 'My Task', href: '/dashboard/tasks', icon: CheckSquare },
  ];

  // Select navigation items based on current role
  const navigationItems = currentRole === 'hr' ? hrNavigationItems : standardNavigationItems;

  return (
    <header className="h-16 border-b bg-white shadow-sm sticky top-0 z-30">
      <div className="container h-full flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-6">
          <div className="font-bold text-2xl">MEDHIR</div>
          
          {/* Horizontal role switcher */}
          <div className="flex items-center gap-2">
            {user.roles.map((role: Role) => (
              <Badge
                key={role}
                variant="outline"
                className={cn(
                  'px-2 py-1 text-xs cursor-pointer transition-all',
                  currentRole === role 
                    ? `font-medium ${roleColors[role]}` 
                    : 'hover:bg-gray-100'
                )}
                onClick={() => switchRole(role)}
              >
                {roleLabels[role]}
              </Badge>
            ))}
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navigationItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => cn(
                'flex items-center gap-2 text-neutral-600 hover:text-blue-500 transition-colors',
                isActive && 'font-medium text-blue-500'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
