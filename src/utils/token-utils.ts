const ACCESS_TOKEN_KEY = 'access_token'
const EXPIRES_AT_KEY = 'expires_at'

/** 取得目前儲存的 access token */
export function getAccessToken (): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

/** 儲存 token 與 expiresAt（登入時呼叫） */
export function saveToken (token: string, expiresAt: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
  localStorage.setItem(EXPIRES_AT_KEY, expiresAt)
}

/** 清除 token 相關資料 */
export function clearToken (): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(EXPIRES_AT_KEY)
}

/** 判斷 token 是否已過期 */
export function isExpired (): boolean {
  const expiresAt = localStorage.getItem(EXPIRES_AT_KEY)
  if (!expiresAt) {
    return true
  }
  return new Date(expiresAt).getTime() <= Date.now()
}
