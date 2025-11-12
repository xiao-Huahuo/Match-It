<template>
  <div class="register-page-container">
    <div class="register-card">
      <h1>Register</h1>
      <RegisterForm
        v-model:username="username"
        v-model:email="email"
        v-model:password="password"
      />

      <div v-if="errorMessage" class="message error-message">{{ errorMessage }}</div>
      <div v-if="successMessage" class="message success-message">{{ successMessage }}</div>

      <RegisterButton @register-clicked="handleRegister" />

      <LoginLink />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/api/modules/user'

// 引入拆分的组件
import RegisterForm from '@/components/register_page_components/RegisterForm.vue'
import RegisterButton from '@/components/register_page_components/RegisterButton.vue'
import LoginLink from '@/components/register_page_components/LoginLink.vue'

export default defineComponent({
  name: 'RegisterPage',
  components: { RegisterForm, RegisterButton, LoginLink },
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

      if (!username.value || !email.value || !password.value) {
        errorMessage.value = '请填写所有必填字段'
        return
      }

      try {
        const res = await register(username.value, password.value, email.value)
        if (res.success) {
          successMessage.value = '注册成功，正在跳转到登录页面...'
          setTimeout(() => router.push('/login'), 1500)
        } else {
          errorMessage.value = res.message || '注册失败'
        }
      } catch (err: any) {
        errorMessage.value = err.message || '网络请求失败，请重试'
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
/* 继承 LoginPage 的整体样式 */
.register-page-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 蓝色渐变背景 */
  background: linear-gradient(135deg, #4b7bec 0%, #0099ff 100%);
}

.register-card {
  position: relative;
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
  max-width: 380px;
  animation: fadeIn 0.8s ease-out;
}

h1 {
  font-size: 32px;
  color: #333;
  margin-bottom: 5px;
  text-align: center;
  font-weight: 300;
}

/* 消息样式 */
.message {
  font-size: 14px;
  text-align: center;
  margin-top: -15px;
  padding: 8px;
  border-radius: 4px;
}

.error-message {
  color: #e74c3c;
  background-color: #fceae9;
  border: 1px solid #e74c3c;
  animation: shake 0.5s;
}

.success-message {
  color: #27ae60;
  background-color: #e9f5e9;
  border: 1px solid #27ae60;
}

/* 动画定义 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-5px); }
  40%, 80% { transform: translateX(5px); }
}
</style>
