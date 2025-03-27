
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useRole } from '@/context/RoleContext';
import { 
  BarChart3, CheckCircle2, Clock, ArrowUpRight, 
  Users, CheckSquare, XCircle, Briefcase, AlertCircle 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TeamMemberProps {
  name: string;
  position: string;
  avatar?: string;
  taskCompleted: number;
  taskTotal: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({ 
  name, position, avatar, taskCompleted, taskTotal 
}) => {
  const progress = (taskCompleted / taskTotal) * 100;
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex items-center p-4 rounded-lg border mb-3">
      <Avatar className="h-10 w-10 mr-4">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <p className="font-medium">{name}</p>
          <span className="text-sm text-muted-foreground">{taskCompleted}/{taskTotal} tasks</span>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{position}</p>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
};

interface TaskProps {
  title: string;
  assignee: string;
  avatar?: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
}

const Task: React.FC<TaskProps> = ({
  title, assignee, avatar, dueDate, priority, status
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'in-progress': return <Clock className="h-5 w-5 text-blue-500" />;
      default: return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
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
    <div className="flex items-start gap-3 p-4 rounded-lg border mb-3">
      <div className="mt-1">{getStatusIcon(status)}</div>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="font-medium">{title}</p>
          <Badge className={cn("capitalize", getPriorityColor(priority))}>
            {priority}
          </Badge>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={avatar} alt={assignee} />
              <AvatarFallback className="text-xs">{getInitials(assignee)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{assignee}</span>
          </div>
          <div className="text-sm text-muted-foreground">{dueDate}</div>
        </div>
      </div>
    </div>
  );
};

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

const ManagerDashboard: React.FC = () => {
  const { currentRole } = useRole();
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Manager Dashboard</h1>
        <Badge className="bg-manager text-manager-foreground text-sm py-1 px-3">Manager Role</Badge>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Team Members" 
          value="12" 
          description="People in your department"
          icon={<Users className="h-5 w-5" />}
          trend="this quarter"
          trendValue="+2"
          trendDirection="up"
        />
        <StatCard 
          title="Tasks Completed" 
          value="78" 
          description="Out of 103 total tasks"
          icon={<CheckSquare className="h-5 w-5" />}
          trend="completion rate"
          trendValue="76%"
          trendDirection="up"
        />
        <StatCard 
          title="Leave Requests" 
          value="5" 
          description="Pending approval from your team"
          icon={<Clock className="h-5 w-5" />}
          trend="since last week"
          trendValue="+3"
          trendDirection="neutral"
        />
        <StatCard 
          title="Performance" 
          value="94%" 
          description="Average team performance score"
          icon={<BarChart3 className="h-5 w-5" />}
          trend="vs last quarter"
          trendValue="+2%"
          trendDirection="up"
        />
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Task Management</CardTitle>
            <CardDescription>Monitor and manage team tasks</CardDescription>
          </CardHeader>
          <CardContent className="max-h-[400px] overflow-auto">
            <Task 
              title="Complete Q2 performance reviews"
              assignee="John Peterson"
              dueDate="Jun 15, 2023"
              priority="high"
              status="in-progress"
            />
            <Task 
              title="Prepare client presentation"
              assignee="Sarah Miller"
              dueDate="Jun 10, 2023"
              priority="high"
              status="pending"
            />
            <Task 
              title="Update project documentation"
              assignee="Alex Chen"
              dueDate="Jun 20, 2023"
              priority="medium"
              status="in-progress"
            />
            <Task 
              title="Review marketing strategy"
              assignee="Emily Davis"
              dueDate="Jun 8, 2023"
              priority="medium"
              status="completed"
            />
            <Task 
              title="Schedule team building event"
              assignee="Michael Brown"
              dueDate="Jun 25, 2023"
              priority="low"
              status="pending"
            />
          </CardContent>
          <CardFooter>
            <Button size="sm" className="ml-auto">View All Tasks</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Member task completion status</CardDescription>
          </CardHeader>
          <CardContent>
            <TeamMember 
              name="Sarah Miller"
              position="Senior Developer"
              taskCompleted={15}
              taskTotal={18}
            />
            <TeamMember 
              name="Alex Chen"
              position="UX Designer"
              taskCompleted={12}
              taskTotal={15}
            />
            <TeamMember 
              name="Emily Davis"
              position="Marketing Specialist"
              taskCompleted={8}
              taskTotal={12}
            />
            <TeamMember 
              name="Michael Brown"
              position="Junior Developer"
              taskCompleted={6}
              taskTotal={10}
            />
          </CardContent>
          <CardFooter>
            <Button size="sm" className="ml-auto">View Team</Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Major projects and milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">Product Launch</p>
                  <p className="text-sm text-muted-foreground">Finalize v2.0 feature set</p>
                </div>
                <Badge>Jun 15, 2023</Badge>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">Quarterly Review</p>
                  <p className="text-sm text-muted-foreground">Present team performance metrics</p>
                </div>
                <Badge>Jun 30, 2023</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Budget Planning</p>
                  <p className="text-sm text-muted-foreground">Submit Q3 resource requirements</p>
                </div>
                <Badge>Jul 5, 2023</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Approval Requests</CardTitle>
            <CardDescription>Items requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start justify-between border-b pb-4">
                <div className="flex items-start gap-2">
                  <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Time Off Request</p>
                    <p className="text-sm text-muted-foreground">Sarah Miller - Jun 20-24</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" className="h-8 w-8 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button size="icon" variant="outline" className="h-8 w-8 rounded-full">
                    <XCircle className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              <div className="flex items-start justify-between border-b pb-4">
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Overtime Approval</p>
                    <p className="text-sm text-muted-foreground">Alex Chen - 8 hours</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" className="h-8 w-8 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button size="icon" variant="outline" className="h-8 w-8 rounded-full">
                    <XCircle className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Equipment Request</p>
                    <p className="text-sm text-muted-foreground">Michael Brown - New Laptop</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" className="h-8 w-8 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button size="icon" variant="outline" className="h-8 w-8 rounded-full">
                    <XCircle className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagerDashboard;
