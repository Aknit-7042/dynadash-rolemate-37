
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar, Search } from 'lucide-react';

const AttendanceTracker: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('attendance');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('January 2023');
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search employee..." 
            className="pl-8" 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          <span className="text-sm font-medium">{selectedMonth}</span>
        </Button>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList>
          <TabsTrigger value="attendance" className="text-blue-600 data-[state=active]:bg-blue-50">
            Attendance Tracker
          </TabsTrigger>
          <TabsTrigger value="leave">
            Leave Tracker
          </TabsTrigger>
          <TabsTrigger value="basic">
            Basic
          </TabsTrigger>
          <TabsTrigger value="idproofs">
            ID Proofs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="pt-4">
          <div className="border rounded-lg bg-white overflow-x-auto">
            <img 
              src="/lovable-uploads/a7daf462-c3e4-44f8-bbbd-118d7b129a58.png" 
              alt="Attendance Tracker" 
              className="w-full"
            />
          </div>
        </TabsContent>

        <TabsContent value="leave">
          <div className="flex items-center justify-center h-60">
            <p className="text-muted-foreground">Leave tracker information will appear here.</p>
          </div>
        </TabsContent>

        <TabsContent value="basic">
          <div className="flex items-center justify-center h-60">
            <p className="text-muted-foreground">Basic information will appear here.</p>
          </div>
        </TabsContent>

        <TabsContent value="idproofs">
          <div className="flex items-center justify-center h-60">
            <p className="text-muted-foreground">ID proofs information will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendanceTracker;
