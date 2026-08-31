<template>
  <v-app>
    <v-main class="login-page">
      <v-container class="fill-height d-flex align-center justify-center">
        <v-card
          width="420"
          elevation="4"
        >
          <v-card-title class="text-h6">
            系統登入
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="userId"
              label="帳號"
            />
            <v-text-field
              v-model="password"
              label="密碼"
              type="password"
            />
            <v-alert
              v-if="errorMsg"
              type="error"
              class="mt-2"
            >
              {{ errorMsg }}
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              :loading="loading"
              @click="onLogin"
            >
              登入
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth"

const router = useRouter()
const auth = useAuthStore()

const userId = ref("admin")
const password = ref("123456")
const loading = ref(false)
const errorMsg = ref("")

async function onLogin() {
  const payload = {
    userId: userId.value,
    password: password.value,
  }
  errorMsg.value = ""
  loading.value = true
  try {
    await auth.login(payload)
    router.push("/")
  } catch (error) {
    errorMsg.value = "登入失敗，請確認帳號密碼"
  } finally {
    loading.value = false
  }
}
</script>