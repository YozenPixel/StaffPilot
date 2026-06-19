import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
        <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
      </div>
      <p className="text-gray-500 dark:text-gray-400 font-medium">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-orange-600 dark:text-orange-400 hover:underline"
        >
          <RefreshCw className="w-4 h-4" />
          Réessayer
        </button>
      )}
    </div>
  );
}
