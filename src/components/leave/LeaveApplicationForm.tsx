
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { DialogClose } from '@/components/ui/dialog';

interface LeaveApplicationFormProps {
  onCancel?: () => void;
  isDialog?: boolean;
}

const LeaveApplicationForm: React.FC<LeaveApplicationFormProps> = ({ 
  onCancel, 
  isDialog = false 
}) => {
  const [leaveType, setLeaveType] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [reason, setReason] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!leaveType || !startDate || !endDate || !reason) {
      toast({
        title: "Error",
        description: "Please fill all the required fields.",
        variant: "destructive",
      });
      return;
    }

    // Here would go API call to submit leave request
    toast({
      title: "Success",
      description: "Your leave application has been submitted.",
    });
    
    // Reset form
    setLeaveType('');
    setStartDate(undefined);
    setEndDate(undefined);
    setReason('');
    
    if (onCancel && !isDialog) {
      onCancel(); // Return to the main leave management page if not in dialog
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="leaveType">Leave Type</Label>
        <Select onValueChange={setLeaveType} value={leaveType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select leave type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="casual">Casual Leave</SelectItem>
            <SelectItem value="sick">Sick Leave</SelectItem>
            <SelectItem value="privilege">Privilege Leave</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="startDate"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="endDate"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
                disabled={(date) => startDate ? date < startDate : false}
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason">Reason</Label>
        <Textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Please provide a reason for your leave"
          className="min-h-20"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        {isDialog ? (
          <>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" onClick={(e) => handleSubmit(e)}>
                Submit
              </Button>
            </DialogClose>
          </>
        ) : (
          <>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Submit
            </Button>
          </>
        )}
      </div>
    </form>
  );

  if (isDialog) {
    return formContent;
  }

  return (
    <div className="shadow-sm">
      <div className="pt-6">
        <h2 className="text-2xl font-bold mb-6">New Leave Application</h2>
        {formContent}
      </div>
    </div>
  );
};

export default LeaveApplicationForm;
