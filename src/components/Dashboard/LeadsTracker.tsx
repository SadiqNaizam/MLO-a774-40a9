import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, Area, AreaChart } from 'recharts';
import { CalendarDays } from 'lucide-react';

interface LeadsTrackerDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const leadsChartData: LeadsTrackerDataPoint[] = [
  { month: 'March', closedWon: 70, closedLost: 60 },
  { month: 'April', closedWon: 50, closedLost: 25 },
  { month: 'May', closedWon: 95, closedLost: 40 },
  { month: 'June', closedWon: 65, closedLost: 88 },
  { month: 'July', closedWon: 90, closedLost: 35 },
  { month: 'August', closedWon: 110, closedLost: 52 },
];

const totalMetrics = {
  totalClosed: 680,
  totalLost: 70,
};

interface LeadsTrackerProps {
  className?: string;
}

const LeadsTracker: React.FC<LeadsTrackerProps> = ({ className }) => {

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 border border-border rounded-md shadow-lg">
          <p className="text-sm font-medium text-primary-text-color mb-1">{label}</p>
          {payload.map((pld: any) => (
            <p key={pld.dataKey} style={{ color: pld.color }} className="text-xs">
              {pld.name}: {pld.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
            <CardTitle className="mb-2">Leads tracking</CardTitle>
            <div className="flex items-baseline space-x-4">
                <div>
                    <span className="text-3xl font-bold text-primary-text-color">{totalMetrics.totalClosed}</span>
                    <span className="ml-1.5 text-sm text-secondary-text-color">total closed</span>
                </div>
                <div>
                    <span className="text-3xl font-bold text-primary-text-color">{totalMetrics.totalLost}</span>
                    <span className="ml-1.5 text-sm text-secondary-text-color">total lost</span>
                </div>
            </div>
        </div>
        <Select defaultValue="last-6-months">
          <SelectTrigger className="w-[180px] text-xs h-8">
            <CalendarDays className="h-3 w-3 mr-1.5" />
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-6-months">Last 6 months</SelectItem>
            <SelectItem value="last-3-months">Last 3 months</SelectItem>
            <SelectItem value="last-year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-[300px] pt-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={leadsChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0D6EFD" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0D6EFD" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#DC3545" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#DC3545" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} dy={10} style={{ fontSize: '0.75rem', fill: 'hsl(var(--secondary-foreground))' }} />
            <YAxis tickLine={false} axisLine={false} dx={-5} style={{ fontSize: '0.75rem', fill: 'hsl(var(--secondary-foreground))' }} />
            <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Legend 
              verticalAlign="bottom" 
              align="left" 
              wrapperStyle={{paddingTop: '20px'}} 
              iconType="plainline"
              formatter={(value, entry) => (
                <span style={{ color: 'hsl(var(--primary-text-color))', marginLeft: '4px' }}>{value}</span>
              )}
            />
            <Area type="monotone" dataKey="closedWon" name="Closed won" stroke="#0D6EFD" strokeWidth={2} fillOpacity={1} fill="url(#colorClosedWon)" dot={{ r: 4, strokeWidth: 2, fill: '#FFFFFF' }} activeDot={{ r: 6, strokeWidth: 2, fill: '#FFFFFF', stroke: '#0D6EFD' }} />
            <Area type="monotone" dataKey="closedLost" name="Closed lost" stroke="#DC3545" strokeWidth={2} fillOpacity={1} fill="url(#colorClosedLost)" dot={{ r: 4, strokeWidth: 2, fill: '#FFFFFF' }} activeDot={{ r: 6, strokeWidth: 2, fill: '#FFFFFF', stroke: '#DC3545' }} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LeadsTracker;
