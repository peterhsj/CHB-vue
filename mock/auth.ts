import type { MockMethod } from "vite-plugin-mock"

export default [
  {
    url: "/api/auth/login",
    method: "post",
    response: ({ body }: { body: { userId?: string; password?: string } }) => {
      if (body?.userId === "admin" && body?.password === "123456") {
        return {
          success: true,
          data: {
            token: "mock-token-001",
            userName: "王小明",
            expiresAt: "2024-12-31T23:59:59Z",
            authType: "BH",
            user_branches: ["001", "002"]
          },
        }
      }
      return {
        success: false,
        message: "帳號或密碼錯誤",
      }
    },
  },
] as MockMethod[]