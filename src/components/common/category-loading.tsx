import { Skeleton } from "@nextui-org/react";

export default function CategoryLoading() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-6 w-36" />
      <Skeleton className="h-6 w-44" />
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-6 w-66" />
      <Skeleton className="h-6 w-44" />
      <Skeleton className="h-6 w-36" />
    </div>
  );
}
