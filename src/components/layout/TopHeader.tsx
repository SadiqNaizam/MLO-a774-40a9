import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, UserPlus, Users, FilePlus, FileSpreadsheet, CalendarDays } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TopHeaderProps {
  title: string;
  className?: string;
}

interface DropdownActionItem {
  label: string;
  action: () => void;
  icon: React.ElementType;
}

const createDropdownItems: DropdownActionItem[] = [
  { label: 'New Lead', action: () => console.log('New Lead clicked'), icon: UserPlus },
  { label: 'New Customer', action: () => console.log('New Customer clicked'), icon: Users },
  { label: 'New Proposal', action: () => console.log('New Proposal clicked'), icon: FilePlus },
  { label: 'New Invoice', action: () => console.log('New Invoice clicked'), icon: FileSpreadsheet },
];

const TopHeader: React.FC<TopHeaderProps> = ({ title, className }) => {
  return (
    <header
      className={cn(
        'h-16 bg-surface text-foreground fixed top-0 left-64 right-0 z-10',
        'flex items-center justify-between px-6 border-b border-border',
        className
      )}
    >
      <h1 className="text-2xl font-semibold text-primary-text-color">{title}</h1>
      <div className="flex items-center space-x-4">
        {/* This date selector is shown in widgets in the example image, not globally in header. Included for completeness if needed. */}
        {/* <Select defaultValue="last-6-months">
          <SelectTrigger className="w-[180px] text-xs h-9 bg-background">
            <CalendarDays className="h-3.5 w-3.5 mr-2 text-secondary-text-color" />
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-6-months">Last 6 months</SelectItem>
            <SelectItem value="last-3-months">Last 3 months</SelectItem>
            <SelectItem value="last-month">Last month</SelectItem>
          </SelectContent>
        </Select> */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Create
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {createDropdownItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <DropdownMenuItem key={index} onClick={item.action} className="cursor-pointer">
                  <IconComponent className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{item.label}</span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
