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
            { text: '重新傳送單據/電文', value: 'importResendDocument' },
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
          text: '系統管理作業',
          value: 'importSystem',
          subMenu: [
            { text: '角色權限維護', value: 'importRolePermission' },
            { text: '個人資料維護', value: 'importPersonalData' },
            { text: '企業資料維護', value: 'importCorporateData' },
            { text: '分行資料維護', value: 'importBranchData' },
            { text: '系統參數維護', value: 'importSystemParameters' },
            { text: '退件原因維護', value: 'importReturnReason' },
            { text: '使用者存取記錄', value: 'importUserAccessLog' },
            { text: '目前線上人數', value: 'importCurrentOnlineUsers' },
            { text: '帳號管理', value: 'importAccountManagement' },
          ],
        },
      ],
    },
    {
      text: '出口業務',
      value: 'export',
      subMenu: [
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
          text: '系統管理作業',
          value: 'exportSystem',
          subMenu: [
            { text: '角色權限維護', value: 'exportRolePermission' },
            { text: '個人資料維護', value: 'exportPersonalData' },
            { text: '企業資料維護', value: 'exportCorporateData' },
            { text: '分行資料維護', value: 'exportBranchData' },
            { text: '系統參數維護', value: 'exportSystemParameters' },
            { text: '使用者存取記錄', value: 'exportUserAccessLog' },
            { text: '目前線上人數', value: 'exportCurrentOnlineUsers' },
            { text: '帳號管理', value: 'exportAccountManagement' },
            { text: '重新傳送單據/電文', value: 'exportResendDocuments' },
            { text: '刪除出口單據', value: 'exportDeleteDocuments' },
          ],
        },
      ],
    },
  ],
  BS: [
    {
      text: '申請作業',
      value: 'app',
      subMenu: [
        {
          text: '當日沖正交易',
          value: 'sameDayReversal',
          subMenu: [
            { text: '開狀沖正(EC)', value: 'amendLcApp' },
            { text: '修狀沖正(EC)', value: 'currentAmendApp' },
            { text: '註銷信用狀沖正(EC)', value: 'currentCancelApp' },
            { text: '押匯沖正(EC)', value: 'currentAmendDraftApp' },
            { text: '利率約定改貸沖正(EC)', value: 'loanTermModification' },
            { text: '補收開狀手續費沖正(EC)', value: 'chargeAmendLc' },
          ],
        },
        {
          text: '當日調整帳務',
          value: 'sameDayAdjustment',
          subMenu: [
            { text: '開狀申請當日調整帳務', value: 'lcAdjustment' },
            { text: '修改申請當日調整帳務', value: 'amendAdjustment' },
            { text: '註銷申請當日調整帳務', value: 'cancelAdjustment' },
            { text: '押匯申請當日調整帳務', value: 'draftAdjustment' },
          ],
        },
        { text: 'CDS平台-過期信用狀主動註銷', value: 'expiredLc' },
      ],
    },
    {
      text: '編審作業',
      value: 'review',
      subMenu: [
        { text: '開狀申請書', value: 'reviewLcApp' },
        { text: '修改申請書', value: 'reviewAmendApp' },
        { text: '註銷申請/切結書', value: 'reviewCancelApp' },
        { text: '押匯申請', value: 'reviewDraftApp' },
        { text: '利率約定(改貸)', value: 'reviewInterestRate' },
      ],
    },
    {
      text: '查詢作業',
      value: 'query',
      subMenu: [
        { text: '開狀申請書', value: 'queryLcApp' },
        { text: '修改申請書', value: 'queryAmendApp' },
        { text: '修改通知書', value: 'queryAmendNotice' },
        { text: '註銷申請/切結書', value: 'queryCancelApp' },
        { text: '信用狀', value: 'queryLc' },
        { text: '押匯申請', value: 'queryDraft' },
        { text: '主管核准開狀紀錄', value: 'queryMarLc' },
        { text: '主管核准押匯紀錄', value: 'queryMarDraft' },
        { text: '未結案信用狀額度與保證金', value: 'queryOutstandLc' },
        { text: '利率約定 (改貸)', value: 'queryInterestRate' },
        { text: '主管審核異常', value: 'querySar' },
        { text: '會計帳務分錄', value: 'queryAccount' },
      ],
    },
    {
      text: '電子押匯提示作業',
      value: 'prompt',
      subMenu: [
        { text: '押匯提示', value: 'promptDraft' },
        { text: '重新提示', value: 'rePromptDraft' },
        { text: '網銀押匯提示', value: 'webPromptDraft' },
      ],
    },
    {
      text: '補收開狀手續費作業',
      value: 'amend',
      subMenu: [
        { text: '補收開狀手續費', value: 'chargeLc' },
      ],
    },
    {
      text: '客戶管理作業',
      value: 'customer',
      subMenu: [
        { text: '設定客戶群組', value: 'setGroup' },
        // { text: '受益人資料', value: 'setBeneficiary' },
        { text: '受益人資料', value: 'managerBeneficiary' },
      ],
    },
    {
      text: '會員管理作業',
      value: 'member',
      subMenu: [
        { text: '個人設定', value: 'managerPersonal' },
      ],
    },
  ],
  SM: [
    {
      text: '查詢作業',
      value: 'query',
      subMenu: [
        { text: '存取記錄', value: 'queryAccessLog' },
      ],
    },
    {
      text: '電子押匯提示作業',
      value: 'prompt',
      subMenu: [
        { text: '押匯拒絕原因維護', value: 'draftRejection' },
      ],
    },
    {
      text: '會員管理作業',
      value: 'member',
      subMenu: [
        { text: '分行管理', value: 'managerBranch' },
        { text: '會員管理', value: 'managerMember' },
        { text: '個人設定', value: 'managerPersonal' },
      ],
    },
  ],
  MB: [
    {
      text: '申請作業',
      value: 'app',
      subMenu: [
        { text: '台塑押匯補登資料匯入', value: 'fpcCadSdi' },
      ],
    },
    {
      text: '查詢作業',
      value: 'query',
      subMenu: [
        { text: '開狀申請書', value: 'queryLcApp' },
        { text: '修改申請書', value: 'queryAmendApp' },
        { text: '修改通知書', value: 'queryAmendNotice' },
        { text: '註銷申請/切結書', value: 'queryCancelApp' },
        { text: '信用狀', value: 'queryLc' },
        { text: '押匯申請', value: 'queryDraft' },
        { text: '主管核准開狀紀錄', value: 'queryMarLc' },
        { text: '主管核准押匯紀錄', value: 'queryMarDraft' },
        { text: '未結案信用狀額度與保證金', value: 'queryOutstandLc' },
        { text: '分行信用狀暨押匯筆數金額', value: 'queryBlcAmount' },
        { text: '利率約定 (改貸)', value: 'queryInterestRate' },
        { text: '會計帳務分錄', value: 'queryAccount' },
        { text: '存取記錄', value: 'queryAccessLog' },
        { text: '國內信用狀押匯手續費優待明細表', value: 'queryNegotiationFee' },
        { text: '受益人分行信用狀暨押匯筆數金額', value: 'queryBeneficiaryBlcAmount' },
        { text: 'Client連線狀態', value: 'queryClientConnect' },
        { text: '國內信用狀開狀手續費', value: 'queryDomesticLcFee' },
        { text: '信用狀手續費明細表', value: 'queryLcFeeDetail' },
        { text: '台塑網通訊傳輸排程檢視', value: 'queryFpcCtsv' },
        { text: '台塑信用狀統計表', value: 'queryFpcLcRpt' },
      ],
    },
    {
      text: '客戶管理作業',
      value: 'customer',
      subMenu: [
        { text: '台塑受益人事業部建檔匯入', value: 'fpcBenBuImp' },
      ],
    },
    {
      text: '會員管理作業',
      value: 'member',
      subMenu: [
        { text: '個人設定', value: 'managerPersonal' },
        { text: '受益人資料維護', value: 'managerBeneficiary' },
      ],
    },
    {
      text: '特別指示條款設定作業',
      value: 'specialInstruction',
      subMenu: [
        { text: '設定客戶特別指示條款', value: 'settingSi' },
      ],
    },
  ],
  BM: [
    {
      text: '會員管理作業',
      value: 'member',
      subMenu: [
        { text: '會員管理', value: 'managerMember' },
        { text: '個人設定', value: 'managerPersonal' },
      ],
    },
  ],
}

// 預設使用 BH 選單（登入後依角色切換）
// export const menu = menuByRole.BM
export function useMenu (authType: AuthType) {
  const currentMenu = computed<MenuItem[]>(() => accordionMenu[authType] ?? [])
  const showTodoList = computed(() => authType !== 'SM' && authType !== 'MB' && authType !== 'BM')
  const showInfo = computed(() => authType !== 'MB' && authType !== 'BM')

  return { currentMenu, showTodoList, showInfo }
}
