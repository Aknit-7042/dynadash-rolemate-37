
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import LeaveApplicationForm from '@/components/leave/LeaveApplicationForm';

const LeaveManagementPage: React.FC = () => {
  const [showLeaveApplication, setShowLeaveApplication] = useState(false);

  // Sample leave balance data
  const leaveBalances = [
    { type: 'Casual Leave', used: 8, total: 12 },
    { type: 'Sick Leave', used: 5, total: 7 },
    { type: 'Privilege Leave', used: 12, total: 15 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>

      {!showLeaveApplication ? (
        <>
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-6">Leave Balance</h2>
              <div className="space-y-6">
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
                      className="h-2 bg-teal-100"
                      indicatorClassName="bg-teal-500"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button 
            className="w-full py-6 text-lg bg-teal-500 hover:bg-teal-600"
            onClick={() => setShowLeaveApplication(true)}
          >
            Apply for Leave
          </Button>
        </>
      ) : (
        <LeaveApplicationForm onCancel={() => setShowLeaveApplication(false)} />
      )}
    </div>
  );
};

export default LeaveManagementPage;
