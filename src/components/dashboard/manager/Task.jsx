
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const Task = ({
  title, assignee, avatar, dueDate, priority, status
}) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'in-progress': return <Clock className="h-5 w-5 text-blue-500" />;
      default: return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex items-start gap-3 p-4 rounded-lg border mb-3">
      <div className="mt-1">{getStatusIcon(status)}</div>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="font-medium">{title}</p>
          <Badge className={cn("capitalize", getPriorityColor(priority))}>
            {priority}
          </Badge>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={avatar} alt={assignee} />
              <AvatarFallback className="text-xs">{getInitials(assignee)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{assignee}</span>
          </div>
          <div className="text-sm text-muted-foreground">{dueDate}</div>
        </div>
      </div>
    </div>
  );
};

export default Task;
