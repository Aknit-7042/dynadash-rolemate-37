
import React, { useState } from 'react';
import { useRole } from '@/context/RoleContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Search, UserPlus } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  gender: string;
  title: string;
  reportingManager: string;
}

const employeesData: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '9876543210',
    department: 'Engineering',
    gender: 'Male',
    title: 'Software Engineer',
    reportingManager: 'Sarah Parker'
  },
  {
    id: '2',
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    phone: '8765432109',
    department: 'Design',
    gender: 'Female',
    title: 'UI/UX Designer',
    reportingManager: 'Michael Brown'
  },
  {
    id: '3',
    name: 'Alex Thompson',
    email: 'alex.t@example.com',
    phone: '7654321098',
    department: 'Marketing',
    gender: 'Male',
    title: 'Product Manager',
    reportingManager: 'Michael Brown'
  },
  {
    id: '4',
    name: 'Sarah Parker',
    email: 'sarah.p@example.com',
    phone: '6543210987',
    department: 'Engineering',
    gender: 'Female',
    title: 'Engineering Manager',
    reportingManager: ''
  },
  {
    id: '5',
    name: 'James Wilson',
    email: 'james.w@example.com',
    phone: '5432109876',
    department: 'Sales',
    gender: 'Male',
    title: 'Sales Executive',
    reportingManager: 'Robert Clark'
  },
  {
    id: '6',
    name: 'Lisa Chen',
    email: 'lisa.chen@example.com',
    phone: '4321098765',
    department: 'Engineering',
    gender: 'Female',
    title: 'QA Engineer',
    reportingManager: 'Sarah Parker'
  }
];

const EmployeesPage: React.FC = () => {
  const { currentRole } = useRole();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = employeesData.filter(employee => 
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (currentRole !== 'hr') {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Access Denied</h2>
          <p className="text-muted-foreground mt-2">You don't have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
        <Badge className="bg-hr text-hr-foreground text-sm py-1 px-3">HR Role</Badge>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white self-start">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
        
        <div className="relative max-w-sm lg:max-w-md w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <Tabs defaultValue="basic">
          <TabsList className="border-b rounded-none border-gray-200 bg-gray-50 p-0 h-auto">
            <TabsTrigger 
              value="basic" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-white px-4 py-3"
            >
              Basic
            </TabsTrigger>
            <TabsTrigger 
              value="idProofs" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-white px-4 py-3"
            >
              ID Proofs
            </TabsTrigger>
            <TabsTrigger 
              value="salaryDetails" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-white px-4 py-3"
            >
              Salary Details
            </TabsTrigger>
            <TabsTrigger 
              value="bankDetails" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-white px-4 py-3"
            >
              Bank Details
            </TabsTrigger>
            <TabsTrigger 
              value="leavesPolicy" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-white px-4 py-3"
            >
              Leaves Policy
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="p-0 m-0">
            <div className="rounded-b-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="font-semibold text-gray-700">Name</TableHead>
                    <TableHead className="font-semibold text-gray-700">Email</TableHead>
                    <TableHead className="font-semibold text-gray-700">Phone no.</TableHead>
                    <TableHead className="font-semibold text-gray-700">Department</TableHead>
                    <TableHead className="font-semibold text-gray-700">Gender</TableHead>
                    <TableHead className="font-semibold text-gray-700">Title</TableHead>
                    <TableHead className="font-semibold text-gray-700">Reporting Manager</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                      <TableRow key={employee.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>{employee.phone}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.gender}</TableCell>
                        <TableCell>{employee.title}</TableCell>
                        <TableCell>{employee.reportingManager}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No employees found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="idProofs" className="p-6">
            <div className="h-64 flex items-center justify-center">
              <div className="text-center space-y-2">
                <h3 className="font-medium">ID Proofs Section</h3>
                <p className="text-sm text-muted-foreground">
                  This section would contain employee identification documents
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="salaryDetails" className="p-6">
            <div className="h-64 flex items-center justify-center">
              <div className="text-center space-y-2">
                <h3 className="font-medium">Salary Details Section</h3>
                <p className="text-sm text-muted-foreground">
                  This section would contain employee salary information
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="bankDetails" className="p-6">
            <div className="h-64 flex items-center justify-center">
              <div className="text-center space-y-2">
                <h3 className="font-medium">Bank Details Section</h3>
                <p className="text-sm text-muted-foreground">
                  This section would contain employee banking information
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="leavesPolicy" className="p-6">
            <div className="h-64 flex items-center justify-center">
              <div className="text-center space-y-2">
                <h3 className="font-medium">Leaves Policy Section</h3>
                <p className="text-sm text-muted-foreground">
                  This section would contain employee leave entitlements and policies
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployeesPage;
