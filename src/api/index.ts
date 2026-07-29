import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
  // timeout: 5000,
})

service.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    // TODO: 获取token并添加到header
    return request
  },
  (error: AxiosError) => Promise.reject(error)
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code = 200, data } = response.data

    if (response.request.responseType === 'blob' || response.request.responseType === 'arraybuffer') {
      return response.data
    }

    // TODO: 401/403/非200异常处理 + 弹窗显示错误
    if (code === 200) {
      return Promise.resolve(data)
    }
  },
  (error: AxiosError) => {
    // TODO: 弹窗显示错误
    return Promise.reject(error)
  }
)

// TODO: 通用下载方法

export default service

export * from './modules/auth'
