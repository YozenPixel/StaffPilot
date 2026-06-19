interface LoadingSkeletonProps {
  rows?: number;
  className?: string;
}

export default function LoadingSkeleton({ rows = 3, className = '' }: LoadingSkeletonProps) {
  return (
    <div className={`space-y-4 ${className}`} aria-label="Chargement en cours" role="status">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 animate-pulse">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
