import { compressImg } from '@/utils/helper'
import { apiPostCall } from '..'
import { Platform } from 'react-native'

export const verifyExistingAccount = async (data: any) => {
  const response = await apiPostCall(
    '/user/public/forgot-password/verify',
    data
  )
  return response.data
}

export const confirmOtp = async (data: any) => {
  const response = await apiPostCall(
    '/user/public/forgot-password/confirm-otp',
    data
  )
  return response.data
}

export const confirmInfo = async (data: any) => {
  const response = await apiPostCall(
    '/user/public/forgot-password/confirm-info',
    data
  )
  return response.data
}

export const confirmFrontCard = async (
  { forgot_password_id, username, mobile }: any,
  data: any
) => {
  const image = await compressImg(data.uri)

  const file = {
    uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : data.uri,
    type: 'image/jpeg',
    name: 'front.jpg'
  }

  const formData = new FormData()
  formData.append('forgot_password_id', forgot_password_id)
  formData.append('username', username)
  formData.append('mobile', mobile)
  formData.append('image', file as any)

  const response = await apiPostCall(
    '/user/public/forgot-password/confirm-ekyc-front',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  return response.data
}

export const confirmBackCard = async (
  { forgot_password_id, username, mobile }: any,
  data: any
) => {
  const image = await compressImg(data.uri)

  const file = {
    uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : data.uri,
    type: 'image/jpeg',
    name: 'front.jpg'
  }

  const formData = new FormData()
  formData.append('forgot_password_id', forgot_password_id)
  formData.append('username', username)
  formData.append('mobile', mobile)
  formData.append('image', file as any)

  const response = await apiPostCall(
    '/user/public/forgot-password/confirm-ekyc-back',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  return response.data
}

export const confirmSelfie = async (
  { forgot_password_id, username, mobile }: any,
  data: any
) => {
  const image = await compressImg(data.uri)

  const file = {
    uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : data.uri,
    type: 'image/jpeg',
    name: 'selfie.jpg'
  }

  const formData = new FormData()
  formData.append('forgot_password_id', forgot_password_id)
  formData.append('username', username)
  formData.append('mobile', mobile)
  formData.append('image', file as any)

  const response = await apiPostCall(
    '/user/public/forgot-password/confirm-ekyc-face',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  return response.data
}

export const resetPassword = async (data: any) => {
  const response = await apiPostCall(
    '/user/public/forgot-password/change-password',
    data
  )
  return response.data
}
