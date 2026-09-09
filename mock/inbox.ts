import type { MockMethod } from "vite-plugin-mock"
// 定義需要的標題格式
const titleTemplates = [
  "上傳修狀通知書-MT707",
  "繕製開狀通知書",
  "繕製出口結匯通知",
  "放行退回開狀申請單據及電文"
];

// 動態產生 10 筆模擬資料
let mockData = Array.from({ length: 100 }, (_, index) => {
  const id = index + 1;
  
  // 依序輪流選取標題格式
  const template = titleTemplates[index % titleTemplates.length];
  const title = `${template}`;

  // 從 2026/08/01 開始遞增天數
  const baseDate = new Date(2026, 7, 1);
  baseDate.setDate(baseDate.getDate() + index);

  // 格式化日期 (補零)
  const year = baseDate.getFullYear();
  const month = String(baseDate.getMonth() + 1).padStart(2, '0');
  const day = String(baseDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}/${month}/${day}`;

  // 控制隨機出現 null 的輔助函式 (15% 機率為 null)
  const maybeNull = <T>(value: T): T | null => (Math.random() > 0.15 ? value : null);

  // 預設所有業務欄位皆為 null
  let lcNo: string | null = null;
  let lcAmount: string | null = null;
  let noticeDate: string | null = null;
  let beneficiaryId: string | null = null;
  let draftNo: string | null = null;
  let settlementDate: string | null = null;
  let draftAmount: string | null = null;
  let applicantId: string | null = null;
  let lcNoticeNo: string | null = null;
  let applicantAmount: string | null = null;

  // 根據標題種類，動態給予對應的欄位資料
  switch (template) {
    case "上傳修狀通知書-MT707":
      lcNo = maybeNull(`20260701${String(id).padStart(3, '0')}`);
      noticeDate = maybeNull("2026/07/23");
      break;

    case "繕製開狀通知書":
      lcNo = maybeNull(`20260701${String(id).padStart(3, '0')}`);
      lcAmount = maybeNull(`USD ${Number(1234567800.00 + id).toLocaleString('en-US', { minimumFractionDigits: 2 })}`);
      noticeDate = maybeNull("2026/07/23");
      break;

    case "繕製出口結匯通知":
      beneficiaryId = maybeNull("30414175");
      lcNo = maybeNull(`20260701${String(id).padStart(3, '0')}`);
      draftNo = `1322${String(7021 + id)}`;
      settlementDate = "2024/03/07";
      draftAmount = `USD ${Number(3232201.98 + id).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
      break;

    case "放行退回開狀申請單據及電文":
      applicantId = maybeNull("30414175");
      lcNoticeNo = `2302${String('0o610' + id)}`;
      applicantAmount = `USD ${Number(230206.00 + id).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
      break;
  }

  return {
    id: id,
    title: title, // 主旨
    content: '', // 內容
    sender: "System", // 發送者
    time: `${formattedDate} 10:00:00`, // 時間
    // 業務欄位對應回傳
    lcNo, // 信用狀號碼
    lcAmount, // 信用狀金額
    noticeDate, // 通知日期
    beneficiaryId, // 受益人編號
    draftNo, // 匯票號碼
    settlementDate, // 結匯日期
    draftAmount, // 匯票金額
    applicantId, // 申請人編號
    applicantAmount, // 申請人金額
    lcNoticeNo, // 開狀通知書號碼
  };
});

export default [
  // 1. 取得列表 API
  {
    url: "/api/inbox/list",
    method: "post",
    response: ({ body }: { body: { pageIndex: number, pageSize: number } }) => {
      // 根據前端傳入的 pageIndex 與 pageSize 進行分頁切片
      const start = (body.pageIndex - 1) * body.pageSize;
      const end = start + body.pageSize;
      const pagedData = mockData.slice(start, end);

      return {
        success: true,
        data: pagedData,
        pageIndex: body.pageIndex,
        pageSize: body.pageSize,
        total: mockData.length, // 總筆數調整為 10
      }
    },
  },

  // 2. 新增的刪除 API
  {
    url: "/api/inbox/delete",
    method: "post",
    response: ({ body }: { body: { selectedItems: number[] } }) => {
      const { selectedItems } = body;
      console.log("Selected items for deletion:", selectedItems);

      if (!selectedItems || !Array.isArray(selectedItems)) {
        return {
          success: false,
          message: "參數錯誤：selectedItems 必須為陣列",
        };
      }

      // 過濾掉被選取刪除的 ID，更新全域的 mockData
      mockData = mockData.filter(item => !selectedItems.includes(item.id));

      return {
        success: true,
        message: `成功刪除 ${selectedItems.length} 筆資料`,
        deletedIds: selectedItems
      };
    }
  }
] as MockMethod[]