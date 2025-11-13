<template>
  <div class="login-form">
    <input class='usr-input' v-model="username" type="text" placeholder="Username" />
    <input class='usr-input' v-model="password" type="password" placeholder="Password" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'LoginForm',
  props: {},
  setup() {
    const username = ref('')
    const password = ref('')
    return { username, password }
  },
})
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px; /* 增加间距 */
}
input {
  padding: 10px 0;
  font-size: 16px;
  border: none;
  border-bottom: var(--input-border-buttom);
  outline: none;
  transition: tranform var(--transition-duration),border-bottom-color 0.3s ease; /* 动态效果 */
  color: #333;
}
.usr-input{
  background-color: var(--widget-color);
  transition: var(--transition-duration);
}
/* 焦点时的高亮效果 */
input:focus {
  border-bottom-color:var(--input-focus-border-buttom-color);
  transition: 0.3s ease;
}
</style>
