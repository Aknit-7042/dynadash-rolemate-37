
import MainLayout from '@/components/layout/MainLayout';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRole } from '@/context/RoleContext';
import AttendanceTracker from '@/components/dashboard/hr/AttendanceTracker';
import AttendanceCharts from '@/components/dashboard/hr/AttendanceCharts';
import EmployeeAttendance from '@/components/dashboard/employee/EmployeeAttendance';

const AttendancePage = () => {
  const { currentRole } = useRole();
  const [activeTab, setActiveTab] = useState('tracker');
  
  // Show employee-specific view for employee role
  if (currentRole === 'employee') {
    return (
      <MainLayout>
        <EmployeeAttendance />
      </MainLayout>
    );
  }

  // Show HR/Manager view for other roles
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="tracker" className="mt-6">
            <Card>
              <CardHeader>
                
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
    </MainLayout>
  );
};

export default AttendancePage;
