import client from './ApiClient.js'
import routes from './routes.js'

/**
 * 用户登录
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @returns {Promise<object>} 包含登录结果、token、用户信息的对象
 */
export async function login(username, password) {
  try {
    const response = await client.post(routes.LOGIN, { username, password })
    return {
      success: true,
      data: response,
    }
  } catch (error) {
    // 错误处理交由 ApiClient 或上层调用者处理
    // 这里只返回一个统一的失败结构
    return {
      success: false,
      message: error.message || '登录失败，请稍后重试',
    }
  }
}

/**
 * 用户注册
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @param {string} email - 邮箱
 * @returns {Promise<object>} 包含注册结果的对象
 */
export async function register(username, password, email) {
  try {
    await client.post(routes.REGISTER, { username, password, email })
    return {
      success: true,
      message: '注册成功',
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || '注册失败，请检查您的输入',
    }
  }
}
