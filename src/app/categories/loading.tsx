import { Skeleton } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="m-4 px-16">
      <div className="my-2">
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="p-4 border rounded space-y-2">
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-6 w-80" />
        <Skeleton className="h-6 w-96" />
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-6 w-56" />
      </div>
    </div>
  );
}
