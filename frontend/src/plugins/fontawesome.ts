// src/plugins/fontawesome.ts

// 1. 导入核心库和Vue组件
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 2. 导入你需要使用的图标
// 我们只从 free-solid-svg-icons 中导入 faUsers 图标
import { faUsers } from '@fortawesome/free-solid-svg-icons'

// 3. 将图标添加到库中
// 这样做可以确保我们只打包用到的图标，实现按需引入
library.add(faUsers)

// 4. 导出一个插件对象，包含一个 install 方法
export default {
  install: (app: any) => {
    // 在整个应用中注册 FontAwesomeIcon 组件，使其全局可用
    app.component('FontAwesomeIcon', FontAwesomeIcon)
  }
}
