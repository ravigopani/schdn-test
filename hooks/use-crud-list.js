"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { getErrorMessage } from "@/lib/api/errors";

/**
 * Reusable list hook: URL-synced search, sort, pagination, loading/error/refresh.
 * @param {{
 *   fetcher: (params: import("@/types/api").ListParams, options?: { signal?: AbortSignal }) => Promise<import("@/types/api").PaginatedResult<any>>,
 *   defaultSortBy?: string,
 *   defaultSortOrder?: "asc" | "desc",
 *   defaultLimit?: number,
 * }} options
 */
export function useCrudList({
  fetcher,
  defaultSortBy = "name",
  defaultSortOrder = "asc",
  defaultLimit = DEFAULT_PAGE_SIZE,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || DEFAULT_PAGE);
  const limit = Number(searchParams.get("limit") || defaultLimit);
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || defaultSortBy;
  const sortOrder =
    searchParams.get("sortOrder") === "desc" ? "desc" : defaultSortOrder;

  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({
    page,
    limit,
    total: 0,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchInput, setSearchInput] = useState(search);
  const lastSyncedSearch = useRef(search);

  useEffect(() => {
    setSearchInput(search);
    lastSyncedSearch.current = search;
  }, [search]);

  const updateParams = useCallback(
    (updates, { resetPage = false } = {}) => {
      const next = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
      });

      if (resetPage) {
        next.set("page", String(DEFAULT_PAGE));
      }

      const query = next.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetcher(
          { page, limit, search, sortBy, sortOrder },
          { signal: controller.signal },
        );

        if (!active) {
          return;
        }

        setData(result.data);
        setMeta(result.meta);
      } catch (err) {
        if (
          !active ||
          (err instanceof DOMException && err.name === "AbortError")
        ) {
          return;
        }

        setData([]);
        setError(getErrorMessage(err, "Failed to load data"));
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
  }, [fetcher, limit, page, refreshKey, search, sortBy, sortOrder]);

  useEffect(() => {
    const handle = setTimeout(() => {
      if (lastSyncedSearch.current === searchInput) {
        return;
      }

      lastSyncedSearch.current = searchInput;
      updateParams({ search: searchInput }, { resetPage: true });
    }, 400);

    return () => clearTimeout(handle);
  }, [searchInput, updateParams]);

  const setPage = useCallback(
    (nextPage) => {
      updateParams({ page: nextPage });
    },
    [updateParams],
  );

  const toggleSort = useCallback(
    (column) => {
      if (sortBy === column) {
        updateParams({
          sortBy: column,
          sortOrder: sortOrder === "asc" ? "desc" : "asc",
        });
        return;
      }

      updateParams({ sortBy: column, sortOrder: "asc" }, { resetPage: true });
    },
    [sortBy, sortOrder, updateParams],
  );

  const refresh = useCallback(() => {
    setRefreshKey((value) => value + 1);
  }, []);

  return {
    data,
    meta,
    isLoading,
    error,
    page,
    limit,
    search,
    searchInput,
    setSearchInput,
    sortBy,
    sortOrder,
    setPage,
    toggleSort,
    refresh,
  };
}
