<template>
  <div class="tag-selector-container">
    <div class="selected-tags">
      <span v-for="tag in selectedTags" :key="tag" class="tag-item selected">
        {{ tag }}
        <button @click="removeTag(tag)" class="remove-tag-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </span>
      <input
        type="text"
        v-model="newTagInput"
        @keydown.enter.prevent="addTagFromInput"
        @keydown.space.prevent="addTagFromInput"
        placeholder="添加新标签或选择已有标签"
        class="new-tag-input"
      />
    </div>

    <div class="available-tags" v-if="filteredAvailableTags.length > 0">
      <span
        v-for="tag in filteredAvailableTags"
        :key="tag"
        class="tag-item available"
        @click="addTag(tag)"
      >
        {{ tag }}
      </span>
    </div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  selectedTags: string[]
  allTags: string[] // 所有可选的标签列表
}>()

const emit = defineEmits(['update:selectedTags'])

const newTagInput = ref('')
const errorMessage = ref('')

// 过滤掉已选中的标签，并且根据输入框内容进行模糊匹配
const filteredAvailableTags = computed(() => {
  const lowerCaseInput = newTagInput.value.toLowerCase().trim()
  return props.allTags.filter(tag =>
    !props.selectedTags.includes(tag) &&
    (lowerCaseInput === '' || tag.toLowerCase().includes(lowerCaseInput))
  )
})

const addTag = (tag: string) => {
  errorMessage.value = ''
  if (!props.selectedTags.includes(tag)) {
    const updatedTags = [...props.selectedTags, tag]
    emit('update:selectedTags', updatedTags)
    newTagInput.value = '' // 清空输入框
  } else {
    errorMessage.value = '该标签已存在！'
  }
}

const removeTag = (tag: string) => {
  const updatedTags = props.selectedTags.filter(t => t !== tag)
  emit('update:selectedTags', updatedTags)
}

const addTagFromInput = () => {
  errorMessage.value = ''
  const tagToAdd = newTagInput.value.trim()
  if (tagToAdd && !props.selectedTags.includes(tagToAdd)) {
    addTag(tagToAdd)
  } else if (tagToAdd && props.selectedTags.includes(tagToAdd)) {
    errorMessage.value = '该标签已存在！'
  }
  newTagInput.value = '' // 无论是否添加成功，都清空输入框
}

// 监听 selectedTags 变化，清除错误信息
watch(() => props.selectedTags, () => {
  errorMessage.value = ''
})
</script>

<style scoped>
.tag-selector-container {
  width: 100%;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 10px;
  background-color: var(--input-background-color);
  transition: var(--transition-duration);
}

.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
  align-items: center;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 15px;
  font-size: 13px;
  white-space: nowrap;
}

.tag-item.selected {
  background-color: var(--primary-color);
  color: white;
}

.remove-tag-button {
  background: none;
  border: none;
  color: white;
  margin-left: 5px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-tag-button svg {
  width: 10px;
  height: 10px;
}

.tag-item.available {
  background-color: var(--tag-item-background-color);
  color: var(--font-color);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.tag-item.available:hover {
  background-color: var(--hover-background-color);
}

.new-tag-input {
  flex-grow: 1;
  border: none;
  background: transparent;
  padding: 6px 0;
  font-size: 14px;
  color: var(--input-color);
  outline: none;
  min-width: 150px; /* 确保输入框有最小宽度 */
}

.new-tag-input::placeholder {
  color: var(--sub-font-color);
}

.available-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dashed var(--border-color);
}

.error-message {
  color: #e74c3c;
  font-size: 13px;
  margin-top: 10px;
}
</style>
