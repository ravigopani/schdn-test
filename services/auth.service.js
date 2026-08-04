import { apiPost } from "@/lib/api/client";

/**
 * @param {unknown} payload
 * @returns {string}
 */
function extractToken(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid login response");
  }

  const candidates = [
    payload.token,
    payload.accessToken,
    payload.access_token,
    payload?.data?.token,
    payload?.data?.accessToken,
    payload?.data?.access_token,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate.trim();
    }
  }

  throw new Error("Login succeeded but no token was returned");
}

/**
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ token: string, raw: unknown }>}
 */
export async function loginAdmin(credentials) {
  const payload = await apiPost("/auth/login", credentials);
  const token = extractToken(payload);

  return { token, raw: payload };
}
