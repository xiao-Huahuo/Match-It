import client from './ApiClient.js'
import routes from './routes.js'

// 登录接口
export async function login(username, password) {
  const res = await client.post(routes.LOGIN, { username, password })
  return {
    success: res.success,
    token: res.token,
    message: res.message,
  }
}

// 注册接口
export async function register(username, password) {
  const res = await client.post(routes.REGISTER, { username, password })
  return {
    success: res.success,
    message: res.message,
  }
}
