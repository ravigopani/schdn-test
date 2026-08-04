import axios from "axios";

import { ApiError } from "@/lib/api/errors";
import { ADMIN_LOGIN_PATH } from "@/lib/constants";
import { clearAdminToken, getAdminToken } from "@/lib/auth-cookies";
import { API_BASE_URL } from "@/lib/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getAdminToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (config.headers?.Authorization) {
    delete config.headers.Authorization;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined" && error.response?.status === 401) {
      const requestUrl = String(error.config?.url ?? "");
      const isLoginRequest = requestUrl.includes("/auth/login");

      if (!isLoginRequest) {
        clearAdminToken();

        if (!window.location.pathname.startsWith(ADMIN_LOGIN_PATH)) {
          const next = `${window.location.pathname}${window.location.search}`;
          const params = next ? `?next=${encodeURIComponent(next)}` : "";
          window.location.assign(`${ADMIN_LOGIN_PATH}${params}`);
        }
      }
    }

    return Promise.reject(error);
  },
);

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
