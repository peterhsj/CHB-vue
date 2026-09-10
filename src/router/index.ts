
import type { RouteLocationNormalized } from 'vue-router'
import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "@/stores/auth"

// import type { Router } from "vue-router"

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/",
    component: () => import("@/layouts/MainLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/HomeView.vue"),
      },
      {
        path: "todo",
        name: "todo",
        component: () => import("@/views/TodoView.vue"),
      },
      {
        path: "inbox",
        name: "inbox",
        component: () => import("@/views/InboxView.vue"),
      },
      {
        path: "importAcceptLcApp",
        name: "importAcceptLcApp",
        component: () => import("@/views/ImportAcceptLcAppView.vue"),
      },
      {
        path: "importAcceptAmendApp",
        name: "importAcceptAmendApp",
        component: () => import("@/views/ImportAcceptAmendAppView.vue"),
      },
      {
        path: "importAcceptCancelApp",
        name: "importAcceptCancelApp",
        component: () => import("@/views/ImportAcceptCancelAppView.vue"),
      }
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
]

// 只在開發模式啟用：攔截 guard 註冊，找出仍使用 (to, from, next) 的來源
// function enableGuardDebug(router: Router) {
//   if (!import.meta.env.DEV) return

//   type GuardRegistrar = (...args: unknown[]) => unknown

//   const patchRegistrar = (name: "beforeEach" | "beforeResolve" | "beforeEnterLike", original: GuardRegistrar) => {
//     return function patched(this: unknown, ...args: unknown[]) {
//       const guard = args[0]

//       if (typeof guard === "function") {
//         // 參數長度 >= 3 通常就是舊寫法：(to, from, next)
//         const usesNextStyle = guard.length >= 3

//         if (usesNextStyle) {
//           const stack = new Error(`[router-guard-debug] ${name} registered legacy next()-style guard`).stack
//           console.groupCollapsed(`[router-guard-debug] ${name}: legacy guard detected`)
//           console.warn("guard.length =", guard.length)
//           console.warn("guard preview =", String(guard).slice(0, 240))
//           console.warn("register stack =", stack)
//           console.groupEnd()
//         }
//       }

//       return original.apply(this, args)
//     }
//   }

//   // patch global guards
//   router.beforeEach = patchRegistrar("beforeEach", router.beforeEach as unknown as GuardRegistrar) as Router["beforeEach"]
//   router.beforeResolve = patchRegistrar("beforeResolve", router.beforeResolve as unknown as GuardRegistrar) as Router["beforeResolve"]

//   // patch 每個 route record 的 beforeEnter（可選，但很實用）
//   router.getRoutes().forEach((record) => {
//     const be = record.beforeEnter
//     if (!be) return

//     const guardList = Array.isArray(be) ? be : [be]
//     guardList.forEach((g) => {
//       if (typeof g === "function" && g.length >= 3) {
//         console.groupCollapsed(`[router-guard-debug] route.beforeEnter: legacy guard detected`)
//         console.warn("route =", record.path)
//         console.warn("guard.length =", g.length)
//         console.warn("guard preview =", String(g).slice(0, 240))
//         console.warn("register stack =", new Error().stack)
//         console.groupEnd()
//       }
//     })
//   })
// }

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// enableGuardDebug(router)

// 路由守衛：未登入導向登入頁
router.beforeEach((to: RouteLocationNormalized) => {
  const auth = useAuthStore()  
  auth.hydrateAuthFromStorage()

  const requiresAuth = to.matched.some(r => r.meta.requiresAuth === true)

  if (requiresAuth && !auth.isAuthenticated) {
    return "/login"
  }
  if (to.path === "/login" && auth.isAuthenticated) {
    return "/"
  }
  return true
})

export default router