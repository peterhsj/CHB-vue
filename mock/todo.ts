import type { MockMethod } from "vite-plugin-mock"
export default [
  {
    url: "/api/todo/list",
    method: "post",
    response: ({ body }: { body: { pageIndex: number,
        pageSize: number } }) => {
      return {
        success: true,
        data: [
          { id: 1, title: "受理開狀申請書", count: 3 },
          { id: 2, title: "受理到單前通知回覆", count: 2 },
          { id: 3, title: "客戶憑證確認", count: 20 },
          { id: 4, title: "繕製開狀申請單據", count: 3 },
          { id: 5, title: "繕製修狀申請單據", count: 2 },
          { id: 6, title: "繕製註銷申請單據", count: 20 },
          { id: 7, title: "繕製到單事前通知(主管退回)", count: 3 },
          { id: 8, title: "繕製到單通知書", count: 2 },
          { id: 9, title: "上傳開狀ACK電文", count: 20 },
          { id: 10, title: "上傳修狀ACK電文", count: 20 },
          { id: 11, title: "放行開狀申請單據", count: 20 },
          { id: 12, title: "放行修狀申請單據", count: 20 },
          { id: 13, title: "放行到單事前通知", count: 20 },
          { id: 14, title: "放行到單通知書", count: 20 },
          { id: 15, title: "重新編輯開狀通知書單據", count: 20 },
          { id: 16, title: "重新編輯修狀通知書單據", count: 20 },
          { id: 17, title: "重新編輯餘額註銷通知書單據", count: 20 },
          { id: 18, title: "重新編輯出口結匯單據", count: 20 },
          { id: 19, title: "重新編輯押匯瑕疵說明", count: 20 },
          { id: 20, title: "重新編輯出口押匯銷帳單據", count: 20 },
          { id: 21, title: "放行餘額註銷通知書", count: 20 },
          { id: 22, title: "放行修狀通知書", count: 20 },
          { id: 23, title: "放行出口結匯單據", count: 20 },
          { id: 24, title: "放行押匯瑕疵/拒付說明", count: 20 },
          { id: 25, title: "放行出口押匯銷帳單據", count: 20 },
          { id: 26, title: "重新傳送單據/電文", count: 20 },
        ],
        pageIndex: body.pageIndex,
        pageSize: body.pageSize,
        total: 26, // 總筆數
      }
    },
  },
] as MockMethod[]