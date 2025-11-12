import client from './ApiClient.js'
import routes from './routes.js'

/**
 * @description 获取站内通知/公告列表
 * @param {object} params - 查询参数
 * @param {string} [params.level] - 通知级别 (NORMAL, IMPORTANT, URGENT)
 * @param {number} [params.page] - 页码
 * @param {number} [params.size] - 每页数量
 * @returns {Promise<{total: number, records: Array<import('../types/message').Notification>}>}
 */
export function getNotifications(params) {
  return client.get(routes.GET_NOTIFICATIONS, { params })
}
