<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useThemeStore } from '@/stores/modules/theme';

export default defineComponent({
  name: 'App',
  setup() {
    const themeStore = useThemeStore();

    // When the component is mounted (app starts), initialize the theme.
    // This will read from localStorage and apply the correct class to the body.
    onMounted(() => {
      themeStore.initializeTheme();
    });

    return {};
  },
});
</script>

<style>
/*
  Global styles can be placed here.
  The theme variables will be defined in a separate theme.scss file.
*/
</style>
