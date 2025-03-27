
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Task, { TaskProps } from './Task';

interface TaskSectionProps {
  tasks: TaskProps[];
}

const TaskSection: React.FC<TaskSectionProps> = ({ tasks }) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Task Management</CardTitle>
        <CardDescription>Monitor and manage team tasks</CardDescription>
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-auto">
        {tasks.map((task, index) => (
          <Task 
            key={index}
            title={task.title}
            assignee={task.assignee}
            dueDate={task.dueDate}
            priority={task.priority}
            status={task.status}
            avatar={task.avatar}
          />
        ))}
      </CardContent>
      <CardFooter>
        <Button size="sm" className="ml-auto">View All Tasks</Button>
      </CardFooter>
    </Card>
  );
};

export default TaskSection;
