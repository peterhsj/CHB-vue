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

    <div class="mx-4 mb-3">      
      <!-- 刪除已選取訊息按鈕：只有當有選取項目時才顯示 -->
      <v-btn
        class="chb__btn chb__btn--default"
        :disabled="selectedItems.length === 0"
        @click="deleteSelected"
      >
        <v-icon
          class="mr-1"
          left
          icon="mdi-trash-can-outline"
        />
        刪除訊息
        <span
          v-if="selectedItems.length > 0"
          class="ml-2"
        >
          ( {{ selectedItems.length }} )
        </span>
      </v-btn>
    </div>
    <v-card
      class="border-sm pa-4 mx-4 bg-grey-lighten-4"
      variant="outlined"
    >      
      <v-data-table
        v-model="selectedItems"
        v-model:items-per-page="pageOptions.itemsPerPage"
        class="table-sm chb__table bg-white"
        color="red-accent-4"
        density="compact"
        fixed-header
        :headers="tableHeaders"
        :height="tableHeight"
        hide-default-footer
        item-value="id"
        :items="tableItems"
        :loading="isLoading"
        :page="pageOptions.page"
        show-select
        sort-asc-icon="mdi-sort-ascending"
        sort-desc-icon="mdi-sort-descending"
        sort-icon="mdi-swap-vertical"
        striped="odd"
        @update:items-per-page="pageOptions.itemsPerPage = $event"
      >
        <template #item.content="{ item }">
          <!-- 上傳修狀通知書-MT707 -->
          <div v-if="item.title === '上傳修狀通知書-MT707'">
            <span>信用狀號碼：</span>{{ item.lcNo }}
            <br>
            <span>通知日期：</span>{{ item.noticeDate }}
          </div>

          <div v-if="item.title === '繕製開狀通知書'">
            <span>信用狀號碼：</span>{{ item.lcNo }}
            <br>
            <span>信用狀金額：</span>{{ item.lcAmount }}
            <br>
            <span>通知日期：</span>{{ item.noticeDate }}
          </div>
          
          <div v-if="item.title === '繕製出口結匯通知'">
            <span>信用狀號碼：</span>{{ item.lcNo }}
            <br>
            <span>受益人編號：</span>{{ item.beneficiaryId }}
            <br>
            <span>匯票號碼：</span>{{ item.draftNo }}
            <br>
            <span>結匯日期：</span>{{ item.settlementDate }}
            <br>
            <span>匯票金額：</span>{{ item.draftAmount }}
          </div>
          
          <div v-if="item.title === '放行退回開狀申請單據及電文'">            
            <span>申請人編號：</span>{{ item.applicantId }}
            <br>
            <span>申請人金額：</span>{{ item.applicantAmount }}
            <br>
            <span>開狀通知書號碼：</span>{{ item.lcNoticeNo }}
          </div>
        </template>
      </v-data-table>
    </v-card>

    <TablePagination
      v-model:items-per-page="pageOptions.itemsPerPage"
      v-model:page="pageOptions.page"
      class="mx-4"
      :total-items="totalCount"
      :total-pages="totalPages"
      @update:items-per-page="handleItemsPerPageChange"
      @update:page="handlePageChange"
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
  import TablePagination from '@/components/common/TablePagination.vue'
  import CommonOverlay from '@/components/common/CommonOverlay.vue'
  import PromptDialog from '@/components/common/PromptDialog.vue'
  
  const {
    isLoading,    
    messageDialog,
    messageWidth,
    messageTitle,
    message,
    messageStatus,
    isConfirmBtn,
    tableHeaders,    
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