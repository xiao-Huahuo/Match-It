<template>
  <div class="register-link">
    <router-link to="/register">Don't have an account? Register</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RegisterLink',
})
</script>

<style scoped>
.register-link {
  /* 调整位置，在新的卡片布局中居中 */
  position: static;
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
}

.register-link a {
  color: var(--register-link-color);
  text-decoration: none;
  transition: transform var(--transition-duration),color 0.3s ease, text-decoration 0.3s ease;
}

.register-link a:hover {
  color: var(--register-link-a-hover-color);
  transition: var(--transition-duration);
  text-decoration: underline; /* 悬停时出现下划线 */
}
</style>
