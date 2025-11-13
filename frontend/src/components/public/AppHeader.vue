<template>
  <header class="app-header">
    <div class="header-left">
      <router-link to="/main/home" class="logo-link">
        <span class="logo-icon">M</span>
        <span class="logo-text">Match It!</span>
      </router-link>
    </div>

    <div class="header-center">
      <SearchBar @search="handleSearch" />
    </div>

    <div class="header-right">
      <button class="icon-button notification-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        <span class="badge">0</span>
      </button>

      <ThemeSwitch />

      <router-link to="/main/profile" class="user-avatar-link">
        <img src="https://placehold.co/40x40/4b7bec/ffffff?text=U" alt="User Avatar" class="user-avatar">
      </router-link>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchBar from './SearchBar.vue'
import ThemeSwitch from './ThemeSwitch.vue'

export default defineComponent({
  name: 'AppHeader',
  components: {
    SearchBar,
    ThemeSwitch
  },
  setup() {
    const handleSearch = (text: string) => {
      console.log('Executing search:', text)
      // TODO: Implement search logic here
    }

    return {
      handleSearch
    }
  },
})
</script>

<style scoped>
.app-header {
  /* Use background-color for smooth transition, and background-image for the gradient */
  background-color: var(--header-base-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  height: 60px;
  transition: var(--transition-duration);
}

.header-left {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.header-center {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 30px;
}

.logo-link {
  text-decoration: none;
  color: var(--logo-link-color);
  transition: var(--transition-duration);
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  font-size: 24px;
  font-weight: 700;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: var(--logo-icon-color);
  transition: var(--transition-duration);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo-text {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 1px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-right: 40px;
}

.icon-button {
  background: none;
  border: none;
  color: var(--icon-button-color);
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  position: relative;
}

.icon-button:hover {
  background-color: var(--icon-button-hover-color);
}

.icon-button svg {
  width: 20px;
  height: 20px;
}

.badge {
  position: absolute;
  top: 8px;
  right: 8px;
  transform: translate(50%, -50%);
  background-color: var(--badge-background-color);
  color: var(--badge-color);
  border-radius: 50%;
  font-size: 10px;
  line-height: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12px;
  height: 12px;
  padding: 0;
  transition: var(--transition-duration);
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid white;
  object-fit: cover;
  transition: opacity 0.3s;
}

.user-avatar-link:hover .user-avatar {
  opacity: 0.8;
}

@media (max-width: 1200px) {
  .header-center {
    margin: 0 20px;
  }
}

@media (max-width: 768px) {
  .header-center {
    display: none;
  }
  .app-header {
    padding: 0 15px;
  }
}
</style>
