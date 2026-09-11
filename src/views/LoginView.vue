<template>
  <v-app>
    <v-main class="chb__login--wrapper">
      <v-container class="fill-height d-flex flex-column align-center justify-center">        
        <div class="mb-3">
          <v-img
            alt="彰化商業銀行 Logo"
            class="d-inline-flex"
            :src="logoPng"
            width="225"
          />

          <h2 class="my-0 text-cyan-darken-3 text-center">
            國外信用狀系統
          </h2>
        </div>
        
        <v-form
          ref="loginFormRef"
          class="chb__login--form"
          @submit.prevent="onLogin"
        >
          <v-card
            width="420"
            elevation="4"
          >
            <v-card-text class="mt-5">
              <v-text-field
                v-model="loginForm.userId"
                autocomplete="new-account"
                color="teal-darken-1"
                label="帳號"
                prepend-inner-icon="mdi-account"
                readonly
                required
                :rules="rules.userId"
                variant="outlined"
                @focus="$event.target.removeAttribute('readonly')"
              />
              <v-text-field
                v-model="loginForm.password"
                :append-inner-icon="isShowText ? 'mdi-eye-off': 'mdi-eye'"
                autocomplete="new-password"
                color="teal-darken-1"
                label="密碼"
                prepend-inner-icon="mdi-lock"
                readonly
                required
                :rules="rules.password"
                :type="isShowText ? 'text' : 'password'"
                variant="outlined"
                @click:append-inner="isShowText = !isShowText"
                @focus="$event.target.removeAttribute('readonly')"
              />
              <v-alert
                v-if="errorMsg"
                type="error"
                class="mt-2"
              >
                {{ errorMsg }}
              </v-alert>
            </v-card-text>
            <v-card-actions class="mx-2 mb-2">
              <v-spacer />
              <v-btn
                class="chb__btn chb__btn--default"
                :loading="loading"
                type="submit"
              >
                登入
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { VForm } from 'vuetify/components'
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth"
import logoPng from '@/assets/CHB-pic.png'

export interface FormData {
  auth?: string
  userId: string
  password: string
}

const router = useRouter()
const auth = useAuthStore()

// const userId = ref("admin")
// const password = ref("123456")
const loading = ref(false)
const errorMsg = ref("")

const loginFormRef = ref<InstanceType<typeof VForm> | null>(null)

const loginForm = ref<FormData>({
  userId: 'admin',
  password: '123456',
})

interface Rules {
  userId: ((v: string) => boolean | string)[]
  password: ((v: string) => boolean | string)[]
}
const rules: Rules = {
  userId: [v => !!v || '請輸入帳號'],
  password: [v => !!v || '請輸入密碼'],
}
const isShowText = ref<boolean>(false)

async function onLogin() {
  const payload = {
    userId: loginForm.value.userId,
    password: loginForm.value.password,
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