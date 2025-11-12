declare module '@/api/modules/club' {
  /**
   * 社团摘要信息类型
   * Corresponds to ClubSummary in api.yaml
   */
  export interface ClubSummary {
    id: number;
    name: string;
    description: string;
    logoUrl?: string;
    memberCount: number;
    tags: string[];
    isJoined: boolean;
  }

  /**
   * 获取社团列表的 API 响应类型
   */
  export interface GetClubsResponse {
    total: number;
    records: ClubSummary[];
  }

  /**
   * 获取社团列表/广场
   * @param params 查询参数
   */
  export function getClubs(params?: {
    keyword?: string;
    page?: number;
    size?: number;
    recommend?: boolean;
  }): Promise<GetClubsResponse>;
}
