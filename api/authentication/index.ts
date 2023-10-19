import { LoginFormSchema, PasswordInitSchema } from '@/schemas/auth-schema'
import { PhoneSchema } from '@/schemas/phone-schema'
import { getToken } from '@/utils/helper'
import { Platform } from 'react-native'
import { apiGetCall, apiPostCall } from '..'

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

export const getRegisteredPhoneNumber = async () => {
  const token = await getToken('access_token')

  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await apiGetCall('/user/profile/phone-number', config)
  return response.data
}

export const confirmPhoneNumber = async (data: PhoneSchema) => {
  const token = await getToken('access_token')

  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await apiPostCall(
    '/user/profile/confirm-phone-number',
    data,
    config
  )
  return response.data
}
