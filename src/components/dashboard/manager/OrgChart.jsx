
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import OrgChartMember from './OrgChartMember';

const OrgChart = ({ department, members, onClose }) => {
  const managers = members.filter(member => member.isManager);
  const teamMembers = members.filter(member => !member.isManager);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{department} Department</CardTitle>
          <CardDescription>Organizational structure</CardDescription>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full" 
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-center mb-6">
            {managers.map(manager => (
              <OrgChartMember 
                key={manager.name}
                name={manager.name}
                position={manager.position}
                isManager={true}
                avatar={manager.avatar}
                department={manager.department}
              />
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {teamMembers.map(member => (
              <OrgChartMember 
                key={member.name}
                name={member.name}
                position={member.position}
                avatar={member.avatar}
                department={member.department}
              />
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onClose} className="ml-auto">
          Back to Dashboard
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrgChart;
