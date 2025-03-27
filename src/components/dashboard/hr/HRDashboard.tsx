import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { BarChart, Calendar, Clock, CreditCard, DollarSign, Users, ArrowUpRight, LineChart, FileText, UserCircle, PiggyBank, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  trend?: string;
  trendValue?: string;
  icon: React.ReactNode;
  trendDirection?: 'up' | 'down' | 'neutral';
  onClick?: () => void;
  isActive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  trend,
  trendValue,
  icon,
  trendDirection = 'neutral',
  onClick,
  isActive = false
}) => {
  return <Card 
    className={cn("card-hover", onClick && "cursor-pointer", isActive && "border-blue-500 ring-1 ring-blue-500")}
    onClick={onClick}
  >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-9 w-9 flex items-center justify-center rounded-full bg-muted">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend && trendValue && <div className="flex items-center gap-1 mt-2">
            <Badge variant={trendDirection === 'down' ? 'destructive' : 'outline'} className={cn("px-1 py-0 flex items-center gap-1 text-xs", trendDirection === 'up' && "bg-green-100 text-green-800 border-green-200", trendDirection === 'neutral' && "bg-blue-100 text-blue-800 border-blue-200")}>
              {trendDirection === 'up' && <ArrowUpRight className="h-3 w-3" />}
              {trendValue}
            </Badge>
            <span className="text-xs text-muted-foreground">{trend}</span>
          </div>}
      </CardContent>
    </Card>;
};

interface LeaveRequestData {
  id: string;
  employeeName: string;
  department: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  leaveBalance: string;
  reason: string;
}

const leaveRequestsData: LeaveRequestData[] = [
  {
    id: 'EMP101',
    employeeName: 'John Doe',
    department: 'Sales',
    leaveType: 'Annual Leave',
    startDate: 'Jun 15, 2023',
    endDate: 'Jun 18, 2023',
    leaveBalance: '15 days',
    reason: 'Family vacation'
  },
  {
    id: 'EMP102',
    employeeName: 'Jane Smith',
    department: 'Marketing',
    leaveType: 'Sick Leave',
    startDate: 'Jun 20, 2023',
    endDate: 'Jun 21, 2023',
    leaveBalance: '8 days',
    reason: 'Medical appointment'
  },
  {
    id: 'EMP103',
    employeeName: 'Michael Brown',
    department: 'Engineering',
    leaveType: 'Emergency Leave',
    startDate: 'Jun 25, 2023',
    endDate: 'Jun 30, 2023',
    leaveBalance: '5 days',
    reason: 'Personal emergency'
  }
];

const HRDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('leave');
  const [showRequestDetails, setShowRequestDetails] = useState(false);
  
  const handleOpenRequestsClick = () => {
    setShowRequestDetails(true);
    setActiveTab('leave');
  };

  return <div className="space-y-6 animate-fade-in">
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
          onClick={handleOpenRequestsClick}
          isActive={showRequestDetails}
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
      
      <Tabs defaultValue="leave" value={activeTab} onValueChange={setActiveTab}>
        
        
        <TabsContent value="leave" className="animate-slide-up">
          {showRequestDetails && (
            <Card>
              <CardHeader>
                <CardTitle>Request Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-4 gap-2">
                    <Button variant="outline" className={cn("flex items-center justify-center gap-2 rounded-md py-6", activeTab === "leave" && "bg-blue-50 text-blue-600 border-blue-200")}>
                      <Calendar className="h-5 w-5" />
                      <span>Leave Requests</span>
                    </Button>
                    <Button variant="outline" className="flex items-center justify-center gap-2 rounded-md py-6">
                      <UserCircle className="h-5 w-5" />
                      <span>Profile Updates</span>
                    </Button>
                    <Button variant="outline" className="flex items-center justify-center gap-2 rounded-md py-6">
                      <PiggyBank className="h-5 w-5" />
                      <span>Expense Requests</span>
                    </Button>
                    <Button variant="outline" className="flex items-center justify-center gap-2 rounded-md py-6">
                      <FileText className="h-5 w-5" />
                      <span>Advance Requests</span>
                    </Button>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="w-[120px]">Employee ID</TableHead>
                        <TableHead className="w-[150px]">Employee Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Type of Leave</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Leave Balance</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leaveRequestsData.map(request => <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.id}</TableCell>
                          <TableCell>{request.employeeName}</TableCell>
                          <TableCell>{request.department}</TableCell>
                          <TableCell>{request.leaveType}</TableCell>
                          <TableCell>{request.startDate}</TableCell>
                          <TableCell>{request.endDate}</TableCell>
                          <TableCell>{request.leaveBalance}</TableCell>
                          <TableCell>{request.reason}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-green-500 text-green-500">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                              </Button>
                              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-red-500 text-red-500">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>)}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
};

export default HRDashboard;
