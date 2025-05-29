import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from 'recharts';
import { CalendarDays } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SourceData {
  name: string;
  value: number; // For chart
  amount: number;
  percentage: number;
  color: string; // Hex color for Recharts Cell
  tailwindColor: string; // Tailwind bg color for legend
}

const sourcesChartData: SourceData[] = [
  { name: 'Clutch', value: 45, amount: 3000, percentage: 45, color: '#DC3545', tailwindColor: 'bg-accent-red' }, // accent-red
  { name: 'Behance', value: 35, amount: 1000, percentage: 35, color: '#FFC107', tailwindColor: 'bg-accent-yellow' }, // accent-yellow
  { name: 'Instagram', value: 10, amount: 1000, percentage: 10, color: '#0D9488', tailwindColor: 'bg-teal-600' }, // teal-600
  { name: 'Dribbble', value: 10, amount: 1000, percentage: 10, color: '#198754', tailwindColor: 'bg-accent-green' }, // accent-green
];

interface SourcesChartProps {
  className?: string;
}

const SourcesChart: React.FC<SourcesChartProps> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<string>('leadsConverted');

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-2 border border-border rounded-md shadow-lg">
          <p className="text-sm text-primary-text-color">{`${payload[0].name} : ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <TooltipProvider>
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Sources</CardTitle>
        <Select defaultValue="last-6-months">
          <SelectTrigger className="w-[180px] text-xs h-8">
            <CalendarDays className="h-3 w-3 mr-1.5" />
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-6-months">Last 6 months</SelectItem>
            <SelectItem value="last-3-months">Last 3 months</SelectItem>
            <SelectItem value="last-month">Last month</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full flex flex-col items-center">
          <ResponsiveContainer width="60%" height="100%">
            <PieChart>
              <Pie
                data={sourcesChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                innerRadius={60} // Donut chart
                fill="#8884d8"
                dataKey="value"
                paddingAngle={2}
              >
                {sourcesChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
          {sourcesChartData.map((source) => (
            <div key={source.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <span className={cn('w-3 h-3 rounded-sm mr-2', source.tailwindColor)}></span>
                <span className="text-primary-text-color">{source.name}</span>
              </div>
              <div className="flex items-center">
                <span className="text-secondary-text-color mr-3">$ {source.amount.toLocaleString()}</span>
                <span className="text-primary-text-color font-medium w-8 text-right">{source.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t border-border">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-9">
            <TabsTrigger value="leadsCame" className="text-xs h-7">Leads came</TabsTrigger>
            <TabsTrigger value="leadsConverted" className="text-xs h-7 relative">
              Leads Converted
              {activeTab === 'leadsConverted' && (
                 <Tooltip>
                    <TooltipTrigger asChild>
                        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-[10px] px-1.5 py-0.5 rounded-sm whitespace-nowrap">from leads total</span>
                    </TooltipTrigger>
                    {/* No TooltipContent needed as it's purely visual like the image */}
                </Tooltip>
              )}
            </TabsTrigger>
            <TabsTrigger value="totalDealsSize" className="text-xs h-7">Total deals size</TabsTrigger>
          </TabsList>
          {/* TabsContent can be added here if data changes based on tab */}
        </Tabs>
      </CardFooter>
    </Card>
    </TooltipProvider>
  );
};

export default SourcesChart;
