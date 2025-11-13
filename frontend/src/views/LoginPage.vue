<template>
  <div class="login-page-container">
    <div class="login-card">
      <div class="employee-link">
        <router-link to="/main/home">员工通道-跳转到主页</router-link>
      </div>
      <h1>Login</h1>
      <LoginForm v-model:username="username" v-model:password="password" />
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <LoginButton @login-clicked="handleLogin" />
      <RegisterLink />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import LoginForm from '@/components/login_page_components/LoginForm.vue'
import LoginButton from '@/components/login_page_components/LoginButton.vue'
import RegisterLink from '@/components/login_page_components/RegisterLink.vue'
import { useUserStore } from '@/stores/modules/user'

export default defineComponent({
  name: 'LoginPage',
  components: { LoginForm, LoginButton, RegisterLink },
  setup() {
    const username = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const router = useRouter()
    const userStore = useUserStore()

    const handleLogin = async () => {
      errorMessage.value = ''
      try {
        const loginSuccess = await userStore.loginAction(username.value, password.value)
        if (loginSuccess) {
          await router.push('/main') // 跳转到主页面
        }
      } catch (error: any) {
        errorMessage.value = error.message || '登录时发生未知错误'
      }
    }

    return {
      username,
      password,
      handleLogin,
      errorMessage,
    }
  },
})
</script>

<style scoped>
/* 整个页面的容器，应用渐变背景 */
.login-page-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 蓝色渐变背景 */
  background: var(--login-page-container-background);
  transition: var(--transition-duration);
}

/* 登录卡片样式 */
.login-card {
  position: relative;
  background-color: var(--widget-color);
  transition: var(--transition-duration);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 25px; /* 增加组件间距 */
  width: 100%;
  max-width: 380px;
  animation: fadeIn 0.8s ease-out; /* 简单进入动画 */
}

h1 {
  font-size: 32px;
  color: var(--font-color);
  transition: var(--transition-duration);
  margin-bottom: 5px;
  text-align: center;
  font-weight: 300;
}

.error-message {
  color: #e74c3c;
  font-size: 14px;
  text-align: center;
  margin-top: -15px;
  animation: shake 0.5s; /* 错误提示的抖动动画 */
}

/* 员工通道链接的样式调整 */
.employee-link {
  position: absolute;
  top: 15px;
  left: 15px;
  font-size: 12px;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.employee-link:hover {
  opacity: 1;
}

.employee-link a {
  color: var(--sub-font-color);
  transition: var(--transition-duration);
  text-decoration: none;
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
