import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface MetricData {
  id: string;
  value: string | number;
  label: string;
  hasInfoIcon?: boolean;
  infoText?: string;
}

const metricsData: MetricData[] = [
  { id: 'total_leads', value: 900, label: 'total leads count' },
  { id: 'avg_conversion_days', value: 12, label: 'days in average to convert lead' },
  { id: 'inactive_leads', value: 30, label: 'inactive leads', hasInfoIcon: true, infoText: 'Leads with no activity in the last 30 days.' },
];

interface OtherDataMetricsProps {
  className?: string;
}

const OtherDataMetrics: React.FC<OtherDataMetricsProps> = ({ className }) => {
  return (
    <TooltipProvider>
      <Card className={cn('w-full', className)}>
        <CardHeader>
          <CardTitle>Other data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-6">
            {metricsData.map((metric) => (
              <div key={metric.id}>
                <p className="text-3xl font-bold text-primary-text-color">{metric.value}</p>
                <div className="flex items-center mt-1">
                  <p className="text-sm text-secondary-text-color">{metric.label}</p>
                  {metric.hasInfoIcon && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 ml-1.5 text-secondary-text-color cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{metric.infoText || 'More information'}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default OtherDataMetrics;
