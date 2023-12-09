import { PasswordInitSchema } from '@/schemas/auth-schema'
import { apiGetCall, apiPostCall } from '..'
import { Platform } from 'react-native'
import { compressImg } from '@/utils/helper'

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

export const getUserAvatar = async () => {
  const response = await apiGetCall('/user/avatar')
  return response.data
}

export const uploadUserAvatar = async (data: string) => {
  const image = await compressImg(data)

  const file = {
    uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
    type: 'image/jpeg',
    name: 'avatar.jpg'
  }

  const formData = new FormData()
  formData.append('image', file as any)

  const response = await apiPostCall('/user/avatar/change', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}
