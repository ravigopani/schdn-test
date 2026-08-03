import { InboxIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * @param {{
 *   title?: string,
 *   description?: string,
 *   actionLabel?: string,
 *   onAction?: () => void,
 * }} props
 */
export function EmptyState({
  title = "No results found",
  description = "Try adjusting your search or create a new item.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-4 py-16 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <InboxIcon className="size-5 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {actionLabel && onAction ? (
        <Button type="button" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
