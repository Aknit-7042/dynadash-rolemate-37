
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useRole } from '@/context/RoleContext';
import { 
  BarChart3, CheckCircle2, Clock, ArrowUpRight, 
  Users, Briefcase, AlertCircle, X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TeamMemberProps {
  name: string;
  position: string;
  avatar?: string;
  taskCompleted: number;
  taskTotal: number;
  onClick: () => void;
}

const TeamMember: React.FC<TeamMemberProps> = ({ 
  name, position, avatar, taskCompleted, taskTotal, onClick
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
    <div 
      className="flex items-center p-4 rounded-lg border mb-3 cursor-pointer hover:bg-accent/50 transition-colors"
      onClick={onClick}
    >
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

interface OrgChartMemberProps {
  name: string;
  position: string;
  avatar?: string;
  isManager?: boolean;
  department?: string;
}

const OrgChartMember: React.FC<OrgChartMemberProps> = ({ 
  name, position, avatar, isManager = false, department
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className={cn(
      "flex flex-col items-center p-4 rounded-lg border",
      isManager ? "bg-accent/10 border-primary" : ""
    )}>
      <Avatar className={cn("h-16 w-16 mb-2", isManager ? "ring-2 ring-primary" : "")}>
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback className="text-lg">{getInitials(name)}</AvatarFallback>
      </Avatar>
      <p className="font-medium text-center">{name}</p>
      <p className="text-sm text-muted-foreground text-center">{position}</p>
      {department && <Badge className="mt-1">{department}</Badge>}
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
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  
  // Team members data
  const teamMembers = [
    { 
      name: "Sarah Miller", 
      position: "Senior Developer", 
      taskCompleted: 15, 
      taskTotal: 18,
      department: "Engineering"
    },
    { 
      name: "Alex Chen", 
      position: "UX Designer", 
      taskCompleted: 12, 
      taskTotal: 15,
      department: "Design"
    },
    { 
      name: "Emily Davis", 
      position: "Marketing Specialist", 
      taskCompleted: 8, 
      taskTotal: 12,
      department: "Marketing"
    },
    { 
      name: "Michael Brown", 
      position: "Junior Developer", 
      taskCompleted: 6, 
      taskTotal: 10,
      department: "Engineering"
    }
  ];

  // Department organization charts
  const departmentOrgCharts = {
    Engineering: [
      { name: "John Peterson", position: "Engineering Manager", isManager: true },
      { name: "Sarah Miller", position: "Senior Developer" },
      { name: "Michael Brown", position: "Junior Developer" },
      { name: "David Wilson", position: "Backend Developer" },
      { name: "Lisa Johnson", position: "QA Engineer" }
    ],
    Design: [
      { name: "Rebecca Taylor", position: "Design Director", isManager: true },
      { name: "Alex Chen", position: "UX Designer" },
      { name: "Olivia White", position: "UI Designer" },
      { name: "James Martin", position: "Graphic Designer" }
    ],
    Marketing: [
      { name: "Thomas Baker", position: "Marketing Director", isManager: true },
      { name: "Emily Davis", position: "Marketing Specialist" },
      { name: "Sophia Garcia", position: "Content Strategist" },
      { name: "Daniel Lewis", position: "Social Media Manager" }
    ]
  };

  const handleTeamMemberClick = (name: string) => {
    const member = teamMembers.find(m => m.name === name);
    if (member) {
      setSelectedTeam(member.department);
    }
  };

  const handleCloseOrgChart = () => {
    setSelectedTeam(null);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Manager Dashboard</h1>
        <Badge className="bg-manager text-manager-foreground text-sm py-1 px-3">Manager Role</Badge>
      </div>
      
      {selectedTeam ? (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{selectedTeam} Department</CardTitle>
              <CardDescription>Organizational structure</CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full" 
              onClick={handleCloseOrgChart}
            >
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {/* Manager at the top */}
              <div className="flex justify-center mb-6">
                {departmentOrgCharts[selectedTeam as keyof typeof departmentOrgCharts]
                  .filter(member => member.isManager)
                  .map(manager => (
                    <OrgChartMember 
                      key={manager.name}
                      name={manager.name}
                      position={manager.position}
                      isManager={true}
                    />
                  ))
                }
              </div>
              
              {/* Team members in a grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {departmentOrgCharts[selectedTeam as keyof typeof departmentOrgCharts]
                  .filter(member => !member.isManager)
                  .map(member => (
                    <OrgChartMember 
                      key={member.name}
                      name={member.name}
                      position={member.position}
                    />
                  ))
                }
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleCloseOrgChart} className="ml-auto">
              Back to Dashboard
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
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
                {teamMembers.map(member => (
                  <TeamMember 
                    key={member.name}
                    name={member.name}
                    position={member.position}
                    taskCompleted={member.taskCompleted}
                    taskTotal={member.taskTotal}
                    onClick={() => handleTeamMemberClick(member.name)}
                  />
                ))}
              </CardContent>
              <CardFooter>
                <Button size="sm" className="ml-auto">View Team</Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="grid md:grid-cols-1 gap-6">
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
          </div>
        </>
      )}
    </div>
  );
};

export default ManagerDashboard;
