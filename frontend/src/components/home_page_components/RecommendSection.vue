<template>
  <div class="recommend-section-container">
    <h3 class="section-title">
      <FontAwesomeIcon icon="star" class="title-icon" />
      为你推荐
    </h3>
    <div v-if="loading" class="loading-state">
      <div v-for="n in 3" :key="n" class="skeleton-item"></div>
    </div>
    <ul v-else-if="recommendedClubs.length > 0" class="recommend-list">
      <li v-for="club in recommendedClubs" :key="club.id" class="recommend-item" @click="goToClub(club.id)">
        <img :src="club.logoUrl || defaultLogo" :alt="club.name" class="item-logo" />
        <div class="item-info">
          <h4 class="item-name">{{ club.name }}</h4>
          <p class="item-description">{{ club.description }}</p>
        </div>
      </li>
    </ul>
    <div v-else class="empty-state">
      <p id="empty-state-text">暂无特别推荐，先逛逛社团广场吧！</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getClubs } from '@/api/modules/club'
import type { ClubSummary } from '@/api/modules/club'
import defaultLogo from '@/assets/images/default_logo.png'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'

// 将图标添加到库中
library.add(faStar)

const recommendedClubs = ref<ClubSummary[]>([])
const loading = ref(true)
const router = useRouter()

const fetchRecommendedClubs = async () => {
  try {
    loading.value = true
    // 调用API获取推荐社团，这里我们只取前5个作为示例
    const response = await getClubs({ recommend: true, page: 1, size: 5 })
    recommendedClubs.value = response.records
  } catch (error) {
    console.error('Failed to fetch recommended clubs:', error)
  } finally {
    loading.value = false
  }
}

const goToClub = (id: number) => {
  router.push({ name: 'ClubDetailPage', params: { id } })
}

onMounted(() => {
  fetchRecommendedClubs()
})
</script>

<style scoped>
.recommend-section-container {
  background-color: var(--widget-color);
  transition: var(--transition-duration);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color:var(--font-color);
  transition: var(--transition-duration);
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
}
#empty-state-text {
  color:var(--sub-font-color);
  transition: var(--transition-duration);
}
.title-icon {
  margin-right: 8px;
  color: #f39c12;
}

.recommend-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.recommend-item {
  display: flex;
  gap: 15px;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.recommend-item:hover {
  background-color: #f9f9f9;
}

.item-logo {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
}

.item-info {
  overflow: hidden;
}

.item-name {
  margin: 0 0 5px 0;
  font-size: 15px;
  font-weight: 600;
  color: #444;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-description {
  margin: 0;
  font-size: 13px;
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.loading-state, .empty-state {
  padding: 20px 0;
}

.skeleton-item {
  height: 60px;
  border-radius: 8px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  margin-bottom: 10px;
}

.empty-state p {
  text-align: center;
  color: #888;
  font-size: 14px;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
