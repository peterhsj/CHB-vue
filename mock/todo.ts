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
          { id: 4, title: "受理開狀申請書", count: 3 },
          { id: 5, title: "受理到單前通知回覆", count: 2 },
          { id: 6, title: "客戶憑證確認", count: 20 },
          { id: 7, title: "受理開狀申請書", count: 3 },
          { id: 8, title: "受理到單前通知回覆", count: 2 },
          { id: 9, title: "客戶憑證確認", count: 20 },
        ],
        pageIndex: body.pageIndex,
        pageSize: body.pageSize,
        total: 3, // 總筆數
      }
    },
  },
] as MockMethod[]