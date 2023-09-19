import { LoginFormType } from '@/types/Authen.type'
import { apiPostCall, loginConfig } from '..'

export const loginUser = async (data: LoginFormType) => {
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
