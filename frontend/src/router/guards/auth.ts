import type { Router } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'

/**
 * 认证守卫
 * 检查用户是否已登录，如果未登录且访问需要认证的页面，则重定向到登录页。
 * @param router - Vue Router 实例
 */
export function createAuthGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()

    console.log(`AuthGuard: Navigating from ${from.fullPath} to ${to.fullPath}`);
    console.log(`AuthGuard: Current token: ${userStore.token ? 'exists' : 'null'}`);
    console.log(`AuthGuard: Current userInfo: ${userStore.userInfo ? 'exists' : 'null'}`);
    console.log(`AuthGuard: userStore.isLoggedIn: ${userStore.isLoggedIn}`);


    // 尝试从 localStorage 恢复 token，并获取用户信息和权限（如果尚未加载）
    if (userStore.token && !userStore.userInfo) {
      console.log('AuthGuard: Token exists but userInfo is null, attempting to fetch profile and permissions...');
      await Promise.all([userStore.fetchUserProfile(), userStore.fetchUserPermissions()])
      console.log(`AuthGuard: After fetch, userStore.isLoggedIn: ${userStore.isLoggedIn}`);
    }

    const requiresAuth = to.meta.requiresAuth !== false // 默认所有页面都需要认证，除非明确设置为 false

    if (requiresAuth && !userStore.isLoggedIn) {
      console.log(`AuthGuard: Route ${to.fullPath} requires auth, but user is not logged in. Redirecting to Login.`);
      next({ name: 'Login', query: { redirect: to.fullPath } })
    } else if (to.name === 'Login' && userStore.isLoggedIn) {
      console.log(`AuthGuard: User is logged in, but trying to access Login page. Redirecting to HomePage.`);
      next({ name: 'HomePage' })
    } else {
      console.log(`AuthGuard: Navigation allowed to ${to.fullPath}.`);
      next() // 继续导航
    }
  })
}
