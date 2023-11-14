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

export const changePhoneNumber = async (data: any) => {
  const response = await apiPostCall('/user/profile/change-phone-number', data)
  return response.data
}

export const changePhoneNumberConfirm = async (data: any) => {
  const response = await apiPostCall(
    '/user/profile/change-phone-number/confirm',
    data
  )
  return response.data
}
