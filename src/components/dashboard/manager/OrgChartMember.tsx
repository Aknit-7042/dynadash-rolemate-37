
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface OrgChartMemberProps {
  name: string;
  position: string;
  avatar?: string;
  isManager?: boolean;
  department?: string;
}

const OrgChartMember: React.FC<OrgChartMemberProps> = ({ 
  name, position, avatar, isManager = false, department
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className={cn(
      "flex flex-col items-center p-4 rounded-lg border",
      isManager ? "bg-accent/10 border-primary" : ""
    )}>
      <Avatar className={cn("h-16 w-16 mb-2", isManager ? "ring-2 ring-primary" : "")}>
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback className="text-lg">{getInitials(name)}</AvatarFallback>
      </Avatar>
      <p className="font-medium text-center">{name}</p>
      <p className="text-sm text-muted-foreground text-center">{position}</p>
      {department && <Badge className="mt-1">{department}</Badge>}
    </div>
  );
};

export default OrgChartMember;
