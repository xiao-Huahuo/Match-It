import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// --- 基础页面 (views/ 目录下的所有文件) ---
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import MainLayout from '@/views/MainLayout.vue'

// --- 二级业务页面 ---
import HomePage from '@/views/HomePage.vue'          // 首页
import ProfilePage from '@/views/ProfilePage.vue'    // 个人中心
import ClubDetailPage from '@/views/ClubDetailPage.vue' // 社团详情
import ClubManagePage from '@/views/ClubManagePage.vue' // 社团管理
import ActivityPage from '@/views/ActivityPage.vue'  // 活动中心
// MessagePage.vue 包含消息和 LLM Chat 相关的UI
import MessagePage from '@/views/MessagePage.vue'    // 消息与通知
import AnalyticsPage from '@/views/AnalyticsPage.vue'// 数据分析
import SystemPage from '@/views/SystemPage.vue'      // 系统管理
import NotFoundPage from '@/views/NotFoundPage.vue'  // 404页面

// 定义路由
const routes: RouteRecordRaw[] = [
  // -------------------------
  // 1. 认证路由 (独立页面)
  // -------------------------
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { requiresAuth: false, title: '用户登录' }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: { requiresAuth: false, title: '用户注册' }
  },

  // -------------------------
  // 2. 主体路由 (使用 MainLayout)
  // -------------------------
  {
    path: '/main',
    name: 'MainLayout',
    component: MainLayout,
    redirect: '/main/home', // 默认重定向到首页
    meta: { requiresAuth: true }, // 所有 MainLayout 下的页面默认都需要登录
    children: [
      {
        path: 'home',
        name: 'HomePage',
        component: HomePage,
        meta: { title: '首页 / 社团广场' }
      },
      {
        path: 'profile',
        name: 'ProfilePage',
        component: ProfilePage,
        meta: { title: '个人中心' }
      },
      {
        path: 'activities',
        name: 'ActivityPage',
        component: ActivityPage,
        meta: { title: '活动中心' }
      },
      {
        path: 'messages', // 用于消息中心和 LLM Chat
        name: 'MessagePage',
        component: MessagePage,
        meta: { title: '消息中心 / 智能体' }
      },
      // 社团详情页 (动态路由)
      {
        path: 'club/:id',
        name: 'ClubDetailPage',
        component: ClubDetailPage,
        props: true,
        meta: { title: '社团详情' }
      },
      // 社团管理页 (需要 CLUB_ADMIN 权限)
      {
        path: 'club/:id/manage',
        name: 'ClubManagePage',
        component: ClubManagePage,
        props: true,
        meta: { title: '社团管理', requiredRole: 'CLUB_ADMIN' }
      },
      // 数据分析页 (需要 SUPER_ADMIN 权限)
      {
        path: 'analytics',
        name: 'AnalyticsPage',
        component: AnalyticsPage,
        meta: { title: '数据分析', requiredRole: 'SUPER_ADMIN' }
      },
      // 系统管理页 (需要 SUPER_ADMIN 权限)
      {
        path: 'system',
        name: 'SystemPage',
        component: SystemPage,
        meta: { title: '系统管理', requiredRole: 'SUPER_ADMIN' }
      },
    ],
  },

  // -------------------------
  // 3. 默认路由/404
  // -------------------------
  {
    path: '/',
    redirect: '/login', // 现在设置默认路由重定向为登录页面,之后实现用于检查登录状态的路由守卫后再重定向为主页.
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage, // 使用 NotFoundPage.vue
    meta: { requiresAuth: false, title: '页面未找到' }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes, // 引入路由
})

// TODO: 在 src/router/guards/ 中实现路由守卫来处理 meta 中的权限逻辑

export default router
