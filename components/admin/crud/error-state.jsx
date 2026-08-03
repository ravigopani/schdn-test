import { AlertTriangleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * @param {{
 *   title?: string,
 *   message: string,
 *   onRetry?: () => void,
 * }} props
 */
export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-4 py-16 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangleIcon className="size-5 text-destructive" />
      </div>
      <div className="space-y-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      {onRetry ? (
        <Button type="button" variant="outline" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}
