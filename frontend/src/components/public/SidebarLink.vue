<template>
  <router-link :to="to" class="sidebar-link" active-class="active">
    <div class="icon-placeholder">
      <svg v-if="icon === 'Home'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      <svg v-else-if="icon === 'User'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      <svg v-else-if="icon === 'Zap'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
      <svg v-else-if="icon === 'MessageSquare'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      <svg v-else-if="icon === 'Shuffle'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      <svg v-else-if="icon === 'Bot'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4c0-1.1-0.9-2-2-2H6a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h2v4l4-4h4a2 2 0 0 0 2-2V8z"/></svg>
      <svg v-else-if="icon === 'BarChart'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
      <svg v-else-if="icon === 'Settings'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.22a2 2 0 0 0-1.56 1.13l-.11.2a2 2 0 0 1-1.2 1.2l-.2.11a2 2 0 0 0-1.13 1.56V12a2 2 0 0 0 2 2h.22a2 2 0 0 0 1.56 1.13l.11.2a2 2 0 0 1 1.2 1.2l.2.11a2 2 0 0 0 1.13 1.56v.22a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.22a2 2 0 0 0 1.56-1.13l.11-.2a2 2 0 0 1 1.2-1.2l.2-.11a2 2 0 0 0 1.13-1.56V12a2 2 0 0 0-2-2h-.22a2 2 0 0 0-1.56-1.13l-.11-.2a2 2 0 0 1-1.2-1.2l-.2-.11A2 2 0 0 0 12.22 2z"/><circle cx="12" cy="12" r="3"/></svg>
    </div>
    <span class="label">{{ label }}</span>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SidebarLink',
  props: {
    icon: {
      type: String,
      required: true,
      validator: (value: string) => ['Home', 'User', 'Zap', 'MessageSquare', 'Shuffle', 'Bot', 'BarChart', 'Settings'].includes(value)
    },
    label: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    }
  },
  setup() {
    return {}
  },
})
</script>

<style scoped>
.sidebar-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 8px;
  text-decoration: none;
  color: #4a5568; /* 默认深色文本 */
  position: relative;
  overflow: hidden; /* 关键：隐藏伪元素在默认状态下的溢出 */
  z-index: 1; /* 确保内容在伪元素之上 */
  transition: color 0.3s ease;
}

/* 悬停动画实现 */
.sidebar-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #e0eaff; /* 浅蓝色背景 */
  z-index: -1;
  /* 初始状态：宽度为0，或从左侧移出 */
  transform: translateX(-100%);
  transition: transform 0.3s ease-out; /* 关键：平滑过渡 */
}

/* 鼠标悬停时的状态 */
.sidebar-link:hover::before {
  transform: translateX(0); /* 关键：伪元素平滑从左到右滑入 */
}

.sidebar-link:hover {
  color: #007bff; /* 悬停时文本变蓝 */
}

/* 激活状态 (被 router-link 的 active-class="active" 选中) */
.sidebar-link.active {
  color: #007bff; /* 激活时深蓝色文本 */
  font-weight: 600;
}

.sidebar-link.active::before {
  /* 激活状态下的伪元素样式 */
  transform: translateX(0);
  background-color: #e0eaff; /* 保持浅蓝色背景 */
}

/* 图标样式 */
.icon-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-placeholder svg {
  width: 20px;
  height: 20px;
}

/* 激活和悬停时的图标颜色 */
.sidebar-link:hover .icon-placeholder svg,
.sidebar-link.active .icon-placeholder svg {
  stroke: #007bff;
}

.label {
  white-space: nowrap;
}
</style>
