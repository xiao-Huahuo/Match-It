<template>
  <div class="user-info-card">
    <h2 class="card-title">基本资料</h2>

    <div class="info-item">
      <label class="info-label">用户名:</label>
      <span class="info-value">{{ userStore.userInfo?.username }}</span>
    </div>

    <div class="info-item">
      <label class="info-label">邮箱:</label>
      <span class="info-value">{{ userStore.userInfo?.email }}</span>
    </div>

    <div class="info-item editable-item">
      <label class="info-label">个人简介:</label>
      <template v-if="!isEditingBio">
        <span class="info-value bio-value">{{ userStore.userInfo?.bio || '暂无简介' }}</span>
        <button class="edit-button" @click="startEditBio">编辑</button>
      </template>
      <template v-else>
        <textarea v-model="editableBio" class="edit-textarea"></textarea>
        <button class="save-button" @click="saveBio" :disabled="isSaving">
          {{ isSaving ? '保存中...' : '保存' }}
        </button>
        <button class="cancel-button" @click="cancelEditBio" :disabled="isSaving">取消</button>
      </template>
    </div>

    <div class="info-item editable-item">
      <label class="info-label">兴趣标签:</label>
      <template v-if="!isEditingTags">
        <div class="tags-display">
          <span v-for="tag in userStore.userInfo?.interestTags" :key="tag" class="tag-item">{{ tag }}</span>
          <span v-if="!userStore.userInfo?.interestTags || userStore.userInfo.interestTags.length === 0" class="info-value">暂无标签</span>
        </div>
        <button class="edit-button" @click="startEditTags">编辑</button>
      </template>
      <template v-else>
        <TagSelector
          v-model:selected-tags="editableTags"
          :all-tags="availableTags"
          @update:selected-tags="handleTagUpdate"
        />
        <button class="save-button" @click="saveTags" :disabled="isSaving">
          {{ isSaving ? '保存中...' : '保存' }}
        </button>
        <button class="cancel-button" @click="cancelEditTags" :disabled="isSaving">取消</button>
      </template>
    </div>

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { updateUserProfile } from '@/api/modules/user'
import TagSelector from '@/components/public/TagSelector.vue' // 假设 TagSelector 已经实现

const userStore = useUserStore()
const errorMessage = ref('')
const successMessage = ref('')
const isSaving = ref(false)

// 个人简介编辑状态
const isEditingBio = ref(false)
const editableBio = ref('')

// 兴趣标签编辑状态
const isEditingTags = ref(false)
const editableTags = ref<string[]>([])
const availableTags = ref<string[]>([ // 模拟一些可选标签
  '编程', '篮球', '阅读', '音乐', '电影', '旅行', '摄影', '健身', '美食', '动漫', '游戏', '设计', '写作', '志愿者'
])

onMounted(async () => {
  // 如果用户信息尚未加载，则尝试加载
  if (!userStore.userInfo) {
    await userStore.fetchUserProfile()
  }
  // 初始化编辑数据
  editableBio.value = userStore.userInfo?.bio || ''
  editableTags.value = userStore.userInfo?.interestTags ? [...userStore.userInfo.interestTags] : []
})

// --- 个人简介编辑逻辑 ---
const startEditBio = () => {
  editableBio.value = userStore.userInfo?.bio || ''
  isEditingBio.value = true
}

const saveBio = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  isSaving.value = true
  try {
    const res = await updateUserProfile({ bio: editableBio.value })
    if (res.success) {
      successMessage.value = res.message || '个人简介更新成功！'
      // 更新 store 中的 userInfo
      if (userStore.userInfo) {
        userStore.userInfo.bio = editableBio.value
      }
      isEditingBio.value = false
    } else {
      errorMessage.value = res.message || '更新个人简介失败。'
    }
  } catch (error: any) {
    errorMessage.value = error.message || '网络请求失败，请重试。'
  } finally {
    isSaving.value = false
  }
}

const cancelEditBio = () => {
  isEditingBio.value = false
  editableBio.value = userStore.userInfo?.bio || '' // 恢复原始值
}

// --- 兴趣标签编辑逻辑 ---
const startEditTags = () => {
  editableTags.value = userStore.userInfo?.interestTags ? [...userStore.userInfo.interestTags] : []
  isEditingTags.value = true
}

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
      // 更新 store 中的 userInfo
      if (userStore.userInfo) {
        userStore.userInfo.interestTags = editableTags.value
      }
      isEditingTags.value = false
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
  isEditingTags.value = false
  editableTags.value = userStore.userInfo?.interestTags ? [...userStore.userInfo.interestTags] : [] // 恢复原始值
}
</script>

<style scoped>
.user-info-card {
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

.info-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  gap: 15px;
}

.info-label {
  font-weight: 600;
  color: var(--font-color);
  width: 100px;
  flex-shrink: 0;
}

.info-value {
  color: var(--sub-font-color);
  flex-grow: 1;
  word-break: break-word;
}

.bio-value {
  white-space: pre-wrap; /* 保留换行符 */
}

.editable-item {
  align-items: center;
}

.edit-button, .save-button, .cancel-button {
  padding: 8px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  margin-left: 10px;
  flex-shrink: 0;
}

.edit-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
}

.edit-button:hover {
  background-color: var(--primary-color-dark);
}

.save-button {
  background-color: #28a745;
  color: white;
  border: none;
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
  border: none;
}

.cancel-button:hover:not(:disabled) {
  background-color: #5a6268;
}

.cancel-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.edit-textarea {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--input-background-color);
  color: var(--input-color);
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  transition: border-color 0.3s ease;
}

.edit-textarea:focus {
  border-color: var(--primary-color);
  outline: none;
}

.tags-display {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex-grow: 1;
}

.tag-item {
  background-color: var(--tag-item-background-color);
  color: var(--font-color);
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 13px;
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
