<template>
  <div class="my-clubs-card">
    <h2 class="card-title">我的社团</h2>

    <div v-if="loading" class="loading-grid">
      <div v-for="n in 3" :key="n" class="skeleton-card"></div>
    </div>
    <div v-else-if="clubs.length > 0" class="club-grid">
      <ClubCard v-for="club in clubs" :key="club.id" :club="club" />
    </div>
    <div v-else class="empty-state">
      <p>您还没有加入任何社团。</p>
      <router-link to="/main/home" class="explore-button">去社团广场看看</router-link>
    </div>

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUserClubs } from '@/api/modules/user'
import type { ClubSummary } from '@/api/modules/user'
import ClubCard from '@/components/home_page_components/ClubCard.vue' // 复用 ClubCard

const clubs = ref<ClubSummary[]>([])
const loading = ref(true)
const errorMessage = ref('')

const fetchMyClubs = async () => {
  errorMessage.value = ''
  loading.value = true
  try {
    const res = await getUserClubs()
    if (res.success) {
      clubs.value = res.data
    } else {
      errorMessage.value = res.message || '获取我的社团失败。'
    }
  } catch (error: any) {
    errorMessage.value = error.message || '网络请求失败，请重试。'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchMyClubs()
})
</script>

<style scoped>
.my-clubs-card {
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

.club-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.skeleton-card {
  height: 220px; /* 与 ClubCard 保持一致 */
  border-radius: 12px;
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
