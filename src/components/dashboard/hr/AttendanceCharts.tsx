
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  PieChart, 
  Bar, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Badge } from '@/components/ui/badge';

const weeklyAttendanceData = [
  { name: 'Mon', present: 85, absent: 10, leave: 5 },
  { name: 'Tue', present: 80, absent: 10, leave: 10 },
  { name: 'Wed', present: 75, absent: 10, leave: 15 },
  { name: 'Thu', present: 80, absent: 10, leave: 10 },
  { name: 'Fri', present: 75, absent: 15, leave: 10 },
];

const departmentData = [
  { name: 'Engineering', value: 25, color: '#60A5FA' },
  { name: 'Sales', value: 18, color: '#5EEAD4' },
  { name: 'Marketing', value: 12, color: '#FCD34D' },
  { name: 'HR', value: 8, color: '#FDA4AF' },
  { name: 'Finance', value: 10, color: '#A78BFA' },
  { name: 'Product', value: 15, color: '#86EFAC' },
];

const labelFormatter = (value: number) => `${value}%`;

const AttendanceCharts: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Attendance Rate</h2>
          <p className="text-sm text-slate-500">Average monthly attendance rate</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="rounded-md px-2 py-1 bg-blue-100 text-blue-800 hover:bg-blue-200">Daily</Badge>
          <Badge variant="outline" className="rounded-md px-2 py-1 bg-white text-slate-600 hover:bg-slate-100">Weekly</Badge>
          <Badge variant="outline" className="rounded-md px-2 py-1 bg-white text-slate-600 hover:bg-slate-100">Monthly</Badge>
          <Badge variant="outline" className="rounded-md px-2 py-1 bg-white text-slate-600 hover:bg-slate-100">Yearly</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Attendance</CardTitle>
            <CardDescription>Attendance data for the current week</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyAttendanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={labelFormatter} />
                <RechartsTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-md">
                          <div className="grid grid-cols-2 gap-2">
                            {payload.map((entry) => (
                              <div key={entry.name} className="flex items-center gap-2">
                                <div 
                                  className="h-3 w-3 rounded-full" 
                                  style={{ backgroundColor: entry.color }}
                                />
                                <span className="font-medium">{entry.name}:</span>
                                <span>{entry.value}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  content={() => {
                    return (
                      <div className="flex justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-[#4ADE80]" />
                          <span>Present</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-[#F87171]" />
                          <span>Absent</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-[#FBBF24]" />
                          <span>Leave</span>
                        </div>
                      </div>
                    );
                  }}
                />
                <Bar dataKey="present" fill="#4ADE80" />
                <Bar dataKey="absent" fill="#F87171" />
                <Bar dataKey="leave" fill="#FBBF24" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>Employee distribution by department</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-md">
                              <div className="font-medium">{data.name}</div>
                              <div className="flex justify-between gap-2">
                                <span>{data.value} employees</span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {departmentData.map((dept) => (
                  <div key={dept.name} className="flex items-center gap-2">
                    <div 
                      className="h-3 w-3 rounded-full" 
                      style={{ backgroundColor: dept.color }}
                    />
                    <span>{dept.name}: {dept.value} employees</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground mt-1">Active employees</p>
            <div className="flex items-center gap-1 mt-2">
              <Badge className="px-1 py-0 bg-green-100 text-green-800 border-green-200 flex items-center gap-1 text-xs">
                +12
              </Badge>
              <span className="text-xs text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Present Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">223</div>
            <p className="text-xs text-muted-foreground mt-1">Active employees today</p>
            <div className="flex items-center gap-1 mt-2">
              <Badge className="px-1 py-0 bg-green-100 text-green-800 border-green-200 flex items-center gap-1 text-xs">
                89.9%
              </Badge>
              <span className="text-xs text-muted-foreground">of total strength</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">On Leave</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17</div>
            <p className="text-xs text-muted-foreground mt-1">Employees on leave today</p>
            <div className="flex items-center gap-1 mt-2">
              <Badge className="px-1 py-0 bg-blue-100 text-blue-800 border-blue-200 flex items-center gap-1 text-xs">
                6.8%
              </Badge>
              <span className="text-xs text-muted-foreground">of total strength</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceCharts;
