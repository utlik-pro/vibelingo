// A reusable skeleton component for loading states
// Props: { className?: string }
// Renders a pulsing gray/muted rectangle
// Usage: <Skeleton className="h-4 w-32" />

export function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-muted ${className || ''}`} />;
}

// Pre-built skeleton screens
export function HomeScreenSkeleton() {
  return (
    <div className="px-5 py-4">
      <div className="flex justify-between items-center mb-5">
        <Skeleton className="h-8 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </div>
      <Skeleton className="h-24 w-full mb-4" />
      <Skeleton className="h-20 w-full mb-4" />
      <div className="grid grid-cols-2 gap-3 mb-5">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
      <Skeleton className="h-6 w-20 mb-3" />
      <div className="flex gap-2">
        <Skeleton className="h-20 w-20" />
        <Skeleton className="h-20 w-20" />
        <Skeleton className="h-20 w-20" />
        <Skeleton className="h-20 w-20" />
      </div>
    </div>
  );
}
