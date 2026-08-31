import type { AuthType } from '@/composables/useMenu'
import { computed, ref } from "vue"
import { defineStore } from "pinia"
import { apiRequest } from "@/api/api-service"
import { clearToken, saveToken } from '@/utils/token-utils'

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem('token') ?? '')
  const userName = ref(localStorage.getItem('userName') ?? '')
  const authType = ref<AuthType>((localStorage.getItem('auth_type') as AuthType) ?? 'BH')
  const branches = ref<string[]>(JSON.parse(localStorage.getItem('user_branches') ?? '[]'))  
  const isAuthenticated = computed(() => !!token.value)

  interface LoginRequest {
    userId: string
    password: string
  }
  interface LoginResponse {
    token: string
    userName: string
    expiresAt: string
    authType: AuthType
    user_branches: string[]
  }
  
  async function login(request: LoginRequest) {
    const res = await apiRequest.post<LoginResponse>("/auth/login", request)
    const { success, message, data } = res

    if (!success) {
      // 可拋錯或回傳 false 讓呼叫方處理
      throw new Error(message)
    }
    const { token: newToken, userName: newUserName, expiresAt, authType: newAuthType, user_branches: newBranches } = data as LoginResponse

    token.value = newToken
    userName.value = newUserName
    authType.value = newAuthType
    branches.value = newBranches
    saveToken(newToken, expiresAt)
    localStorage.setItem("userName", userName.value)
    localStorage.setItem("auth_type", authType.value)
    localStorage.setItem("user_branches", JSON.stringify(branches.value))
  }

  function setAuthType (type: AuthType) {
    authType.value = type
    localStorage.setItem('auth_type', type)
  }

  async function logout () {
    token.value = ''
    userName.value = ''
    authType.value = 'BH'
    branches.value = []
    clearToken()
    localStorage.removeItem('userName')
    localStorage.removeItem('auth_type')
    localStorage.removeItem('user_branches')
  }

  return { token, userName, authType, branches, isAuthenticated, login, logout, setAuthType }
})