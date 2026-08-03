"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

import { DeleteAlertDialog } from "@/components/admin/crud/delete-alert-dialog";
import { ErrorState } from "@/components/admin/crud/error-state";
import { PageHeader } from "@/components/admin/crud/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getErrorMessage } from "@/lib/api/errors";
import { deleteState, getState } from "@/services/state.service";

/**
 * @param {{ stateId: string }} props
 */
export function StateView({ stateId }) {
  const router = useRouter();
  const [state, setState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  async function handleDelete() {
    setIsDeleting(true);

    try {
      await deleteState(stateId);
      toast.success("State deleted successfully");
      router.push("/admin/state");
      router.refresh();
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to delete state"));
    } finally {
      setIsDeleting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>

        <Card className="max-w-xl">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-56" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-5 w-40" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-5 w-28" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-5 w-44" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-5 w-44" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !state) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader title="State" description="View state details." />
        <Card>
          <CardContent>
            <ErrorState
              message={error ?? "State not found"}
              onRetry={() => router.refresh()}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={state.name}
        description="View state details."
        actions={
          <>
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href={`/admin/state/${state.id}/edit`} />}
            >
              <PencilIcon />
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={() => setDeleteOpen(true)}
            >
              <Trash2Icon />
              Delete
            </Button>
          </>
        }
      />

      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>State details</CardTitle>
          <CardDescription>Read-only view of this state record.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium">{state.name}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">ID</p>
            <Badge variant="secondary" className="font-mono font-normal">
              {state.id}
            </Badge>
          </div>
          {state.createdAt ? (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Created</p>
              <p>{new Date(state.createdAt).toLocaleString()}</p>
            </div>
          ) : null}
          {state.updatedAt ? (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Updated</p>
              <p>{new Date(state.updatedAt).toLocaleString()}</p>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <DeleteAlertDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete state?"
        description={`This will permanently delete "${state.name}". This action cannot be undone.`}
        isDeleting={isDeleting}
        onConfirm={handleDelete}
      />
    </div>
  );
}
