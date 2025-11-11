<template>
  <div class="register-page">
    <h1>Register</h1>
    <form class="register-form">
      <input v-model="username" type="text" placeholder="Username" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click.prevent="handleRegister">Register</button>
    </form>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/api/modules/user'

export default defineComponent({
  name: 'RegisterPage',
  setup() {
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const successMessage = ref('')
    const router = useRouter()

    const handleRegister = async () => {
      errorMessage.value = ''
      successMessage.value = ''

      try {
        const res = await register(username.value, password.value)
        if (res.success) {
          successMessage.value = '注册成功，请登录'
          setTimeout(() => router.push('/login'), 1000)
        } else {
          errorMessage.value = res.message || '注册失败'
        }
      } catch (err) {
        errorMessage.value = '请求失败，请重试'
        console.error(err)
      }
    }

    return {
      username,
      email,
      password,
      handleRegister,
      errorMessage,
      successMessage,
    }
  },
})
</script>

<style scoped>
.register-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}
.register-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
input,
button {
  padding: 8px;
  font-size: 16px;
}
button {
  cursor: pointer;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 5px;
}
button:hover {
  background-color: #1976d2;
}
.error-message {
  color: red;
  margin-top: 10px;
}
.success-message {
  color: green;
  margin-top: 10px;
}
</style>
