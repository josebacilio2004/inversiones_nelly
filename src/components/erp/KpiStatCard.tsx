import React from 'react';

interface KpiStatCardProps {
  title: string;
  value: string | number;
  subValue: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColorClass: string;
  trendText?: string;
}

export const KpiStatCard: React.FC<KpiStatCardProps> = ({
  title,
  value,
  subValue,
  icon: Icon,
  iconColorClass,
  trendText,
}) => {
  return (
    <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 shadow-lg flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</span>
        <div className={`p-2 rounded-lg ${iconColorClass}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="text-2xl font-black text-white mt-2 font-mono">{value}</div>
      <div className="text-[11px] text-slate-400 mt-1 flex justify-between items-center">
        <span>{subValue}</span>
        {trendText && <span className="text-[#6CBE1A] font-semibold">{trendText}</span>}
      </div>
    </div>
  );
};
