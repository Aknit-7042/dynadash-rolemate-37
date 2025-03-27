
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useRole } from '@/context/RoleContext';
import { BarChart3, Clock, Users } from 'lucide-react';
import StatCard from './StatCard';
import { useNavigate } from 'react-router-dom';

const ManagerDashboard: React.FC = () => {
  const { currentRole } = useRole();
  const navigate = useNavigate();
  
  const teamMembers = [
    { 
      id: "TM001",
      name: "Sarah Miller", 
      position: "Senior Developer",
      email: "sarah.miller@example.com",
      phone: "555-123-4567",
      gender: "Female"
    },
    { 
      id: "TM002",
      name: "Alex Chen", 
      position: "UX Designer",
      email: "alex.chen@example.com",
      phone: "555-234-5678",
      gender: "Male"
    },
    { 
      id: "TM003",
      name: "Emily Davis", 
      position: "Marketing Specialist",
      email: "emily.davis@example.com",
      phone: "555-345-6789",
      gender: "Female"
    },
    { 
      id: "TM004",
      name: "Michael Brown", 
      position: "Junior Developer",
      email: "michael.brown@example.com",
      phone: "555-456-7890",
      gender: "Male"
    }
  ];

  const handleViewMember = (memberId: string) => {
    navigate(`/dashboard/team-member/${memberId}`);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Manager Dashboard</h1>
        <Badge className="bg-manager text-manager-foreground text-sm py-1 px-3">Manager Role</Badge>
      </div>
      
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
      
      <div className="bg-white rounded-lg border shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Team Members</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-3 font-medium text-gray-700">ID</th>
                <th className="text-left p-3 font-medium text-gray-700">Name</th>
                <th className="text-left p-3 font-medium text-gray-700">Position</th>
                <th className="text-left p-3 font-medium text-gray-700">Gender</th>
                <th className="text-left p-3 font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map(member => (
                <tr key={member.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{member.id}</td>
                  <td className="p-3 font-medium">{member.name}</td>
                  <td className="p-3">{member.position}</td>
                  <td className="p-3">{member.gender}</td>
                  <td className="p-3">
                    <button 
                      onClick={() => handleViewMember(member.id)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
