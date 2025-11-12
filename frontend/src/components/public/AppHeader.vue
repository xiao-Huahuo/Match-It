<template>
  <header class="app-header">
    <div class="header-left">
      <router-link to="/main/home" class="logo-link">
        <span class="logo-icon">M</span>
        <span class="logo-text">Match It!</span>
      </router-link>
    </div>

    <div class="header-center">
      <SearchBar @search="handleSearch" />
    </div>

    <div class="header-right">
      <button class="icon-button notification-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        <span class="badge">0</span>
      </button>

      <button class="icon-button theme-switch-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
      </button>

      <router-link to="/main/profile" class="user-avatar-link">
        <img src="https://placehold.co/40x40/4b7bec/ffffff?text=U" alt="User Avatar" class="user-avatar">
      </router-link>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchBar from './SearchBar.vue' // <-- 引入 SearchBar

export default defineComponent({
  name: 'AppHeader',
  components: {
    SearchBar
  },
  setup() {
    // 搜索处理逻辑
    const handleSearch = (text: string) => {
      console.log('执行搜索:', text)
      // TODO: 在这里调用搜索
    }

    return {
      handleSearch
    }
  },
})
</script>

<style scoped>
.app-header {
  /* 蓝色渐变风格 */
  background: linear-gradient(90deg, #007bff 0%, #4b7bec 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: top right bottom left */
  padding: 0 30px 0 30px;
  height: 60px;
}

/* 左侧 Logo 区域 */
.header-left {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

/* 中间搜索栏区域 */
.header-center {
  flex-grow: 1; /* 占据中心区域所有可用空间 */
  display: flex;
  justify-content: center; /* 让 SearchBar 保持在 AppHeader 的中心位置 */
  align-items: center;
  margin: 0 30px;
  /* min-width: 0; */ /* 可选，但在 flex-grow: 1 的情况下通常不是必需的 */
}

.logo-link {
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  font-size: 24px;
  font-weight: 700;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo-text {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 1px;
}

/* 右侧操作区域 */
.header-right {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-right: 40px;
}

.icon-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  position: relative;
}

.icon-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.icon-button svg {
  width: 20px;
  height: 20px;
}

/* 徽章/未读数 - Updated styles for perfect circle */
.badge {
  position: absolute;
  top: 8px;
  right: 8px;
  transform: translate(50%, -50%);
  background-color: #e74c3c; /* 红色 */
  color: white;
  border-radius: 50%;
  font-size: 10px;
  line-height: 1;
  text-align: center;
  /* Ensure it's a circle */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12px;
  height: 12px;
  padding: 0; /* Remove padding to control size with width/height */
}

/* 用户头像 */
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid white;
  object-fit: cover;
  transition: opacity 0.3s;
}

.user-avatar-link:hover .user-avatar {
  opacity: 0.8;
}
/* 媒体查询：确保在屏幕宽度减小时，搜索栏能够收缩 */
@media (max-width: 1200px) {
  .header-center {
    margin: 0 20px;
  }
}
/* 在小屏幕上隐藏搜索栏 */
@media (max-width: 768px) {
  .header-center {
    display: none;
  }
  .app-header {
    padding: 0 15px;
  }
}
</style>
