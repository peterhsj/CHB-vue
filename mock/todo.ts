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
          { id: 2, title: "受理到單事前通知回覆", count: 2 },
        ],
        pageIndex: body.pageIndex,
        pageSize: body.pageSize,
        total: 2, // 總筆數
      }
    },
  },
] as MockMethod[]