
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useRole } from '@/context/RoleContext';
import { Badge } from '@/components/ui/badge';

const PayrollPage: React.FC = () => {
  const { user } = useAuth();
  const { currentRole } = useRole();
  
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Payroll</h1>
        <Badge 
          className={`${currentRole === 'employee' ? 'bg-employee text-employee-foreground' : 'bg-hr text-hr-foreground'} text-sm py-1 px-3`}
        >
          {currentRole === 'employee' ? 'Employee' : 'HR'} Role
        </Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Pay Information</CardTitle>
          <CardDescription>Your salary and payment history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="p-4 border rounded-lg">
              <p className="text-sm font-medium mb-2">Latest Payslip</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-bold">$4,250.00</p>
                  <p className="text-xs text-muted-foreground">May 2023</p>
                </div>
                <Button size="sm">View Details</Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Payment History</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="font-medium">April 2023</p>
                    <p className="text-xs text-muted-foreground">Paid on Apr 30, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">$4,250.00</p>
                    <Button variant="ghost" size="sm" className="text-xs">Download</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="font-medium">March 2023</p>
                    <p className="text-xs text-muted-foreground">Paid on Mar 31, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">$4,250.00</p>
                    <Button variant="ghost" size="sm" className="text-xs">Download</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="font-medium">February 2023</p>
                    <p className="text-xs text-muted-foreground">Paid on Feb 28, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">$4,250.00</p>
                    <Button variant="ghost" size="sm" className="text-xs">Download</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollPage;
