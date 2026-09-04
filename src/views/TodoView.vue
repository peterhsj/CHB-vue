<template>
  <div>
    <!-- 使用麵包屑導航 -->
    <v-breadcrumbs
      class="my-0"
      :items="breadcrumbItems"
    >
      <template #prepend>
        <v-icon
          color="primary"
          icon="mdi-map-outline"
          size="small"
        />
      </template>
    </v-breadcrumbs>
    <v-card>
      <v-card-title>待辦事項</v-card-title>
      <v-card-text>
        <v-list density="compact">
          <v-list-item
            v-for="item in tableItems"
            :key="item.id"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.count }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  // import { useAuthStore } from '@/stores/auth'
  // import { useRoute } from 'vue-router'
  import { useTodo } from '@/composables/useTodo'
  
  // 取得 authType
  // const { authType } = useAuthStore()  
  // 透過 route.path 取得當前路由
  // const route = useRoute()
  
  const { tableItems } = useTodo()
  // 取得 useMenu.ts 中本頁面對應的菜單項產生對應的麵包屑導航
  // import { useMenu } from '@/composables/useMenu'
  // const { getMenuByPath } = useMenu(authType)
  // const menuItem = getMenuByPath(route.path.slice(1))

  // 取得當前路由的麵包屑導航
  const breadcrumbItems = computed(() => {
    const items = [
      { title: '首頁', disabled: false, href: '/' },
      { title: '待辦事項', disabled: true }
    ]
    // if (menuItem) {
    //   items.push({ text: menuItem, disabled: true })
    // }
    return items
  })
</script>