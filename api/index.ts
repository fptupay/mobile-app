import { getToken, saveToken } from '@/utils/helper'
import axios from 'axios'

export const refreshAccessToken = async () => {
  const token = await getToken('refresh_token')
  const response = await axios.post(
    '/user/public/auth/token/refresh',
    {
      refresh_token: token
    },
    {
      baseURL: 'https://gateway.fptupay.tech',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return response.data
}

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
  async (response) => {
    if (response.data?.httpStatus && response.data.httpStatus == '401') {
      const prevReq = response.config
      const newToken = await refreshAccessToken().then((res) => {
        return res.data.access_token
      })
      await saveToken({
        key: 'access_token',
        value: newToken
      })
      prevReq.headers.Authorization = newToken
      return axiosPrivate(prevReq)
    }
    return response
  },
  async (error) => {
    return Promise.reject(error)
  }
)

export const apiGetCall = async (url: string, config?: any) => {
  const response = await axiosPrivate.get(url, config)
  return response
}

export const apiPostCall = async (
  url: string,
  data?: unknown,
  config?: any
) => {
  const response = await axiosPrivate.post(url, data, config)
  return response
}
