
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRole } from '@/context/RoleContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

// Sample team member data (in a real app, this would be fetched from an API)
const teamMembersData = [
  { 
    id: "TM001",
    name: "Sarah Miller", 
    position: "Senior Developer",
    email: "sarah.miller@example.com",
    phone: "555-123-4567",
    gender: "Female", 
    department: "Engineering",
    joinDate: "May 10, 2020",
    reportingManager: "John Peterson"
  },
  { 
    id: "TM002",
    name: "Alex Chen", 
    position: "UX Designer",
    email: "alex.chen@example.com",
    phone: "555-234-5678",
    gender: "Male",
    department: "Design",
    joinDate: "June 15, 2021",
    reportingManager: "Rebecca Taylor"
  },
  { 
    id: "TM003",
    name: "Emily Davis", 
    position: "Marketing Specialist",
    email: "emily.davis@example.com",
    phone: "555-345-6789",
    gender: "Female",
    department: "Marketing",
    joinDate: "January 5, 2022",
    reportingManager: "Thomas Baker"
  },
  { 
    id: "TM004",
    name: "Michael Brown", 
    position: "Junior Developer",
    email: "michael.brown@example.com",
    phone: "555-456-7890",
    gender: "Male",
    department: "Engineering",
    joinDate: "March 20, 2023",
    reportingManager: "Sarah Miller"
  }
];

const TeamMemberPage = () => {
  const { memberId } = useParams();
  const { currentRole } = useRole();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const member = teamMembersData.find(member => member.id === memberId);

  if (!member) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={handleBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Member Not Found</h2>
            <p className="text-muted-foreground">The requested team member could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={handleBack} className="p-0 h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Team Member Details</h1>
        </div>
        <Badge className="bg-manager text-manager-foreground text-sm py-1 px-3">Manager Role</Badge>
      </div>
      
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="h-8 w-8" />
            </div>
            <div>
              <CardTitle className="text-2xl">{member.name}</CardTitle>
              <CardDescription>{member.position} - {member.department}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="border-b pb-3">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Employee ID</h3>
                <p className="font-medium">{member.id}</p>
              </div>
              <div className="border-b pb-3">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Full Name</h3>
                <p className="font-medium">{member.name}</p>
              </div>
              <div className="border-b pb-3">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Position</h3>
                <p className="font-medium">{member.position}</p>
              </div>
              <div className="border-b pb-3">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Gender</h3>
                <p className="font-medium">{member.gender}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="border-b pb-3">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                <p className="font-medium">{member.email}</p>
              </div>
              <div className="border-b pb-3">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone</h3>
                <p className="font-medium">{member.phone}</p>
              </div>
              <div className="border-b pb-3">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Department</h3>
                <p className="font-medium">{member.department}</p>
              </div>
              <div className="border-b pb-3">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Reporting Manager</h3>
                <p className="font-medium">{member.reportingManager}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamMemberPage;
