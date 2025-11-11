<template>
  <!-- 使用 router-link 来处理路由跳转 -->
  <router-link :to="to" class="sidebar-link">
    <!-- 图标占位符 -->
    <div class="icon-placeholder">
      <!-- 实际项目中应使用 <component :is="iconComponent" /> -->
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
      </svg>
    </div>
    <span class="link-label">{{ label }}</span>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SidebarLink',
  props: {
    to: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
})
</script>

<style scoped>
.sidebar-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 10px;
  margin-bottom: 5px;
  border-radius: 8px;
  text-decoration: none;
  color: #4a5568; /* 默认深灰色文本 */
  transition: background-color 0.2s ease, color 0.2s ease;
}

.sidebar-link:hover {
  background-color: #f0f4ff; /* 浅蓝色悬停背景 */
  color: #007bff; /* 悬停蓝色文本 */
}

/* Vue Router 激活链接的样式 */
.sidebar-link.router-link-exact-active {
  background-color: #e0eaff; /* 激活状态背景 */
  color: #007bff; /* 激活状态主色 */
  font-weight: 600;
}

/* 激活状态下的图标颜色 */
.sidebar-link.router-link-exact-active .icon-placeholder svg {
  stroke: #007bff;
}

.icon-placeholder {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.link-label {
  font-size: 14px;
}

/* 默认图标颜色 */
.icon-placeholder svg {
  stroke: #718096; /* 中灰色图标 */
  transition: stroke 0.2s ease;
}
</style>
