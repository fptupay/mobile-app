import { getDeviceId } from '@/utils/helper'
import { apiGetCall, apiPostCall } from '..'
import { Platform } from 'react-native'

const bankConfig = {
  headers: {
    'x-client-platform': Platform.OS,
    'x-client-platform-version': Platform.Version.toString(),
    'x-client-source-app': 'fptupay'
  }
}

export const getDNGBillByFeeType = async (feeType: string) => {
  const response = await apiGetCall(`/merchant/bill/dng/fee-type/${feeType}`)
  return response.data
}

export const payBill = async (data: any, smartOTPTransactionId: string) => {
  const deviceId = await getDeviceId()
  const response = await apiPostCall('/merchant/bill/dng/pay', data, {
    headers: {
      ...bankConfig.headers,
      'x-client-device-id': deviceId,
      'Content-Type': 'application/json',
      'x-sotp-device-id': deviceId,
      'x-sotp-version': Platform.Version.toString(),
      'x-sotp-transaction-id': smartOTPTransactionId
    }
  })
  return response.data
}
