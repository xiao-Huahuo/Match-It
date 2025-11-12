<template>
  <div class="home-page">
    <!-- 新增的问候语区域 -->
    <div class="greeting-header">
      <h1>你好, {{ username }}</h1>
      <p>今天有什么想法呢~</p>
    </div>

    <!-- 轮播图区域 -->
    <section class="carousel-section">
      <CarouselBanner />
    </section>

    <!-- 主内容区，包含左右两栏 -->
    <div class="main-content-grid">
      <!-- 左侧主栏 -->
      <div class="main-column">
        <section class="club-list-section">
          <ClubList />
        </section>
      </div>

      <!-- 右侧副栏 -->
      <aside class="sidebar-column">
        <section class="recommend-section">
          <RecommendSection />
        </section>
        <section class="announcement-section">
          <AnnouncementBoard />
        </section>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import CarouselBanner from '@/components/home_page_components/CarouselBanner.vue'
import ClubList from '@/components/home_page_components/ClubList.vue'
import RecommendSection from '@/components/home_page_components/RecommendSection.vue'
import AnnouncementBoard from '@/components/home_page_components/AnnouncementBoard.vue'

// 引入用户状态
const userStore = useUserStore()

// 从状态中获取用户名，如果用户信息不存在则提供一个默认值
const username = computed(() => (userStore.userInfo?.username || '同学')+'~')
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
}

/* 问候语样式 */
.greeting-header {
  padding: 10px 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.greeting-header h1 {
  font-family: "Microsoft YaHei", "微软雅黑", sans-serif;
  font-weight: bold;
  font-size: 26px;
  color: #333;
  margin: 0 0 5px 0;
}

.greeting-header p {
  font-size: 15px;
  color: #888;
  margin: 0;
}

.carousel-section {
  width: 100%;
  flex-shrink: 0;
}

.main-content-grid {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  flex-grow: 1;
  min-height: 0;
}

.main-column {
  flex: 1;
  min-width: 0;
  height: 100%;
}

.sidebar-column {
  width: 320px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
}

.club-list-section {
  height: 100%;
}

.announcement-section {
  flex-grow: 1;
  min-height: 0;
}

/* --- 响应式布局 --- */
@media (max-width: 991.98px) {
  .sidebar-column {
    display: none;
  }
}
</style>
