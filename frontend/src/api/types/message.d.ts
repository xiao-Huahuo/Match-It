declare module '@/api/modules/message' {
  /**
   * 站内通知类型
   * Corresponds to Notification in api.yaml
   */
  export interface Notification {
    id: number;
    userId: number;
    type: 'ACTIVITY_REMINDER' | 'CLUB_APPLICATION_STATUS' | 'SYSTEM_ANNOUNCEMENT' | 'PAYMENT_REMINDER';
    level: 'NORMAL' | 'IMPORTANT' | 'URGENT';
    title: string;
    content: string;
    createDate: string; // date-time
    readStatus: boolean;
    relatedUrl?: string;
  }

  /**
   * 获取通知列表的 API 响应类型
   */
  export interface GetNotificationsResponse {
    total: number;
    records: Notification[];
  }

  /**
   * 获取站内通知/公告列表
   * @param params 查询参数
   */
  export function getNotifications(params?: {
    level?: 'NORMAL' | 'IMPORTANT' | 'URGENT';
    page?: number;
    size?: number;
  }): Promise<GetNotificationsResponse>;
}
