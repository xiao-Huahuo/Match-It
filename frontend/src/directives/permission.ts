import type { App, DirectiveBinding } from 'vue'
import { useUserStore } from '@/stores/modules/user'

/**
 * 权限指令 v-permission
 * 根据用户权限控制元素的显示与隐藏
 *认证守卫
 * 用法:
 * - v-permission="'PERMISSION_KEY'"
 * - v-permission="['PERMISSION_KEY_1', 'PERMISSION_KEY_2']" (表示需要其中任意一个权限)
 * - v-permission="{ and: ['PERMISSION_KEY_1', 'PERMISSION_KEY_2'] }" (表示需要同时拥有所有权限)
 * - v-permission="{ or: ['PERMISSION_KEY_1', 'PERMISSION_KEY_2'] }" (表示需要其中任意一个权限)
 * - v-permission="{ role: 'ADMIN' }"
 * - v-permission="{ role: ['ADMIN', 'MEMBER'] }"
 */
function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding
  const userStore = useUserStore()

  if (!userStore.isLoggedIn) {
    el.style.display = 'none'
    return
  }

  let hasRequired = false

  if (typeof value === 'string') {
    // 单个权限键或角色键
    if (value.startsWith('ROLE_')) { // 约定以 ROLE_ 开头的是角色
      const roleKey = value.substring(5) as 'USER' | 'MEMBER' | 'ADMIN'
      hasRequired = userStore.hasRole(roleKey)
    } else { // 否则是权限
      hasRequired = userStore.hasPermission(value)
    }
  } else if (Array.isArray(value)) {
    // 权限数组 (OR 关系)
    hasRequired = value.some(permission => userStore.hasPermission(permission))
  } else if (typeof value === 'object' && value !== null) {
    if ('and' in value && Array.isArray(value.and)) {
      // AND 关系权限数组
      hasRequired = value.and.every((permission: string) => userStore.hasPermission(permission))
    } else if ('or' in value && Array.isArray(value.or)) {
      // OR 关系权限数组
      hasRequired = value.or.some((permission: string) => userStore.hasPermission(permission))
    } else if ('role' in value) {
      // 角色检查
      const roles = Array.isArray(value.role) ? value.role : [value.role]
      hasRequired = roles.some((role: 'USER' | 'MEMBER' | 'ADMIN') => userStore.hasRole(role))
    }
  }

  if (!hasRequired) {
    el.style.display = 'none'
  } else {
    el.style.display = binding.oldValue === undefined ? '' : binding.oldValue // 恢复原始 display 样式
  }
}

export const permissionDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
}

export default {
  install(app: App) {
    app.directive('permission', permissionDirective)
  },
}
