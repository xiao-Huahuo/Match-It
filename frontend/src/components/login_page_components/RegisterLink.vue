<template>
  <div class="register-link">
    <router-link to="/register">Don't have an account? Register</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RegisterLink',
})
</script>

<style scoped>
.register-link {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 14px;
}
</style>
