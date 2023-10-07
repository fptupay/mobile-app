import { manipulateAsync } from 'expo-image-manipulator'
import { getToken } from '@/utils/helper'
import { apiPostCall } from '..'
import { CameraCapturedPicture } from 'expo-camera'

export const ekycFront = async (data: CameraCapturedPicture) => {
  const token = await getToken('access_token')

  const compressedImg = await manipulateAsync(
    data.uri,
    [
      {
        resize: {
          width: 400,
          height: 300
        }
      }
    ],
    {
      compress: 0.5
    }
  )

  const file = {
    uri: compressedImg.uri.replace('file://', ''),
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

  const compressedImg = await manipulateAsync(
    data.uri,
    [
      {
        resize: {
          width: 400,
          height: 300
        }
      }
    ],
    {
      compress: 0.5
    }
  )

  const file = {
    uri: compressedImg.uri.replace('file://', ''),
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
