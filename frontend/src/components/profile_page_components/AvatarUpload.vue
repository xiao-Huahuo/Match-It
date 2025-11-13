<template>
  <div class="avatar-upload-card">
    <h2 class="card-title">头像设置</h2>

    <div class="current-avatar-section">
      <h3>当前头像</h3>
      <img :src="userStore.userInfo?.avatarUrl || defaultAvatar" alt="Current Avatar" class="current-avatar" />
    </div>

    <div class="upload-section">
      <h3>上传新头像</h3>
      <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" class="file-input" />
      <button @click="triggerFileInput" class="select-file-button">选择图片</button>
      <span v-if="selectedFile" class="selected-file-name">{{ selectedFile.name }}</span>
      <button @click="uploadAvatar" :disabled="!selectedFile || isUploading" class="upload-button">
        {{ isUploading ? '上传中...' : '上传' }}
      </button>
    </div>

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { uploadAvatar as uploadAvatarApi } from '@/api/modules/user'
import defaultAvatar from '@/assets/images/default_avatar.png' // 假设有一个默认头像图片

const userStore = useUserStore()
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const isUploading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

onMounted(async () => {
  if (!userStore.userInfo) {
    await userStore.fetchUserProfile()
  }
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  errorMessage.value = ''
  successMessage.value = ''
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0]
  } else {
    selectedFile.value = null
  }
}

const uploadAvatar = async () => {
  if (!selectedFile.value) {
    errorMessage.value = '请先选择一个图片文件。'
    return
  }

  errorMessage.value = ''
  successMessage.value = ''
  isUploading.value = true

  try {
    const res = await uploadAvatarApi(selectedFile.value)
    if (res.success) {
      successMessage.value = '头像上传成功！'
      // 更新 store 中的 userInfo
      if (userStore.userInfo) {
        userStore.userInfo.avatarUrl = res.data.avatarUrl
      }
      selectedFile.value = null // 清除已选文件
      if (fileInput.value) {
        fileInput.value.value = '' // 清空文件输入框
      }
    } else {
      errorMessage.value = res.message || '头像上传失败。'
    }
  } catch (error: any) {
    errorMessage.value = error.message || '网络请求失败，请重试。'
  } finally {
    isUploading.value = false
  }
}
</script>

<style scoped>
.avatar-upload-card {
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

.current-avatar-section, .upload-section {
  margin-bottom: 30px;
}

h3 {
  font-size: 18px;
  color: var(--font-color);
  margin-bottom: 15px;
}

.current-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--primary-color);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.file-input {
  display: none; /* 隐藏原生文件输入框 */
}

.select-file-button, .upload-button {
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  transition: all 0.3s ease;
  margin-right: 15px;
  border: none;
}

.select-file-button {
  background-color: #6c757d;
  color: white;
}

.select-file-button:hover {
  background-color: #5a6268;
}

.upload-button {
  background-color: var(--primary-color);
  color: white;
}

.upload-button:hover:not(:disabled) {
  background-color: var(--primary-color-dark);
}

.upload-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.selected-file-name {
  font-size: 14px;
  color: var(--sub-font-color);
  margin-right: 15px;
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
