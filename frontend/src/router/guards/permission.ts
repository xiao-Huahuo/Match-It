import type { Router } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'

/**
 * 权限守卫
 * 根据路由 meta 中的 requiredRole 或 requiredPermission 检查用户权限。
 * @param router - Vue Router 实例
 */
export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()

    console.log(`PermissionGuard: Navigating to ${to.fullPath}`);
    console.log(`PermissionGuard: userStore.isLoggedIn: ${userStore.isLoggedIn}`);
    console.log(`PermissionGuard: Current userInfo: ${userStore.userInfo ? 'exists' : 'null'}`);
    console.log(`PermissionGuard: Current permissions: ${userStore.permissions.length > 0 ? 'exists' : 'empty'}`);


    // 确保用户信息和权限已加载
    if (userStore.isLoggedIn && (!userStore.userInfo || userStore.permissions.length === 0)) {
      console.log('PermissionGuard: User is logged in, but userInfo or permissions are missing. Attempting to fetch...');
      await Promise.all([userStore.fetchUserProfile(), userStore.fetchUserPermissions()])
      console.log(`PermissionGuard: After fetch, userStore.isLoggedIn: ${userStore.isLoggedIn}`);
    }

    const requiredRole = to.meta.requiredRole as string | undefined
    const requiredPermission = to.meta.requiredPermission as string | undefined

    if (requiredRole) {
      console.log(`PermissionGuard: Route ${to.fullPath} requires role: ${requiredRole}`);
      if (userStore.isLoggedIn && !userStore.hasRole(requiredRole)) {
        console.warn(`PermissionGuard: Access denied: User does not have required role ${requiredRole}. Redirecting to HomePage.`);
        next({ name: 'HomePage' }) // 或者一个专门的无权限页面
        return;
      }
    }

    if (requiredPermission) {
      console.log(`PermissionGuard: Route ${to.fullPath} requires permission: ${requiredPermission}`);
      if (userStore.isLoggedIn && !userStore.hasPermission(requiredPermission)) {
        console.warn(`PermissionGuard: Access denied: User does not have required permission ${requiredPermission}. Redirecting to HomePage.`);
        next({ name: 'HomePage' }) // 或者一个专门的无权限页面
        return;
      }
    }

    console.log(`PermissionGuard: Navigation allowed to ${to.fullPath}.`);
    next() // 继续导航
  })
}
