import {
  LoginFormSchema,
  LoginOtpFormSchema,
  PasswordInitSchema
} from '@/schemas/auth-schema'
import { Platform } from 'react-native'
import { apiGetCall, apiPostCall } from '..'
import { PhoneSchema } from '@/schemas/verify-schema'
import { getDeviceId } from '@/utils/helper'

const loginConfig = {
  headers: {
    'x-client-device-id': '',
    'x-client-platform-version': Platform.Version.toString(),
    'x-client-platform': Platform.OS
  }
}

export const loginUser = async (data: LoginFormSchema) => {
  const deviceId = await getDeviceId()
  const config = {
    headers: {
      ...loginConfig.headers,
      'x-client-device-id': deviceId,
      'x-mobile-token': 'ExponentPushToken[B0zlmCIu0o2hh5-jUumBEN]'
    }
  }
  const response = await apiPostCall(
    '/user/public/login',
    {
      username: data.username,
      password: data.password
    },
    config
  )
  return response.data
}

export const loginOtpUser = async (data: LoginOtpFormSchema) => {
  const deviceId = await getDeviceId()
  const config = {
    headers: {
      ...loginConfig.headers,
      'x-client-device-id': deviceId
    }
  }
  const response = await apiPostCall(
    '/user/public/login',
    {
      username: data.username,
      password: data.password,
      otp: data.otp
    },
    config
  )
  return response.data
}

export const logoutUser = async () => {
  const response = await apiPostCall('/user/logout')
  return response.data
}

export const changePasswordInit = async (data: PasswordInitSchema) => {
  const response = await apiPostCall('/user/profile/change-password-init', data)
  return response.data
}

export const getRegisteredPhoneNumber = async () => {
  const response = await apiGetCall('/user/profile/phone-number')
  return response.data
}

export const confirmPhoneNumber = async (data: PhoneSchema) => {
  const response = await apiPostCall('/user/profile/confirm-phone-number', data)
  return response.data
}

export const verifyOtp = async (data: { otp: string }) => {
  const response = await apiPostCall(
    '/user/profile/phone-number/verify-otp',
    data
  )
  return response.data
}
