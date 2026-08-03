import Link from "next/link";

import { PageHeader } from "@/components/admin/crud/page-header";
import { StateForm } from "@/components/admin/state/state-form";
import { Button } from "@/components/ui/button";

export default function AddStatePage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Add state"
        description=""
        actions={
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/admin/state" />}
          >
            Back to list
          </Button>
        }
      />
      <StateForm mode="create" />
    </div>
  );
}
