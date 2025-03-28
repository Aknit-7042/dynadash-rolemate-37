
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar, Search, CheckCircle2, X, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample attendance data
const attendanceData = [
  {
    id: 'MED001',
    name: 'Arun',
    department: 'SALES',
    target: '18/20',
    attendance: [
      null, null, true, true, true, false, true, null, null, true, true, true, true, false
    ]
  },
  {
    id: 'MED002',
    name: 'Naman',
    department: 'Design',
    target: '18/20',
    attendance: [
      null, null, true, false, true, true, true, null, null, true, true, true, true, false
    ]
  },
  {
    id: 'MED003',
    name: 'Amit',
    department: 'Marketing',
    target: '18/20',
    attendance: [
      null, null, true, true, true, false, true, null, null, true, true, false, true, true
    ]
  },
  {
    id: 'MED004',
    name: 'Mahesh',
    department: 'SALES',
    target: '18/20',
    attendance: [
      null, null, false, true, true, true, true, null, null, true, true, true, false, true
    ]
  },
  {
    id: 'MED005',
    name: 'Rohit',
    department: 'HR',
    target: '18/20',
    attendance: [
      null, null, true, true, true, true, false, null, null, true, true, true, true, false
    ]
  },
  {
    id: 'MED006',
    name: 'Suresh',
    department: 'IT',
    target: '18/20',
    attendance: [
      null, null, true, true, false, true, true, null, null, { special: true }, true, true, true, true
    ]
  }
];

const AttendanceTracker: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('attendance');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('January 2023');
  
  const renderAttendanceStatus = (status: boolean | null | { special: boolean }) => {
    if (status === null) {
      return <div className="flex justify-center"><Circle className="h-5 w-5 text-gray-300" /></div>;
    } else if (status === true) {
      return <div className="flex justify-center"><CheckCircle2 className="h-5 w-5 text-green-500" /></div>;
    } else if (status === false) {
      return <div className="flex justify-center"><X className="h-5 w-5 text-red-500" /></div>;
    } else if (typeof status === 'object' && status.special) {
      return <div className="flex justify-center"><div className="h-5 w-5 rounded-full bg-purple-500"></div></div>;
    }
    return null;
  };

  const filteredData = attendanceData.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Employee ID</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Name</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Department</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">P / T.W.D</th>
                  
                  {/* January dates */}
                  {Array.from({ length: 14 }, (_, i) => i + 1).map(day => (
                    <th key={day} className="px-2 py-3 text-center">
                      <div className="text-sm font-medium text-gray-600">
                        Jan<br />{day.toString().padStart(2, '0')}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {new Date(2023, 0, day).toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((employee) => (
                  <tr key={employee.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{employee.id}</td>
                    <td className="px-4 py-3 text-sm font-medium">{employee.name}</td>
                    <td className="px-4 py-3 text-sm">{employee.department}</td>
                    <td className="px-4 py-3 text-sm">{employee.target}</td>
                    
                    {/* Attendance status for each day */}
                    {employee.attendance.map((status, index) => (
                      <td key={index} className="px-2 py-3 text-center">
                        {renderAttendanceStatus(status)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
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
