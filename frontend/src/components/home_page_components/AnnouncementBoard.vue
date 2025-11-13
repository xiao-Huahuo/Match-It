<template>
  <div class="announcement-board-container">
    <h3 class="section-title">
      <FontAwesomeIcon icon="bullhorn" class="title-icon" />
      全站公告
    </h3>
    <div v-if="loading" class="loading-state">
      <div v-for="n in 4" :key="n" class="skeleton-item"></div>
    </div>
    <div v-else-if="announcements.length > 0" class="list-wrapper">
      <ul class="announcement-list">
        <li v-for="announcement in announcements" :key="announcement.id" class="announcement-item" @click="readAnnouncement(announcement)">
          <span :class="['level-indicator', `level-${announcement.level.toLowerCase()}`]">
            {{ getLevelText(announcement.level) }}
          </span>
          <p class="item-title">{{ announcement.title }}</p>
          <span class="item-date">{{ formatDate(announcement.createDate) }}</span>
        </li>
      </ul>
    </div>
    <div v-else class="empty-state">
      <p id="empty-state-text">当前暂无公告</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getNotifications } from '@/api/modules/message'
import type { Notification } from '@/api/modules/message'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBullhorn } from '@fortawesome/free-solid-svg-icons'

library.add(faBullhorn)

const announcements = ref<Notification[]>([])
const loading = ref(true)
const router = useRouter()

const fetchAnnouncements = async () => {
  try {
    loading.value = true
    // 获取最新的15条公告以测试滚动效果
    const response = await getNotifications({ page: 1, size: 15 })
    announcements.value = response.records
  } catch (error) {
    console.error('Failed to fetch announcements:', error)
  } finally {
    loading.value = false
  }
}

const getLevelText = (level: 'NORMAL' | 'IMPORTANT' | 'URGENT') => {
  const levelMap = {
    NORMAL: '普通',
    IMPORTANT: '重要',
    URGENT: '紧急',
  }
  return levelMap[level] || '通知'
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return `${date.getMonth() + 1}-${date.getDate()}`
}

const readAnnouncement = (announcement: Notification) => {
  if (announcement.relatedUrl) {
    router.push(announcement.relatedUrl)
  } else {
    alert(`公告：${announcement.title}\n\n内容：${announcement.content}`)
  }
}

onMounted(() => {
  fetchAnnouncements()
})
</script>

<style scoped>
.announcement-board-container {
  background-color: var(--widget-color);
  transition: var(--transition-duration);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  height: 100%; /* 填满父容器 */
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--font-color);
  transition: var(--transition-duration);
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
#empty-state-text {
  color:var(--sub-font-color);
  transition: var(--transition-duration);
}

.title-icon {
  margin-right: 8px;
  color: #e74c3c;
}

.list-wrapper {
  flex-grow: 1; /* 占据所有剩余空间 */
  overflow-y: auto; /* 核心：当内容超出时，出现垂直滚动条 */
  padding-right: 5px;
  margin-right: -5px;
}

.announcement-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.announcement-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 5px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.announcement-item:last-child {
  border-bottom: none;
}

.announcement-item:hover {
  background-color: #f9f9f9;
}

.level-indicator {
  font-size: 12px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;
}

.level-normal { background-color: #eaf2ff; color: #4b7bec; }
.level-important { background-color: #fff4e6; color: #f39c12; }
.level-urgent { background-color: #fceae9; color: #e74c3c; }

.item-title {
  flex-grow: 1;
  margin: 0;
  font-size: 14px;
  color: #555;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-date {
  font-size: 13px;
  color: #999;
  flex-shrink: 0;
}

.loading-state, .empty-state {
  padding: 20px 0;
  margin: auto;
}

.skeleton-item {
  height: 45px;
  border-radius: 8px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  margin-bottom: 10px;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
