import React from 'react';
import { cn } from '@/lib/utils';
import SidebarNav from './SidebarNav';
import TopHeader from './TopHeader';

interface MainAppLayoutProps {
  children: React.ReactNode;
  pageTitle?: string; // Optional: will default in TopHeader if not provided, or use this value
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({
  children,
  pageTitle = 'Dashboard Overview', // Default title as per project context
  className,
}) => {
  return (
    <div className={cn('flex h-screen antialiased', className)}>
      <SidebarNav />
      <div className="flex flex-col flex-1 w-full">
        <TopHeader title={pageTitle} />
        <main
          className={cn(
            'flex-1 ml-64 mt-16',
            'overflow-y-auto',
            'bg-background' // Use app-background for the main content area background
            // Pages/children should add their own padding, e.g., p-6
          )}
        >
          {/* The children (page content) will be rendered here */}
          {/* Example usage from a page: <div className="p-6"> {page_widgets} </div> */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
