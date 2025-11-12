<template>
  <div class="home-page">
    <div class="page-header">
      <h1>欢迎来到 Match It!</h1>
      <p>发现你的热爱，从这里开始</p>
    </div>

    <!-- 轮播图区域 -->
    <div class="carousel-section">
      <CarouselBanner />
    </div>

    <!-- 社团列表区域 -->
    <section class="club-list-section">
      <ClubList />
    </section>

    <!-- 可以在这里继续添加推荐区域和公告板 -->
    <!--
    <section class="recommend-section">
      <RecommendSection />
    </section>
    <section class="announcement-section">
      <AnnouncementBoard />
    </section>
    -->
  </div>
</template>

<script setup lang="ts">
import CarouselBanner from '@/components/home_page_components/CarouselBanner.vue'
import ClubList from '@/components/home_page_components/ClubList.vue'
// import RecommendSection from '@/components/home_page_components/RecommendSection.vue'
// import AnnouncementBoard from '@/components/home_page_components/AnnouncementBoard.vue'
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 20px; /* 定义各个 section 之间的间距 */
}

.page-header {
  padding: 10px 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.page-header h1 {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin: 0 0 5px 0;
}

.page-header p {
  font-size: 16px;
  color: #888;
  margin: 0;
}

.carousel-section,
.club-list-section,
.recommend-section,
.announcement-section {
  width: 100%;
}
</style>
