
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRole } from '@/context/RoleContext';
import AttendanceTracker from '@/components/dashboard/hr/AttendanceTracker';
import AttendanceCharts from '@/components/dashboard/hr/AttendanceCharts';

const AttendancePage: React.FC = () => {
  const { currentRole } = useRole();
  const [activeTab, setActiveTab] = useState('tracker');

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Attendance Management</h1>
        <p className="text-muted-foreground">Monitor and manage employee attendance</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="tracker">Attendance Tracker</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="tracker" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Records</CardTitle>
              <CardDescription>Track and manage daily attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <AttendanceTracker />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Analytics</CardTitle>
              <CardDescription>Analyze attendance patterns and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <AttendanceCharts />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendancePage;
