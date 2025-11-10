<template>
  <div class="login-form">
    <input v-model="username" type="text" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
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
  gap: 10px;
}
input {
  padding: 8px;
  font-size: 16px;
}
</style>
