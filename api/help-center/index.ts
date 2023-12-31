import { compressImg } from '@/utils/helper'
import { apiGetCall, apiPostCall } from '..'
import { Platform } from 'react-native'

export const getSupportRequests = async () => {
  const response = await apiGetCall('/user/help-center/list')
  return response.data
}

export const uploadImagesToSupportRequest = async (data: any) => {
  const image = await compressImg(data)

  const file = {
    uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
    type: 'image/jpeg',
    name: 'avatar.jpg'
  }

  const formData = new FormData()
  formData.append('images', file as any)

  const response = await apiPostCall(
    '/user/help-center/upload-image',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  return response.data
}

export const createSupportRequest = async (data: any) => {
  const response = await apiPostCall('/user/help-center/new-help-center', data)
  return response.data
}

export const getSupportRequestDetail = async (id: string) => {
  const response = await apiGetCall(`/user/help-center/${id}`)
  return response.data
}

export const closeSupportRequest = async (id: string) => {
  const response = await apiPostCall(`/user/help-center/${id}/close`)
  return response.data
}
