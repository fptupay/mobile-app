import { Platform } from 'react-native'
import { apiDeleteCall, apiGetCall, apiPostCall } from '..'
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

export const confirmTransfer = async (
  data: any,
  smartOTPTransactionId: string
) => {
  const deviceId = await getDeviceId()

  const response = await apiPostCall('/finance/fund-transfer/confirm', data, {
    headers: {
      ...headerConfig,
      'x-client-device-id': deviceId,
      'Content-Type': 'application/json',
      'x-sotp-device-id': deviceId,
      'x-sotp-version': Platform.Version.toString(),
      'x-sotp-transaction-id': smartOTPTransactionId
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

export const saveAccount = async (data: any) => {
  const response = await apiPostCall('/user/contact', data)
  return response.data
}

export const getSavedAccounts = async () => {
  const response = await apiGetCall('/user/contact')
  return response.data
}

export const deleteSavedAccount = async (id: string) => {
  const response = await apiDeleteCall(`/user/contact/${id}`)
  return response.data
}
