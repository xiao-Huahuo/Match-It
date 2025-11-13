<template>
  <div class="login-link">
    <router-link to="/login">Already have an account? Login</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginLink',
})
</script>

<style scoped>
.login-link {
  /* 调整位置，在新的卡片布局中居中 */
  position: static;
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
}

.login-link a {
  color: var(--register-link-color);
  text-decoration: none;
  transition: transform var(--transition-duration),color 0.3s ease, text-decoration 0.3s ease;
}

.login-link a:hover {
  color: var(--register-link-a-hover-color);
  transition: var(--transition-duration);
  text-decoration: underline; /* 悬停时出现下划线 */
}
</style>
