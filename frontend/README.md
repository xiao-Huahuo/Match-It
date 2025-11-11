# 前端项目架构
### 问AI: 当构建项目全架构时
> 这是我的前端项目目前的全代码和项目的readme,现在已经实现了最基础的登录界面逻辑,你来帮我构造一下这个前端vue项目应该的目录结构(只需要目录结构).
> 要求:components里面存放的组件,公共组件放在public下,否则放在对应页面的页面组件名字改成蛇形命名+_components这样的命名的文件夹下.
> 你需要输出的东西:
> 1.一个对于项目的结构的思考,项目应该如何布置页面,处理readme的项目要求的结构应该是怎样的;
> 2.实现你的想法的源代码结构(只需要结构);
> 3.前后端通信的api协议(yaml).

---
# 项目结构

   ### 页面布局分析

   根据 README 的功能需求，项目页面应划分为清晰的层级结构：

   **一级路由（独立页面）：**

    * `/login`, `/register`: 登录/注册页面，作为用户认证的入口。
    * `/main`: 主页面框架，负责集成应用的**导航栏**和**侧边栏**。

   **二级路由（主页面内的子页面）：**

   所有业务功能页面都嵌套在 `/main` 框架内。

    * `/main/home`: 首页 / 社团广场
    * `/main/profile`: 个人中心
    * `/main/club/:id`: 社团详情
    * `/main/club/:id/manage`: 社团管理（**仅管理员可见**）
    * `/main/activities`: 活动中心
    * `/main/messages`: 消息中心
    * `/main/analytics`: 数据分析（**需权限控制**）
    * `/main/system`: 系统管理（**仅系统管理员可见**）

   ### 权限层级处理

   为确保应用安全，将采用多层权限校验机制：

    * **路由守卫 (Router Guards):** 在 `router` 配置中实现前置权限检查和鉴权。
    * **组件级权限 (Component Level):** 使用自定义指令 `v-permission` 对页面元素进行显示或隐藏控制。
    * **API 层权限 (API Level):** 前端统一处理后端返回的 `403 Forbidden` 响应，进行统一的权限提示。

