import type { CarouselItem } from '@/api/modules/common';

/**
 * 动态创建轮播图模拟数据
 * @param defaultTitle - 默认标题
 * @param defaultDescription - 默认描述
 * @returns Promise<CarouselItem[]> - 返回一个包含轮播图项目数组的 Promise
 */
export async function createMockCarouselItems(
  defaultTitle = '社团风采展示',
  defaultDescription = '这是一个丰富多彩的社团活动。'
): Promise<CarouselItem[]> {
  // 使用 Vite 的 import.meta.glob 动态导入指定目录下的所有图片
  // Eager mode: true 会立即加载所有模块
  const imageModules = import.meta.glob('@/assets/images/carousel/*.{png,jpg,jpeg}', { eager: true });

  const items: CarouselItem[] = [];
  let idCounter = 9000; // 使用一个高位起始ID以避免与真实数据冲突

  for (const path in imageModules) {
    const module: any = imageModules[path];
    if (module.default) {
      items.push({
        id: idCounter++,
        imageUrl: module.default, // Vite 会处理好图片的最终URL
        targetUrl: '#', // 模拟链接
        title: defaultTitle,
        description: `${defaultDescription} (${items.length + 1})`,
        order: items.length + 1,
      });
    }
  }

  return items;
}
