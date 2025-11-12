declare module '@/api/modules/user' {
  /**
   * 登录成功后的响应体
   * Corresponds to AuthResponse in api.yaml
   */
  export interface AuthResponse {
    token: string;
    userId: number;
    username: string;
    roles: ('USER' | 'MEMBER' | 'ADMIN')[];
  }

  /**
   * API 响应的通用成功结构
   */
  export interface ApiSuccessResponse<T> {
    success: true;
    data: T;
  }

  /**
   * API 响应的通用失败结构
   */
  export interface ApiErrorResponse {
    success: false;
    message: string;
  }

  /**
   * login 函数的API响应类型
   */
  export type LoginApiResponse = ApiSuccessResponse<AuthResponse> | ApiErrorResponse;

  /**
   * register 函数的API响应类型
   */
  export type RegisterApiResponse = | { success: true; message: string } | ApiErrorResponse;

  /**
   * 用户登录
   * @param username 用户名
   * @param password 密码
   */
  export function login(username: string, password: string): Promise<LoginApiResponse>;

  /**
   * 用户注册
   * @param username 用户名
   * @param password 密码
   * @param email 邮箱
   */
  export function register(
    username: string,
    password: string,
    email: string
  ): Promise<RegisterApiResponse>;
}
