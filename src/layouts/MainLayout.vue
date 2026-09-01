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

    <!-- 側邊選單 -->
    <v-navigation-drawer
      v-model="drawer"
      color="grey-lighten-2"
      elevation="4"
      :permanent="mdAndUp"
      width="275"
    >
      <v-list
        v-model:opened="open"
        class="pa-0"
      >
        <template
          v-for="item in currentMenu"
          :key="item.value"
        >
          <v-divider />
          <MenuGroup
            :item="item"
            :current-item="currentItem"
            :open="open"
            @select="selectedHandler"
          />
        </template>
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
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute, useRouter } from "vue-router"
import { useMenu } from '@/composables/useMenu'
import type { MenuItem, MenuPathResult } from '@/composables/useMenu'
import { useAuthStore } from "@/stores/auth"
import { useDisplay } from 'vuetify'
import MenuGroup from '@/components/MenuGroup.vue'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const { mdAndUp } = useDisplay()

const _drawerOverride = ref<boolean | null>(null)
const drawer = computed({
  get: () => _drawerOverride.value ?? mdAndUp.value,
  set: (value: boolean) => { _drawerOverride.value = value },
})  

const { currentMenu } = useMenu(auth.authType)
const open = ref<string[]>([]) // 展開的選單項目值列表
const currentItem = ref<string | null>(null) // 當前選項
const mainMenu = ref<string | null>(null) // 第一層選單
const currentSecMenu = ref<string | null>(null) // 第二層選單

// 選單項目選擇處理函式
const toRoutePath = (item: string) => (item === 'home' ? '/' : item)

function selectedHandler (value: string): void {
  nextTick(() => {
    const opened = open.value
    const depth = opened.length

    if (depth === 0) {
      mainMenu.value = value
    } else if (depth === 1) {
      mainMenu.value = opened[0] ?? null
    } else {
      mainMenu.value = opened[1] ?? null
      currentSecMenu.value = opened[0] ?? null
    }
    currentItem.value = value
    router.push(toRoutePath(value))
  })
}

// 根據選單項目值尋找對應的主選單和子選單
function findMenuPath (
  targetValue: string,
  menuItems: MenuItem[] = currentMenu.value ?? [],
): MenuPathResult | null {
  for (const main of menuItems) {
    if (main.value === targetValue) {
      return {
        mainMenu: main.value,
        subMenu: null,
      }
    }
    
    for (const sub of main.subMenu ?? []) {
      if (sub.value === targetValue) {
        return {
          mainMenu: main.value,
          subMenu: null,
        }
      }
      
      for (const leaf of sub.subMenu ?? []) {
        if (leaf.value === targetValue) {
          return {
            mainMenu: main.value,
            subMenu: sub.value,
          }
        }
      }
    }    
  }
  return null
}

// 登出
function onLogout() {
  auth.logout()
  router.push("/login")
}

/**
 * 初始化選單狀態
 * 主選單: foundPath.mainMenu,
 * 子選單: foundPath.subMenu,
 * 依目前 route 還原選單: pathValue,
 */

function pathToMenuValue (path: string): string {
  return path === 'home' ? '/' : path.replace(/^\//, '')
}

function initMenuState (): void {
  const pathValue = pathToMenuValue(route.path)
  const foundPath = findMenuPath(pathValue)

  currentItem.value = pathValue
  mainMenu.value = foundPath?.mainMenu ?? pathValue
  currentSecMenu.value = foundPath?.subMenu ?? ''

  open.value = pathValue === 'home'
  ? []
  : [foundPath?.subMenu, foundPath?.mainMenu].filter(
      (key): key is string => Boolean(key),
    )
}

watch(
  () => router.currentRoute.value.path,
  () => {
    initMenuState()
  },
  { immediate: true })
</script>