import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReasonData {
  id: string;
  reason: string;
  percentage: number;
}

const reasonsData: ReasonData[] = [
  { id: 'unclear_proposal', reason: 'The proposal is unclear', percentage: 40 },
  { id: 'venture_pursuit', reason: 'However venture pursuit', percentage: 20 },
  { id: 'other', reason: 'Other', percentage: 10 },
  { id: 'pricing_issues', reason: 'Pricing issues', percentage: 30 }, // Changed from duplicate 'The proposal is unclear'
];

interface LostLeadsReasonsProps {
  className?: string;
}

const LostLeadsReasons: React.FC<LostLeadsReasonsProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle>Reasons of leads lost</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {reasonsData.map((item) => (
            <div key={item.id}>
              <p className="text-3xl font-bold text-primary-text-color">{item.percentage}%</p>
              <p className="text-sm text-secondary-text-color mt-1">{item.reason}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LostLeadsReasons;
