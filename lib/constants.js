export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5002";

export const ADMIN_TOKEN_COOKIE = "admin_token";
export const ADMIN_TOKEN_MAX_AGE = 60 * 60 * 24 * 7; /** Cookie max-age in seconds */
export const ADMIN_LOGIN_PATH = "/admin/login";

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE = 1;
