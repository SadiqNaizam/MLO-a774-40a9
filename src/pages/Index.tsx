import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import FunnelWidget from '../components/Dashboard/FunnelWidget';
import SourcesChart from '../components/Dashboard/SourcesChart';
import LeadsTracker from '../components/Dashboard/LeadsTracker';
import LostLeadsReasons from '../components/Dashboard/LostLeadsReasons';
import OtherDataMetrics from '../components/Dashboard/OtherDataMetrics';

const DashboardPage: React.FC = () => {
  return (
    <MainAppLayout pageTitle="Dashboard Overview">
      {/* 
        This outer div corresponds to `mainContent.layout` requirements ("flex flex-col p-6 gap-6").
        `mt-16` is handled by MainAppLayout.
      */}
      <div className="p-6 flex flex-col gap-6">
        {/* 
          This inner div corresponds to `mainContent.container` requirements ("grid grid-cols-2 gap-6").
          `lg:grid-cols-2` is used for responsiveness: 2 columns on large screens, 1 on smaller.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Row 1: FunnelWidget and SourcesChart */}
          <FunnelWidget />
          <SourcesChart />

          {/* Row 2: LeadsTracker, spans 2 columns on large screens */}
          <LeadsTracker className="lg:col-span-2" />

          {/* Row 3: LostLeadsReasons and OtherDataMetrics */}
          <LostLeadsReasons />
          <OtherDataMetrics />
        </div>
        {/* Additional page sections could be added here, spaced by the parent's `gap-6` */}
      </div>
    </MainAppLayout>
  );
};

export default DashboardPage;
