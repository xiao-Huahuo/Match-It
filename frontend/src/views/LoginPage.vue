<template>
  <div class="login-page">
    <!-- 员工通道,到时候删除 -->
    <div class="employee-link">
      <router-link to="/main">详情</router-link>
    </div>
    <!--------------------------->
    <h1>Login</h1>
    <LoginForm />
    <LoginButton @login-clicked="handleLogin" />
    <RegisterLink />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import LoginForm from '@/components/login_page_components/LoginForm.vue'
import LoginButton from '@/components/login_page_components/LoginButton.vue'
import RegisterLink from '@/components/login_page_components/RegisterLink.vue'
import { login } from '@/api/modules/user'

export default defineComponent({
  name: 'LoginPage',
  components: { LoginForm, LoginButton, RegisterLink },
  setup() {
    const username = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const router = useRouter()

    const handleLogin = async () => {
      errorMessage.value = ''
      const res = await login(username.value, password.value)

      if (res.success && res.token) {
        // 登录成功
        localStorage.setItem('token', res.token)
        await router.push('/main') // 跳转到主页面
      } else {
        // 登录失败
        errorMessage.value = res.message || '登录失败'
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
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  gap: 20px;
}
</style>
