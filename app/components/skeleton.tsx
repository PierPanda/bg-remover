interface SkeletonProps {
  className?: string;
  variant?: "text" | "rectangular" | "circular";
}

export default function Skeleton({
  className = "",
  variant = "rectangular",
}: SkeletonProps) {
  const baseClasses = "animate-pulse bg-gray-200 dark:bg-gray-700";

  const variantClasses = {
    text: "h-4 rounded",
    rectangular: "rounded-lg",
    circular: "rounded-full",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
  );
}

export function ImageSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-64 w-full" variant="rectangular" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" variant="text" />
        <Skeleton className="h-4 w-1/2" variant="text" />
      </div>
    </div>
  );
}
