"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { ErrorState } from "@/components/admin/crud/error-state";
import { PageHeader } from "@/components/admin/crud/page-header";
import { StateForm } from "@/components/admin/state/state-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getErrorMessage } from "@/lib/api/errors";
import { getState } from "@/services/state.service";

/**
 * @param {{ stateId: string }} props
 */
export function StateEditPage({ stateId }) {
  const [state, setState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await getState(stateId, { signal: controller.signal });
        if (active) {
          setState(result);
        }
      } catch (err) {
        if (!active || (err instanceof DOMException && err.name === "AbortError")) {
          return;
        }
        setError(getErrorMessage(err, "Failed to load state"));
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
      controller.abort();
    };
  }, [stateId]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Edit state"
        description="Update an existing state."
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

      {isLoading ? (
        <div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-4">
            <div className="col-span-12 flex items-center justify-end gap-2 md:col-span-6">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-28" />
            </div>
          </div>
        </div>
      ) : error || !state ? (
        <Card>
          <CardContent>
            <ErrorState message={error ?? "State not found"} />
          </CardContent>
        </Card>
      ) : (
        <StateForm
          mode="edit"
          stateId={state.id}
          defaultValues={{ name: state.name }}
        />
      )}
    </div>
  );
}
