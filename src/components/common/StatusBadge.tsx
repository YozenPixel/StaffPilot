import type { ReactNode } from 'react';

const variantStyles: Record<string, string> = {
  success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  error: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  neutral: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
};

interface StatusBadgeProps {
  variant: keyof typeof variantStyles;
  children: ReactNode;
  className?: string;
}

export default function StatusBadge({ variant = 'neutral', children, className = '' }: StatusBadgeProps) {
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full inline-flex items-center gap-1 ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
