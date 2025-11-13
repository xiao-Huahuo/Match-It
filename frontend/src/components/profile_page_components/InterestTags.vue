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
  flex-grow: 1; /* 确保卡片能够弹性填充父容器 */
  display: flex;
  flex-direction: column;
  min-height: 0; /* 允许内容收缩 */
}

.card-title {
  font-size: 24px;
  font-weight: bold;
  color: var(--font-color);
  margin-bottom: 25px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 15px;
  flex-shrink: 0; /* 防止标题被压缩 */
}

.tags-section {
  margin-bottom: 30px;
  flex-grow: 1; /* 允许标签选择器区域弹性填充 */
  min-height: 0; /* 允许内容收缩 */
  overflow-y: auto; /* 允许内容滚动 */
}

h3 {
  font-size: 18px;
  color: var(--font-color);
  margin-bottom: 15px;
  flex-shrink: 0; /* 防止标题被压缩 */
}

.actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 20px;
  flex-shrink: 0; /* 防止按钮被压缩 */
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
  background-color: var(--primary-color);
  color: white;
}

.save-button:hover:not(:disabled) {
  background-color: var(--primary-color-dark);
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
  flex-shrink: 0; /* 防止消息被压缩 */
}

.error-message {
  background-color: var(--error-background-color);
  color: var(--error-text-color);
  border: 1px solid var(--error-border-color);
}

.success-message {
  background-color: var(--success-background-color);
  color: var(--success-text-color);
  border: 1px solid var(--success-border-color);
}
</style>
