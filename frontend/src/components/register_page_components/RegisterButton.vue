<template>
  <button @click="$emit('register-clicked')">Register</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RegisterButton',
  emits: ['register-clicked'],
})
</script>

<style scoped>
button {
  padding: 12px 20px;
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;
  /* 蓝色渐变 */
  background: var(--login-button-background);
  color: var(--login-button-color);
  border: none;
  border-radius: 25px; /* 圆角胶囊按钮 */
  box-shadow: var(--login-button-box-shadow);
  transition: transform var(--transition-duration),all 0.3s ease;
  letter-spacing: 1px;
}
button:hover {
  /* 悬停时颜色加深，阴影加强 */
  background: var(--login-button-hover-background);
  box-shadow: var(--login-button-hover-box-shadow);
  transform: translateY(-2px); /* 略微抬升效果 */
  transition: var(--transition-duration);
}
button:active {
  /* 按下时的效果 */
  transform: translateY(0);
  box-shadow: var(--login-button-active-box-shadow);
  transition: var(--transition-duration);
}
</style>
