<template>
  <div>
    <v-card
      v-if="tableItems.length === 0"
      class="border-sm pa-4 mx-4 bg-grey-lighten-4 text-center"
      variant="outlined"
    >
      <v-icon
        class="my-4 mr-2"
        color="deep-orange-lighten-2"
        icon="mdi-alert-circle-outline"
        size="40"
      />
      <span class="text-teal-darken-2">目前尚無資料。</span>
    </v-card>

    <div v-else>        
      <div class="mx-4 mb-3">      
        <!-- 刪除已選取訊息按鈕：只有當有選取項目時才顯示 -->
        <v-btn
          class="chb__btn chb__btn--default"
          :disabled="selectedItems.length === 0"
          @click="$emit('deleteSelected', $event)"
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
          :style="{ 'max-height': tableHeight }"
          @update:items-per-page="pageOptions.itemsPerPage = $event"
        >
          <template #[`item.content`]="{ item }">
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
        @update:items-per-page="$emit('update:handleItemsPerPageChange', $event)"
        @update:page="$emit('update:handlePageChange', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import TablePagination from '@/components/common/TablePagination.vue'
  import { useInbox, type ListItem } from '@/composables/useInbox'

  const {
    tableHeaders,
  } = useInbox()

  // 1. 定義與父層 v-model 雙向綁定的 model
  const selectedItems = defineModel('selectedItems', {
    type: Array,
    default: () => []
  })
  const pageOptions = defineModel('pageOptions', {
    type: Object,
    default: () => ({ page: 1, itemsPerPage: 10 })
  })

  const {
    tableItems,
    totalCount,
    totalPages,
    tableHeight,
    isLoading,
  } = defineProps<{
    tableItems: ListItem[]
    totalCount: number
    totalPages: number
    tableHeight: string
    isLoading: boolean
  }>()

  defineEmits<{
    'deleteSelected': [value: number[]]
    'update:handleItemsPerPageChange': [value: number]
    'update:handlePageChange': [value: number]
  }>()
</script>