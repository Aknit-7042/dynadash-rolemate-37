
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// Sample team members data
const teamMembers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "9876543210",
    department: "Engineering",
    gender: "Male",
    title: "Software Engineer",
    reportingManager: "Sarah Parker"
  },
  {
    id: "2",
    name: "Emma Wilson",
    email: "",
    phone: "8765432109",
    department: "Design",
    gender: "Female",
    title: "",
    reportingManager: "Michael Brown"
  },
  {
    id: "3",
    name: "Alex Thompson",
    email: "alex.t@example.com",
    phone: "7654321098",
    department: "",
    gender: "Male",
    title: "Product Manager",
    reportingManager: ""
  },
  {
    id: "4",
    name: "Sarah Parker",
    email: "sarah.p@example.com",
    phone: "6543210987",
    department: "Engineering",
    gender: "Female",
    title: "Engineering Manager",
    reportingManager: ""
  },
  {
    id: "5",
    name: "James Wilson",
    email: "",
    phone: "5432109876",
    department: "Sales",
    gender: "",
    title: "Sales Executive",
    reportingManager: "Robert Clark"
  },
  {
    id: "6",
    name: "Lisa Chen",
    email: "lisa.chen@example.com",
    phone: "4321098765",
    department: "",
    gender: "Female",
    title: "",
    reportingManager: "Sarah Parker"
  }
];

const TeamPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/dashboard')}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
        </div>
        <Badge className="bg-manager text-manager-foreground text-sm py-1 px-3">Manager Role</Badge>
      </div>

      <div className="bg-white rounded-lg border shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="text-left p-4 font-medium text-gray-700">Name</th>
                <th className="text-left p-4 font-medium text-gray-700">Email</th>
                <th className="text-left p-4 font-medium text-gray-700">Phone no.</th>
                <th className="text-left p-4 font-medium text-gray-700">Department</th>
                <th className="text-left p-4 font-medium text-gray-700">Gender</th>
                <th className="text-left p-4 font-medium text-gray-700">Title</th>
                <th className="text-left p-4 font-medium text-gray-700">Reporting Manager</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map(member => (
                <tr key={member.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{member.name}</td>
                  <td className="p-4">{member.email}</td>
                  <td className="p-4">{member.phone}</td>
                  <td className="p-4">{member.department}</td>
                  <td className="p-4">{member.gender}</td>
                  <td className="p-4">{member.title}</td>
                  <td className="p-4">{member.reportingManager}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
