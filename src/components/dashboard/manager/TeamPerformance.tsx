
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TeamMember, { TeamMemberProps } from './TeamMember';

interface TeamPerformanceProps {
  members: TeamMemberProps[];
  onMemberClick: (name: string) => void;
  onViewTeam: () => void;
}

const TeamPerformance: React.FC<TeamPerformanceProps> = ({ members, onMemberClick, onViewTeam }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Performance</CardTitle>
        <CardDescription>Member task completion status</CardDescription>
      </CardHeader>
      <CardContent>
        {members.map(member => (
          <TeamMember 
            key={member.name}
            name={member.name}
            position={member.position}
            taskCompleted={member.taskCompleted}
            taskTotal={member.taskTotal}
            avatar={member.avatar}
            onClick={() => onMemberClick(member.name)}
          />
        ))}
      </CardContent>
      <CardFooter>
        <Button 
          size="sm" 
          className="ml-auto"
          onClick={onViewTeam}
        >
          View Team
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TeamPerformance;
