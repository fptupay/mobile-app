import { LoginFormSchema, PasswordInitSchema } from '@/schemas/auth-schema'
import { apiPostCall, loginConfig } from '..'
import { getToken } from '@/utils/helper'

export const loginUser = async (data: LoginFormSchema) => {
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
