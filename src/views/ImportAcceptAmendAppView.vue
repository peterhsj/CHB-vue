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
      <v-card-title>受理修狀申請書</v-card-title>
      <v-card-text>
        AA
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
  import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
  const { breadcrumbItems } = useBreadcrumbs()
</script>