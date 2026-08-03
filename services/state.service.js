import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/api/client";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { normalizeState } from "@/types/state";

function extractList(payload) {
  if (Array.isArray(payload)) {
    return payload.map((item) => normalizeState(item));
  }

  if (!payload || typeof payload !== "object") {
    return [];
  }

  const candidates = [
    payload.data,
    payload.states,
    payload.items,
    payload.results,
    payload?.data?.data,
    payload?.data?.states,
    payload?.data?.items,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate.map((item) => normalizeState(item));
    }
  }

  return [];
}

function extractMeta(payload, params, itemCount) {
  const page = Number(params.page ?? DEFAULT_PAGE);
  const limit = Number(params.limit ?? DEFAULT_PAGE_SIZE);

  const metaSource =
    (payload &&
      typeof payload === "object" &&
      (payload.meta ??
        payload.pagination ??
        payload?.data?.meta ??
        payload?.data?.pagination)) ||
    {};

  const total = Number(
    metaSource.total ?? metaSource.totalCount ?? metaSource.count ?? itemCount,
  );

  const totalPages = Number(
    metaSource.totalPages ??
      metaSource.pages ??
      Math.max(1, Math.ceil(total / limit) || 1),
  );

  return {
    page: Number(metaSource.page ?? metaSource.currentPage ?? page),
    limit: Number(metaSource.limit ?? metaSource.perPage ?? limit),
    total,
    totalPages,
  };
}

function extractOne(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid state response");
  }

  const raw =
    ("data" in payload && payload.data && typeof payload.data === "object"
      ? payload.data
      : null) ??
    ("state" in payload && payload.state && typeof payload.state === "object"
      ? payload.state
      : null) ??
    payload;

  return normalizeState(/** @type {Record<string, unknown>} */ (raw));
}

export async function getStates(params = {}, options = {}) {
  const query = {
    page: params.page ?? DEFAULT_PAGE,
    limit: params.limit ?? DEFAULT_PAGE_SIZE,
    search: params.search,
    sortBy: params.sortBy ?? "id",
    sortOrder: params.sortOrder ?? "desc",
  };

  const payload = await apiPost("state/list", {
    params: query,
    signal: options.signal,
  });

  const data = extractList(payload);

  return {
    data,
    meta: extractMeta(payload, query, data.length),
  };
}

export async function getState(id, options = {}) {
  const payload = await apiPost(`state/get/${id}`, {
    signal: options.signal,
  });

  return extractOne(payload);
}

export async function createState(body) {
  const payload = await apiPost("state/create", body);
  return extractOne(payload);
}

export async function updateState(id, body) {
  const payload = await apiPost(`state/update/${id}`, body);
  return extractOne(payload);
}

export async function deleteState(id) {
  await apiPost(`state/delete/${id}`);
}