### 源代码目录结构
```markdown
   frontend/
   ├── public/
   │   ├── AI_train_text.md
   │   └── favicon.ico
   ├── src/
   │   ├── api/                         # API接口层
   │   │   ├── modules/                 # 按模块划分API
   │   │   │   ├── routes.js            # 存储全局前后端通信API
   │   │   │   ├── ApiClient.js         # 对所有的API路由进行过滤的client
   │   │   │   ├── user.js              # 用户相关API
   │   │   │   ├── club.js              # 社团相关API
   │   │   │   ├── activity.js          # 活动相关API
   │   │   │   ├── message.js           # 消息相关API
   │   │   │   ├── analytics.js         # 数据分析API
   │   │   │   ├── finance.js           # 财务报销API
   │   │   │   └── system.js            # 系统管理API
   │   │   └── types/                   # API类型定义
   │   │       ├── user.d.ts
   │   │       ├── club.d.ts
   │   │       ├── activity.d.ts
   │   │       ├── message.d.ts
   │   │       ├── analytics.d.ts
   │   │       └── common.d.ts
   │   │
   │   ├── assets/                       # 静态资源
   │   │   ├── images/
   │   │   ├── icons/
   │   │   └── styles/
   │   │       ├── variables.scss        # 全局变量
   │   │       ├── mixins.scss           # 全局混入
   │   │       └── theme.scss            # 主题样式
   │   │
   │   ├── components/                   # 组件
   │   │   ├── public/                   # 公共组件
   │   │   │   ├── AppHeader.vue         # 顶部导航栏
   │   │   │   ├── AppSidebar.vue        # 侧边栏
   │   │   │   ├── AppFooter.vue         # 页脚
   │   │   │   ├── ThemeSwitch.vue       # 主题切换
   │   │   │   ├── SearchBar.vue         # 搜索框
   │   │   │   ├── TagSelector.vue       # 标签选择器
   │   │   │   ├── FileUploader.vue      # 文件上传
   │   │   │   ├── DataTable.vue         # 数据表格
   │   │   │   ├── Pagination.vue        # 分页器
   │   │   │   ├── Modal.vue             # 弹窗
   │   │   │   ├── ConfirmDialog.vue     # 确认对话框
   │   │   │   └── LoadingSpinner.vue    # 加载动画
   │   │   │
   │   │   ├── login_page_components/    # 登录页组件
   │   │   │   ├── LoginForm.vue
   │   │   │   ├── LoginButton.vue
   │   │   │   └── RegisterLink.vue
   │   │   │
   │   │   ├── home_page_components/     # 首页组件
   │   │   │   ├── CarouselBanner.vue    # 轮播图
   │   │   │   ├── ClubCard.vue          # 社团卡片
   │   │   │   ├── ClubList.vue          # 社团列表
   │   │   │   ├── RecommendSection.vue  # 推荐区域
   │   │   │   └── AnnouncementBoard.vue # 公告板
   │   │   │
   │   │   ├── profile_page_components/  # 个人中心组件
   │   │   │   ├── UserInfo.vue          # 用户信息
   │   │   │   ├── AvatarUpload.vue      # 头像上传
   │   │   │   ├── InterestTags.vue      # 兴趣标签
   │   │   │   ├── MyClubs.vue           # 我的社团
   │   │   │   └── MyActivities.vue      # 我的活动
   │   │   │
   │   │   ├── club_page_components/     # 社团详情页组件
   │   │   │   ├── ClubHeader.vue        # 社团头部
   │   │   │   ├── ClubInfo.vue          # 社团简介
   │   │   │   ├── ClubMembers.vue       # 成员列表
   │   │   │   ├── ClubActivities.vue    # 活动列表
   │   │   │   ├── ClubAnnouncements.vue # 公告列表
   │   │   │   ├── JoinButton.vue        # 加入按钮
   │   │   │   └── ApplyForm.vue         # 申请表单
   │   │   │
   │   │   ├── club_manage_components/   # 社团管理组件
   │   │   │   ├── ClubEditor.vue        # 社团信息编辑
   │   │   │   ├── MemberManager.vue     # 成员管理
   │   │   │   ├── RoleManager.vue       # 角色权限管理
   │   │   │   ├── ActivityPublisher.vue # 活动发布器
   │   │   │   ├── AnnouncementPublisher.vue # 公告发布
   │   │   │   ├── ApplicationReviewer.vue # 申请审核
   │   │   │   └── BatchImporter.vue     # 批量导入
   │   │   │
   │   │   ├── activity_page_components/ # 活动中心组件
   │   │   │   ├── ActivityCard.vue      # 活动卡片
   │   │   │   ├── ActivityList.vue      # 活动列表
   │   │   │   ├── ActivityDetail.vue    # 活动详情
   │   │   │   ├── SignInButton.vue      # 签到按钮
   │   │   │   ├── FeedbackForm.vue      # 反馈表单
   │   │   │   └── VotePanel.vue         # 投票面板
   │   │   │
   │   │   ├── message_page_components/  # 消息中心组件
   │   │   │   ├── MessageList.vue       # 消息列表
   │   │   │   ├── MessageItem.vue       # 消息项
   │   │   │   ├── MessageComposer.vue   # 消息编辑器
   │   │   │   └── MailBox.vue           # 邮箱
   │   │   │
   │   │   ├── analytics_page_components/ # 数据分析组件
   │   │   │   ├── ChartCard.vue         # 图表卡片
   │   │   │   ├── ActivityChart.vue     # 活跃度图表
   │   │   │   ├── ParticipationChart.vue # 参与度图表
   │   │   │   ├── AttendanceTable.vue   # 考勤表
   │   │   │   ├── InventoryTable.vue    # 物资台账
   │   │   │   └── FeedbackSummary.vue   # 反馈汇总
   │   │   │
   │   │   └── finance_components/       # 财务报销组件
   │   │       ├── ExpenseForm.vue       # 报销申请表
   │   │       ├── ExpenseList.vue       # 报销列表
   │   │       └── ApprovalPanel.vue     # 审批面板
   │   │
   │   ├── composables/                  # 组合式函数
   │   │   ├── useAuth.ts                # 认证相关
   │   │   ├── useTheme.ts               # 主题切换
   │   │   ├── usePermission.ts          # 权限检查
   │   │   ├── useNotification.ts        # 通知
   │   │   └── usePagination.ts          # 分页
   │   │
   │   ├── directives/                   # 自定义指令
   │   │   ├── permission.ts             # 权限指令
   │   │   └── loading.ts                # 加载指令
   │   │
   │   ├── router/                       # 路由
   │   │   ├── guards/                   # 路由守卫
   │   │   │   ├── auth.ts               # 认证守卫
   │   │   │   └── permission.ts         # 权限守卫
   │   │   ├── modules/                  # 路由模块
   │   │   │   ├── main.ts
   │   │   │   ├── club.ts
   │   │   │   └── system.ts
   │   │   └── index.ts
   │   │
   │   ├── stores/                       # Pinia状态管理
   │   │   ├── modules/
   │   │   │   ├── user.ts               # 用户状态
   │   │   │   ├── club.ts               # 社团状态
   │   │   │   ├── theme.ts              # 主题状态
   │   │   │   └── message.ts            # 消息状态
   │   │   └── index.ts
   │   │
   │   ├── utils/                        # 工具函数
   │   │   ├── request.ts                # 请求封装
   │   │   ├── storage.ts                # 本地存储
   │   │   ├── validation.ts             # 表单验证
   │   │   ├── format.ts                 # 格式化
   │   │   └── permission.ts             # 权限工具
   │   │
   │   ├── views/                        # 页面
   │   │   ├── LoginPage.vue             # 登录页
   │   │   ├── RegisterPage.vue          # 注册页
   │   │   ├── MainLayout.vue            # 主布局,所有需要导航栏和侧边栏的页面的共同父组件,一旦用户登录，就会进入这个布局，然后在这个布局内部切换子页面
   │   │   ├── HomePage.vue              # 首页
   │   │   ├── ProfilePage.vue           # 个人中心
   │   │   ├── ClubDetailPage.vue        # 社团详情
   │   │   ├── ClubManagePage.vue        # 社团管理
   │   │   ├── ActivityPage.vue          # 活动中心
   │   │   ├── MessagePage.vue           # 消息中心
   │   │   ├── AnalyticsPage.vue         # 数据分析
   │   │   ├── SystemPage.vue            # 系统管理
   │   │   └── NotFoundPage.vue          # 404页面
   │   │
   │   ├── App.vue
   │   └── main.ts
   │
   ├── .env.development                  # 开发环境配置
   ├── .env.production                   # 生产环境配置
   ├── package.json
   ├── tsconfig.json
   ├── vite.config.ts
   └── README.md
```