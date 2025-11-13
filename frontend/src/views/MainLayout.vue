<template>
  <div class="main-layout-container">
    <!-- 顶部导航栏 (AppHeader) -->
    <AppHeader class="main-header" />

    <div class="main-content-wrapper">
      <!-- 侧边栏 (AppSidebar) -->
      <AppSidebar class="main-sidebar" />

      <!-- 主内容区域 -->
      <main class="main-view">
        <!-- Vue Router 渲染子组件的地方 -->
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '@/components/public/AppHeader.vue'
import AppSidebar from '@/components/public/AppSidebar.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    AppHeader,
    AppSidebar,
  },
  setup() {
    // 这里可以放置全局逻辑，例如主题状态管理、权限初始化等
    return {}
  },
})
</script>

<style scoped>

.main-layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--main-layout-container-background-color);
  transition: var(--transition-duration);
}

.main-header {
  height: 60px; /* 固定顶部导航高度 */
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.main-content-wrapper {
  display: flex;
  flex: 1; /* 占据剩余垂直空间 */
}

.main-sidebar {
  width: 250px; /* 固定侧边栏宽度 */
  min-height: calc(100vh - 60px); /* 占据屏幕剩余高度 */
  /* 侧边栏样式 */
  background-color: var(--main-sidebar-background-color);
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.03);
  padding: 20px 0;
  transition: var(--transition-duration);
}

.main-view {
  flex-grow: 1; /* 主内容区占据剩余空间 */
  padding: 20px;
  /* 平滑滚动 */
  overflow-y: auto;
}

/* 媒体查询：适应移动端 */
@media (max-width: 768px) {
  .main-content-wrapper {
    flex-direction: column;
  }

  .main-sidebar {
    width: 100%;
    min-height: auto;
    /* 在移动端默认隐藏侧边栏，通过按钮弹出 */
    display: none;
    box-shadow: none;
    border-bottom: 1px solid #eee;
  }

  .main-view {
    padding: 10px;
  }
}
</style>
