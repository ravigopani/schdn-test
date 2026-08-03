/**
 * @typedef {Object} State
 * @property {string} id
 * @property {string} name
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 */

/**
 * @typedef {Object} StateFormValues
 * @property {string} name
 */

/**
 * Normalize a state entity from various backend shapes.
 * @param {Record<string, unknown>} raw
 * @returns {State}
 */
export function normalizeState(raw) {
  const id = String(raw.id ?? raw._id ?? "");

  return {
    id,
    name: String(raw.name ?? ""),
    createdAt: raw.createdAt ? String(raw.createdAt) : undefined,
    updatedAt: raw.updatedAt ? String(raw.updatedAt) : undefined,
  };
}

export {};
