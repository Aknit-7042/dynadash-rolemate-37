
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

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

  // Function to determine the modifiers for each date
  const getDayClassNames = (day: Date) => {
    const found = attendanceData.find(item => 
      item.date.getDate() === day.getDate() && 
      item.date.getMonth() === day.getMonth() && 
      item.date.getFullYear() === day.getFullYear()
    );
    
    if (!found) return undefined;
    
    if (found.status === 'present') return 'bg-green-500 text-white hover:bg-green-600';
    if (found.status === 'absent') return 'bg-red-500 text-white hover:bg-red-600';
    if (found.status === 'half-day') return 'bg-gray-400 text-white hover:bg-gray-500';
    
    return undefined;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
        <Badge className="bg-employee text-employee-foreground text-sm py-1 px-3">Employee Role</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Attendance Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar 
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                month={month}
                onMonthChange={setMonth}
                className="rounded-md border p-3"
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
                  present: { backgroundColor: '#22c55e', color: 'white' },
                  absent: { backgroundColor: '#ef4444', color: 'white' },
                  halfDay: { backgroundColor: '#9ca3af', color: 'white' }
                }}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                {selectedDate ? (
                  <>Attendance Details: {format(selectedDate, 'dd MMMM yyyy')}</>
                ) : (
                  <>Attendance Details</>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedAttendance ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium">Status:</div>
                    <div className="flex items-center">
                      {selectedAttendance.status === 'present' && (
                        <Badge className="bg-green-500">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Present
                        </Badge>
                      )}
                      {selectedAttendance.status === 'absent' && (
                        <Badge className="bg-red-500">
                          <XCircle className="h-3 w-3 mr-1" />
                          Absent
                        </Badge>
                      )}
                      {selectedAttendance.status === 'half-day' && (
                        <Badge className="bg-gray-400">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Half Day
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {selectedAttendance.status !== 'absent' && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <div className="text-sm font-medium">Check In</div>
                          <div className="text-lg">{selectedAttendance.checkIn}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">Check Out</div>
                          <div className="text-lg">{selectedAttendance.checkOut}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-sm font-medium">Working Hours</div>
                        <div className="text-lg font-semibold">{selectedAttendance.workingHours}</div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="text-muted-foreground py-8 text-center">
                  {selectedDate ? (
                    <p>No attendance record found for this date.</p>
                  ) : (
                    <p>Select a date to view attendance details.</p>
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
