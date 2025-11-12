declare module '@/api/modules/common' {
  /**
   * 轮播图项目类型
   * Corresponds to CarouselItem in api.yaml
   */
  export interface CarouselItem {
    id: number;
    imageUrl: string;
    targetUrl: string;
    title: string;
    description: string;
    order: number;
  }

  /**
   * 获取首页轮播图数据
   */
  export function getCarousel(): Promise<CarouselItem[]>;
}
