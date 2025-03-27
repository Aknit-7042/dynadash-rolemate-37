
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StatCardProps {
  title: string;
  value: string;
  description: string;
  trend?: string;
  trendValue?: string;
  icon: React.ReactNode;
  trendDirection?: 'up' | 'down' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, value, description, trend, trendValue, icon, trendDirection = 'neutral' 
}) => {
  return (
    <Card className="card-hover">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-9 w-9 flex items-center justify-center rounded-full bg-muted">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend && trendValue && (
          <div className="flex items-center gap-1 mt-2">
            <Badge 
              variant={trendDirection === 'down' ? 'destructive' : 'outline'} 
              className={cn(
                "px-1 py-0 flex items-center gap-1 text-xs",
                trendDirection === 'up' && "bg-green-100 text-green-800 border-green-200",
                trendDirection === 'neutral' && "bg-blue-100 text-blue-800 border-blue-200",
              )}
            >
              {trendDirection === 'up' && <ArrowUpRight className="h-3 w-3" />}
              {trendValue}
            </Badge>
            <span className="text-xs text-muted-foreground">{trend}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
