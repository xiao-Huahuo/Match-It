<template>
  <div class="club-list-container">
    <h2 class="list-title">社团广场</h2>
    <div v-if="loading" class="loading-grid">
      <div v-for="n in 6" :key="n" class="skeleton-card"></div>
    </div>
    <div v-else-if="clubs.length > 0" class="club-grid">
      <ClubCard v-for="club in clubs" :key="club.id" :club="club" />
    </div>
    <div v-else class="empty-state">
      <p>暂无社团信息</p>
    </div>
    <div class="pagination-wrapper" v-if="!loading && total > pageSize">
      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-changed="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getClubs } from '@/api/modules/club'
import type { ClubSummary } from '@/api/modules/club'
import ClubCard from './ClubCard.vue'
import Pagination from '@/components/public/Pagination.vue'

const clubs = ref<ClubSummary[]>([])
const loading = ref(true)
const currentPage = ref(1)
const pageSize = ref(9) // 每页9个，方便3x3网格布局
const total = ref(0)

const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

const fetchClubs = async (page = 1) => {
  try {
    loading.value = true
    const response = await getClubs({ page, size: pageSize.value })
    clubs.value = response.records
    total.value = response.total
    currentPage.value = page
  } catch (error) {
    console.error('Failed to fetch clubs:', error)
    // 可以在这里设置一个错误状态
  } finally {
    loading.value = false
  }
}

const handlePageChange = (newPage: number) => {
  fetchClubs(newPage)
}

onMounted(() => {
  fetchClubs(1)
})
</script>

<style scoped>
.club-list-container {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.list-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.club-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.skeleton-card {
  height: 220px; /* 与ClubCard大致高度匹配 */
  border-radius: 12px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.empty-state {
  text-align: center;
  padding: 50px 0;
  color: #888;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
