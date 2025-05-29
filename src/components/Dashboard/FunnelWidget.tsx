import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  time: string;
  color: string; // Tailwind background color class e.g. 'bg-red-500'
  avgTime?: boolean;
}

const funnelData: {
  activeLeads: number;
  stages: FunnelStage[];
} = {
  activeLeads: 600,
  stages: [
    { id: 'discovery', name: 'Discovery', count: 200, value: 200, time: '2 days', color: 'bg-accent-red' },
    { id: 'qualified', name: 'Qualified', count: 100, value: 100, time: '2 days', color: 'bg-accent-yellow', avgTime: true },
    { id: 'inConversation', name: 'In conversation', count: 50, value: 100, time: 'average time on this stage', color: 'bg-indigo-600' },
    { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, time: '8 days', color: 'bg-accent-green' },
    { id: 'closedWon', name: 'Closed won', count: 20, value: 50, time: '10 days', color: 'bg-purple-600' },
  ],
};

interface FunnelWidgetProps {
  className?: string;
}

const FunnelWidget: React.FC<FunnelWidgetProps> = ({ className }) => {
  const totalFunnelCount = funnelData.stages.reduce((sum, stage) => sum + stage.count, 0);

  return (
    <TooltipProvider>
      <Card className={cn('w-full', className)}>
        <CardHeader>
          <CardTitle>Funnel count</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <span className="text-4xl font-bold text-primary-text-color">{funnelData.activeLeads}</span>
            <span className="ml-2 text-secondary-text-color">active leads</span>
          </div>

          <div className="flex w-full h-3 rounded-md overflow-hidden mb-6">
            {funnelData.stages.map((stage) => (
              <Tooltip key={stage.id}>
                <TooltipTrigger asChild>
                  <div
                    className={cn('h-full', stage.color)}
                    style={{ width: `${(stage.count / totalFunnelCount) * 100}%` }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{stage.name}: {stage.count}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          <ul className="space-y-3">
            {funnelData.stages.map((stage) => (
              <li key={stage.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-x-4 text-sm">
                <span className={cn('w-3 h-3 rounded-sm', stage.color)}></span>
                <span className="text-primary-text-color text-left">{stage.name}</span>
                <span className="text-secondary-text-color justify-self-end">{stage.count}</span>
                <span className="text-secondary-text-color justify-self-end">$ {stage.value}</span>
                {stage.avgTime ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-secondary-text-color justify-self-end cursor-default underline decoration-dashed decoration-gray-400">
                        {stage.time.split(' ')[0]} {stage.time.split(' ')[1]}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-gray-800 text-white p-2 rounded-md text-xs">
                      <p>average time on this stage</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <span className="text-secondary-text-color justify-self-end">{stage.time}</span>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default FunnelWidget;
