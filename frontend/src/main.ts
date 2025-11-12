import { createApp } from 'vue'
import pinia from './stores' // Import the central Pinia instance
import App from './App.vue'
import router from './router' // Import router
import fontawesome from './plugins/fontawesome' // Import Font Awesome plugin

// Import the global stylesheet here, and only here.
import './assets/styles/theme.scss';

const app = createApp(App)

app.use(pinia) // Use the central Pinia instance
app.use(router) // Use router
app.use(fontawesome) // Use Font Awesome plugin
app.mount('#app')
