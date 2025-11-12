import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login as loginApi } from '@/api/modules/user'
import type { AuthResponse } from '@/api/modules/user' // 使用 type-only 导入

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const userInfo = ref<Partial<AuthResponse>>({})

  /**
   * 处理用户登录
   * @param {string} username - 用户名
   * @param {string} password - 密码
   * @returns {Promise<boolean>} 是否登录成功
   */
  async function loginAction(username:string, password:string) {
    const res = await loginApi(username, password)
    if (res.success) {
      token.value = res.data.token
      userInfo.value = res.data
      localStorage.setItem('token', res.data.token)
      return true
    } else {
      token.value = null
      userInfo.value = {}
      localStorage.removeItem('token')
      throw new Error(res.message || '登录失败')
    }
  }

  return {
    token,
    userInfo,
    loginAction,
  }
})
