
import React from 'react';
import { useRole } from '@/context/RoleContext';
import HRDashboard from '@/components/dashboard/hr/HRDashboard';
import ManagerDashboard from '@/components/dashboard/manager/ManagerDashboard';
import EmployeeDashboard from '@/components/dashboard/employee/EmployeeDashboard';

const Dashboard = () => {
  const { currentRole, isRoleSwitching } = useRole();

  const renderDashboard = () => {
    if (isRoleSwitching) {
      return (
        <div className="h-96 flex items-center justify-center">
          <div className="animate-pulse text-center">
            <div className="h-16 w-64 bg-muted rounded mx-auto mb-4"></div>
            <div className="h-4 w-40 bg-muted rounded mx-auto"></div>
          </div>
        </div>
      );
    }

    switch (currentRole) {
      case 'hr':
        return <HRDashboard />;
      case 'manager':
        return <ManagerDashboard />;
      case 'employee':
        return <EmployeeDashboard />;
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold">Dashboard not available</h2>
            <p className="text-muted-foreground">Please select a role to continue.</p>
          </div>
        );
    }
  };

  return (
    <div className={isRoleSwitching ? 'animate-role-switch' : ''}>
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;
