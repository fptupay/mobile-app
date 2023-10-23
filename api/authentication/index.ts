import {
  LoginFormSchema,
  LoginOtpFormSchema,
  PasswordInitSchema
} from '@/schemas/auth-schema'
import { Platform } from 'react-native'
import { apiGetCall, apiPostCall } from '..'
import { PhoneSchema } from '@/schemas/phone-schema'

const loginConfig = {
  headers: {
    'x-client-device-id': 'QEIERUEWHRBWEUIEFIDUQHWWUEHE',
    'x-client-platform-version': Platform.Version.toString(),
    'x-client-platform': Platform.OS
  }
}

export const loginUser = async (data: LoginFormSchema) => {
  const response = await apiPostCall(
    '/user/public/login',
    {
      username: data.username,
      password: data.password
    },
    loginConfig
  )
  return response.data
}

export const loginOtpUser = async (data: LoginOtpFormSchema) => {
  const response = await apiPostCall(
    '/user/public/login',
    {
      username: data.username,
      password: data.password,
      otp: data.otp
    },
    loginConfig
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
  const response = await apiPostCall('/user/profile/verify-otp', data)
  return response.data
}
