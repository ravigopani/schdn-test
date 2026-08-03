"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { DeleteAlertDialog } from "@/components/admin/crud/delete-alert-dialog";
import { DataTableSkeleton } from "@/components/admin/crud/data-table-skeleton";
import { EmptyState } from "@/components/admin/crud/empty-state";
import { ErrorState } from "@/components/admin/crud/error-state";
import { ListPagination } from "@/components/admin/crud/list-pagination";
import { ListToolbar } from "@/components/admin/crud/list-toolbar";
import { PageHeader } from "@/components/admin/crud/page-header";
import { StateTable } from "@/components/admin/state/state-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCrudList } from "@/hooks/use-crud-list";
import { getErrorMessage } from "@/lib/api/errors";
import { deleteState, getStates } from "@/services/state.service";

export function StateList() {
  const router = useRouter();
  const list = useCrudList({
    fetcher: getStates,
    defaultSortBy: "name",
    defaultSortOrder: "asc",
  });

  console.log('list', list);

  const [pendingDelete, setPendingDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback(async () => {
    if (!pendingDelete) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteState(pendingDelete.id);
      toast.success(`"${pendingDelete.name}" deleted`);
      setPendingDelete(null);
      list.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to delete state"));
    } finally {
      setIsDeleting(false);
    }
  }, [list, pendingDelete]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="State"
        description="Manage states used across address data."
        actions={
          <Button
            nativeButton={false}
            render={<Link href="/admin/state/add" />}
          >
            <PlusIcon />
            Add state
          </Button>
        }
      />

      {/* <Card>
        <CardContent className="flex flex-col gap-4"> */}
      <ListToolbar
        searchValue={list.searchInput}
        onSearchChange={list.setSearchInput}
        onRefresh={list.refresh}
        isRefreshing={list.isLoading}
        searchPlaceholder="Search states..."
      />

      {list.isLoading ? (
        <DataTableSkeleton columns={3} rows={6} />
      ) : list.error ? (
        <ErrorState message={list.error} onRetry={list.refresh} />
      ) : list.data.length === 0 ? (
        <EmptyState
          title="No states found"
          description={
            list.search
              ? "Try a different search term."
              : "Get started by creating your first state."
          }
          actionLabel={list.search ? undefined : "Add state"}
          onAction={
            list.search ? undefined : () => router.push("/admin/state/add")
          }
        />
      ) : (
        <>
          <StateTable
            data={list.data}
            sortBy={list.sortBy}
            sortOrder={list.sortOrder}
            onSort={list.toggleSort}
            onDelete={setPendingDelete}
          />
          <ListPagination
            page={list.meta.page}
            totalPages={list.meta.totalPages}
            total={list.meta.total}
            limit={list.meta.limit}
            onPageChange={list.setPage}
            isDisabled={list.isLoading}
          />
        </>
      )}
      {/* </CardContent>
      </Card> */}

      <DeleteAlertDialog
        open={Boolean(pendingDelete)}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setPendingDelete(null);
          }
        }}
        title="Delete state?"
        description={
          pendingDelete
            ? `This will permanently delete "${pendingDelete.name}". This action cannot be undone.`
            : undefined
        }
        isDeleting={isDeleting}
        onConfirm={handleDelete}
      />
    </div>
  );
}
