import { Suspense } from "react";
import { RequestPage } from "@/features/dashboard/ui/admin/RequestPage";
import Loading from "@/components/loading";

export default function UsersPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-96 items-center justify-center">
          <Loading />
        </div>
      }
    >
      <RequestPage />
    </Suspense>
  );
}
