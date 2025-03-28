
import React from 'react';
import { Badge } from '@/components/ui/badge';
import ExpenseForm from '@/components/expense/ExpenseForm';
import ExpenseHistory from '@/components/expense/ExpenseHistory';
import { Separator } from '@/components/ui/separator';

const ExpensePage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Expense Management</h1>
        <Badge className="bg-employee text-employee-foreground text-sm py-1 px-3">Employee Role</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7">
          <h2 className="text-2xl font-semibold mb-4">Submit New Expense</h2>
          <ExpenseForm />
        </div>
        
        <div className="md:col-span-1 hidden md:block">
          <Separator orientation="vertical" className="h-full mx-auto" />
        </div>
        
        <div className="md:col-span-4">
          <h2 className="text-2xl font-semibold mb-4">Recent Expenses</h2>
          <ExpenseHistory />
        </div>
      </div>
    </div>
  );
};

export default ExpensePage;
