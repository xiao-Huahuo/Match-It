import axios from 'axios'

const client = axios.create({
  baseURL: '/api', //为所有请求添加api前缀
  timeout: 5000,
})

// 请求拦截器（可选，方便加 token）
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error),
)

// 响应拦截器（可选，统一处理错误）
client.interceptors.response.use(
  (res) => res.data,
  (error) => {
    console.error('API error:', error)
    return Promise.reject(error)
  },
)

export default client
