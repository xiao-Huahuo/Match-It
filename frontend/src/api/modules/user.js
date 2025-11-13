import client from './ApiClient.js'
import routes from './routes.js'

/**
 * 用户登录
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @returns {Promise<object>} 包含登录结果、token、用户信息的对象
 */
export async function login(username, password) {
  try {
    const response = await client.post(routes.LOGIN, { username, password })
    console.log('user.js -> loginApi: Raw response from Axios:', response);
    return response; // 直接返回 response
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || '登录失败，请稍后重试',
    }
  }
}

/**
 * 用户注册
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @param {string} email - 邮箱
 * @returns {Promise<object>} 包含注册结果的对象
 */
export async function register(username, password, email) {
  try {
    const response = await client.post(routes.REGISTER, { username, password, email })
    return response; // 直接返回 response
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || '注册失败，请检查您的输入',
    }
  }
}

/**
 * 获取当前用户个人信息
 * @returns {Promise<object>} 包含用户个人信息的对象
 */
export async function getUserProfile() {
  try {
    const response = await client.get(routes.GET_USER_PROFILE)
    return response; // 直接返回 response
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || '获取个人信息失败',
    }
  }
}

/**
 * 更新用户个人信息 (简介/兴趣标签)
 * @param {object} data - 包含要更新的简介和兴趣标签的对象
 * @returns {Promise<object>} 包含更新结果的对象
 */
export async function updateUserProfile(data) {
  try {
    const response = await client.put(routes.UPDATE_USER_PROFILE, data)
    return response; // 直接返回 response
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || '更新个人信息失败',
    }
  }
}

/**
 * 上传/更新用户头像
 * @param {File} file - 头像图片文件
 * @returns {Promise<object>} 包含新头像URL的对象
 */
export async function uploadAvatar(file) {
  try {
    const formData = new FormData()
    formData.append('file', file)
    const response = await client.post(routes.UPLOAD_AVATAR, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response; // 直接返回 response
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || '头像上传失败',
    }
  }
}

/**
 * 获取当前用户加入的社团列表
 * @returns {Promise<object>} 包含社团列表的对象
 */
export async function getUserClubs() {
  try {
    const response = await client.get(routes.GET_USER_CLUBS)
    return response; // 直接返回 response
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || '获取用户社团失败',
    }
  }
}

/**
 * 获取当前用户报名的活动列表
 * @returns {Promise<object>} 包含活动列表的对象
 */
export async function getUserActivities() {
  try {
    const response = await client.get(routes.GET_USER_ACTIVITIES)
    return response; // 直接返回 response
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || '获取用户活动失败',
    }
  }
}

/**
 * 获取当前用户权限列表
 * @returns {Promise<object>} 包含权限列表的对象
 */
export async function getUserPermissions() {
  try {
    const response = await client.get(routes.GET_USER_PERMISSIONS)
    return response; // 直接返回 response
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || '获取用户权限失败',
    }
  }
}
