import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
// useMenu 是從 menu 設定檔引入
import { useMenu, type MenuItem } from '@/composables/useMenu'

// 定義麵包屑的型別
export interface BreadcrumbItem {
  title: string
  disabled: boolean
  href?: string
}

export function useBreadcrumbs() {
  const route = useRoute()
  const { authType } = useAuthStore()  

  /**
   * 深度優先搜尋 (DFS)：尋找目標 value 並沿路收集父節點的 text
   */
  const findMenuPath = (
    menuList: MenuItem[], 
    targetValue: string, 
    ancestors: BreadcrumbItem[] = []
  ): BreadcrumbItem[] | null => {
    
    for (const item of menuList) {
      // 建立當前節點的麵包屑物件
      const currentNode: BreadcrumbItem = {
        title: item.text,
        disabled: true // 預設中間節點不可點擊
      }

      // 展開目前的點擊路徑
      const currentPath = [...ancestors, currentNode]

      // 找到了目標頁面，直接回傳整條完整路徑
      if (item.value === targetValue) {
        return currentPath
      }

      // 如果有子選單，繼續往深處找
      if (item.subMenu && item.subMenu.length > 0) {
        const result = findMenuPath(item.subMenu, targetValue, currentPath)
        if (result) return result // 只要在子孫節點找到了，就一路回傳上去
      }
    }

    return null // 這條路徑沒找到
  }

  // 封裝成響應式的麵包屑陣列
  const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
    // 透過 route.path 取得當前路由的 value (去掉前面的 '/')
    const currentPathValue = route.path.slice(1) 
    
    // 取得當前權限對應的整棵菜單樹
    const { currentMenu } = useMenu(authType)

    // 執行遞迴搜尋，取得動態路徑
    const dynamicItems = findMenuPath(currentMenu.value as MenuItem[], currentPathValue)

    // 防呆處理：如果找不到（例如真的在首頁，或是路由在 menu 裡不存在）
    if (!dynamicItems) {
      return [{ title: '首頁', disabled: false, href: '/' }]
    }

    // 處理特殊節點的 href 與啟用狀態
    // 1. 如果第一項不是「首頁」，我們手動在最前面補上「首頁」，維持體驗
    if (dynamicItems[0]?.title !== '首頁') {
      dynamicItems.unshift({ title: '首頁', disabled: false, href: '/' })
    } else {
      // 如果第一項本來就是首頁，把它改成可點擊並加上首頁連結
      dynamicItems[0].disabled = false
      dynamicItems[0].href = '/'
    }

    // 2. 讓最後一項（當前頁面）帶有當前的真實網址（可加可不加，依 UI 需求）
    if (dynamicItems.length > 0) {
      dynamicItems[dynamicItems.length - 1].href = route.path
    }

    return dynamicItems
  })

  return {
    breadcrumbItems
  }
}