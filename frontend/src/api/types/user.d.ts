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
   * 用户个人信息
   * Corresponds to UserProfile in api.yaml
   */
  export interface UserProfile {
    userId: number;
    username: string;
    email: string;
    avatarUrl: string | null;
    bio: string | null;
    interestTags: string[];
    roles: ('USER' | 'MEMBER' | 'ADMIN')[];
  }

  /**
   * 用户个人信息更新请求体
   * Corresponds to ProfileUpdateRequest in api.yaml
   */
  export interface ProfileUpdateRequest {
    bio?: string | null;
    interestTags?: string[];
  }

  /**
   * 社团摘要信息
   * Corresponds to ClubSummary in api.yaml
   */
  export interface ClubSummary {
    id: number;
    name: string;
    description: string;
    logoUrl: string | null;
    memberCount: number;
    tags: string[];
    isJoined: boolean;
  }

  /**
   * 活动摘要信息
   * Corresponds to ActivitySummary in api.yaml
   */
  export interface ActivitySummary {
    id: number;
    clubId: number;
    clubName: string;
    title: string;
    startTime: string;
    endTime: string;
    location: string;
    status: 'UPCOMING' | 'ONGOING' | 'PAST' | 'CANCELLED';
    enrollmentCount: number;
    maxEnrollment: number;
    isEnrolled: boolean;
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
  export type RegisterApiResponse = ApiSuccessResponse<{ message: string }> | ApiErrorResponse;

  /**
   * getUserProfile 函数的API响应类型
   */
  export type UserProfileApiResponse = ApiSuccessResponse<UserProfile> | ApiErrorResponse;

  /**
   * updateUserProfile 函数的API响应类型
   */
  export type UpdateUserProfileApiResponse = ApiSuccessResponse<{ message: string }> | ApiErrorResponse;

  /**
   * uploadAvatar 函数的API响应类型
   */
  export type UploadAvatarApiResponse = ApiSuccessResponse<{ avatarUrl: string }> | ApiErrorResponse;

  /**
   * getUserClubs 函数的API响应类型
   */
  export type UserClubsApiResponse = ApiSuccessResponse<ClubSummary[]> | ApiErrorResponse;

  /**
   * getUserActivities 函数的API响应类型
   */
  export type UserActivitiesApiResponse = ApiSuccessResponse<ActivitySummary[]> | ApiErrorResponse;

  /**
   * getUserPermissions 函数的API响应类型
   */
  export type UserPermissionsApiResponse = ApiSuccessResponse<string[]> | ApiErrorResponse;


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

  /**
   * 获取当前用户个人信息
   */
  export function getUserProfile(): Promise<UserProfileApiResponse>;

  /**
   * 更新用户个人信息 (简介/兴趣标签)
   * @param data - 包含要更新的简介和兴趣标签的对象
   */
  export function updateUserProfile(data: ProfileUpdateRequest): Promise<UpdateUserProfileApiResponse>;

  /**
   * 上传/更新用户头像
   * @param file - 头像图片文件
   */
  export function uploadAvatar(file: File): Promise<UploadAvatarApiResponse>;

  /**
   * 获取当前用户加入的社团列表
   */
  export function getUserClubs(): Promise<UserClubsApiResponse>;

  /**
   * 获取当前用户报名的活动列表
   */
  export function getUserActivities(): Promise<UserActivitiesApiResponse>;

  /**
   * 获取当前用户权限列表
   */
  export function getUserPermissions(): Promise<UserPermissionsApiResponse>;
}
