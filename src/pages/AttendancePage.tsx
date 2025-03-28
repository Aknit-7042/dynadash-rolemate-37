
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Clock, CheckCircle2, XCircle, AlertCircle, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Sample attendance data
const attendanceData = [
  { date: new Date(2023, 4, 1), status: 'present', checkIn: '09:05 AM', checkOut: '06:10 PM', workingHours: '9h 05m' },
  { date: new Date(2023, 4, 2), status: 'present', checkIn: '09:00 AM', checkOut: '06:00 PM', workingHours: '9h 00m' },
  { date: new Date(2023, 4, 3), status: 'absent', checkIn: '', checkOut: '', workingHours: '0h 00m' },
  { date: new Date(2023, 4, 4), status: 'half-day', checkIn: '09:00 AM', checkOut: '01:30 PM', workingHours: '4h 30m' },
  { date: new Date(2023, 4, 5), status: 'present', checkIn: '08:55 AM', checkOut: '06:05 PM', workingHours: '9h 10m' },
  { date: new Date(2023, 4, 8), status: 'present', checkIn: '09:02 AM', checkOut: '06:00 PM', workingHours: '8h 58m' },
  { date: new Date(2023, 4, 9), status: 'present', checkIn: '09:00 AM', checkOut: '06:15 PM', workingHours: '9h 15m' },
  { date: new Date(2023, 4, 10), status: 'half-day', checkIn: '09:00 AM', checkOut: '02:00 PM', workingHours: '5h 00m' },
  { date: new Date(2023, 4, 11), status: 'present', checkIn: '08:50 AM', checkOut: '06:05 PM', workingHours: '9h 15m' },
  { date: new Date(2023, 4, 12), status: 'present', checkIn: '09:00 AM', checkOut: '06:00 PM', workingHours: '9h 00m' },
  { date: new Date(2023, 4, 15), status: 'absent', checkIn: '', checkOut: '', workingHours: '0h 00m' },
  { date: new Date(2023, 4, 16), status: 'present', checkIn: '09:00 AM', checkOut: '06:00 PM', workingHours: '9h 00m' },
  { date: new Date(2023, 4, 17), status: 'present', checkIn: '09:10 AM', checkOut: '06:15 PM', workingHours: '9h 05m' },
  { date: new Date(2023, 4, 18), status: 'present', checkIn: '08:55 AM', checkOut: '06:10 PM', workingHours: '9h 15m' },
  { date: new Date(2023, 4, 19), status: 'half-day', checkIn: '09:00 AM', checkOut: '01:45 PM', workingHours: '4h 45m' },
];

const AttendancePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date>(new Date());

  // Find attendance info for the selected date
  const selectedAttendance = selectedDate 
    ? attendanceData.find(item => 
        item.date.getDate() === selectedDate.getDate() && 
        item.date.getMonth() === selectedDate.getMonth() && 
        item.date.getFullYear() === selectedDate.getFullYear())
    : undefined;

  // Function to get status badge
  const getStatusBadge = (status: string) => {
    if (status === 'present') {
      return (
        <Badge className="bg-green-100 text-green-800 border border-green-200">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Present
        </Badge>
      );
    }
    if (status === 'absent') {
      return (
        <Badge className="bg-red-100 text-red-800 border border-red-200">
          <XCircle className="h-3 w-3 mr-1" />
          Absent
        </Badge>
      );
    }
    if (status === 'half-day') {
      return (
        <Badge className="bg-gray-100 text-gray-800 border border-gray-200">
          <AlertCircle className="h-3 w-3 mr-1" />
          Half Day
        </Badge>
      );
    }
    return null;
  };

  // Get current month stats
  const currentMonthData = attendanceData.filter(
    (item) => item.date.getMonth() === month.getMonth() && item.date.getFullYear() === month.getFullYear()
  );
  
  const presentDays = currentMonthData.filter((item) => item.status === 'present').length;
  const absentDays = currentMonthData.filter((item) => item.status === 'absent').length;
  const halfDays = currentMonthData.filter((item) => item.status === 'half-day').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
        <Badge className="bg-employee text-employee-foreground text-sm py-1 px-3">Employee Role</Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-xl">
                <CalendarIcon className="h-5 w-5 text-blue-500" />
                Attendance Calendar
              </CardTitle>
              <CardDescription>
                View your attendance records for {format(month, 'MMMM yyyy')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <Calendar 
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  month={month}
                  onMonthChange={setMonth}
                  className="rounded-md border shadow-sm"
                  modifiersClassNames={{
                    selected: 'ring-2 ring-blue-600',
                  }}
                  modifiers={{
                    present: attendanceData
                      .filter(day => day.status === 'present')
                      .map(day => day.date),
                    absent: attendanceData
                      .filter(day => day.status === 'absent')
                      .map(day => day.date),
                    halfDay: attendanceData
                      .filter(day => day.status === 'half-day')
                      .map(day => day.date),
                  }}
                  modifiersStyles={{
                    present: { 
                      backgroundColor: '#F2FCE2', 
                      color: '#22c55e', 
                      fontWeight: 'bold',
                      borderRadius: '0.375rem'
                    },
                    absent: { 
                      backgroundColor: '#FEC6A1', 
                      color: '#ef4444', 
                      fontWeight: 'bold',
                      borderRadius: '0.375rem' 
                    },
                    halfDay: { 
                      backgroundColor: '#F1F0FB', 
                      color: '#6b7280', 
                      fontWeight: 'bold',
                      borderRadius: '0.375rem' 
                    }
                  }}
                />
              </div>
              
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Present</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm">Absent</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-gray-400 mr-2"></div>
                  <span className="text-sm">Half Day</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <Card className="bg-green-50 border-green-100">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-green-600">{presentDays}</div>
                <div className="text-sm text-green-700">Present</div>
              </CardContent>
            </Card>
            <Card className="bg-red-50 border-red-100">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-red-600">{absentDays}</div>
                <div className="text-sm text-red-700">Absent</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-50 border-gray-100">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-gray-600">{halfDays}</div>
                <div className="text-sm text-gray-700">Half Day</div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="lg:col-span-5">
          <Card className="shadow-md transition-all duration-200 hover:shadow-lg h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Clock className="h-5 w-5 text-blue-500" />
                {selectedDate ? (
                  <>Attendance Details: {format(selectedDate, 'EEEE, dd MMMM yyyy')}</>
                ) : (
                  <>Attendance Details</>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedAttendance ? (
                <div className="space-y-5">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium">Status:</div>
                    <div className="flex items-center">
                      {getStatusBadge(selectedAttendance.status)}
                    </div>
                  </div>
                  
                  {selectedAttendance.status !== 'absent' && (
                    <>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100">
                          <div className="text-sm font-medium text-gray-600 mb-1">Check In</div>
                          <div className="text-lg font-semibold text-blue-600">{selectedAttendance.checkIn}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100">
                          <div className="text-sm font-medium text-gray-600 mb-1">Check Out</div>
                          <div className="text-lg font-semibold text-blue-600">{selectedAttendance.checkOut}</div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                        <div className="text-sm font-medium text-gray-600 mb-1 text-center">Working Hours</div>
                        <div className="text-2xl font-bold text-center text-blue-600">{selectedAttendance.workingHours}</div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="py-16 text-center">
                  {selectedDate ? (
                    <div className="space-y-2">
                      <AlertCircle className="h-12 w-12 text-gray-300 mx-auto" />
                      <p className="text-muted-foreground">No attendance record found for this date.</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto" />
                      <p className="text-muted-foreground">Select a date to view attendance details.</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
