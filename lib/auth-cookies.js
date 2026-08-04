import { ADMIN_TOKEN_COOKIE, ADMIN_TOKEN_MAX_AGE } from "@/lib/constants";

/**
 * @param {string} [cookieString]
 * @returns {string | null}
 */
export function getAdminTokenFromCookieString(cookieString = "") {
  if (!cookieString) {
    return null;
  }

  const match = cookieString
    .split("; ")
    .find((part) => part.startsWith(`${ADMIN_TOKEN_COOKIE}=`));

  if (!match) {
    return null;
  }

  const value = match.slice(ADMIN_TOKEN_COOKIE.length + 1);
  return value ? decodeURIComponent(value) : null;
}

/**
 * Read admin JWT from document.cookie (browser only).
 * @returns {string | null}
 */
export function getAdminToken() {
  if (typeof document === "undefined") {
    return null;
  }

  return getAdminTokenFromCookieString(document.cookie);
}

/**
 * Persist admin JWT in a cookie readable by proxy + Axios.
 * @param {string} token
 */
export function setAdminToken(token) {
  if (typeof document === "undefined") {
    return;
  }

  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";

  document.cookie = `${ADMIN_TOKEN_COOKIE}=${encodeURIComponent(token)}; Path=/; Max-Age=${ADMIN_TOKEN_MAX_AGE}; SameSite=Lax${secure}`;
}

/**
 * Clear the admin auth cookie.
 */
export function clearAdminToken() {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${ADMIN_TOKEN_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}
