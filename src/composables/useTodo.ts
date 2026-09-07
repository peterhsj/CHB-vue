import type { PageOptions } from '@/types/common'
import { apiRequest } from "@/api/api-service"
import { computed, onMounted, ref } from "vue"
import { useAuthStore } from '@/stores/auth'
import { useMenu } from '@/composables/useMenu'

const { authType } = useAuthStore()  

interface ListItem {
  id: number
  title: string
  path?: string
  count: number
}

export function useTodo() {
  const loading = ref(false)

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

  // 搜尋處理
  async function fetchList () {
    loading.value = true
    try {
      const { page, itemsPerPage } = pageOptions.value
      const payload = {
        pageIndex: page,
        pageSize: itemsPerPage,
      }

      const res = await apiRequest.post('/todo/list', payload)
      const { success, data, total } = res as { success: boolean, data: ListItem[], total: number }
      if (success) {
        // 從 data.title 比對 useMenu 中的菜單項並找出對應的value值轉換成path
        const { getPathByTitle } = useMenu(authType)
        const updatedData = data.map(item => {
          const newItem = { ...item } 
          const path = getPathByTitle(newItem.title)
          console.log('[useTodo/fetchList] Mapping path:', path)
          if (path) {
            newItem.path = path
          }
          return newItem
        })

        tableItems.value = updatedData ?? []
        totalCount.value = total ?? 0
        console.log('[useTodo/fetchList]', tableItems.value)
      } else {
        console.error('[useQueryAmendApp/searchHandler]', res.message, res.errors)
      }
    } finally {
      loading.value = false
    }
  }

  async function goToPage () {
    if (!gotoPage.value) {
      return
    }
    const page = Math.max(1, Math.min(gotoPage.value, totalPages.value))
    pageOptions.value.page = page
    gotoPage.value = null
    await fetchList()
  }

  onMounted(() => {
    fetchList()
  })

  return {
    loading,
    tableItems,
    pageOptions,
    totalCount,
    totalPages,
    gotoPage,
    fetchList,
    goToPage,
  }
}