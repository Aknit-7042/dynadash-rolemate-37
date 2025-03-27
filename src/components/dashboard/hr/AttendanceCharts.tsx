
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, PieChart, Bar, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegendContent } from '@/components/ui/chart';

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Weekly Attendance</CardTitle>
          <CardDescription>Attendance data for the current week</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ChartContainer 
            config={{
              present: { color: "#4ADE80" },
              absent: { color: "#F87171" },
              leave: { color: "#FBBF24" }
            }}
          >
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
                content={(props) => {
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
          </ChartContainer>
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
  );
};

export default AttendanceCharts;
