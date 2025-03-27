import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, Clock, CreditCard, 
  FileText, MessageSquare, CheckCircle2, 
  LucideIcon, PieChart, Users, Bell,
  CheckSquare, AlertTriangle, ArrowUpRight, User
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
  <Card className="bg-background shadow-sm hover:shadow-md transition-shadow">
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-muted-foreground mb-2">{title}</p>
          <p className="text-4xl font-bold mb-2">{value}</p>
          <p className={cn("text-sm", descriptionColor)}>{description}</p>
        </div>
        <div className={cn("p-3 rounded-lg", iconColor)}>
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

interface TaskProps {
  title: string;
  dueDate: string;
  status: 'completed' | 'in-progress' | 'pending';
  priority: 'high' | 'medium' | 'low';
}

const Task: React.FC<TaskProps> = ({
  title, dueDate, status, priority
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      default: return 'text-green-600';
    }
  };

  return (
    <div className="flex items-center justify-between p-3 border-b last:border-0">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-medium">{title}</p>
          <Badge className={cn("capitalize", getStatusColor(status))}>
            {status}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <Calendar className="h-3.5 w-3.5 mr-1" />
          <span className="mr-3">Due: {dueDate}</span>
          <span className={cn("capitalize font-medium", getPriorityColor(priority))}>
            {priority} priority
          </span>
        </div>
      </div>
    </div>
  );
};

interface QuickActionProps {
  title: string;
  icon: LucideIcon;
  description: string;
  color: string;
}

const QuickAction: React.FC<QuickActionProps> = ({
  title, icon: Icon, description, color
}) => {
  return (
    <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4 card-hover w-full">
      <div className={cn("rounded-full p-2", color)}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="space-y-1 text-center">
        <h3 className="font-medium">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </Button>
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
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Employee Dashboard</h1>
        <Badge className="bg-employee text-employee-foreground text-sm py-1 px-3">Employee Role</Badge>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="My Tasks"
          value="0"
          description="0 due today"
          icon={<CheckSquare className="h-6 w-6 text-white" />}
          iconColor="bg-blue-600"
          descriptionColor="text-orange-500"
        />
        <StatsCard 
          title="Leave Balance"
          value="21"
          description="Days remaining in 2023"
          icon={<Calendar className="h-6 w-6 text-white" />}
          iconColor="bg-blue-400"
        />
        <StatsCard 
          title="Attendance"
          value="98%"
          description="↗ 2% from last month"
          icon={<User className="h-6 w-6 text-white" />}
          iconColor="bg-green-500"
          descriptionColor="text-green-600"
        />
        <StatsCard 
          title="Today"
          value={formattedDate}
          description={`Checked in at ${checkInTime}`}
          icon={<Clock className="h-6 w-6 text-white" />}
          iconColor="bg-orange-400"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>My Tasks</CardTitle>
            <CardDescription>Track your assigned tasks and deadlines</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-6 py-4 border-b">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Current Progress</h3>
                <Badge variant="outline">7/10 tasks</Badge>
              </div>
              <Progress value={70} className="h-2" />
            </div>
            <div className="divide-y">
              <Task 
                title="Complete employee satisfaction survey" 
                dueDate="Today"
                status="pending"
                priority="high"
              />
              <Task 
                title="Submit quarterly objectives" 
                dueDate="Jun 15, 2023"
                status="in-progress"
                priority="high"
              />
              <Task 
                title="Review department guidelines" 
                dueDate="Jun 20, 2023"
                status="pending"
                priority="medium"
              />
              <Task 
                title="Prepare for team meeting" 
                dueDate="Jun 10, 2023"
                status="completed"
                priority="medium"
              />
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button variant="outline" size="sm" className="ml-auto">View All Tasks</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Company Updates</CardTitle>
            <CardDescription>Latest news and announcements</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              <Update 
                title="Office Closure Notification" 
                content="The office will be closed on July 4th for Independence Day. All employees will have the day off with pay."
                date="2 hours ago"
                isImportant={true}
              />
              <Update 
                title="New Health Benefits Available" 
                content="We've updated our health insurance plans with new coverage options. Open enrollment begins next week."
                date="Yesterday"
              />
              <Update 
                title="Quarterly Town Hall" 
                content="Join us next Friday at 3 PM for our quarterly company update and Q&A session with leadership."
                date="3 days ago"
              />
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button variant="outline" size="sm" className="ml-auto">View All Updates</Button>
          </CardFooter>
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
