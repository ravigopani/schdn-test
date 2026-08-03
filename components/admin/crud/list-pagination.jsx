"use client";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

/**
 * @param {number} current
 * @param {number} total
 * @returns {(number | "ellipsis")[]}
 */
function buildPages(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const pages = new Set([1, total, current, current - 1, current + 1]);
  const sorted = [...pages]
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b);

  /** @type {(number | "ellipsis")[]} */
  const result = [];

  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) {
      result.push("ellipsis");
    }
    result.push(page);
  });

  return result;
}

/**
 * @param {{
 *   page: number,
 *   totalPages: number,
 *   total: number,
 *   limit: number,
 *   onPageChange: (page: number) => void,
 *   isDisabled?: boolean,
 * }} props
 */
export function ListPagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
  isDisabled = false,
}) {
  if (total === 0) {
    return null;
  }

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);
  const pages = buildPages(page, Math.max(totalPages, 1));

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing <span className="font-medium text-foreground">{start}</span>–
        <span className="font-medium text-foreground">{end}</span> of{" "}
        <span className="font-medium text-foreground">{total}</span>
      </p>

      <Pagination className="mx-0 w-auto justify-end">
        <PaginationContent>
          <PaginationItem>
            <Button
              type="button"
              variant="ghost"
              size="default"
              className="pl-2!"
              disabled={isDisabled || page <= 1}
              onClick={() => onPageChange(page - 1)}
            >
              <ChevronLeftIcon data-icon="inline-start" />
              <span className="hidden sm:inline">Previous</span>
            </Button>
          </PaginationItem>

          {pages.map((item, index) =>
            item === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={item}>
                <Button
                  type="button"
                  variant={item === page ? "outline" : "ghost"}
                  size="icon"
                  disabled={isDisabled}
                  onClick={() => onPageChange(item)}
                  aria-current={item === page ? "page" : undefined}
                >
                  {item}
                </Button>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <Button
              type="button"
              variant="ghost"
              size="default"
              className="pr-2!"
              disabled={isDisabled || page >= totalPages}
              onClick={() => onPageChange(page + 1)}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRightIcon data-icon="inline-end" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
