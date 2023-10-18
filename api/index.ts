import { getToken, saveToken } from '@/utils/helper'
import axios from 'axios'
import { refreshAccessToken } from './authentication'

export const axiosPrivate = axios.create({
  baseURL: 'https://gateway.fptupay.tech',
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosPrivate.interceptors.request.use(
  async (config) => {
    const token = await getToken('access_token')
    config.headers.Authorization = token
    return config
  },
  (error) => Promise.reject(error)
)

axiosPrivate.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const prevReq = error?.config
    if (error?.response?.status == 401 && !prevReq.sent) {
      prevReq.sent = true
      const newToken = await refreshAccessToken().then((res) => {
        return res.access_token
      })
      await saveToken({ key: 'access_token', value: newToken })
      prevReq.headers.Authorization = newToken
      return axiosPrivate(prevReq)
    }
    return Promise.reject(error)
  }
)

export const apiPostCall = async (
  url: string,
  data?: unknown,
  config?: any
) => {
  const response = await axiosPrivate.post(url, data, config)
  return response
}
