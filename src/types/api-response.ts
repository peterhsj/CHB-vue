/**
 * 統一 API 回應格式
 * 對應後端 ApiResult<T> 的前端型別
 */
export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data?: T
  total?: number
  pageTotalAmount?: number
  totalAmount?: number
  errors?: string[]
}
