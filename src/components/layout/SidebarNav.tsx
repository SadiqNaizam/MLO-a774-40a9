import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  UserSquare2,
  FileText,
  FileSpreadsheet,
  Archive,
  Mail,
  Inbox,
  CalendarDays,
  HelpCircle,
  Settings,
  Menu,
  Aperture, // Generic logo icon
  Icon as LucideIcon, // Type for icon components
} from 'lucide-react';

// Using React.ElementType for icon type to be more generic for Lucide icons
interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType; // LucideIcon type is too specific for React.createElement
}

const mainNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
  { label: 'Leads', href: '/leads', icon: Users },
  { label: 'Customers', href: '/customers', icon: UserSquare2 },
  { label: 'Proposals', href: '/proposals', icon: FileText },
  { label: 'Invoices', href: '/invoices', icon: FileSpreadsheet },
  { label: 'Items', href: '/items', icon: Archive },
  { label: 'Mail', href: '/mail', icon: Mail },
  { label: 'Shoebox', href: '/shoebox', icon: Inbox },
  { label: 'Calendar', href: '/calendar', icon: CalendarDays },
];

const auxNavItems: NavItem[] = [
  { label: 'Help', href: '/help', icon: HelpCircle },
  { label: 'Settings', href: '/settings', icon: Settings },
  { label: 'Support', href: '/support', icon: HelpCircle }, // Renamed second help for clarity
];

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const [activePath, setActivePath] = useState<string>('/dashboard'); // Default active path

  const NavLink: React.FC<{ item: NavItem; isActive: boolean; onClick: () => void }> = ({ item, isActive, onClick }) => {
    const IconComponent = item.icon;
    return (
      <a
        href={item.href}
        onClick={(e) => {
          e.preventDefault(); // Prevent page reload for demo
          onClick();
        }}
        className={cn(
          'flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium',
          'transition-colors duration-150 ease-in-out',
          isActive
            ? 'bg-sidebar-accent text-sidebar-primary'
            : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary'
        )}
      >
        <IconComponent className="h-5 w-5" />
        <span>{item.label}</span>
      </a>
    );
  };

  return (
    <aside
      className={cn(
        'w-64 bg-sidebar text-sidebar-foreground flex flex-col h-screen fixed top-0 left-0 z-20',
        className
      )}
    >
      {/* Logo Area */}
      <div className="flex items-center h-16 px-4 shrink-0 border-b border-sidebar-border">
        <Menu className="h-6 w-6 text-sidebar-foreground mr-4 cursor-pointer" /> 
        <Aperture className="h-8 w-8 text-primary" />
        {/* Optional: <span className="ml-2 text-lg font-semibold">LeadsApp</span> */}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {mainNavItems.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            isActive={activePath === item.href}
            onClick={() => setActivePath(item.href)}
          />
        ))}
      </nav>

      {/* Auxiliary Navigation */}
      <div className="mt-auto p-3 border-t border-sidebar-border">
        <nav className="space-y-1.5">
          {auxNavItems.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              isActive={activePath === item.href}
              onClick={() => setActivePath(item.href)}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default SidebarNav;
