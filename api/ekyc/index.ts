import { compressImg, getToken } from '@/utils/helper'
import { apiPostCall } from '..'
import { CameraCapturedPicture } from 'expo-camera'

export const ekycFront = async (data: CameraCapturedPicture) => {
  const token = await getToken('access_token')

  const image = await compressImg(data)

  const file = {
    uri: image.uri.replace('file://', ''),
    type: 'image/jpeg',
    name: 'front.jpg'
  }

  const formData = new FormData()
  formData.append('image', file as any)

  const response = await apiPostCall(
    '/user/ekyc/recognition-id/front',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token
      }
    }
  )
  return response.data
}

export const ekycBack = async (data: CameraCapturedPicture, id: string) => {
  const token = await getToken('access_token')

  const image = await compressImg(data)

  const file = {
    uri: image.uri.replace('file://', ''),
    type: 'image/jpeg',
    name: 'back.jpg'
  }

  const formData = new FormData()
  formData.append('image', file as any)
  formData.append('ekyc-id', id)

  const response = await apiPostCall(
    '/user/ekyc/recognition-id/back',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token
      }
    }
  )
  return response.data
}
