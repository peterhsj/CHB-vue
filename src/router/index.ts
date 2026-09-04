
import type { RouteLocationNormalized } from 'vue-router'
import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "@/stores/auth"

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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 路由守衛：未登入導向登入頁
router.beforeEach((to: RouteLocationNormalized) => {
  const auth = useAuthStore()  
  auth.hydrateAuthFromStorage()

  const requiresAuth = to.matched.some(r => r.meta.requiresAuth === true)

  if (requiresAuth && !auth.isAuthenticated) return "/login"
  if (to.path === "/login" && auth.isAuthenticated) return "/"
  return true
})

export default router