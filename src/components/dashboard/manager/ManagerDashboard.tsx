
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { useRole } from '@/context/RoleContext';
import { BarChart3, Clock, Users, Calendar, User, DollarSign, FileText } from 'lucide-react';
import StatCard from './StatCard';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

const ManagerDashboard: React.FC = () => {
  const {
    currentRole
  } = useRole();
  const navigate = useNavigate();
  const [showRequestDetails, setShowRequestDetails] = useState(false);
  
  const teamMembers = [{
    id: "TM001",
    name: "Sarah Miller",
    position: "Senior Developer",
    email: "sarah.miller@example.com",
    phone: "555-123-4567",
    gender: "Female"
  }, {
    id: "TM002",
    name: "Alex Chen",
    position: "UX Designer",
    email: "alex.chen@example.com",
    phone: "555-234-5678",
    gender: "Male"
  }, {
    id: "TM003",
    name: "Emily Davis",
    position: "Marketing Specialist",
    email: "emily.davis@example.com",
    phone: "555-345-6789",
    gender: "Female"
  }, {
    id: "TM004",
    name: "Michael Brown",
    position: "Junior Developer",
    email: "michael.brown@example.com",
    phone: "555-456-7890",
    gender: "Male"
  }];
  
  const handleViewTeam = () => {
    navigate('/dashboard/team');
  };
  
  const handleOpenRequestsClick = () => {
    setShowRequestDetails(!showRequestDetails);
  };

  const leaveRequestsData = [
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
  
  return <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Manager Dashboard</h1>
        <Badge className="bg-manager text-manager-foreground text-sm py-1 px-3">Manager Role</Badge>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Team Members" value="12" description="People in your department" icon={<Users className="h-5 w-5" />} trend="this quarter" trendValue="+2" trendDirection="up" onClick={handleViewTeam} />
        <StatCard 
          title="Leave Requests" 
          value="5" 
          description="Pending approval from your team" 
          icon={<Clock className="h-5 w-5" />} 
          trend="since last week" 
          trendValue="+3" 
          trendDirection="neutral" 
          onClick={handleOpenRequestsClick}
          isActive={showRequestDetails}
        />
        <StatCard title="Performance" value="94%" description="Average team performance score" icon={<BarChart3 className="h-5 w-5" />} trend="vs last quarter" trendValue="+2%" trendDirection="up" />
      </div>
      
      {showRequestDetails && (
        <Card>
          <CardHeader>
            <CardTitle>Leave Request Details</CardTitle>
            <CardDescription>Manage leave requests from your team members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-4 gap-2">
                <Button variant="outline" className={cn("flex items-center justify-center gap-2 rounded-md py-6", "bg-blue-50 text-blue-600 border-blue-200")}>
                  <Calendar className="h-5 w-5" />
                  <span>Leave Requests</span>
                </Button>
                <Button variant="outline" className="flex items-center justify-center gap-2 rounded-md py-6">
                  <User className="h-5 w-5" />
                  <span>Profile Updates</span>
                </Button>
                <Button variant="outline" className="flex items-center justify-center gap-2 rounded-md py-6">
                  <DollarSign className="h-5 w-5" />
                  <span>Expense</span>
                </Button>
                <Button variant="outline" className="flex items-center justify-center gap-2 rounded-md py-6">
                  <FileText className="h-5 w-5" />
                  <span>Advance</span>
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
                  {leaveRequestsData.map(request => (
                    <TableRow key={request.id}>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>;
};

export default ManagerDashboard;
