
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { file } from 'lucide-react';
import ExpenseDetails from './ExpenseDetails';

// Mock data for expense history
const mockExpenses = [
  {
    id: 'exp-001',
    category: 'Travel',
    date: '15 Jun 2023',
    amount: 1250,
    description: 'Cab fare for client meeting',
    status: 'approved',
    receipt: '/lovable-uploads/8c9ce5ae-2a86-41db-839c-c7ec469c8b56.png'
  },
  {
    id: 'exp-002',
    category: 'Meals',
    date: '22 Jun 2023',
    amount: 850,
    description: 'Team lunch meeting',
    status: 'pending',
    receipt: '/lovable-uploads/8c9ce5ae-2a86-41db-839c-c7ec469c8b56.png'
  },
  {
    id: 'exp-003',
    category: 'Equipment',
    date: '30 Jun 2023',
    amount: 5000,
    description: 'External hard drive purchase',
    status: 'rejected',
    receipt: '/lovable-uploads/8c9ce5ae-2a86-41db-839c-c7ec469c8b56.png'
  }
];

const ExpenseHistory: React.FC = () => {
  const [selectedExpense, setSelectedExpense] = useState<any | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewExpense = (expense: any) => {
    setSelectedExpense(expense);
    setIsDetailsOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Expense History</h2>
      
      {mockExpenses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-gray-100 p-3 mb-4">
              <file className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-1">No expenses found</h3>
            <p className="text-sm text-gray-500">You haven't submitted any expenses yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {mockExpenses.map((expense) => (
            <Card key={expense.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => handleViewExpense(expense)}>
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-100 p-2">
                      <file className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium">{expense.category}</p>
                      <p className="text-sm text-gray-500">{expense.date} • ₹{expense.amount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(expense.status)}
                    <Button variant="ghost" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      handleViewExpense(expense);
                    }}>
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Expense Details</DialogTitle>
          </DialogHeader>
          {selectedExpense && <ExpenseDetails expense={selectedExpense} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExpenseHistory;
