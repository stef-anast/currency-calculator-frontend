import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const API_URL = import.meta.env.VITE_API_URL

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authStore = useAuthStore()
    const token = authStore.accessToken
    if (token) {
      config.headers['x-auth-token'] = token
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (err: AxiosError | any) => {
    const originalConfig = err.config
    const authStore = useAuthStore()

    if (
      originalConfig
      && originalConfig.url !== '/auth/login'
      && err.response
      // access token expired
      && err.response.status === 401
      && !originalConfig._retry
    ) {
      originalConfig._retry = true
      try {
        const refreshToken = authStore.refreshToken
        const rs = await instance.post('/auth/refresh', {
          token: refreshToken,
        })
        const { accessToken } = rs.data
        authStore.accessToken = accessToken
        return instance(originalConfig)
      } catch (_error) {
        // logout user
        await authStore.logout()
        throw _error
      }
    }
    throw err
  },
)

export default instance
