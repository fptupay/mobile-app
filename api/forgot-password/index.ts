import { apiPostCall } from '..'

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

export const confirmFrontCard = async (data: any) => {
  const response = await apiPostCall(
    '/user/public/forgot-password/confirm-ekyc-front',
    data
  )
  return response.data
}

export const confirmBackCard = async (data: any) => {
  const response = await apiPostCall(
    '/user/public/forgot-password/confirm-ekyc-back',
    data
  )
  return response.data
}

export const confirmSelfie = async (data: any) => {
  const response = await apiPostCall(
    '/user/public/forgot-password/confirm-ekyc-face',
    data
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
