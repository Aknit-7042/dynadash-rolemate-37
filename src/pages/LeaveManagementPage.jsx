
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import LeaveApplicationForm from '@/components/leave/LeaveApplicationForm';

const LeaveManagementPage = () => {
  // Sample leave balance data
  const leaveBalances = [
    { type: 'Casual Leave', used: 8, total: 12 },
    { type: 'Sick Leave', used: 5, total: 7 },
    { type: 'Privilege Leave', used: 12, total: 15 },
  ];

  // Sample leave history data
  const leaveHistory = [
    { type: 'Casual Leave', status: 'Approved', period: 'May 12 - May 14, 2023', days: 3 },
    { type: 'Sick Leave', status: 'Approved', period: 'Apr 3, 2023', days: 1 },
    { type: 'Privilege Leave', status: 'Rejected', period: 'Mar 15 - Mar 17, 2023', days: 3 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="py-5 text-base bg-primary hover:bg-primary/90"
            >
              Apply for Leave
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">New Leave Application</DialogTitle>
            </DialogHeader>
            <LeaveApplicationForm isDialog={true} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Leave Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {leaveBalances.map((leave) => (
                <div key={leave.type} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg">{leave.type}</span>
                    <span className="text-lg">
                      {leave.used} / {leave.total} days
                    </span>
                  </div>
                  <Progress 
                    value={(leave.used / leave.total) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Leave History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaveHistory.map((leave, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="font-medium">{leave.type}</p>
                    <p className="text-sm text-muted-foreground">{leave.period}</p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-block px-2 py-1 text-xs rounded-full ${
                      leave.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                      leave.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {leave.status}
                    </div>
                    <p className="text-sm mt-1">{leave.days} {leave.days > 1 ? 'days' : 'day'}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Leave Policies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Annual Leave Policy</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>All employees are entitled to 15 days of annual leave per year</li>
                <li>Leave must be applied at least 7 days in advance</li>
                <li>Maximum 5 consecutive days can be taken at once</li>
                <li>Unused leave can be carried forward to the next year (max 5 days)</li>
              </ul>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Sick Leave Policy</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>All employees are entitled to 7 days of sick leave per year</li>
                <li>Doctor's certificate required for sick leave of more than 2 consecutive days</li>
                <li>Unused sick leave cannot be carried forward</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveManagementPage;
