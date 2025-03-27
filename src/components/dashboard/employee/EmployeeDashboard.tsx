import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, Clock, CreditCard, 
  FileText, MessageSquare, CheckCircle2, 
  LucideIcon, PieChart, Users, Bell,
  CheckSquare, AlertTriangle, ArrowUpRight, User,
  DollarSign
} from 'lucide-react';
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
  title, value, description, icon, iconColor, descriptionColor = "text-muted-foreground"
}) => (
  <div className="flex items-center gap-2 p-1.5">
    <div className={cn("p-1.5 rounded-lg", iconColor)}>
      {icon}
    </div>
    <div>
      <p className="text-xs mb-0.5 text-muted-foreground">{title}</p>
      <p className="text-sm font-bold">{value}</p>
      <p className={cn("text-xs", descriptionColor)}>{description}</p>
    </div>
  </div>
);

interface QuickActionProps {
  title: string;
  icon: React.ReactNode;
  color: string;
}

const QuickAction: React.FC<QuickActionProps> = ({
  title, icon, color
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-2">
      <div className={cn("rounded-full p-1.5", color)}>
        {icon}
      </div>
      <p className="font-medium text-xs mt-1">{title}</p>
    </div>
  );
};

interface UpdateProps {
  title: string;
  content: string;
  date: string;
  isImportant?: boolean;
}

const Update: React.FC<UpdateProps> = ({
  title, content, date, isImportant = false
}) => {
  return (
    <div className={cn(
      "p-4 border-b last:border-0",
      isImportant && "bg-red-50 border-l-4 border-l-red-500"
    )}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-medium">{title}</h3>
        {isImportant && (
          <Badge variant="destructive" className="text-xs">Important</Badge>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-2">{content}</p>
      <div className="text-xs text-muted-foreground flex items-center">
        <Clock className="h-3 w-3 mr-1" />
        {date}
      </div>
    </div>
  );
};

const EmployeeDashboard: React.FC = () => {
  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', dateOptions);
  
  const checkInTime = "6:09 PM";

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Employee Dashboard</h1>
        <Badge className="bg-employee text-employee-foreground text-sm py-1 px-3">Employee Role</Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-background shadow-sm">
          <CardHeader className="pb-0 pt-3">
            <CardTitle className="text-md">Dashboard Stats</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <div className="grid grid-cols-2 gap-2">
              <StatsCard 
                title="Leave Balance"
                value="21"
                description="Days remaining"
                icon={<Calendar className="h-3.5 w-3.5 text-white" />}
                iconColor="bg-blue-400"
              />
              <StatsCard 
                title="Attendance"
                value="98%"
                description="↗ 2% from last month"
                icon={<User className="h-3.5 w-3.5 text-white" />}
                iconColor="bg-green-500"
                descriptionColor="text-green-600"
              />
              <StatsCard 
                title="Today"
                value={formattedDate}
                description={`Checked in at ${checkInTime}`}
                icon={<Clock className="h-3.5 w-3.5 text-white" />}
                iconColor="bg-orange-400"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background shadow-sm">
          <CardHeader className="pb-0 pt-3">
            <CardTitle className="text-md">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <div className="grid grid-cols-3 gap-2">
              <QuickAction 
                title="Apply Leave" 
                icon={<Calendar className="h-4 w-4 text-blue-600" />}
                color="text-blue-600"
              />
              <QuickAction 
                title="Submit Expense" 
                icon={<FileText className="h-4 w-4 text-blue-600" />} 
                color="text-blue-600"
              />
              <QuickAction 
                title="Leaves Management" 
                icon={<Calendar className="h-4 w-4 text-green-500" />} 
                color="text-green-500"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="attendance">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="leave">Leave Balance</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
        </TabsList>
        
        <TabsContent value="attendance" className="animate-slide-up">
          <Card>
            <CardHeader>
              <CardTitle>My Attendance</CardTitle>
              <CardDescription>Your attendance record for this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">On Time</p>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">18</div>
                      <div className="text-xs text-muted-foreground">days</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Late</p>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">2</div>
                      <div className="text-xs text-muted-foreground">days</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Absent</p>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">0</div>
                      <div className="text-xs text-muted-foreground">days</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">On Leave</p>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">1</div>
                      <div className="text-xs text-muted-foreground">days</div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium mb-2">Monthly Overview</p>
                  <div className="flex items-center">
                    <div className="w-full bg-muted rounded-full h-4">
                      <div className="h-4 rounded-full bg-green-500" style={{ width: '86%' }}></div>
                    </div>
                    <span className="ml-2 text-sm font-medium">86%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">21 out of 21 working days attended</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="leave" className="animate-slide-up">
          <Card>
            <CardHeader>
              <CardTitle>Leave Balance</CardTitle>
              <CardDescription>Your available leave days for the year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div className="space-y-2 text-center p-4 border rounded-lg">
                  <p className="text-sm font-medium">Annual Leave</p>
                  <div className="text-3xl font-bold">15</div>
                  <p className="text-xs text-muted-foreground">days remaining</p>
                </div>
                <div className="space-y-2 text-center p-4 border rounded-lg">
                  <p className="text-sm font-medium">Sick Leave</p>
                  <div className="text-3xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">days remaining</p>
                </div>
                <div className="space-y-2 text-center p-4 border rounded-lg">
                  <p className="text-sm font-medium">Personal Days</p>
                  <div className="text-3xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">days remaining</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <p className="text-sm font-medium">Recent Leave History</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Annual Leave</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span>May 10 - May 12, 2023</span>
                      <Badge variant="outline">3 days</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Sick Leave</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span>Apr 5, 2023</span>
                      <Badge variant="outline">1 day</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payroll" className="animate-slide-up">
          <Card>
            <CardHeader>
              <CardTitle>Pay Information</CardTitle>
              <CardDescription>Your salary and payment history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm font-medium mb-2">Latest Payslip</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xl font-bold">$4,250.00</p>
                      <p className="text-xs text-muted-foreground">May 2023</p>
                    </div>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Payment History</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">April 2023</p>
                        <p className="text-xs text-muted-foreground">Paid on Apr 30, 2023</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">$4,250.00</p>
                        <Button variant="ghost" size="sm" className="text-xs">Download</Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">March 2023</p>
                        <p className="text-xs text-muted-foreground">Paid on Mar 31, 2023</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">$4,250.00</p>
                        <Button variant="ghost" size="sm" className="text-xs">Download</Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">February 2023</p>
                        <p className="text-xs text-muted-foreground">Paid on Feb 28, 2023</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">$4,250.00</p>
                        <Button variant="ghost" size="sm" className="text-xs">Download</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeDashboard;
