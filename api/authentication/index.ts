import { LoginFormSchema } from '@/schemas/login-schema'
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
  const logoutConfig = {
    headers: {
      Authorization: getToken('access_token')
    }
  }
  const response = await apiPostCall('/user/logout', logoutConfig)
  return response.data
}
