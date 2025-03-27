
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { useRole } from '@/context/RoleContext';
import { BarChart3, Clock, Users } from 'lucide-react';
import StatCard from './StatCard';
import TaskSection from './TaskSection';
import TeamPerformance from './TeamPerformance';
import DeadlinesSection from './DeadlinesSection';
import OrgChart from './OrgChart';
import { TeamMemberProps } from './TeamMember';
import { TaskProps } from './Task';
import { OrgChartMemberProps } from './OrgChartMember';

const ManagerDashboard: React.FC = () => {
  const { currentRole } = useRole();
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  
  const teamMembers: TeamMemberProps[] = [
    { 
      name: "Sarah Miller", 
      position: "Senior Developer", 
      taskCompleted: 15, 
      taskTotal: 18,
      onClick: () => handleTeamMemberClick("Sarah Miller")
    },
    { 
      name: "Alex Chen", 
      position: "UX Designer", 
      taskCompleted: 12, 
      taskTotal: 15,
      onClick: () => handleTeamMemberClick("Alex Chen")
    },
    { 
      name: "Emily Davis", 
      position: "Marketing Specialist", 
      taskCompleted: 8, 
      taskTotal: 12,
      onClick: () => handleTeamMemberClick("Emily Davis")
    },
    { 
      name: "Michael Brown", 
      position: "Junior Developer", 
      taskCompleted: 6, 
      taskTotal: 10,
      onClick: () => handleTeamMemberClick("Michael Brown")
    }
  ];

  const departmentOrgCharts: Record<string, OrgChartMemberProps[]> = {
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

  const tasks: TaskProps[] = [
    { 
      title: "Complete Q2 performance reviews",
      assignee: "John Peterson",
      dueDate: "Jun 15, 2023",
      priority: "high",
      status: "in-progress"
    },
    { 
      title: "Prepare client presentation",
      assignee: "Sarah Miller",
      dueDate: "Jun 10, 2023",
      priority: "high",
      status: "pending"
    },
    { 
      title: "Update project documentation",
      assignee: "Alex Chen",
      dueDate: "Jun 20, 2023",
      priority: "medium",
      status: "in-progress"
    },
    { 
      title: "Review marketing strategy",
      assignee: "Emily Davis",
      dueDate: "Jun 8, 2023",
      priority: "medium",
      status: "completed"
    },
    { 
      title: "Schedule team building event",
      assignee: "Michael Brown",
      dueDate: "Jun 25, 2023",
      priority: "low",
      status: "pending"
    }
  ];

  const deadlines = [
    {
      title: "Product Launch",
      description: "Finalize v2.0 feature set",
      date: "Jun 15, 2023"
    },
    {
      title: "Quarterly Review",
      description: "Present team performance metrics",
      date: "Jun 30, 2023"
    },
    {
      title: "Budget Planning",
      description: "Submit Q3 resource requirements",
      date: "Jul 5, 2023"
    }
  ];

  const handleTeamMemberClick = (name: string) => {
    const memberDepartment = getMemberDepartment(name);
    if (memberDepartment) {
      setSelectedTeam(memberDepartment);
    }
  };

  const getMemberDepartment = (name: string): string | null => {
    for (const department in departmentOrgCharts) {
      const found = departmentOrgCharts[department].find(m => m.name === name);
      if (found) return department;
    }
    return null;
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
        <OrgChart
          department={selectedTeam}
          members={departmentOrgCharts[selectedTeam]}
          onClose={handleCloseOrgChart}
        />
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
            <TaskSection tasks={tasks} />
            
            <TeamPerformance 
              members={teamMembers}
              onMemberClick={handleTeamMemberClick}
              onViewTeam={() => setSelectedTeam("Engineering")}
            />
          </div>
          
          <div className="grid md:grid-cols-1 gap-6">
            <DeadlinesSection deadlines={deadlines} />
          </div>
        </>
      )}
    </div>
  );
};

export default ManagerDashboard;
