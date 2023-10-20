import { LoginFormSchema, PasswordInitSchema } from '@/schemas/auth-schema'
import { apiPostCall } from '..'
import { Platform } from 'react-native'

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
  const response = await apiPostCall('/user/logout')
  return response.data
}

export const changePasswordInit = async (data: PasswordInitSchema) => {
  const response = await apiPostCall('/user/profile/change-password-init', data)
  return response.data
}
