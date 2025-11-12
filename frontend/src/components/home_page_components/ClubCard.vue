<template>
  <div class="club-card" @click="goToClubDetail">
    <div class="card-header">
      <img :src="club.logoUrl || defaultLogo" alt="Club Logo" class="club-logo" />
      <div class="club-info">
        <h3 class="club-name">{{ club.name }}</h3>
        <div class="club-meta">
          <span><FontAwesomeIcon icon="users" class="icon" /> {{ club.memberCount }} 成员</span>
        </div>
      </div>
    </div>
    <p class="club-description">{{ truncatedDescription }}</p>
    <div class="club-tags">
      <span v-for="tag in club.tags.slice(0, 3)" :key="tag" class="tag">{{ tag }}</span>
    </div>
    <div class="card-footer">
      <span v-if="club.isJoined" class="joined-status">已加入</span>
      <button v-else class="join-button" @click.stop="handleJoin">申请加入</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { ClubSummary } from '@/api/modules/club'
import defaultLogo from '@/assets/images/Castorice.jpg' // 后台没有提供社团自己的logo时的占位图片

const props = defineProps<{
  club: ClubSummary
}>()

const router = useRouter()

const truncatedDescription = computed(() => {
  const maxLength = 40
  if (props.club.description.length > maxLength) {
    return props.club.description.substring(0, maxLength) + '...'
  }
  return props.club.description
})

const goToClubDetail = () => {
  router.push({ name: 'ClubDetailPage', params: { id: props.club.id } })
}

const handleJoin = () => {
  // TODO: 实现加入社团的逻辑
  console.log(`Request to join club ${props.club.id}`)
  alert(`申请加入【${props.club.name}】的功能待实现！`)
}
</script>

<style scoped>
.club-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%; /* 确保卡片在网格布局中高度一致 */
}

.club-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.club-logo {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid #f0f0f0;
}

.club-info {
  flex: 1;
}

.club-name {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.club-meta {
  font-size: 13px;
  color: #888;
  margin-top: 5px;
}

.club-meta .icon {
  margin-right: 5px;
}

.club-description {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 15px;
  flex-grow: 1; /* 让描述占据多余空间，使底部对齐 */
}

.club-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.tag {
  background-color: #f4f7fa;
  color: #555;
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 12px;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: auto; /* 将页脚推到底部 */
}

.joined-status {
  font-size: 14px;
  color: #27ae60;
  font-weight: 500;
}

.join-button {
  background-color: #4b7bec;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.join-button:hover {
  background-color: #3a66d1;
}
</style>
