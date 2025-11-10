<template>
  <div class="selectable-panel">
    <div class="tabs">
      <div
        v-for="(tab, index) in tabs"
        :key="tab"
        :class="['tab', { active: activeTab === index }]"
        @click="activeTab = index"
      >
        {{ tab }}
      </div>
    </div>
    <div :class="['panel-content', { scrollable, list: isList }]">
      <div v-for="item in content[activeTab]" :key="item" class="item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'SelectablePanel',
  props: {
    tabs: {
      type: Array as PropType<string[]>,
      required: true,
    },
    content: {
      type: Array as PropType<string[][]>,
      required: true,
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
    isList: {
      // 新增，用于控制竖向列表显示
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const activeTab = ref(0)
    return { activeTab }
  },
})
</script>

<style scoped>
.selectable-panel {
  width: 100%;
  margin: 20px 0;
}
.tabs {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
}
.tab {
  cursor: pointer;
  padding: 6px 12px;
}
.tab.active {
  font-weight: bold;
  border-bottom: 2px solid #1976d2;
}
.panel-content {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.panel-content.list {
  flex-direction: column; /* 列表形式 */
}
.panel-content.scrollable {
  max-height: 150px;
  overflow-y: auto;
}
.panel-content .item {
  padding: 8px 12px;
  background-color: #eee;
  border-radius: 4px;
}
</style>
