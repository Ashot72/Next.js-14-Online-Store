import { Skeleton } from "@nextui-org/react";

export default function ProductLoading() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-6 w-96" />
      <Skeleton className="h-6 w-96" />
      <Skeleton className="h-6 w-96" />
      <Skeleton className="h-6 w-96" />
      <Skeleton className="h-6 w-96" />
      <Skeleton className="h-6 w-96" />
    </div>
  );
}
