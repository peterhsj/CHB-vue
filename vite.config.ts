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
  }
})
