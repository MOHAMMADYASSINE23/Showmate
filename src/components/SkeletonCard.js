export const SkeletonCard = () => {
  return (
    <div data-testid="skeleton-card" className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-3 animate-pulse">
      <div className="rounded-t-lg bg-gray-300 dark:bg-gray-700 h-64"></div>
      <div className="p-5">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-1"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-1"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
      </div>
    </div>
  );
};