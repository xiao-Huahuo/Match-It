import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  login as loginApi,
  getUserProfile as getUserProfileApi,
  getUserPermissions as getUserPermissionsApi,
} from '@/api/modules/user'
import type { AuthResponse, UserProfile } from '@/api/modules/user'

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const userInfo = ref<UserProfile | null>(null)
  const permissions = ref<string[]>([])

  const basicUserInfo = computed<Partial<AuthResponse>>(() => {
    if (userInfo.value) {
      return {
        userId: userInfo.value.userId,
        username: userInfo.value.username,
        roles: userInfo.value.roles,
      }
    }
    return {}
  })

  const isLoggedIn = computed(() => {
    console.log('isLoggedIn computed:', !!token.value && !!userInfo.value?.userId);
    return !!token.value && !!userInfo.value?.userId
  })

  const hasPermission = computed(() => (permissionKey: string) => {
    if (!isLoggedIn.value) { // 使用 isLoggedIn computed
      return false
    }
    return permissions.value.includes(permissionKey)
  })

  const hasRole = computed(() => (roleKey: 'USER' | 'MEMBER' | 'ADMIN') => {
    if (!isLoggedIn.value) { // 使用 isLoggedIn computed
      return false
    }
    return userInfo.value?.roles?.includes(roleKey) || false
  })

  async function fetchUserProfile() {
    if (!token.value) {
      userInfo.value = null
      console.log('fetchUserProfile: No token, userInfo set to null.');
      return false
    }
    try {
      const res = await getUserProfileApi()
      if (res.success) {
        userInfo.value = res.data
        console.log('fetchUserProfile: User profile fetched successfully:', userInfo.value);
        return true
      } else {
        console.error('fetchUserProfile: Failed to fetch user profile:', res.message)
        userInfo.value = null
        return false
      }
    } catch (error) {
      console.error('fetchUserProfile: Error fetching user profile:', error)
      userInfo.value = null
      return false
    }
  }

  async function fetchUserPermissions() {
    if (!token.value) {
      permissions.value = []
      console.log('fetchUserPermissions: No token, permissions cleared.');
      return false
    }
    try {
      const res = await getUserPermissionsApi()
      if (res.success) {
        permissions.value = res.data
        console.log('fetchUserPermissions: User permissions fetched successfully:', permissions.value);
        return true
      } else {
        console.error('fetchUserPermissions: Failed to fetch user permissions:', res.message)
        permissions.value = []
        return false
      }
    } catch (error) {
      console.error('fetchUserPermissions: Error fetching user permissions:', error)
      permissions.value = []
      return false
    }
  }

  async function loginAction(username: string, password: string): Promise<boolean> {
    try {
      const res = await loginApi(username, password)
      if (res.success) {
        // 从 res.data 中获取 token 和其他 AuthResponse 字段
        token.value = res.data.token // <--- 修改这里
        // userInfo.value = res.data // <--- 这一行应该删除或修改，因为 userInfo 应该由 fetchUserProfile 填充
        localStorage.setItem('token', res.data.token) // <--- 修改这里

        console.log('loginAction: Token set in store and localStorage. Token:', token.value);

        // 登录成功后立即获取用户完整资料和权限
        console.log('loginAction: Attempting to fetch user profile and permissions...');
        const [profileSuccess, permissionsSuccess] = await Promise.all([fetchUserProfile(), fetchUserPermissions()])

        if (profileSuccess && permissionsSuccess) {
            console.log('loginAction: User profile and permissions fetched successfully.');
            return true
        } else {
            console.error('loginAction: Failed to fetch user profile or permissions after login. Login considered incomplete.');
            // 如果获取资料或权限失败，则认为登录不完整或无效
            token.value = null
            userInfo.value = null
            permissions.value = []
            localStorage.removeItem('token')
            throw new Error('登录成功但获取用户资料或权限失败，请重试。')
        }
      } else {
        token.value = null
        userInfo.value = null
        permissions.value = []
        localStorage.removeItem('token')
        throw new Error(res.message || '登录失败')
      }
    } catch (error: any) {
      console.error('loginAction: Error during login process:', error);
      token.value = null
      userInfo.value = null
      permissions.value = []
      throw error
    }
  }

  function logoutAction() {
    token.value = null
    userInfo.value = null
    permissions.value = []
    localStorage.removeItem('token')
    console.log('logoutAction: User logged out, state cleared.');
    // TODO: 调用后端登出API
  }

  return {
    token,
    userInfo,
    permissions,
    basicUserInfo,
    isLoggedIn,
    hasPermission,
    hasRole,
    loginAction,
    logoutAction,
    fetchUserProfile,
    fetchUserPermissions,
  }
})
