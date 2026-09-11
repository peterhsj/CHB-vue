/**
 * HNB16 國內信用狀系統 - 側邊選單設定
 * 角色代碼: BH=經辦, BS=主管, SM=系統管理員, MB=總行, BM=分行管理員
 */
import { computed } from 'vue'

// 選單路徑結果
export interface MenuPathResult {
  mainMenu: string | null
  subMenu: string | null
}

export interface MenuItem {
  text: string
  value: string
  subMenu?: MenuItem[]
}

export type AuthType = 'BH' | 'BS' | 'SM' | 'MB' | 'BM'
export const authTypeLabels: Record<AuthType, string> = {
  BH: '經辦',
  BS: '主管',
  SM: '系統管理員',
  MB: '總行',
  BM: '分行管理員',
}

// 各角色對應選單
const accordionMenu: Record<AuthType, MenuItem[]> = {
  BH: [
    { text: '首頁', value: 'home' },
    {
      text: '進口業務',
      value: 'import',
      subMenu: [
        {
          text: '受理作業',
          value: 'importAccept',
          subMenu: [
            { text: '受理開狀申請書', value: 'importAcceptLcApp' },
            { text: '受理修狀申請書', value: 'importAcceptAmendApp' },
            { text: '受理註銷申請書', value: 'importAcceptCancelApp' },
            { text: '受理到單前通知回覆', value: 'importAcceptPreNotice' },
            { text: '客戶憑證確認', value: 'importAcceptCustomerProof' },
          ],
        },
        {
          text: '下載XML作業',
          value: 'importDownload',
          subMenu: [
            { text: '下載開狀申請書', value: 'importDownloadLcApp' },
            { text: '下載修狀申請書', value: 'importDownloadAmendApp' },
            { text: '下載註銷申請書', value: 'importDownloadCancelApp' },
          ],
        },
        {
          text: '繕製作業',
          value: 'importReproduce',
          subMenu: [
            { text: '繕製/上傳單據', value: 'importReproduceUpload' },
            { text: '上傳ACK電文', value: 'importUploadAck' },
            { text: '受理後退件', value: 'importAfterAcceptanceReturn' },
          ],
        },
        {
          text: '放行作業',
          value: 'importRelease',
          subMenu: [
            { text: '放行開狀申請單據', value: 'importReleaseLcApp' },
            { text: '放行修狀申請單據', value: 'importReleaseAmendApp' },
            { text: '放行註銷申請單據', value: 'importReleaseCancelApp' },
            { text: '放行到單前通知', value: 'importReleasePreNotice' },
            { text: '放行到單通知書', value: 'importReleaseNotice' },
            // { text: '重新傳送單據/電文', value: 'importResendDocument' },
          ],
        },
        {
          text: '查詢作業',
          value: 'importQuery',
          subMenu: [
            { text: '查詢開狀申請書', value: 'importQueryLcApp' },
            { text: '查詢信用狀', value: 'importQueryLc' },
            { text: '查詢修狀申請書', value: 'importQueryAmendApp' },
            { text: '查詢到單通知書', value: 'importQueryNotice' },
            { text: '查詢註銷申請書', value: 'importQueryCancelApp' },
          ],
        },
        {
          text: '管理報表作業',
          value: 'importReport',
          subMenu: [
            { text: '信用狀統計報表', value: 'importLcStatisticsReport' },
            { text: '信用狀到單統計表', value: 'importLcArrivalStatisticsReport' },
          ],
        },
        {
          text: '資料維護作業',
          value: 'importCommonDataMaintenance',
          subMenu: [
            { text: '退件原因維護', value: 'importReturnReason' },
          ],
        },
      ],
    },
    {
      text: '出口業務',
      value: 'export',
      subMenu: [
        {
          text: '受理作業',
          value: 'exportAccept',
          subMenu: [
            { text: '客戶憑證確認', value: 'exportAcceptCustomerProof' },
          ],
        },
        {
          text: '繕製作業',
          value: 'exportReproduce',
          subMenu: [
            { text: '繕製/上傳出口單據', value: 'exportReproduceDocuments' },
            { text: '重新編輯出口單據', value: 'exportReeditDocuments' },
          ],
        },
        {
          text: '放行作業',
          value: 'exportRelease',
          subMenu: [
            { text: '放行開狀通知書', value: 'exportReleaseLcNotice' },
            { text: '放行修狀通知書', value: 'exportReleaseAmendNotice' },
            { text: '放行餘額註銷通知書', value: 'exportReleaseCancelNotice' },
            { text: '放行出口結匯單據', value: 'exportReleaseSettlement' },
            { text: '放行押匯瑕疵/拒付說明', value: 'exportReleaseDraftDefect' },
            { text: '放行出口押匯銷帳單據', value: 'exportReleaseDraftSettlement' },
          ],
        },
        {
          text: '查詢作業',
          value: 'exportQuery',
          subMenu: [
            { text: '查詢開狀通知書', value: 'exportQueryLcNotice' },
            { text: '查詢信用狀', value: 'exportQueryLc' },
            { text: '查詢修狀通知書', value: 'exportQueryAmendNotice' },
            { text: '查詢出口押匯帳務資料', value: 'exportQueryDraft' },
            { text: '查詢餘額註銷通知書', value: 'exportQueryCancelNotice' },
            { text: '查詢出口結匯匯票資料', value: 'exportQuerySettlementBill' },
          ],
        },
        {
          text: '管理報表作業',
          value: 'exportReport',
          subMenu: [
            { text: '開狀通知統計報表', value: 'exportLcNoticeStatisticsReport' },
            { text: '出口結匯統計報表', value: 'exportSettlementStatisticsReport' },
          ],
        },
        {
          text: '資料維護作業',
          value: 'importCommonDataMaintenance',
          subMenu: [
            { text: '退件原因維護', value: 'importReturnReason' },
          ],
        },
      ],
    },    
    {
      text: '管理業務',
      value: 'management',
      subMenu: [
        {
          text: '系統管理作業',
          value: 'system',
          subMenu: [
            { text: '角色權限維護', value: 'rolePermission' },
            { text: '帳號維護', value: 'accountMaintenance' },
            { text: '個人資料維護', value: 'personalData' },
            { text: '企業資料維護', value: 'corporateData' },
            { text: '分行資料維護', value: 'branchData' },
            { text: '系統參數維護', value: 'systemParameters' },
          ],
        },
        { text: '使用者存取記錄', value: 'userAccessLog' },
        { text: '目前線上人數', value: 'currentOnlineUsers' },
        { text: '重新傳送單據/電文', value: 'resendDocuments' },
        { text: '刪除出口單據', value: 'deleteDocuments' },
      ],
    },
  ],
  BS: [
    
  ],
  SM: [
    
  ],
  MB: [
    
  ],
  BM: [
    
  ],
}

