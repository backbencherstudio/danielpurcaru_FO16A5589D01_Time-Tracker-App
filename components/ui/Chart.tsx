// src/components/ui/Chart.tsx

import React from "react";

export type ChartConfig = {
  [key: string]: {
    label: string;
    color: string;
  };
};

export const ChartContainer = ({
  children,
  config,
}: {
  children: React.ReactNode;
  config: ChartConfig;
}) => {
  return (
    <div className="w-full h-[300px]">
      {/* You can use config later if needed */}
      {children}
    </div>
  );
};

export const ChartTooltip = ({ cursor, content }: { cursor: boolean; content: React.ReactNode }) => {
  // Recharts expects this as `content` in the <Tooltip /> component
  return content;
};

export const ChartTooltipContent = ({ indicator }: { indicator: string }) => (
  <div className="bg-white p-2 border rounded shadow-sm text-sm">
    <strong>Tooltip</strong> - {indicator}
  </div>
);
