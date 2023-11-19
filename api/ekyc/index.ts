import { compressImg } from '@/utils/helper'
import { CameraCapturedPicture } from 'expo-camera'
import { Platform } from 'react-native'
import { apiPostCall } from '..'

export const ekycFront = async (data: CameraCapturedPicture) => {
  const image = await compressImg(data.uri)

  const file = {
    uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : data.uri,
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
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  return response.data
}

export const ekycBack = async (data: CameraCapturedPicture, id: string) => {
  const image = await compressImg(data.uri)

  const file = {
    uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : data.uri,
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
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  return response.data
}

export const ekycSelfie = async (data: CameraCapturedPicture, id: string) => {
  const image = await compressImg(data.uri)

  const file = {
    uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : data.uri,
    type: 'image/jpeg',
    name: 'selfie.jpg'
  }

  const formData = new FormData()
  formData.append('ekyc-id', id)
  formData.append('image', file as any)

  const response = await apiPostCall('/user/ekyc/check-face', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}
