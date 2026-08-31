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
  secMenu?: MenuItem[]
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
    // {
    //   text: '首頁',
    //   value: 'home',
    // },
    {
      text: '申請作業',
      value: 'app',
      subMenu: [
        { text: '開狀申請書', value: 'lcApp' },
        { text: '修改申請書', value: 'amendApp' },
        { text: '押匯申請', value: 'draftApp' },
        { text: '修改信用狀接受註記', value: 'amendAccept' },
        { text: '註銷申請/切結書', value: 'cancelApp' },
        {
          text: '當日沖正交易',
          value: 'sameDayReversal',
          secMenu: [
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
          secMenu: [
            { text: '開狀申請當日調整帳務', value: 'lcAdjustment' },
            { text: '修改申請當日調整帳務', value: 'amendAdjustment' },
            { text: '註銷申請當日調整帳務', value: 'cancelAdjustment' },
            { text: '押匯申請當日調整帳務', value: 'draftAdjustment' },
          ],
        },
        { text: '傳送已轉帳狀態', value: 'sentTrfStatus' },
        { text: 'CDS 過期案件主動註銷', value: 'expiredLc' },
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
        { text: '設定客戶資料', value: 'setCustomer' },
        { text: '客戶所屬分行異動', value: 'setCustomerBranch' },
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
  BS: [
    {
      text: '申請作業',
      value: 'app',
      subMenu: [
        {
          text: '當日沖正交易',
          value: 'sameDayReversal',
          secMenu: [
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
          secMenu: [
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
