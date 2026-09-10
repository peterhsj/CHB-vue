import type { PageOptions } from '@/types/common'
import { apiRequest } from "@/api/api-service"
import { computed, onMounted, ref } from "vue"
export interface ListItem {
  id: number
  title: string // 主旨
  // content: string
  lcNo: string // 信用狀號碼
  lcAmount: string // 信用狀金額
  noticeDate: string // 通知日期
  beneficiaryId: string // 受益人編號
  draftNo: string // 匯票號碼
  settlementDate: string // 結匯日期
  draftAmount: string // 匯票金額
  applicantId: string // 申請人編號
  applicantAmount: string // 申請人金額
  lcNoticeNo: string // 開狀通知書號碼
  sender: string // 發送者
  time: string // 時間
}

interface DataTableHeader {
  title?: string
  key: string
  align: 'start' | 'center' | 'end'
  sortable?: boolean
  nowrap?: boolean
  minWidth?: number
  width?: string
}

export function useInbox() {
  const isLoading = ref(false)

  // Prompt Message Dialog
  const messageDialog = ref(false)
  const messageWidth = ref('400px')
  const messageTitle = ref('')
  const message = ref('')
  const messageStatus = ref('')
  const isConfirmBtn = ref(false)

  const tableHeight = computed(() => `${window.innerHeight - 355}px`) // 表格動態高度
  const tableHeaders: DataTableHeader[] = [
    { title: '編號', key: 'id', align: 'center', sortable: false, nowrap: true, width: '50px' },
    // 手動將特有的內建 key 移到編號之後
    { key: 'data-table-select', align: 'start', width: '50px' }, 
    { title: '主旨', key: 'title', align: 'start', sortable: false, nowrap: true },
    { title: '內容', key: 'content', align: 'start', sortable: false, nowrap: true },
    { title: '發送者', key: 'sender', align: 'center', sortable: false, nowrap: true },
    { title: '時間', key: 'time', align: 'center', sortable: false, nowrap: true },
  ]
  
  // 選中的項目
  const selectedItems = ref<number[]>([])

  // 防止重複調用的標記
  const isSearching = ref(false)

  // 分頁資料
  const tableItems = ref<ListItem[]>([])
  const pageOptionsInit = ref<PageOptions>({
    page: 1,
    itemsPerPage: 10,
    sortBy: [{ key: 'no', order: 'asc' }],
  })
  const pageOptions = ref<PageOptions>({ ...pageOptionsInit.value })
  const totalCount = ref(0) // 總筆數
  const totalPages = computed(() => Math.ceil(totalCount.value / pageOptions.value.itemsPerPage) || 1) // 總頁數
  const gotoPage = ref<number | null>(null)

  // 取得列表資料
  async function fetchList () {
    isLoading.value = true
    try {
      const { page, itemsPerPage } = pageOptions.value
      const payload = {
        pageIndex: page,
        pageSize: itemsPerPage,
      }

      const res = await apiRequest.post('/inbox/list', payload)
      // console.log('[useInbox/fetchList] Response:', res)
      const { success, data, total } = res as { success: boolean, data: ListItem[], total: number }
      if (success) {
        tableItems.value = data ?? []
        totalCount.value = total ?? 0
      } else {
        console.error('[useInbox/fetchList]', res.message, res.errors)
      }
    } finally {
      isLoading.value = false
    }
  }

  // 處理分頁變更
  async function handlePageChange (page: number) {
    pageOptions.value.page = page
    await fetchList()
  }

  // 處理每頁筆數變更
  async function handleItemsPerPageChange (size: number) {
    pageOptions.value.itemsPerPage = size
    pageOptions.value.page = 1 // 切換每頁筆數要回第一頁
    await fetchList()
  }

  // 跳轉到指定頁面
  async function goToPage () {
    if (!gotoPage.value) {
      return
    }
    const page = Math.max(1, Math.min(gotoPage.value, totalPages.value))
    pageOptions.value.page = page
    gotoPage.value = null
    await fetchList()
  }

  // 刪除選取的項目
  async function deleteSelected () {
    isLoading.value = true
    try {
      // console.log('[useInbox/delete] Selected items for deletion:', selectedItems.value)
      const res = await apiRequest.post('/inbox/delete', { selectedItems: selectedItems.value })
      // console.log('[useInbox/delete] Response:', res)
      const { success, message: messageText } = res as { success: boolean, message: string }
      if (success) {
        messageTitle.value = '訊息通知'
        message.value = messageText
        messageStatus.value = 'alert'
        isConfirmBtn.value = true
        messageDialog.value = true
        selectedItems.value = []
        await fetchList()
      } else {
        console.error('[useInbox/delete]', res.message, res.errors)
      }
    } finally {
      isLoading.value = false
    }
  }

  // 離開 message
  function messageClose (): void {
    messageDialog.value = false
  }

  // 確認 message
  function messageConfirm (): void {
    messageDialog.value = false
  }

  onMounted(() => {
    fetchList()
  })

  return {
    isLoading,
    // 列表及分頁相關
    tableHeaders,
    selectedItems,
    isSearching,
    tableItems,
    pageOptions,
    totalCount,
    totalPages,
    tableHeight,
    gotoPage,
    // 訊息通知相關狀態與方法
    messageDialog,
    messageWidth,
    messageTitle,
    message,
    messageStatus,
    isConfirmBtn,
    fetchList,
    goToPage,
    deleteSelected,
    handleItemsPerPageChange,
    handlePageChange,
    messageClose,
    messageConfirm,
  }
}