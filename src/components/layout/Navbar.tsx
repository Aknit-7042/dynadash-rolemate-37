
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import { 
  Bell, 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Receipt, 
  CheckSquare, 
  Settings, 
  UserCog 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import RoleSwitcher from './RoleSwitcher';
import { cn } from '@/lib/utils';
import { useRole } from '@/context/RoleContext';

const navigationItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Employees', href: '/dashboard/employees', icon: Users },
  { name: 'Attendance', href: '/dashboard/attendance', icon: Calendar },
  { name: 'Payroll', href: '/dashboard/payroll', icon: Receipt },
  { name: 'My Task', href: '/dashboard/tasks', icon: CheckSquare },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { currentRole } = useRole();
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

  return (
    <header className="h-16 border-b bg-white shadow-sm sticky top-0 z-30">
      <div className="container h-full flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-6">
          <div className="font-bold text-2xl">MEDHIR</div>
          <RoleSwitcher />
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
          <NavLink
            to="/admin"
            className={({ isActive }) => cn(
              'flex items-center gap-2 text-neutral-600 hover:text-blue-500 transition-colors',
              isActive && 'font-medium text-blue-500'
            )}
          >
            <UserCog className="h-5 w-5" />
            <span>HR Admin Login</span>
          </NavLink>
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
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
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
