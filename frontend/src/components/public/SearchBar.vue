<template>
  <div class="search-bar-container">
    <input
      type="text"
      placeholder="搜索社团、活动、公告..."
      class="search-input"
      v-model="searchText"
      @keyup.enter="$emit('search', searchText)"
    />
    <button @click="$emit('search', searchText)" class="search-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'SearchBar',
  emits: ['search'],
  setup() {
    const searchText = ref('')
    return { searchText }
  },
})
</script>

<style scoped>
.search-bar-container {
  display: flex;
  align-items: center;
  /* 关键修改：移除固定的 width: 400px; */
  width: 100%; /* 占据父容器的全部宽度 */
  max-width: 600px; /* 限制最大宽度，防止在大屏幕上过宽 */
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease; /* 增加过渡效果，让线性变化更平滑 */
}

.search-bar-container:focus-within {
  background-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.4);
}

.search-input {
  flex-grow: 1;
  padding: 8px 15px;
  border: none;
  background: transparent;
  color: white;
  font-size: 14px;
  outline: none;
}

/* 占位符颜色 */
.search-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.search-button {
  background: none;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

/* 媒体查询：不再需要特殊媒体查询，因为 flexbox 会自动处理 */
</style>
