
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const DeadlinesSection = ({ deadlines }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
        <CardDescription>Major projects and milestones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deadlines.map((deadline, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-between ${
                index < deadlines.length - 1 ? 'border-b pb-4' : ''
              }`}
            >
              <div>
                <p className="font-medium">{deadline.title}</p>
                <p className="text-sm text-muted-foreground">{deadline.description}</p>
              </div>
              <Badge>{deadline.date}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeadlinesSection;
