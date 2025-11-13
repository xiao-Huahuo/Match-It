import { computed } from 'vue'
import { useUserStore } from '@/stores/modules/user'

/**
 * 权限判断的可组合函数
 * 提供方便的权限检查方法
 */
export function usePermission() {
  const userStore = useUserStore()

  /**
   * 检查当前用户是否拥有指定的权限
   * @param permissionKey - 权限键，例如 'CLUB_CREATE', 'ACTIVITY_PUBLISH'
   * @returns boolean - 如果用户拥有该权限则返回 true，否则返回 false
   */
  const hasPermission = computed(() => (permissionKey: string): boolean => {
    if (!userStore.isLoggedIn) {
      return false
    }
    return userStore.permissions.includes(permissionKey)
  })

  /**
   * 检查当前用户是否拥有指定的角色
   * @param roleKey - 角色键，例如 'ADMIN', 'MEMBER'
   * @returns boolean - 如果用户拥有该角色则返回 true，否则返回 false
   */
  const hasRole = computed(() => (roleKey: 'USER' | 'MEMBER' | 'ADMIN'): boolean => {
    if (!userStore.isLoggedIn) {
      return false
    }
    return userStore.userInfo?.roles?.includes(roleKey) || false
  })

  return {
    hasPermission,
    hasRole,
  }
}
