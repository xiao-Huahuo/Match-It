<template>
  <div class="interest-tags-card">
    <h2 class="card-title">兴趣标签管理</h2>

    <div class="tags-section">
      <h3>我的兴趣标签</h3>
      <TagSelector
        v-model:selected-tags="editableTags"
        :all-tags="availableTags"
        @update:selected-tags="handleTagUpdate"
      />
    </div>

    <div class="actions">
      <button class="save-button" @click="saveTags" :disabled="isSaving">
        {{ isSaving ? '保存中...' : '保存' }}
      </button>
      <button class="cancel-button" @click="cancelEditTags" :disabled="isSaving">取消</button>
    </div>

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { updateUserProfile } from '@/api/modules/user'
import TagSelector from '@/components/public/TagSelector.vue'

const userStore = useUserStore()
const errorMessage = ref('')
const successMessage = ref('')
const isSaving = ref(false)

const editableTags = ref<string[]>([])
const availableTags = ref<string[]>([ // 模拟一些可选标签
  '编程', '篮球', '阅读', '音乐', '电影', '旅行', '摄影', '健身', '美食', '动漫', '游戏', '设计', '写作', '志愿者',
  '户外', '舞蹈', '绘画', '乐器', '烹饪', '园艺', '瑜伽', '跑步', '游泳', '桌游', '手工', '历史', '哲学', '心理学'
])

onMounted(async () => {
  if (!userStore.userInfo) {
    await userStore.fetchUserProfile()
  }
  editableTags.value = userStore.userInfo?.interestTags ? [...userStore.userInfo.interestTags] : []
})

const handleTagUpdate = (newTags: string[]) => {
  editableTags.value = newTags
}

const saveTags = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  isSaving.value = true
  try {
    const res = await updateUserProfile({ interestTags: editableTags.value })
    if (res.success) {
      successMessage.value = res.message || '兴趣标签更新成功！'
      if (userStore.userInfo) {
        userStore.userInfo.interestTags = editableTags.value
      }
    } else {
      errorMessage.value = res.message || '更新兴趣标签失败。'
    }
  } catch (error: any) {
    errorMessage.value = error.message || '网络请求失败，请重试。'
  } finally {
    isSaving.value = false
  }
}

const cancelEditTags = () => {
  editableTags.value = userStore.userInfo?.interestTags ? [...userStore.userInfo.interestTags] : [] // 恢复原始值
  errorMessage.value = ''
  successMessage.value = ''
}
</script>

<style scoped>
.interest-tags-card {
  background-color: var(--widget-color);
  transition: var(--transition-duration);
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.card-title {
  font-size: 24px;
  font-weight: bold;
  color: var(--font-color);
  margin-bottom: 25px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 15px;
}

.tags-section {
  margin-bottom: 30px;
}

h3 {
  font-size: 18px;
  color: var(--font-color);
  margin-bottom: 15px;
}

.actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 20px;
}

.save-button, .cancel-button {
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  transition: all 0.3s ease;
  border: none;
}

.save-button {
  background-color: #28a745;
  color: white;
}

.save-button:hover:not(:disabled) {
  background-color: #218838;
}

.save-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.cancel-button {
  background-color: #6c757d;
  color: white;
}

.cancel-button:hover:not(:disabled) {
  background-color: #5a6268;
}

.error-message, .success-message {
  margin-top: 20px;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
}

.error-message {
  background-color: #fceae9;
  color: #e74c3c;
  border: 1px solid #e74c3c;
}

.success-message {
  background-color: #e9f5e9;
  color: #27ae60;
  border: 1px solid #27ae60;
}
</style>
