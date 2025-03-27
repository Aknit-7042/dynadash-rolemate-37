import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, CreditCard, FileText, MessageSquare, CheckCircle2, LucideIcon, PieChart, Users, Bell, CheckSquare, AlertTriangle, ArrowUpRight, User, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  descriptionColor?: string;
}
const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
  iconColor,
  descriptionColor = "text-muted-foreground"
}) => <div className="flex items-center gap-2 p-1.5">
    <div className={cn("p-1.5 rounded-lg", iconColor)}>
      {icon}
    </div>
    <div>
      <p className="text-xs mb-0.5 text-muted-foreground">{title}</p>
      <p className="text-sm font-bold">{value}</p>
      <p className={cn("text-xs", descriptionColor)}>{description}</p>
    </div>
  </div>;
interface UpdateProps {
  title: string;
  content: string;
  date: string;
  isImportant?: boolean;
}
const Update: React.FC<UpdateProps> = ({
  title,
  content,
  date,
  isImportant = false
}) => {
  return <div className={cn("p-4 border-b last:border-0", isImportant && "bg-red-50 border-l-4 border-l-red-500")}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-medium">{title}</h3>
        {isImportant && <Badge variant="destructive" className="text-xs">Important</Badge>}
      </div>
      <p className="text-sm text-muted-foreground mb-2">{content}</p>
      <div className="text-xs text-muted-foreground flex items-center">
        <Clock className="h-3 w-3 mr-1" />
        {date}
      </div>
    </div>;
};
const EmployeeDashboard: React.FC = () => {
  const navigate = useNavigate();
  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric'
  };
  const formattedDate = today.toLocaleDateString('en-US', dateOptions);
  const checkInTime = "6:09 PM";
  return <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Employee Dashboard</h1>
        <Badge className="bg-employee text-employee-foreground text-sm py-1 px-3">Employee Role</Badge>
      </div>
      
      <Card className="bg-background shadow-sm">
        <CardHeader className="pb-0 pt-3">
          <CardTitle className="text-md">Dashboard Stats</CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="grid grid-cols-2 gap-2">
            <StatsCard title="Leave Balance" value="21" description="Days remaining" icon={<Calendar className="h-3.5 w-3.5 text-white" />} iconColor="bg-blue-400" />
            <StatsCard title="Attendance" value="98%" description="↗ 2% from last month" icon={<User className="h-3.5 w-3.5 text-white" />} iconColor="bg-green-500" descriptionColor="text-green-600" />
            <StatsCard title="Today" value={formattedDate} description={`Checked in at ${checkInTime}`} icon={<Clock className="h-3.5 w-3.5 text-white" />} iconColor="bg-orange-400" />
          </div>
        </CardContent>
      </Card>
      
      
    </div>;
};
export default EmployeeDashboard;