import { Platform } from 'react-native'
import { apiPostCall } from '..'
import { getDeviceId } from '@/utils/helper'

const headerConfig = {
  'x-client-platform': Platform.OS,
  'x-client-platform-version': Platform.Version.toString(),
  'x-client-source-app': 'fptupay',
  'x-sotp-version': Platform.Version.toString()
}

export const verifyTransfer = async (data: any) => {
  const response = await apiPostCall('/finance/fund-transfer/verify', data, {
    baseURL: 'https://gateway.fptupay.tech',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.data
}

export const confirmTransfer = async (data: any) => {
  const deviceId = await getDeviceId()
  const response = await apiPostCall('/finance/fund-transfer/confirm', data, {
    headers: {
      ...headerConfig,
      'x-client-device-id': deviceId,
      'Content-Type': 'application/json',
      'x-sotp-device-id': deviceId,
      'x-sotp-transaction-id': '946904560410782700'
    }
  })
  return response.data
}

export const getUserNameByStudentCode = async (studentCode: string) => {
  const response = await apiPostCall('/user/get-name-by-user', {
    data: studentCode
  })
  return response.data
}
