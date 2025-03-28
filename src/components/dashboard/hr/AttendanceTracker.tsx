
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar, Search, Check, X } from 'lucide-react';

interface EmployeeAttendanceRecord {
  id: string;
  name: string;
  department: string;
  presentDays: string;
  attendance: Record<string, 'present' | 'absent' | 'halfday' | 'pending' | 'weekend'>;
}

const daysOfMonth = Array.from({ length: 31 }, (_, i) => {
  const day = i + 1;
  const date = new Date(2023, 0, day); // January 2023
  return {
    day,
    date,
    dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
  };
});

const employeeAttendanceData: EmployeeAttendanceRecord[] = [
  { 
    id: 'MED001', 
    name: 'John Doe', 
    department: 'Engineering', 
    presentDays: '18/20', 
    attendance: {
      '1': 'present', '2': 'present', '3': 'present', '4': 'present', '5': 'present',
      '8': 'present', '9': 'present', '10': 'present', '11': 'present', '12': 'present',
      '15': 'absent', '16': 'present', '17': 'present', '18': 'present', '19': 'present',
      '22': 'present', '23': 'halfday', '24': 'present', '25': 'present', '26': 'present',
      '29': 'present', '30': 'present', '31': 'absent'
    }
  },
  { 
    id: 'MED002', 
    name: 'Jane Smith', 
    department: 'Design', 
    presentDays: '19/20', 
    attendance: {
      '1': 'present', '2': 'present', '3': 'present', '4': 'present', '5': 'present',
      '8': 'present', '9': 'present', '10': 'present', '11': 'present', '12': 'present',
      '15': 'present', '16': 'absent', '17': 'present', '18': 'present', '19': 'present',
      '22': 'present', '23': 'present', '24': 'present', '25': 'present', '26': 'present',
      '29': 'present', '30': 'present', '31': 'present'
    }
  },
  { 
    id: 'MED003', 
    name: 'Michael Brown', 
    department: 'Marketing', 
    presentDays: '17/20', 
    attendance: {
      '1': 'present', '2': 'present', '3': 'present', '4': 'present', '5': 'absent',
      '8': 'present', '9': 'present', '10': 'absent', '11': 'present', '12': 'present',
      '15': 'present', '16': 'present', '17': 'present', '18': 'present', '19': 'present',
      '22': 'halfday', '23': 'present', '24': 'present', '25': 'present', '26': 'present',
      '29': 'present', '30': 'present', '31': 'present'
    }
  },
  { 
    id: 'MED004', 
    name: 'Emily Johnson', 
    department: 'Sales', 
    presentDays: '16/20', 
    attendance: {
      '1': 'present', '2': 'present', '3': 'halfday', '4': 'present', '5': 'present',
      '8': 'absent', '9': 'present', '10': 'present', '11': 'present', '12': 'present',
      '15': 'present', '16': 'present', '17': 'present', '18': 'absent', '19': 'present',
      '22': 'present', '23': 'present', '24': 'present', '25': 'present', '26': 'present',
      '29': 'absent', '30': 'present', '31': 'present'
    }
  },
  { 
    id: 'MED005', 
    name: 'David Wilson', 
    department: 'HR', 
    presentDays: '18/20', 
    attendance: {
      '1': 'present', '2': 'present', '3': 'present', '4': 'present', '5': 'present',
      '8': 'present', '9': 'absent', '10': 'present', '11': 'present', '12': 'present',
      '15': 'present', '16': 'present', '17': 'present', '18': 'present', '19': 'absent',
      '22': 'present', '23': 'present', '24': 'halfday', '25': 'present', '26': 'present',
      '29': 'present', '30': 'present', '31': 'present'
    }
  },
  { 
    id: 'MED006', 
    name: 'Sarah Miller', 
    department: 'IT', 
    presentDays: '19/20', 
    attendance: {
      '1': 'present', '2': 'present', '3': 'present', '4': 'present', '5': 'present',
      '8': 'present', '9': 'present', '10': 'present', '11': 'halfday', '12': 'present',
      '15': 'present', '16': 'present', '17': 'present', '18': 'present', '19': 'present',
      '22': 'present', '23': 'present', '24': 'present', '25': 'absent', '26': 'present',
      '29': 'present', '30': 'present', '31': 'present'
    }
  }
];

const AttendanceTracker: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('attendance');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('January 2023');
  
  // Filter employees based on search term
  const filteredEmployees = employeeAttendanceData.filter(employee => {
    return (
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const renderAttendanceStatus = (status?: 'present' | 'absent' | 'halfday' | 'pending' | 'weekend') => {
    if (!status) return <div className="w-6 h-6 mx-auto rounded-md border border-gray-200 bg-white"></div>;
    
    if (status === 'present') {
      return (
        <div className="flex justify-center">
          <Check className="text-green-500 h-5 w-5" />
        </div>
      );
    }
    
    if (status === 'absent') {
      return (
        <div className="flex justify-center">
          <X className="text-red-500 h-5 w-5" />
        </div>
      );
    }
    
    if (status === 'halfday') {
      return (
        <div className="flex justify-center">
          <div className="w-5 h-5 rounded-full bg-purple-500"></div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search employee..." 
            className="pl-8" 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          <span className="text-sm font-medium">{selectedMonth}</span>
        </Button>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList>
          <TabsTrigger value="attendance" className="text-blue-600 data-[state=active]:bg-blue-50">
            Attendance Tracker
          </TabsTrigger>
          <TabsTrigger value="leave">
            Leave Tracker
          </TabsTrigger>
          <TabsTrigger value="basic">
            Basic
          </TabsTrigger>
          <TabsTrigger value="idproofs">
            ID Proofs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="pt-4">
          <div className="border rounded-lg bg-white overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-[100px]">Employee ID</TableHead>
                  <TableHead className="w-[150px]">Name</TableHead>
                  <TableHead className="w-[150px]">Department</TableHead>
                  <TableHead className="whitespace-nowrap">P / T.W.D</TableHead>
                  {daysOfMonth.map((day) => (
                    <TableHead key={day.day} className="text-center whitespace-nowrap px-2">
                      <div>Jan</div>
                      <div className="font-medium">{day.day.toString().padStart(2, '0')}</div>
                      <div className="text-xs">{day.dayName}</div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.id}</TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell className="text-center font-medium">{employee.presentDays}</TableCell>
                    {daysOfMonth.map((day) => (
                      <TableCell key={day.day} className="p-2 text-center">
                        {renderAttendanceStatus(employee.attendance[day.day.toString()])}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="leave">
          <div className="flex items-center justify-center h-60">
            <p className="text-muted-foreground">Leave tracker information will appear here.</p>
          </div>
        </TabsContent>

        <TabsContent value="basic">
          <div className="flex items-center justify-center h-60">
            <p className="text-muted-foreground">Basic information will appear here.</p>
          </div>
        </TabsContent>

        <TabsContent value="idproofs">
          <div className="flex items-center justify-center h-60">
            <p className="text-muted-foreground">ID proofs information will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendanceTracker;
