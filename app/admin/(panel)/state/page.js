import { Suspense } from "react";

import { DataTableSkeleton } from "@/components/admin/crud/data-table-skeleton";
import { PageHeader } from "@/components/admin/crud/page-header";
import { StateList } from "@/components/admin/state/state-list";
import { Card, CardContent } from "@/components/ui/card";

function StateListFallback() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="State"
        description="Manage states used across address data."
      />
      {/* <Card>
        <CardContent> */}
      <DataTableSkeleton columns={3} rows={10} />
      {/* </CardContent>
      </Card> */}
    </div>
  );
}

export default function StatePage() {
  return (
    <Suspense fallback={<StateListFallback />}>
      <StateList />
    </Suspense>
  );
}
