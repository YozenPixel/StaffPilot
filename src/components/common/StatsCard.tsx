import type { ReactNode } from 'react';
import Card from './Card';

interface StatsCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  trend?: string;
}

export default function StatsCard({ icon, value, label, trend }: StatsCardProps) {
  return (
    <Card className="text-center" hover={false}>
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 mb-4">
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
      {trend && (
        <div className="mt-2 text-xs font-medium text-green-600 dark:text-green-400">{trend}</div>
      )}
    </Card>
  );
}
