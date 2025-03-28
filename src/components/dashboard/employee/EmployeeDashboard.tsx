
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, CreditCard, FileText, MessageSquare, CheckCircle2, LucideIcon, PieChart, Users, Bell, CheckSquare, AlertTriangle, ArrowUpRight, User, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import StatCard from '../manager/StatCard';

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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="Leave Balance" 
          value="21" 
          description="Days remaining" 
          icon={<Calendar className="h-5 w-5 text-blue-500" />}
          trendDirection="neutral" 
        />
        
        <StatCard 
          title="Attendance" 
          value="98%" 
          description="This month" 
          icon={<User className="h-5 w-5 text-green-500" />}
          trendDirection="up"
          trendValue="2%"
          trend="from last month"
        />
        
        <StatCard 
          title="Today" 
          value={formattedDate} 
          description={`Checked in at ${checkInTime}`} 
          icon={<Clock className="h-5 w-5 text-orange-500" />}
          trendDirection="neutral" 
        />
      </div>
      
    </div>;
};

export default EmployeeDashboard;
