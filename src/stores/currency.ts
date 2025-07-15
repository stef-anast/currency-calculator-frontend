import { push } from 'notivue'
import { defineStore } from 'pinia'
import api from '@/services/api'
import { useAppStore } from './app'

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    currencies: [] as string[],
  }),
  actions: {
    async getCurrencies () {
      const appStore = useAppStore()
      appStore.setLoading(true)
      try {
        const res = await api.get('/currencies')
        const { result } = res.data
        this.currencies = result.map((curr: any) => curr.symbol)
      } catch (error: any) {
        push.error({
          title: 'Error',
          message: error.response.data.msg,
        })
        console.error(error)
      } finally {
        appStore.setLoading(false)
      }
    },
    async convert (params: any) {
      const appStore = useAppStore()
      appStore.setLoading(true)
      try {
        const res = await api.post('currencies/convert', params)
        const { data } = res.data
        return data.convertedAmount
      } catch (error: any) {
        push.error({
          title: 'Error',
          message: error.response.data.msg,
        })
        console.error(error)
      } finally {
        appStore.setLoading(false)
      }
    },
    async createCurrency (params: any) {
      const appStore = useAppStore()
      appStore.setLoading(true)
      try {
        const res = await api.post('/currencies', params)
        push.success({ title: 'Success', message: res.data.msg })
        return res.data
      } catch (error: any) {
        push.error({
          title: 'Error',
          message: error.response.data.msg,
        })
        console.error(error)
      } finally {
        appStore.setLoading(false)
      }
    },
    async deleteExchangeRate (params: any) {
      const appStore = useAppStore()
      appStore.setLoading(true)
      try {
        const res = await api.delete('/currencies/rate', {
          data: { ...params },
        })
        push.success({
          title: 'Success',
          message: `${params.base}->${params.target} deleted.`,
        })
        return res.status
      } catch (error: any) {
        push.error({
          title: 'Error',
          message: error.response.data.msg,
        })
        console.error(error)
      } finally {
        appStore.setLoading(false)
      }
    },
    async deleteCurrency (params: any) {
      const appStore = useAppStore()
      appStore.setLoading(true)
      try {
        const res = await api.delete('/currencies', {
          data: { ...params },
        })
        push.success({
          title: 'Success',
          message: `${params.symbol} deleted successfully.`,
        })
        return res.status
      } catch (error: any) {
        push.error({
          title: 'Error',
          message: error.response.data.msg,
        })
        console.error(error)
      } finally {
        appStore.setLoading(false)
      }
    },
    async setExchangeRate (params: any) {
      const appStore = useAppStore()
      appStore.setLoading(true)
      try {
        const res = await api.put('/currencies/rate', params)
        push.success({ title: 'Success', message: res.data.msg })
        return res.data
      } catch (error: any) {
        push.error({
          title: 'Error',
          message: error.response.data.msg,
        })
        console.error(error)
      } finally {
        appStore.setLoading(false)
      }
    },
  },
})
