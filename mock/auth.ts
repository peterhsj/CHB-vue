import type { MockMethod } from "vite-plugin-mock"

export default [
  {
    url: "/api/login",
    method: "post",
    response: ({ body }: { body: { account?: string; password?: string } }) => {
      if (body?.account === "admin" && body?.password === "123456") {
        return {
          code: 0,
          token: "mock-token-001",
          userName: "王小明",
        }
      }
      return {
        code: 1,
        message: "帳號或密碼錯誤",
      }
    },
  },
] as MockMethod[]