import type { PageOptions } from '@/types/common'
import { apiRequest } from "@/api/api-service"
import { computed, onMounted, ref } from "vue"

interface ListItem {
  id: number
  title: string
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

      const res = await apiRequest.post<ListItem[]>('/todo/list', payload)
      const { success, data, total } = res
      if (success) {
        tableItems.value = data ?? []
        totalCount.value = total ?? 0
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