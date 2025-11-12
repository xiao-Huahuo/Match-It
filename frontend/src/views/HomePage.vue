<template>
  <div class="home-page">
    <!-- 轮播图区域保持在最上方 -->
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
import CarouselBanner from '@/components/home_page_components/CarouselBanner.vue'
import ClubList from '@/components/home_page_components/ClubList.vue'
import RecommendSection from '@/components/home_page_components/RecommendSection.vue'
import AnnouncementBoard from '@/components/home_page_components/AnnouncementBoard.vue'
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.carousel-section {
  width: 100%;
}

.main-content-grid {
  display: flex;
  gap: 20px;
  align-items: flex-start; /* 顶部对齐 */
}

.main-column {
  flex: 1; /* 占据大部分空间 */
  min-width: 0; /* 防止flex item溢出 */
}

.sidebar-column {
  width: 320px; /* 固定宽度 */
  flex-shrink: 0; /* 防止被压缩 */
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.club-list-section,
.recommend-section,
.announcement-section {
  width: 100%;
}

/* --- 响应式布局 --- */
/* 当屏幕宽度小于 992px 时，隐藏右侧边栏 */
@media (max-width: 991.98px) {
  .sidebar-column {
    display: none;
  }
}
</style>
