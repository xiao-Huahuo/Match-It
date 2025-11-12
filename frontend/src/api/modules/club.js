import client from './ApiClient.js'
import routes from './routes.js'

/**
 * @description 获取社团列表/广场
 * @param {object} params - 查询参数
 * @param {string} [params.keyword] - 搜索关键词
 * @param {number} [params.page] - 页码
 * @param {number} [params.size] - 每页数量
 * @param {boolean} [params.recommend] - 是否推荐
 * @returns {Promise<{total: number, records: Array<import('../types/club').ClubSummary>}>}
 */
export function getClubs(params) {
  return client.get(routes.GET_CLUBS, { params })
}
