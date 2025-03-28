import React from 'react';
import { useRole } from '@/context/RoleContext';
import { Badge } from '@/components/ui/badge';
import PayrollTable from '@/components/payroll/PayrollTable';
const PayrollPage: React.FC = () => {
  const {
    currentRole
  } = useRole();
  return;
};
export default PayrollPage;