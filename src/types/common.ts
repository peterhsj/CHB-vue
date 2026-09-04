type LcTypeOption = 'sight' | 'usance' // 即期 / 遠期
interface PageOptions {
  page: number
  itemsPerPage: number
  sortBy: {
    key: string
    order?: 'asc' | 'desc'
  }[]
}

// ========== 以下未測試 ==========

// ── 分頁選項 ──────────────────────────────────────────────────────────────────
interface PagedResult<T> {
  data: T[]
  total: number
  message?: string
}
interface PageQuery {
  pageIndex: number
  pageSize: number
}
interface PageOptions {
  page: number
  itemsPerPage: number
  sortBy: {
    key: string
    order?: 'asc' | 'desc'
  }[]
}
interface SelectItem {
  readonly title: string
  readonly value: string
}

export type {
  LcTypeOption,
  PagedResult,
  PageOptions,
  PageQuery,
  SelectItem,
}
