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
    
    <h2 class="chb__title">
      待辦事項
    </h2>
    
    <v-row
      class="mx-4"
      dense
    >
      <v-col
        v-for="item in tableItems"
        :key="item.id"
        cols="12"
        md="4"
        lg="3"
      >
        <v-card
          color="orange-lighten-5"
          density="compact"
          elevation="0"
          rounded="lg"
          variant="flat"
          :to="item.path ?? '/'"       
        >
          <v-card-item>
            <v-card-text
              class="d-flex align-center justify-space-between px-2"
            >
              <!-- 文字標題 -->
              <span class="mr-1 text-body-large font-weight-bold">{{ item.title }}</span>
              
              <!-- Inline Badge 顯示數量 -->
              <v-badge
                :content="item.count"
                color="red-darken-3"
                inline
              />
            </v-card-text>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
    <!-- 共用元件 -->
    <CommonOverlay :overlay="loading" />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useTodo } from '@/composables/useTodo'
  import CommonOverlay from '@/components/CommonOverlay.vue'
  
  const { tableItems, loading } = useTodo()

  //取得當前路由的麵包屑導航
  const breadcrumbItems = computed(() => {
    const items = [
      { title: '首頁', disabled: false, href: '/' },
      { title: '待辦事項', disabled: true }
    ]
    return items
  })
</script>