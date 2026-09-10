<template>
  <div>
    <!-- 使用麵包屑導航 -->
    <v-breadcrumbs
      class="my-0 pt-1"
      :items="breadcrumbItems"
    >
      <template #prepend>
        <v-icon
          color="teal-darken-2"
          icon="mdi-map-outline"
          size="small"
        />
      </template>
    </v-breadcrumbs>
    
    <h2 class="chb__title">
      訊息匣
    </h2>

    <!-- 列表清冊 -->
    <InboxList
      v-model:selected-items="selectedItems"
      v-model:page-options="pageOptions"
      :table-items="tableItems"
      :total-count="totalCount"
      :total-pages="totalPages"
      :table-height="tableHeight"
      :is-loading="isLoading"
      @delete-selected="deleteSelected"
      @update:handle-items-per-page-change="handleItemsPerPageChange"
      @update:handle-page-change="handlePageChange"
    />

    <!-- 共用元件 -->
    <CommonOverlay :overlay="isLoading" />
    <PromptDialog
      v-model:message-dialog="messageDialog"
      :is-confirm-btn="isConfirmBtn"
      :message="message"
      :message-width="messageWidth"
      :message-status="messageStatus"
      :message-title="messageTitle"
      @on-close="messageClose"
      @prompt-confirm="messageConfirm"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useInbox } from '@/composables/useInbox'
  import InboxList from '@/components/InboxList.vue'
  // import TablePagination from '@/components/common/TablePagination.vue'
  import CommonOverlay from '@/components/common/CommonOverlay.vue'
  import PromptDialog from '@/components/common/PromptDialog.vue'
  
  const {
    isLoading,
    // 訊息通知相關狀態與方法
    messageDialog,
    messageWidth,
    messageTitle,
    message,
    messageStatus,
    isConfirmBtn,
    // 列表及分頁相關
    selectedItems,
    tableItems,
    pageOptions,
    totalCount,
    totalPages,
    tableHeight,
    handleItemsPerPageChange,
    handlePageChange,
    deleteSelected,
    messageClose,
    messageConfirm,
  } = useInbox()

  //取得當前路由的麵包屑導航
  const breadcrumbItems = computed(() => {
    const items = [
      { title: '首頁', disabled: false, href: '/' },
      { title: '訊息匣', disabled: true }
    ]
    return items
  })
</script>