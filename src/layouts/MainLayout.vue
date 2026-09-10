<template>
  <v-app>
    <v-app-bar
      elevation="1"
      class="chb__layout--appbar"
    >
      <v-app-bar-title>
        <div class="d-flex align-center flex-nowrap ga-2">
          <v-img
            src="@/assets/CHB-pic.png"
            alt="彰化商業銀行 Logo"
            contain
            max-width="235"
          />
          <span class="chb__logo--title">國外信用狀平台</span>
        </div>
      </v-app-bar-title>

      <v-spacer />

      <div class="d-flex align-center ga-3 ">
        <span>{{ auth.userName || "未命名使用者" }}</span>
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
          class="chb__btn--red"
          @click="onLogout"
        >
          <v-icon icon="mdi-logout" />
          <span class="ml-2">登出</span>
        </v-btn>
      </div>
    </v-app-bar>

    <!-- 側邊選單 -->     
    <v-navigation-drawer
      v-model="drawer"
      color="grey-lighten-3"
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