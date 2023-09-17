import { AuthenProps } from '@/types/Authen.type'
import { apiPostCall } from '..'

export const loginUser = async (data: AuthenProps) => {
  const response = await apiPostCall('/user/public/login', {
    username: data.username,
    password: data.password
  })
  return response.data
}
