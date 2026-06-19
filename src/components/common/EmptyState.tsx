import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  message: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({ icon, message, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {icon && <div className="text-gray-300 dark:text-gray-600 mb-4">{icon}</div>}
      <p className="text-gray-500 dark:text-gray-400 font-medium">{message}</p>
      {description && <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
