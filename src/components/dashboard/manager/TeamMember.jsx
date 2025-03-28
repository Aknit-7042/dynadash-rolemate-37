
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const TeamMember = ({ 
  name, position, avatar, taskCompleted, taskTotal, onClick
}) => {
  const progress = (taskCompleted / taskTotal) * 100;
  
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div 
      className="flex items-center p-4 rounded-lg border mb-3 cursor-pointer hover:bg-accent/50 transition-colors"
      onClick={onClick}
    >
      <Avatar className="h-10 w-10 mr-4">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <p className="font-medium">{name}</p>
          <span className="text-sm text-muted-foreground">{taskCompleted}/{taskTotal} tasks</span>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{position}</p>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
};

export default TeamMember;