// 預設使用 BH 選單（登入後依角色切換）
// export const menu = menuByRole.BM
export function useMenu (authType: AuthType) {
  const currentMenu = computed<MenuItem[]>(() => accordionMenu[authType] ?? [])
  const showTodoList = computed(() => authType !== 'SM' && authType !== 'MB' && authType !== 'BM')
  const showInfo = computed(() => authType !== 'MB' && authType !== 'BM')

  // 根據選單項的標題取得對應的路徑值
  function getPathByTitle(title: string): string | undefined {
    const visited = new Set(); // 每次全新查詢時，建立一個獨立的安全鎖
    
    // 內層遞迴函數：真正執行尋找邏輯
    function search(list: MenuItem[]): string | null {
      if (!list || !Array.isArray(list)) return null;

      for (const item of list) {
        // 💡 安全鎖：防止 menuData 的子項目在響應式系統中產生循環引用
        if (visited.has(item)) {
          console.warn('[安全攔截] 偵測到重複引用的物件，已自動跳過，避免死循環。', item);
          continue;
        }
        visited.add(item); // 標記已處理

        // 1. 比對標題
        if (item.text === title) {
          return item.value;
        }

        // 2. 遞迴子選單
        if (item.subMenu && item.subMenu.length > 0) {
          const foundValue = search(item.subMenu); // 呼叫內層自己
          if (foundValue) return foundValue;
        }
      }
      return null;
    }

    // 啟動查詢：直接把現成的 menuData 帶入內層函數
    return search(currentMenu.value) ?? undefined;
  }

  return { currentMenu, showTodoList, showInfo, getPathByTitle }
}
