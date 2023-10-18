import { LoginFormSchema, PasswordInitSchema } from '@/schemas/auth-schema'
import { apiPostCall } from '..'
import { getToken } from '@/utils/helper'
import axios from 'axios'
import { Platform } from 'react-native'

export const refreshAccessToken = async () => {
  const token = await getToken('refresh_token')

  const response = await axios.post('/user/public/auth/token/refresh', {
    refresh_token: token
  })
  return response.data
}

export const loginUser = async (data: LoginFormSchema) => {
  const loginConfig = {
    headers: {
      'x-client-device-id': 'QEIERUEWHRBWEUIEFIDUQHWWUEHE',
      'x-client-platform-version': Platform.Version.toString(),
      'x-client-platform': Platform.OS
    }
  }

  const response = await apiPostCall(
    '/user/public/login',
    {
      username: data.username,
      password: data.password
    },
    loginConfig
  )
  return response.data
}

export const logoutUser = async () => {
  const token = await getToken('access_token')

  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await apiPostCall('/user/logout', config)
  return response.data
}

export const changePasswordInit = async (data: PasswordInitSchema) => {
  const token = await getToken('access_token')

  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await apiPostCall(
    '/user/profile/change-password-init',
    data,
    config
  )
  return response.data
}
