<template>
  <div class="carousel-banner-container" v-if="!loading && items.length > 0">
    <div class="carousel-wrapper">
      <transition-group name="carousel-fade" tag="div">
        <div
          v-for="(item, index) in items"
          :key="item.id"
          class="carousel-item"
          v-show="currentIndex === index"
          @click="() => goToLink(item.targetUrl)"
        >
          <img :src="item.imageUrl" :alt="item.title" class="carousel-image" />
          <div class="carousel-caption">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </transition-group>
    </div>
    <div class="carousel-dots">
      <span
        v-for="(item, index) in items"
        :key="item.id"
        class="dot"
        :class="{ active: currentIndex === index }"
        @click="currentIndex = index"
      ></span>
    </div>
  </div>
  <div v-else-if="loading" class="loading-skeleton"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { getCarousel } from '@/api/modules/common'
import type { CarouselItem } from '@/api/modules/common'
import { createMockCarouselItems } from '@/utils/mockData' // 导入新的工具函数

const items = ref<CarouselItem[]>([])
const currentIndex = ref(0)
const loading = ref(true)
let intervalId: number | null = null

const fetchCarouselItems = async () => {
  try {
    loading.value = true
    const realItems = await getCarousel()
    if (realItems && realItems.length > 0) {
      items.value = realItems
    } else {
      // 如果API没有返回数据，则使用模拟数据生成器
      items.value = await createMockCarouselItems(
        '校园精彩瞬间',
        '记录每一个难忘的时刻'
      )
    }
  } catch (error) {
    console.error('Failed to fetch carousel items, falling back to mock data:', error)
    // 如果API请求失败，同样使用模拟数据生成器作为备用
    items.value = await createMockCarouselItems(
      '校园精彩瞬间',
      '记录每一个难忘的时刻'
    )
  } finally {
    loading.value = false
    if (items.value.length > 0) {
      startAutoPlay()
    }
  }
}

const startAutoPlay = () => {
  if (items.value.length > 1) {
    intervalId = window.setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % items.value.length
    }, 3000)
  }
}

const stopAutoPlay = () => {
  if (intervalId) {
    clearInterval(intervalId)
  }
}

const goToLink = (url: string) => {
  if (url && url !== '#') {
    window.open(url, '_blank')
  }
}

onMounted(() => {
  fetchCarouselItems()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.carousel-banner-container {
  position: relative;
  width: 100%;
  height: 300px; /* 固定高度 */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #e0e0e0; /* 骨架屏背景色 */
}

.carousel-wrapper {
  width: 100%;
  height: 100%;
}

.carousel-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保证图片覆盖整个容器，不变形 */
  transition: transform 0.5s ease;
}

.carousel-item:hover .carousel-image {
  transform: scale(1.05);
}

.carousel-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 100%);
  color: white;
  padding: 40px 20px 20px;
}

.carousel-caption h3 {
  margin: 0 0 5px;
  font-size: 22px;
  font-weight: bold;
}

.carousel-caption p {
  margin: 0;
  font-size: 14px;
}

.carousel-dots {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dot.active {
  background-color: white;
}

/* 过渡动画 */
.carousel-fade-enter-active,
.carousel-fade-leave-active {
  transition: opacity 0.8s ease;
}
.carousel-fade-enter-from,
.carousel-fade-leave-to {
  opacity: 0;
}

/* 加载状态的骨架屏 */
.loading-skeleton {
  width: 100%;
  height: 300px;
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
</style>
