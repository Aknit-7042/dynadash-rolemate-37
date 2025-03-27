
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BarChart, Calendar, Clock, CreditCard, 
  DollarSign, Users, ArrowUpRight, LineChart 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  trend?: string;
  trendValue?: string;
  icon: React.ReactNode;
  trendDirection?: 'up' | 'down' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, value, description, trend, trendValue, icon, trendDirection = 'neutral' 
}) => {
  return (
    <Card className="card-hover">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-9 w-9 flex items-center justify-center rounded-full bg-muted">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend && trendValue && (
          <div className="flex items-center gap-1 mt-2">
            <Badge 
              variant={trendDirection === 'down' ? 'destructive' : 'outline'} 
              className={cn(
                "px-1 py-0 flex items-center gap-1 text-xs",
                trendDirection === 'up' && "bg-green-100 text-green-800 border-green-200",
                trendDirection === 'neutral' && "bg-blue-100 text-blue-800 border-blue-200",
              )}
            >
              {trendDirection === 'up' && <ArrowUpRight className="h-3 w-3" />}
              {trendValue}
            </Badge>
            <span className="text-xs text-muted-foreground">{trend}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface LeaveRequestProps {
  name: string;
  avatar?: string;
  department: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

const LeaveRequest: React.FC<LeaveRequestProps> = ({
  name, avatar, department, startDate, endDate, reason, status
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex items-start gap-4 p-4 rounded-lg border mb-3">
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="font-medium">{name}</p>
          <Badge className={cn("capitalize", getStatusColor(status))}>
            {status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{department}</p>
        <div className="text-sm mt-1 flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{startDate} - {endDate}</span>
        </div>
        <p className="text-sm mt-1">{reason}</p>
      </div>
    </div>
  );
};

const HRDashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">HR Dashboard</h1>
        <Badge className="bg-hr text-hr-foreground text-sm py-1 px-3">HR Role</Badge>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Employees" 
          value="248" 
          description="Active employees in the organization"
          icon={<Users className="h-5 w-5" />}
          trend="from last month"
          trendValue="+12"
          trendDirection="up"
        />
        <StatCard 
          title="Attendance Rate" 
          value="93.8%" 
          description="Average monthly attendance rate"
          icon={<Clock className="h-5 w-5" />}
          trend="vs target (90%)"
          trendValue="+3.8%"
          trendDirection="up"
        />
        <StatCard 
          title="Open Requests" 
          value="17" 
          description="Leave and expense requests pending"
          icon={<Calendar className="h-5 w-5" />}
          trend="last 7 days"
          trendValue="5 new"
          trendDirection="neutral"
        />
        <StatCard 
          title="Total Budget" 
          value="$842,250" 
          description="Q3 HR budget allocation"
          icon={<DollarSign className="h-5 w-5" />}
          trend="remaining"
          trendValue="36%"
          trendDirection="neutral"
        />
      </div>
      
      <Tabs defaultValue="leave">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
          <TabsTrigger value="leave">Leave Requests</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="leave" className="animate-slide-up">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Leave Requests</CardTitle>
                <CardDescription>Approve or decline employee leave requests</CardDescription>
              </CardHeader>
              <CardContent className="max-h-[500px] overflow-auto">
                <LeaveRequest 
                  name="Michael Chen"
                  department="Engineering"
                  startDate="Jun 10, 2023"
                  endDate="Jun 15, 2023"
                  reason="Annual family vacation"
                  status="pending"
                />
                <LeaveRequest 
                  name="Isabella Martinez"
                  department="Marketing"
                  startDate="Jul 3, 2023"
                  endDate="Jul 7, 2023"
                  reason="Personal leave for medical appointment"
                  status="pending"
                />
                <LeaveRequest 
                  name="Robert Johnson"
                  department="Finance"
                  startDate="Jun 24, 2023"
                  endDate="Jun 30, 2023"
                  reason="Paternity leave"
                  status="pending"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Leave Requests</CardTitle>
                <CardDescription>Previously approved or rejected requests</CardDescription>
              </CardHeader>
              <CardContent className="max-h-[500px] overflow-auto">
                <LeaveRequest 
                  name="Sophie Davis"
                  department="Customer Support"
                  startDate="May 15, 2023"
                  endDate="May 20, 2023"
                  reason="Planned vacation with family"
                  status="approved"
                />
                <LeaveRequest 
                  name="Daniel Wilson"
                  department="HR"
                  startDate="May 25, 2023"
                  endDate="May 26, 2023"
                  reason="Personal day off"
                  status="approved"
                />
                <LeaveRequest 
                  name="Emma Taylor"
                  department="Sales"
                  startDate="Jun 2, 2023"
                  endDate="Jun 5, 2023"
                  reason="Wedding anniversary"
                  status="rejected"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="expenses" className="animate-slide-up">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Expenses</CardTitle>
                <CardDescription>Review and approve expense claims</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-60">
                  <div className="text-center space-y-2">
                    <CreditCard className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="font-medium">Finance Reporting</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage expense reports and approvals
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Budget Allocation</CardTitle>
                <CardDescription>Department budget breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-60">
                  <div className="text-center space-y-2">
                    <BarChart className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="font-medium">Department Budget</h3>
                    <p className="text-sm text-muted-foreground">
                      View and analyze budget allocation by department
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="attendance" className="animate-slide-up">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>Monitor employee attendance patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-60">
                <div className="text-center space-y-2">
                  <LineChart className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="font-medium">Attendance Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Track attendance trends and identify patterns
                  </p>
                </div>
              </CardContent>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRDashboard;
