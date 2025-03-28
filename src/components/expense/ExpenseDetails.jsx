
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, FileText, CreditCard, User } from 'lucide-react';

const ExpenseDetails = ({ expense }) => {
  const getStatusBadge = (status) => {
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Expense ID: {expense.id}</p>
          <h3 className="text-xl font-bold">{expense.category}</h3>
        </div>
        {getStatusBadge(expense.status)}
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground flex items-center">
            <Calendar className="h-4 w-4 mr-2" /> Date
          </p>
          <p className="font-medium">{expense.date}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground flex items-center">
            <CreditCard className="h-4 w-4 mr-2" /> Amount
          </p>
          <p className="font-medium">₹{expense.amount.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground flex items-center">
          <FileText className="h-4 w-4 mr-2" /> Description
        </p>
        <p>{expense.description}</p>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground flex items-center">
          <FileText className="h-4 w-4 mr-2" /> Receipt
        </p>
        <div className="border rounded-md p-2">
          <img 
            src={expense.receipt} 
            alt="Receipt" 
            className="w-full max-h-[300px] object-contain bg-gray-50 rounded" 
          />
        </div>
      </div>
      
      {expense.status === 'rejected' && (
        <div className="rounded-md bg-red-50 p-4 border border-red-100">
          <h4 className="text-sm font-medium text-red-800 mb-1">Reason for rejection</h4>
          <p className="text-sm text-red-700">This expense was rejected because the receipt was not clear. Please resubmit with a clearer image.</p>
        </div>
      )}

      {expense.status === 'pending' && (
        <Button variant="outline" className="w-full">Cancel Request</Button>
      )}
    </div>
  );
};

export default ExpenseDetails;
