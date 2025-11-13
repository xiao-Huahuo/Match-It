<template>
  <div class="my-activities-card">
    <h2 class="card-title">我的活动</h2>

    <div v-if="loading" class="loading-list">
      <div v-for="n in 4" :key="n" class="skeleton-item"></div>
    </div>
    <div v-else-if="activities.length > 0" class="activity-list">
      <div v-for="activity in activities" :key="activity.id" class="activity-item">
        <div class="activity-info">
          <h3 class="activity-title">{{ activity.title }}</h3>
          <p class="activity-meta">
            <span class="club-name">{{ activity.clubName }}</span>
            <span class="separator">|</span>
            <span class="time">{{ formatDateTime(activity.startTime) }}</span>
            <span class="separator">|</span>
            <span class="location">{{ activity.location }}</span>
          </p>
        </div>
        <div class="activity-actions">
          <span :class="['activity-status', `status-${activity.status.toLowerCase()}`]">{{ getActivityStatusText(activity.status) }}</span>
          <button class="detail-button" @click="goToActivityDetail(activity.id)">查看详情</button>
        </div>
      </div>
    </div>
    <div v-else class="empty-state">
      <p>您还没有报名任何活动。</p>
      <router-link to="/main/activities" class="explore-button">去活动中心看看</router-link>
    </div>

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getUserActivities } from '@/api/modules/user'
import type { ActivitySummary } from '@/api/modules/user'

const activities = ref<ActivitySummary[]>([])
const loading = ref(true)
const errorMessage = ref('')
const router = useRouter()

const fetchMyActivities = async () => {
  errorMessage.value = ''
  loading.value = true
  try {
    const res = await getUserActivities()
    if (res.success) {
      activities.value = res.data
    } else {
      errorMessage.value = res.message || '获取我的活动失败。'
    }
  } catch (error: any) {
    errorMessage.value = error.message || '网络请求失败，请重试。'
  } finally {
    loading.value = false
  }
}

const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const getActivityStatusText = (status: ActivitySummary['status']) => {
  const statusMap = {
    UPCOMING: '即将开始',
    ONGOING: '进行中',
    PAST: '已结束',
    CANCELLED: '已取消',
  }
  return statusMap[status] || '未知状态'
}

const goToActivityDetail = (id: number) => {
  router.push({ name: 'ActivityPage', params: { id } }) // 假设活动详情页路由名为 ActivityPage
}

onMounted(() => {
  fetchMyActivities()
})
</script>

<style scoped>
.my-activities-card {
  background-color: var(--widget-color);
  transition: var(--transition-duration);
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.card-title {
  font-size: 24px;
  font-weight: bold;
  color: var(--font-color);
  margin-bottom: 25px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 15px;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.activity-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--background-color-light);
  transition: all 0.3s ease;
}

.activity-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.activity-info {
  flex-grow: 1;
  margin-right: 15px;
}

.activity-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--font-color);
  margin-bottom: 5px;
}

.activity-meta {
  font-size: 13px;
  color: var(--sub-font-color);
}

.activity-meta span {
  margin-right: 8px;
}

.activity-meta .separator {
  color: #ccc;
  margin: 0 5px;
}

.activity-actions {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.activity-status {
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  color: white;
}

.status-upcoming { background-color: #3498db; } /* 蓝色 */
.status-ongoing { background-color: #2ecc71; }   /* 绿色 */
.status-past { background-color: #95a5a6; }      /* 灰色 */
.status-cancelled { background-color: #e74c3c; } /* 红色 */

.detail-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.detail-button:hover {
  background-color: var(--primary-color-dark);
}

.loading-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.skeleton-item {
  height: 90px; /* 模拟活动项的高度 */
  border-radius: 8px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.empty-state {
  text-align: center;
  padding: 50px 0;
  color: var(--sub-font-color);
}

.empty-state p {
  margin-bottom: 20px;
  font-size: 16px;
}

.explore-button {
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.explore-button:hover {
  background-color: var(--primary-color-dark);
}

.error-message {
  margin-top: 20px;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
  background-color: #fceae9;
  color: #e74c3c;
  border: 1px solid #e74c3c;
}
</style>
