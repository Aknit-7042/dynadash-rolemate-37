
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, X, AlertCircle, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

const EmployeeAttendance: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Sample attendance data - this would come from API in a real application
  const attendanceData = [
    { date: '2023-01-01', status: 'present', checkIn: '09:00 AM', checkOut: '06:00 PM' },
    { date: '2023-01-02', status: 'present', checkIn: '09:15 AM', checkOut: '06:30 PM' },
    { date: '2023-01-03', status: 'absent', reason: 'Sick Leave' },
    { date: '2023-01-04', status: 'present', checkIn: '09:05 AM', checkOut: '06:10 PM' },
    { date: '2023-01-05', status: 'late', checkIn: '10:30 AM', checkOut: '07:00 PM' },
  ];
  
  // Get selected day's attendance record
  const selectedDayRecord = date ? attendanceData.find(record => 
    record.date === format(date, 'yyyy-MM-dd')
  ) : null;
  
  // Helper function to render status badge
  const renderStatusBadge = (status: string) => {
    switch(status) {
      case 'present':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Present</Badge>;
      case 'absent':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Absent</Badge>;
      case 'late':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Late</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Attendance</h1>
        <Badge className="bg-employee text-employee-foreground">Employee View</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Attendance Calendar */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl">Attendance Calendar</CardTitle>
            <CardDescription>View and track your attendance history</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        
        {/* Attendance Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {date ? format(date, 'MMMM d, yyyy') : 'Select a date'}
            </CardTitle>
            <CardDescription>Attendance details</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDayRecord ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Status:</span>
                  {renderStatusBadge(selectedDayRecord.status)}
                </div>
                
                {selectedDayRecord.status === 'present' || selectedDayRecord.status === 'late' ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-sm flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" /> Check In
                      </span>
                      <span>{selectedDayRecord.checkIn}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" /> Check Out
                      </span>
                      <span>{selectedDayRecord.checkOut}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-sm flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" /> Reason
                    </span>
                    <span>{selectedDayRecord.reason}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground">
                <CalendarIcon className="h-8 w-8 mb-2 text-muted-foreground/60" />
                <p>Select a date to view attendance details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Monthly Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Monthly Summary</CardTitle>
          <CardDescription>Your attendance statistics for this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="flex items-center mb-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="text-sm font-medium">Present Days</h3>
              </div>
              <p className="text-2xl font-bold">18</p>
              <p className="text-xs text-muted-foreground">of 22 working days</p>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <div className="flex items-center mb-2">
                <X className="h-5 w-5 text-red-500 mr-2" />
                <h3 className="text-sm font-medium">Absent Days</h3>
              </div>
              <p className="text-2xl font-bold">2</p>
              <p className="text-xs text-muted-foreground">of 22 working days</p>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 text-amber-500 mr-2" />
                <h3 className="text-sm font-medium">Late Check-ins</h3>
              </div>
              <p className="text-2xl font-bold">2</p>
              <p className="text-xs text-muted-foreground">of 22 working days</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center mb-2">
                <CalendarIcon className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-sm font-medium">Attendance Rate</h3>
              </div>
              <p className="text-2xl font-bold">91%</p>
              <p className="text-xs text-muted-foreground">this month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeAttendance;
