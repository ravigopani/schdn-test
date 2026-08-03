"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

/**
 * Reusable delete confirmation dialog.
 * @param {{
 *   open: boolean,
 *   onOpenChange: (open: boolean) => void,
 *   title?: string,
 *   description?: string,
 *   confirmLabel?: string,
 *   isDeleting?: boolean,
 *   onConfirm: () => void | Promise<void>,
 * }} props
 */
export function DeleteAlertDialog({
  open,
  onOpenChange,
  title = "Delete item?",
  description = "This action cannot be undone. This will permanently delete the selected item.",
  confirmLabel = "Delete",
  isDeleting = false,
  onConfirm,
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isDeleting}
            onClick={async (event) => {
              event.preventDefault();
              await onConfirm();
            }}
          >
            {isDeleting ? "Deleting..." : confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
