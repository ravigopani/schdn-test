export class ApiError extends Error {
  /**
   * @param {string} message
   * @param {{ status?: number, errors?: Record<string, string[]> | null, data?: unknown }} [options]
   */
  constructor(message, { status = 500, errors = null, data = null } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
    this.data = data;
  }
}

/**
 * @param {unknown} error
 * @param {string} [fallback]
 * @returns {string}
 */
export function getErrorMessage(error, fallback = "Something went wrong") {
  if (error instanceof ApiError) {
    return error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message || fallback;
  }

  if (typeof error === "string" && error.trim()) {
    return error;
  }

  return fallback;
}
