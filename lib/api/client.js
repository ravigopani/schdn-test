import axios from "axios";
import { API_BASE_URL } from "@/lib/constants";
import { ApiError } from "@/lib/api/errors";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // "Authorization": `Bearer ${localStorage.getItem("token")}`,
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE3ODU1MTAxMTQsImV4cCI6MTc4NTU5NjUxNH0.uREqciUaWjxDvOSpFTk3PeY7pvoRwtrJXGVqnMPHgz8`,
  },
});

function toApiError(error) {
  if (axios.isCancel(error) || error?.code === "ERR_CANCELED") {
    throw error;
  }

  if (!error.response) {
    throw new ApiError(
      "Unable to reach the API. Check that the server is running.",
      { status: 0 },
    );
  }

  const { status, data: payload } = error.response;
  const message =
    (payload &&
      typeof payload === "object" &&
      ("message" in payload || "error" in payload) &&
      String(payload.message ?? payload.error)) ||
    `Request failed with status ${status}`;

  const errors =
    payload &&
    typeof payload === "object" &&
    "errors" in payload &&
    payload.errors
      ? payload.errors
      : null;

  throw new ApiError(message, {
    status,
    errors,
    data: payload,
  });
}

export async function apiRequest(path, options = {}) {
  const { params, init = {}, signal, data } = options;
  const method = (init.method ?? "GET").toUpperCase();

  try {
    const response = await api.request({
      url: path,
      method,
      params,
      data: data ?? init.data,
      signal,
      headers: init.headers,
    });

    return response.data;
  } catch (error) {
    toApiError(error);
  }
}

export function apiGet(path, options = {}) {
  return apiRequest(path, {
    ...options,
    init: { ...options.init, method: "GET" },
  });
}

export function apiPost(path, body, options = {}) {
  return apiRequest(path, {
    ...options,
    data: body,
    init: { ...options.init, method: "POST" },
  });
}

export function apiPut(path, body, options = {}) {
  return apiRequest(path, {
    ...options,
    data: body,
    init: { ...options.init, method: "PUT" },
  });
}

export function apiPatch(path, body, options = {}) {
  return apiRequest(path, {
    ...options,
    data: body,
    init: { ...options.init, method: "PATCH" },
  });
}

export function apiDelete(path, options = {}) {
  return apiRequest(path, {
    ...options,
    init: { ...options.init, method: "DELETE" },
  });
}
