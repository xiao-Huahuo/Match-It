import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router' //导入路由
import fontawesome from './plugins/fontawesome' // 导入 Font Awesome 插件

const app = createApp(App)

app.use(createPinia())
app.use(router) //使用路由
app.use(fontawesome) // 使用 Font Awesome 插件
app.mount('#app')
