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
  background-image: linear-gradient(to right, #007bff 0%, #4b7bec 100%);
  color: white;
  border: none;
  border-radius: 25px; /* 圆角胶囊按钮 */
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
  transition: all 0.3s ease;
  letter-spacing: 1px;
}
button:hover {
  /* 悬停时颜色加深，阴影加强 */
  background-image: linear-gradient(to right, #0056b3 0%, #3a5cbf 100%);
  box-shadow: 0 6px 20px rgba(0, 123, 255, 0.6);
  transform: translateY(-2px); /* 略微抬升效果 */
}
button:active {
  /* 按下时的效果 */
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(0, 123, 255, 0.4);
}
</style>
