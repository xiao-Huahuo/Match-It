import client from './ApiClient.js'
import routes from './routes.js'

/**
 * @description 获取首页轮播图数据
 * @returns {Promise<Array<import('../types/common').CarouselItem>>}
 */
export function getCarousel() {
  return client.get(routes.GET_CAROUSEL)
}
