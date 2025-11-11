<template>
  <aside class="app-sidebar">
    <nav class="sidebar-nav">
      <!-- 基础导航项 -->
      <div class="nav-section">
        <SidebarLink icon="Home" label="首页 / 广场" to="/main/home" />
        <SidebarLink icon="User" label="个人中心" to="/main/profile" />
        <SidebarLink icon="Zap" label="活动中心" to="/main/activities" />
        <SidebarLink icon="MessageSquare" label="消息中心" to="/main/messages" />
      </div>

      <!-- 社团管理/智能匹配 (核心功能) -->
      <div class="nav-section">
        <h3 class="section-title">核心功能</h3>
        <SidebarLink icon="Shuffle" label="智能匹配" to="/main/match" />
        <SidebarLink icon="Bot" label="KIMI智能体" to="/main/llm-chat" />
      </div>

      <!-- 管理员模块 (需要权限控制) -->
      <div class="nav-section admin-section">
        <h3 class="section-title">管理员模块</h3>
        <SidebarLink icon="BarChart" label="数据分析" to="/main/analytics" />
        <SidebarLink icon="Settings" label="系统管理" to="/main/system" />
      </div>
    </nav>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// 侧边栏链接组件 (需要进一步拆分)
import SidebarLink from './SidebarLink.vue'

export default defineComponent({
  name: 'AppSidebar',
  components: {
    SidebarLink
  },
  setup() {
    // TODO: 在这里引入 usePermission composable 来控制管理员模块的显示/隐藏
    return {}
  },
})
</script>

<style scoped>
.app-sidebar {
  background-color: white;
  padding: 20px 0;
  border-right: 1px solid #eee;
  /* 确保侧边栏在 MainLayout 中设置的宽度生效 */
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.nav-section {
  padding: 0 15px;
}

.section-title {
  font-size: 12px;
  color: #a0aec0; /* 柔和的灰色 */
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
  padding-left: 10px;
}

/* 媒体查询：移动端样式 */
@media (max-width: 768px) {
  .app-sidebar {
    padding-bottom: 0;
  }
}
</style>
