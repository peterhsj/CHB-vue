import { computed, ref } from "vue"
import { defineStore } from "pinia"
import api from "@/api/http"

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token") ?? "")
  const userName = ref(localStorage.getItem("userName") ?? "")

  const isLoggedIn = computed(() => token.value.length > 0)

  async function login(account: string, password: string) {
    const { data } = await api.post("/login", { account, password })
    token.value = data.token
    userName.value = data.userName
    localStorage.setItem("token", token.value)
    localStorage.setItem("userName", userName.value)
  }

  function logout() {
    token.value = ""
    userName.value = ""
    localStorage.removeItem("token")
    localStorage.removeItem("userName")
  }

  return { token, userName, isLoggedIn, login, logout }
})