<template>
  <div class="register-form">
    <input v-model="username" type="text" placeholder="Username" />
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'RegisterForm',
  props: {},
  setup() {
    const username = ref('')
    const email = ref('')
    const password = ref('')

    return { username, email, password }
  },
})
</script>

<style scoped>
.register-form {
  display: flex;
  flex-direction: column;
  gap: 20px; /* 增加间距 */
}
input {
  padding: 10px 0;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #ccc; /* 默认下划线 */
  outline: none;
  transition: border-bottom-color 0.3s ease; /* 动态效果 */
  color: #333;
}
/* 焦点时的蓝色高亮效果 */
input:focus {
  border-bottom-color: #007bff; /* 蓝色高亮 */
}
</style>
