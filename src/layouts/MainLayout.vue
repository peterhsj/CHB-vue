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
      v-model="drawer"
      color="grey-lighten-2"
      elevation="4"
      :permanent="mdAndUp"
      :temporary="!mdAndUp"
      width="275"
    >
      <!-- <v-list nav>
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
      </v-list> -->
      <v-list
        v-model:opened="open"
        class="pa-0"
      >
        <!-- 第一層選單 -->
        <template
          v-for="item in currentMenu"
          :key="item.value"
        >
          <!-- 有第二層選單的項目 -->
          <v-divider />

          <v-list-group
            v-if="item.subMenu"
            v-model="item.value"
            class="hnb__menu"
            :class="[open.includes(item.value) ? 'hnb__menu--open' : '']"
            density="compact"
            :value="item.value"
          >
            <template #activator="{ props }">
              <v-list-item
                v-bind="props"
                class="hnb__menu--title"
                :value="item.value"
              >
                <div class="d-flex align-center">
                  <span class="font-weight-medium">{{ item.text }}</span>
                </div>
              </v-list-item>
            </template>
            <!-- 第二層選單 -->

            <template
              v-for="subItem in item.subMenu"
              :key="subItem.value"
            >
              <!-- 有第三層選單的項目 -->

              <v-list-group
                v-if="subItem.secMenu"
                class="hnb__sec-menu mx-1"
                :class="[open.includes(subItem.value) ? 'hnb__sec-menu--open' : '']"
                :value="subItem.value"
              >
                <template #activator="{ props }">
                  <v-list-item
                    v-bind="props"
                    class="border-t-sm"
                  >
                    <div class="d-flex align-start">
                      <span class="text-body-2">{{ subItem.text }}</span>
                    </div>
                  </v-list-item>
                </template>
                <!-- 第三層選單 -->
                <v-divider />

                <v-list-item
                  v-for="secItem in subItem.secMenu"
                  :key="secItem.value"
                  :active="currentItem === secItem.value"
                  class="hnb__third-menu"
                  :class="[currentItem === secItem.value ? 'hnb__third-menu--sub' : 'text-blue-grey-darken-1']"
                  min-height="44px"
                  :value="secItem.value"
                  @click="selectedHandler(secItem.value)"
                >
                  <div class="d-flex align-start">
                    <span class="text-body-2">{{ secItem.text }}</span>
                  </div>
                </v-list-item>
              </v-list-group>

              <v-divider v-if="subItem.secMenu" />

              <!-- 沒有第三層選單的項目 -->
              <v-list-item
                v-else
                class="hnb__sec-menu"
                :class="[currentItem === subItem.value ? 'hnb__singleItem--sub' : 'text-blue-grey-darken-1']"
                link
                :value="subItem.value"
                @click="selectedHandler(subItem.value)"
              >
                <div class="d-flex align-start">
                  <!-- <v-icon class="mr-2" :icon="'mdi-pause-box-outline'" size="16" /> -->
                  <span class="text-body-2">{{ subItem.text }}</span>
                </div>
              </v-list-item>
            </template>
          </v-list-group>
          <!-- 沒有第二層選單的項目 -->
          <v-list-item
            v-else
            :active="currentItem === item.value"
            class="v-list-group__header"
            :class="[currentItem === item.value ? 'hnb__singleItem--open' : 'hnb__singleItem']"
            link
            :value="item.value"
            @click="selectedHandler(item.value)"
          >
            <div class="d-flex align-center">
              <v-icon
                class="mr-2"
                :icon="'mdi-nature'"
                size="16"
              />
              <span class="font-weight-medium">{{ item.text }}</span>
            </div>
          </v-list-item>
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
import { nextTick,ref, watch } from 'vue'
import { useRouter } from "vue-router"
import { useMenu } from '@/composables/useMenu'
import type { MenuItem, MenuPathResult } from '@/composables/useMenu'
import { useAuthStore } from "@/stores/auth"
import { useDisplay } from 'vuetify'

const router = useRouter()
const auth = useAuthStore()
const { mdAndUp } = useDisplay()
const drawer = ref(mdAndUp.value)

watch(mdAndUp, (value: boolean) => {
  drawer.value = value
})


const { currentMenu } = useMenu(auth.authType)
const open = ref<string[]>([]) // 展開的選單項目值列表
const currentItem = ref<string | null>(null) // 當前選項
const mainMenu = ref<string | null>(null) // 第一層選單
const currentSecMenu = ref<string | null>(null) // 第二層選單

// 選單項目選擇處理函式
  function selectedHandler (value: string): void {
    nextTick(() => {
      // console.log('選擇項目:', open.value, value)
      if (open.value.length === 0) {
        if (value === 'home') {
          mainMenu.value = 'home'
          router.push('/')
        } else {
          mainMenu.value = value
          router.push(value)
        }
        mainMenu.value = value
      } else {
        if (open.value.length === 1) {
          mainMenu.value = open.value[0] || null
        } else {
          mainMenu.value = open.value[1] || null
          currentSecMenu.value = open.value[0] || null
        }
        router.push(value)
      }
      currentItem.value = value
    })
  }

  // 根據選單項目值尋找對應的主選單和子選單
  function findMenuPath (targetValue: string, menuItems: MenuItem[] = currentMenu.value || [], parentMain: string | null = null, parentSub: string | null = null): MenuPathResult | null {
    for (const item of menuItems) {
      // 如果當前項目匹配
      if (item.value === targetValue) {
        return {
          mainMenu: parentMain || item.value,
          subMenu: parentSub,
        }
      }

      // 如果有子選單，遞迴搜尋
      if (item.subMenu) {
        for (const subItem of item.subMenu) {
          if (subItem.value === targetValue) {
            return {
              mainMenu: item.value,
              subMenu: null,
            }
          }

          // 如果有第三層選單，遞迴搜尋
          if (subItem.secMenu) {
            for (const secItem of subItem.secMenu) {
              if (secItem.value === targetValue) {
                return {
                  mainMenu: item.value,
                  subMenu: subItem.value,
                }
              }
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
   * 前頁面: pathValue,
   */
  function initMenuState (): void {
    const currentPath = router.currentRoute.value.path
    if (currentPath === '/') {
      currentItem.value = 'home'
      mainMenu.value = 'home'
      currentSecMenu.value = ''
    } else {
      const pathValue = currentPath.slice(1)
      currentItem.value = pathValue

      const foundPath = findMenuPath(pathValue)
      if (foundPath) {
        mainMenu.value = foundPath.mainMenu || pathValue
        currentSecMenu.value = foundPath.subMenu || ''
        if (foundPath.mainMenu) {
          open.value = foundPath.subMenu ? [foundPath.subMenu, foundPath.mainMenu] : [foundPath.mainMenu]
        }
      } else {
        mainMenu.value = pathValue
        currentSecMenu.value = ''
        open.value = []
      }
    }
  }

  watch(
    () => router.currentRoute.value.path,
    () => {
      initMenuState()
    },
    { immediate: true })
</script>