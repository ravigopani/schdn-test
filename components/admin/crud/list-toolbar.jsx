"use client";

import { RefreshCwIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * List toolbar with search + refresh.
 * @param {{
 *   searchValue: string,
 *   onSearchChange: (value: string) => void,
 *   onRefresh: () => void,
 *   isRefreshing?: boolean,
 *   searchPlaceholder?: string,
 *   actions?: React.ReactNode,
 * }} props
 */
export function ListToolbar({
  searchValue,
  onSearchChange,
  onRefresh,
  isRefreshing = false,
  searchPlaceholder = "Search...",
  actions,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full max-w-sm">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
          className="pl-8"
          aria-label="Search"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          <RefreshCwIcon className={isRefreshing ? "animate-spin" : undefined} />
          Refresh
        </Button>
        {actions}
      </div>
    </div>
  );
}
