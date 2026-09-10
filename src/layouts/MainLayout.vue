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
import { mainLayout } from '@/composables/useMain'
import MenuGroup from '@/components/MenuGroup.vue'

const {
    auth,
    currentMenu,
    mdAndUp,
    currentItem,
    drawer,
    open,
    onLogout,
    selectedHandler,
} = mainLayout()
</script>