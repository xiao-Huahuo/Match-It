declare module '@/api/modules/user' {

  // Login 接口返回类型
  export interface LoginResult {
    success: boolean // 是否成功
    token?: string // 登录成功返回的 token
    message?: string // 登录失败提示信息
  }

  // Register 接口返回类型
  export interface RegisterResult {
    success: boolean // 是否成功
    message?: string // 注册提示信息
  }

  // user.js 中的函数声明
  export function login(username: string, password: string): Promise<LoginResult>
  export function register(username: string, password: string): Promise<RegisterResult>
}
