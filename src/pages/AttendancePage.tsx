
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table';
import AttendanceCharts from '@/components/dashboard/hr/AttendanceCharts';

const AttendancePage = () => {
  // Sample data for attendance records
  const attendanceData = [
    {
      id: 'MED001',
      name: 'Arun',
      department: 'SALES',
      attendance: '18/20',
      days: [false, false, true, true, true, false, true, false, false, true, true, true, true, false]
    },
    {
      id: 'MED002',
      name: 'Naman',
      department: 'Design',
      attendance: '18/20',
      days: [false, false, true, false, true, true, true, false, false, true, true, true, true, false]
    },
    {
      id: 'MED003',
      name: 'Amit',
      department: 'Marketing',
      attendance: '18/20',
      days: [false, false, true, true, true, false, true, false, false, true, true, false, true, true]
    },
    {
      id: 'MED004',
      name: 'Mahesh',
      department: 'SALES',
      attendance: '18/20',
      days: [false, false, false, true, true, true, true, false, false, true, true, true, false, true]
    },
    {
      id: 'MED005',
      name: 'Rohit',
      department: 'HR',
      attendance: '18/20',
      days: [false, false, true, true, true, true, false, false, false, true, true, true, true, false]
    },
    {
      id: 'MED006',
      name: 'Suresh',
      department: 'IT',
      attendance: '18/20',
      days: [false, false, true, true, false, true, true, false, false, 'half-day', true, true, true, true]
    },
    {
      id: 'MED007',
      name: 'Arun',
      department: 'SALES',
      attendance: '18/20',
      days: [false, false, true, true, true, false, true, false, false, true, true, true, true, false]
    },
    {
      id: 'MED008',
      name: 'Naman',
      department: 'Design',
      attendance: '18/20',
      days: [false, false, true, false, true, true, true, false, false, true, true, true, true, false]
    },
    {
      id: 'MED009',
      name: 'Amit',
      department: 'Marketing',
      attendance: '18/20',
      days: [false, false, true, true, true, false, true, false, false, true, true, false, true, false]
    }
  ];

  const days = [
    { day: '01', weekday: 'Mon' },
    { day: '02', weekday: 'Tue' },
    { day: '03', weekday: 'Wed' },
    { day: '04', weekday: 'Thu' },
    { day: '05', weekday: 'Fri' },
    { day: '06', weekday: 'Sat' },
    { day: '07', weekday: 'Sun' },
    { day: '08', weekday: 'Mon' },
    { day: '09', weekday: 'Tue' },
    { day: '10', weekday: 'Wed' },
    { day: '11', weekday: 'Thu' },
    { day: '12', weekday: 'Fri' },
    { day: '13', weekday: 'Sat' },
    { day: '14', weekday: 'Sun' }
  ];

  // Render attendance cell based on attendance status
  const renderAttendanceCell = (status: boolean | string) => {
    if (status === 'half-day') {
      return (
        <div className="flex justify-center">
          <div className="w-6 h-6 rounded-full bg-purple-500"></div>
        </div>
      );
    } else if (status === true) {
      return (
        <div className="flex justify-center">
          <Check className="w-5 h-5 text-green-500" />
        </div>
      );
    } else if (status === false) {
      return (
        <div className="flex justify-center">
          <X className="w-5 h-5 text-red-500" />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="attendance">
        <TabsList className="mb-4">
          <TabsTrigger value="attendance" className="text-blue-500">
            Attendance Tracker
          </TabsTrigger>
          <TabsTrigger value="analytics">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="leave">
            Leave Tracker
          </TabsTrigger>
          <TabsTrigger value="basic">
            Basic
          </TabsTrigger>
          <TabsTrigger value="id">
            ID Proofs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="space-y-4">
          <div className="rounded-md border bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-medium">
                      Employee ID
                    </TableHead>
                    <TableHead className="font-medium">
                      Name
                    </TableHead>
                    <TableHead className="font-medium">
                      Department
                    </TableHead>
                    <TableHead className="font-medium">
                      P / T.W.D
                    </TableHead>
                    {days.map((day, idx) => (
                      <TableHead key={idx} className="text-center font-medium min-w-[50px]">
                        <div>Jan</div>
                        <div>{day.day}</div>
                        <div className="text-xs">{day.weekday}</div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceData.map((employee, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{employee.id}</TableCell>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.attendance}</TableCell>
                      {employee.days.map((status, dayIdx) => (
                        <TableCell key={dayIdx} className="py-2 px-1">
                          {renderAttendanceCell(status)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <AttendanceCharts />
        </TabsContent>

        <TabsContent value="leave">
          <div className="h-32 flex items-center justify-center border rounded-md">
            <p className="text-muted-foreground">Leave Tracker content will go here</p>
          </div>
        </TabsContent>

        <TabsContent value="basic">
          <div className="h-32 flex items-center justify-center border rounded-md">
            <p className="text-muted-foreground">Basic content will go here</p>
          </div>
        </TabsContent>

        <TabsContent value="id">
          <div className="h-32 flex items-center justify-center border rounded-md">
            <p className="text-muted-foreground">ID Proofs content will go here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendancePage;
