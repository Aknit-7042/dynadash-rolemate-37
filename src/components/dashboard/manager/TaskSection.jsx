
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Task from './Task';

const TaskSection = ({ tasks }) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Task Management</CardTitle>
        <CardDescription>Monitor and manage team tasks</CardDescription>
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-auto">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <Task 
              key={index}
              title={task.title}
              assignee={task.assignee}
              dueDate={task.dueDate}
              priority={task.priority}
              status={task.status}
              avatar={task.avatar}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No tasks available</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button size="sm" className="ml-auto">View All Tasks</Button>
      </CardFooter>
    </Card>
  );
};

export default TaskSection;
