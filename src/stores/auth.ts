import { push } from 'notivue'
import { defineStore } from 'pinia'
import router from '@/router'
import api from '@/services/api'
import { useAppStore } from './app'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') as string)
      : null,
    accessToken: localStorage.getItem('accessToken')
      ? JSON.parse(localStorage.getItem('accessToken') as string)
      : null,
    refreshToken: localStorage.getItem('refreshToken')
      ? JSON.parse(localStorage.getItem('refreshToken') as string)
      : null,
  }),
  getters: {
    isAuthenticated: state => !!state.accessToken,
    isAdmin: state => state.user?.roles.includes('editor'),
  },
  actions: {
    setTokens ({
      accessToken,
      refreshToken,
    }: {
      accessToken: string
      refreshToken: string
    }) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      localStorage.setItem('accessToken', JSON.stringify(accessToken))
      localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
    },
    setUser (user: any) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    async login (params: any) {
      const appStore = useAppStore()
      appStore.setLoading(true)
      try {
        const res = await api.post('/auth/login', params)
        const { accessToken, refreshToken, user } = res.data
        this.setTokens({ accessToken, refreshToken })
        this.setUser(user)
        push.success({ title: 'Success', message: 'Logged in successfully!' })
        router.push({ path: '/' })
      } catch (error: any) {
        push.error({ title: 'Error', message: 'Login failed!' })
        console.error(error)
      } finally {
        appStore.setLoading(false)
      }
    },
    async logout () {
      const appStore = useAppStore()
      appStore.setLoading(true)
      try {
        await api.delete('/auth/logout', {
          data: { token: this.refreshToken },
        })
      } catch (error) {
        console.error(error)
      } finally {
        this.accessToken = null
        this.refreshToken = null
        this.user = null
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        router.push({ path: '/login' })
        appStore.setLoading(false)
      }
    },
    async register (params: any) {
      const appStore = useAppStore()
      appStore.setLoading(true)
      try {
        await api.post('/auth/register', params)
        push.success({
          title: 'Success',
          message: 'User created successfully!',
        })
        router.push({ path: '/login' })
      } catch (error: any) {
        push.error({
          title: 'Registration failed',
          message: error.response.data.msg,
        })
        console.error(error)
      } finally {
        appStore.setLoading(false)
      }
    },
  },
})
