<template>
  <div class="profile-page-container">
    <h1 class="page-title">个人中心</h1>

    <div class="profile-content-wrapper">
      <!-- 左侧导航栏 -->
      <aside class="profile-sidebar">
        <nav class="profile-nav">
          <a
            v-for="tab in tabs"
            :key="tab.key"
            :class="['nav-item', { active: activeTab === tab.key }]"
            @click="activeTab = tab.key"
          >
            <FontAwesomeIcon :icon="tab.icon" class="nav-icon" />
            <span>{{ tab.label }}</span>
          </a>
        </nav>
      </aside>

      <!-- 右侧内容区域 -->
      <main class="profile-main-content">
        <Transition name="fade" mode="out-in">
          <component :is="currentTabComponent" :key="activeTab" />
        </Transition>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUserCircle,
  faTags,
  faUsers,
  faRunning,
  faCloudUploadAlt,
} from '@fortawesome/free-solid-svg-icons'

// 将图标添加到库中
library.add(faUserCircle, faTags, faUsers, faRunning, faCloudUploadAlt)

// 异步加载组件
const UserInfo = defineAsyncComponent(() => import('@/components/profile_page_components/UserInfo.vue'))
const AvatarUpload = defineAsyncComponent(() => import('@/components/profile_page_components/AvatarUpload.vue'))
const InterestTags = defineAsyncComponent(() => import('@/components/profile_page_components/InterestTags.vue'))
const MyClubs = defineAsyncComponent(() => import('@/components/profile_page_components/MyClubs.vue'))
const MyActivities = defineAsyncComponent(() => import('@/components/profile_page_components/MyActivities.vue'))

const activeTab = ref('userInfo') // 默认激活的tab

const tabs = [
  { key: 'userInfo', label: '我的资料', icon: 'user-circle', component: UserInfo },
  { key: 'avatarUpload', label: '头像设置', icon: 'cloud-upload-alt', component: AvatarUpload },
  { key: 'interestTags', label: '兴趣标签', icon: 'tags', component: InterestTags },
  { key: 'myClubs', label: '我的社团', icon: 'users', component: MyClubs },
  { key: 'myActivities', label: '我的活动', icon: 'running', component: MyActivities },
]

const currentTabComponent = computed(() => {
  const tab = tabs.find((t) => t.key === activeTab.value)
  return tab ? tab.component : UserInfo
})
</script>

<style scoped>
.profile-page-container {
  padding: 20px;
  background-color: var(--main-layout-container-background-color);
  transition: var(--transition-duration);
  /* 确保容器占据所有可用高度，并允许其内容滚动 */
  min-height: calc(100vh - 60px); /* 减去header高度 */
  display: flex;
  flex-direction: column;
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  color: var(--font-color);
  margin-bottom: 25px;
  text-align: center;
  flex-shrink: 0; /* 防止标题被压缩 */
}

.profile-content-wrapper {
  display: flex;
  gap: 25px;
  /* 移除 max-width 和 margin: 0 auto; 让其自然延展 */
  flex-grow: 1; /* 占据所有剩余垂直空间 */
  min-height: 0; /* 允许内容收缩 */
  width: 100%; /* 占据父容器所有宽度 */
}

.profile-sidebar {
  flex-shrink: 0;
  width: 200px; /* 固定宽度 */
  background-color: var(--widget-color);
  transition: var(--transition-duration);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 15px 0;
  height: 100%; /* 占据父容器所有高度 */
  overflow-y: auto; /* 如果导航项过多，允许滚动 */
}

.profile-nav {
  display: flex;
  flex-direction: column;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  color: var(--sub-font-color);
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background-color: var(--hover-background-color);
  color: var(--font-color);
}

.nav-item.active {
  background-color: var(--active-background-color);
  color: var(--primary-color);
  font-weight: bold;
  border-left-color: var(--primary-color);
}

.nav-icon {
  width: 18px;
  height: 18px;
}

.profile-main-content {
  flex-grow: 1; /* 占据所有剩余水平空间 */
  background-color: var(--widget-color);
  transition: var(--transition-duration);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 25px;
  min-height: 0; /* 允许内容收缩 */
  display: flex; /* 使内部组件能够弹性填充 */
  flex-direction: column; /* 内部组件垂直排列 */
  overflow-y: auto; /* 允许内容滚动 */
}

/* 路由切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .profile-content-wrapper {
    flex-direction: column;
    width: 100%; /* 移动端占据所有宽度 */
    max-width: none; /* 移除最大宽度限制 */
  }

  .profile-sidebar {
    width: 100%;
    padding: 0;
    border-radius: 12px;
    height: auto; /* 移动端高度自适应 */
    overflow-y: visible; /* 移动端不强制滚动 */
  }

  .profile-nav {
    flex-direction: row; /* 移动端横向排列 */
    justify-content: space-around;
    border-bottom: 1px solid var(--border-color);
  }

  .nav-item {
    flex-direction: column;
    padding: 10px 5px;
    border-left: none;
    border-bottom: 3px solid transparent;
    text-align: center;
    gap: 5px;
  }

  .nav-item.active {
    border-left-color: transparent;
    border-bottom-color: var(--primary-color);
  }

  .profile-main-content {
    padding: 15px;
  }
}
</style>
