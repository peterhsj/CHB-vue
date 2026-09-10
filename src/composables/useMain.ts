import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { apiRequest } from "@/api/api-service"
import { useRoute, useRouter } from "vue-router"
import { useMenu } from '@/composables/useMenu'
import type { MenuItem, MenuPathResult } from '@/composables/useMenu'
import { useAuthStore } from "@/stores/auth"
import { useDisplay } from 'vuetify'



export function mainLayout() {
  const isLoading = ref(false)
  const router = useRouter()
  const route = useRoute()
  const auth = useAuthStore()
  const { mdAndUp } = useDisplay()
  const _drawerOverride = ref<boolean | null>(null)
  const drawer = computed({
    get: () => _drawerOverride.value ?? mdAndUp.value,
    set: (value: boolean) => { _drawerOverride.value = value },
  })  
  
  const { currentMenu } = useMenu(auth.authType)
  // const currentMenu = ref<MenuItem[] | null>(null)
  const open = ref<string[]>([]) // 展開的選單項目值列表
  const currentItem = ref<string | null>(null) // 當前選項
  const mainMenu = ref<string | null>(null) // 第一層選單
  const currentSecMenu = ref<string | null>(null) // 第二層選單
  
  // 取得後端回傳的選單資料 localhost:5143/me/menus
  async function fetchMenuData() {
    // 這裡可以使用 fetch 或 axios 向後端請求選單資料
    // 例如: fetch('http://localhost:5143/me/menus').then(res => res.json()).then(data => { ... })
    isLoading.value = true
    try {
      const res = await apiRequest.get('/me/menus')
      console.log('[fetchMenuData] Response:', res)
      const { success, data } = res as { success: boolean, data: MenuItem[],}
      if (success) {        
          console.log('[fetchMenuData]', data)
          currentMenu.value = data
        } else {
          console.error('[useQueryAmendApp/searchHandler]', res.message, res.errors)
        }
      } finally {
        isLoading.value = false
      }
  }
  
  onMounted(() => {
    // fetchMenuData()
  })
  
  // 登出
  function onLogout() {
    auth.logout()
    router.push("/login")
  }
  
  // 選單項目選擇處理函式
  const toRoutePath = (pathName: string) => (pathName === 'home' ? '/' : pathName)
  
  function selectedHandler (value: string): void {
    // nextTick(() => {
      const opened = open.value
      const depth = opened.length
  
      if (depth === 0) {
        mainMenu.value = value
      } else if (depth === 1) {
        mainMenu.value = opened[0] ?? null
      } else {
        mainMenu.value = opened[1] ?? null
        currentSecMenu.value = opened[0] ?? null
      }
      currentItem.value = value
      router.push(toRoutePath(value))
    // })
  }
  
  // 根據選單項目值尋找對應的主選單和子選單
  function findMenuPath (
    targetValue: string,
    menuItems: MenuItem[] = currentMenu.value ?? [],
  ): MenuPathResult | null {
    for (const main of menuItems) {
      if (main.value === targetValue) {
        return {
          mainMenu: main.value,
          subMenu: null,
        }
      }
      
      for (const sub of main.subMenu ?? []) {
        if (sub.value === targetValue) {
          return {
            mainMenu: main.value,
            subMenu: null,
          }
        }
        
        for (const leaf of sub.subMenu ?? []) {
          if (leaf.value === targetValue) {
            return {
              mainMenu: main.value,
              subMenu: sub.value,
            }
          }
        }
      }    
    }
    return null
  }
  
  /**
   * 初始化選單狀態
   * 主選單: foundPath.mainMenu,
   * 子選單: foundPath.subMenu,
   * 依目前 route 還原選單: pathValue,
   */
  function pathToMenuValue (path: string): string {
    return path === 'home' ? '/' : path.replace(/^\//, '')
  }
  
  function initMenuState (): void {
    const pathValue = pathToMenuValue(route.path)
    const foundPath = findMenuPath(pathValue)
  
    currentItem.value = pathValue === '' ? 'home' : pathValue
    mainMenu.value = foundPath?.mainMenu ?? pathValue
    currentSecMenu.value = foundPath?.subMenu ?? ''
  
    open.value = pathValue === 'home'
    ? []
    : [foundPath?.subMenu, foundPath?.mainMenu].filter(
        (key): key is string => Boolean(key),
      )
  }
  
  watch(
    () => router.currentRoute.value.path,
    () => {
      initMenuState()
    },
    { immediate: true })

  return {
    auth,
    currentMenu,
    mdAndUp,
    currentItem,
    drawer,
    open,
    onLogout,
    selectedHandler,
  }

}
