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
  /* 调整位置，在卡片布局中居中 */
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
}

.login-link a {
  color: #007bff; /* 蓝色链接 */
  text-decoration: none;
  transition: color 0.3s ease, text-decoration 0.3s ease;
}

.login-link a:hover {
  color: #0056b3;
  text-decoration: underline; /* 悬停时出现下划线 */
}

.login-link a strong {
  font-weight: 500;
}
</style>
