<template>
  <v-app>
    <v-app-bar
      elevation="1"
      color="primary"
    >
      <v-app-bar-title class="d-flex align-center ga-3">
        <v-icon icon="mdi-bank" />
        <span>國內信用狀平台</span>
      </v-app-bar-title>

      <v-spacer />

      <div class="d-flex align-center ga-3">
        <span>登入者：{{ auth.userName || "未命名使用者" }}</span>
        <v-btn
          variant="text"
          :to="{ name: 'todo' }"
        >
          待辦事項
        </v-btn>
        <v-btn
          variant="text"
          :to="{ name: 'inbox' }"
        >
          訊息匣
        </v-btn>
        <v-btn
          variant="outlined"
          color="white"
          @click="onLogout"
        >
          登出
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      permanent
      width="240"
    >
      <v-list nav>
        <v-list-item
          title="首頁"
          :to="{ name: 'home' }"
          prepend-icon="mdi-home-outline"
        />
        <v-list-item
          title="待辦事項"
          :to="{ name: 'todo' }"
          prepend-icon="mdi-format-list-checks"
        />
        <v-list-item
          title="訊息匣"
          :to="{ name: 'inbox' }"
          prepend-icon="mdi-inbox-outline"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <div class="content-wrap">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth"

const router = useRouter()
const auth = useAuthStore()

function onLogout() {
  auth.logout()
  router.push("/login")
}
</script>