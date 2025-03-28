
import React from 'react';
import { useRole } from '@/context/RoleContext';
import { Badge } from '@/components/ui/badge';
import PayrollTable from '@/components/payroll/PayrollTable';

const PayrollPage: React.FC = () => {
  const { currentRole } = useRole();
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Payroll Management</h1>
        {currentRole === 'hr' && (
          <Badge className="bg-hr text-hr-foreground text-sm py-1 px-3">HR Role</Badge>
        )}
        {currentRole === 'employee' && (
          <Badge className="bg-employee text-employee-foreground text-sm py-1 px-3">Employee Role</Badge>
        )}
      </div>
      
      <PayrollTable />
    </div>
  );
};

export default PayrollPage;
