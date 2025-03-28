
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExpenseForm from '@/components/expense/ExpenseForm';
import ExpenseHistory from '@/components/expense/ExpenseHistory';

const ExpensePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('submit');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Expense Management</h1>
        <Badge className="bg-employee text-employee-foreground text-sm py-1 px-3">Employee Role</Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="submit">Submit Expense</TabsTrigger>
          <TabsTrigger value="history">Expense History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="submit" className="py-4">
          <ExpenseForm />
        </TabsContent>
        
        <TabsContent value="history" className="py-4">
          <ExpenseHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExpensePage;
