import { clearToken, isExpired } from '@/utils/token-utils'

const TWO_MINUTES_MS = 2 * 60 * 1000
const EXPIRES_AT_KEY = 'expires_at'

/**
 * 判斷 token 是否即將過期（距離過期 < 2 分鐘）
 * token 已完全過期時回傳 false（應改用 isExpired()）
 */
export function isExpiringSoon (): boolean {
  const expiresAt = localStorage.getItem(EXPIRES_AT_KEY)
  if (!expiresAt) {
    return false
  }
  if (isExpired()) {
    return false
  }
  const expiry = new Date(expiresAt).getTime()
  return expiry - Date.now() <= TWO_MINUTES_MS
}

/**
 * 嘗試刷新 access token。
 * 後端目前無 refresh endpoint，一律導向登入頁並回傳 false。
 */
export async function refreshAccessToken (): Promise<boolean> {
  redirectToLogin()
  return false
}

/** 清除 token 並導向登入頁 */
export function redirectToLogin (): void {
  clearToken()
  localStorage.removeItem('user_name')
  localStorage.removeItem('auth_type')
  window.location.href = '/login'
}
