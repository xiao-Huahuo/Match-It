const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 8080;

// 配置中间件
app.use(bodyParser.json()); // 解析 JSON 格式的请求体
app.use(cors()); // 允许所有跨域请求，方便前端开发

// 模拟登录接口
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  console.log(`Received login attempt for username: ${username}`);

  // 模拟登录逻辑
  if (username === 'test' && password === '123456') {
    // 模拟登录成功响应，遵循 api.yaml 中的 AuthResponse 结构
    // 现在将 AuthResponse 的字段嵌套在 data 中
    res.status(200).json({
      success: true,
      data: { // <--- 修改这里，添加 data 属性
        token: 'mock-jwt-token-for-test-user-1234567890',
        userId: 1,
        username: 'test',
        roles: ['USER', 'MEMBER', 'ADMIN'], // 模拟拥有所有角色
      },
    });
    console.log(`Login successful for user: ${username}`);
  } else {
    // 模拟登录失败响应，遵循 api.yaml 中的 ErrorResponse 结构
    res.status(401).json({
      success: false,
      code: 401,
      message: '用户名或密码错误',
    });
    console.log(`Login failed for user: ${username}`);
  }
});

// 模拟获取用户个人信息接口
app.get('/api/user/profile', (req, res) => {
  // 检查 Authorization 头，模拟认证
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer mock-jwt-token')) {
    return res.status(401).json({
      success: false,
      code: 401,
      message: '未授权或Token无效',
    });
  }

  // 模拟返回用户个人信息，遵循 api.yaml 中的 UserProfile 结构
  res.status(200).json({
    success: true,
    data: {
      userId: 1,
      username: 'test',
      email: 'test@example.com',
      avatarUrl: 'https://placehold.co/150x150/4b7bec/ffffff?text=TestUser', // 模拟头像URL
      bio: '这是一个测试用户，热爱编程和模拟后端！',
      interestTags: ['编程', '模拟', '测试'],
      roles: ['USER', 'MEMBER', 'ADMIN'],
    },
  });
  console.log('User profile requested and returned.');
});

// 模拟更新用户个人信息接口
app.put('/api/user/profile', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer mock-jwt-token')) {
    return res.status(401).json({
      success: false,
      code: 401,
      message: '未授权或Token无效',
    });
  }

  const { bio, interestTags } = req.body;
  console.log('Received profile update:', { bio, interestTags });

  // 模拟更新成功
  res.status(200).json({
    success: true,
    message: '个人信息更新成功',
  });
});

// 模拟上传头像接口
app.post('/api/user/profile/avatar', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer mock-jwt-token')) {
    return res.status(401).json({
      success: false,
      code: 401,
      message: '未授权或Token无效',
    });
  }

  // 模拟文件上传成功，返回新的头像URL
  res.status(200).json({
    success: true,
    data: {
      avatarUrl: `https://placehold.co/150x150/ff0000/ffffff?text=NewAvatar_${Date.now()}`,
    },
  });
  console.log('Avatar uploaded successfully.');
});


// 模拟获取用户权限列表接口
app.get('/api/user/permissions', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer mock-jwt-token')) {
    return res.status(401).json({
      success: false,
      code: 401,
      message: '未授权或Token无效',
    });
  }

  // 模拟返回用户权限列表
  res.status(200).json({
    success: true,
    data: [
      'USER',
      'MEMBER',
      'ADMIN', // 模拟拥有所有权限
      'VIEW_ANALYTICS',
      'MANAGE_SYSTEM',
      'CLUB_CREATE',
      'ACTIVITY_PUBLISH',
      // ... 其他权限
    ],
  });
  console.log('User permissions requested and returned.');
});

// 模拟获取用户加入的社团列表
app.get('/api/user/clubs', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer mock-jwt-token')) {
    return res.status(401).json({
      success: false,
      code: 401,
      message: '未授权或Token无效',
    });
  }

  res.status(200).json({
    success: true,
    data: [
      {
        id: 101,
        name: '模拟编程社',
        description: '这是一个模拟的编程爱好者社团。',
        logoUrl: 'https://placehold.co/60x60/007bff/ffffff?text=Code',
        memberCount: 50,
        tags: ['编程', '技术', 'AI'],
        isJoined: true,
      },
      {
        id: 102,
        name: '模拟摄影社',
        description: '捕捉生活中的美好瞬间。',
        logoUrl: 'https://placehold.co/60x60/28a745/ffffff?text=Photo',
        memberCount: 30,
        tags: ['摄影', '艺术'],
        isJoined: true,
      },
    ],
  });
  console.log('User clubs requested and returned.');
});

// 模拟获取用户报名的活动列表
app.get('/api/user/activities', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer mock-jwt-token')) {
    return res.status(401).json({
      success: false,
      code: 401,
      message: '未授权或Token无效',
    });
  }

  res.status(200).json({
    success: true,
    data: [
      {
        id: 201,
        clubId: 101,
        clubName: '模拟编程社',
        title: '模拟编程分享会',
        startTime: new Date(Date.now() + 3600 * 1000).toISOString(), // 1小时后
        endTime: new Date(Date.now() + 7200 * 1000).toISOString(), // 2小时后
        location: '模拟教学楼A101',
        status: 'UPCOMING',
        enrollmentCount: 20,
        maxEnrollment: 50,
        isEnrolled: true,
      },
      {
        id: 202,
        clubId: 102,
        clubName: '模拟户外摄影活动',
        title: '模拟户外摄影活动',
        startTime: new Date(Date.now() - 24 * 3600 * 1000).toISOString(), // 1天前
        endTime: new Date(Date.now() - 20 * 3600 * 1000).toISOString(), // 20小时前
        location: '模拟公园',
        status: 'PAST',
        enrollmentCount: 15,
        maxEnrollment: 20,
        isEnrolled: true,
      },
    ],
  });
  console.log('User activities requested and returned.');
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Mock backend server running on http://localhost:${PORT}`);
  console.log('Test login with username: "test", password: "123456"');
});
