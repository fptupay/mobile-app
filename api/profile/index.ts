import { PasswordInitSchema } from '@/schemas/auth-schema'
import { apiGetCall, apiPostCall } from '..'

export const getUserDetails = async () => {
  const response = await apiGetCall('/user/profile')
  return response.data
}

export const changePassword = async (data: PasswordInitSchema) => {
  const response = await apiPostCall('/user/profile/change-password', data)
  return response.data
}
