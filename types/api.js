/**
 * @typedef {Object} ListParams
 * @property {number} [page]
 * @property {number} [limit]
 * @property {string} [search]
 * @property {string} [sortBy]
 * @property {"asc" | "desc"} [sortOrder]
 */

/**
 * @typedef {Object} PaginationMeta
 * @property {number} page
 * @property {number} limit
 * @property {number} total
 * @property {number} totalPages
 */

/**
 * @template T
 * @typedef {Object} PaginatedResult
 * @property {T[]} data
 * @property {PaginationMeta} meta
 */

export {};
