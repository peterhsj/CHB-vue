import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

import vuetify, { transformAssetUrls } from "vite-plugin-vuetify"
import { viteMockServe } from "vite-plugin-mock"
import path from "node:path"

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue({ template: { transformAssetUrls } }),
      vuetify({ autoImport: true }),
      viteMockServe({
        mockPath: "mock",
        enable: mode === "development",
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "src"),
      },
    },    
    server: {
      // Aspire 編排時會以 PORT 環境變數指派埠；獨立 pnpm dev 時 PORT 不存在，
      // 則回退 Vite 預設 5173。strictPort 確保 Aspire 端點對得上（埠被占用就報錯而非跳號）。
      port: process.env.PORT ? Number(process.env.PORT) : 5173,
      strictPort: !!process.env.PORT,
      // warmup: {
      //   clientFiles: ['./src/assets/scss/custom.scss'], // 在服務器啟動時預加載 SCSS，避免首次 404
      // },
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          secure: false, // https 自簽章時常用
          // rewrite: (path) => path.replace(/^\/api/, ''), // 後端若不含 /api 前綴就打開
        },
      }
    },
  }
})
