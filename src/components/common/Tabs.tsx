import type { ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}

export default function Tabs({ tabs, active, onChange, className = '' }: TabsProps) {
  return (
    <div className={`flex items-center gap-2 mb-6 overflow-x-auto pb-2 ${className}`} role="tablist" aria-label="Navigation onglets">
      {tabs.map(tab => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          aria-controls={`panel-${tab.id}`}
          onClick={() => onChange(tab.id)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            active === tab.id
              ? 'bg-orange-500 text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {tab.icon}
          {tab.label}
          {tab.count !== undefined && (
            <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
              active === tab.id ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
            }`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
