import { AuthenProps } from '@/types/Authen.type'
import { apiPostCall, loginConfig } from '..'

export const loginUser = async (data: AuthenProps) => {
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
