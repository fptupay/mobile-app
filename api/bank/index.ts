import { Platform } from 'react-native'
import { apiGetCall, apiPostCall } from '..'
import {
  BankLinkAccountVerifySchema,
  BankLinkCardVerifySchema,
  BankLinkConfirmSchema,
  MoneyVerifySchema,
  MoneyConfirmSchema
} from '@/schemas/bank-schema'
import { getDeviceId } from '@/utils/helper'

const bankConfig = {
  headers: {
    'x-client-platform': Platform.OS,
    'x-client-platform-version': Platform.Version.toString(),
    'x-client-source-app': 'fptupay'
  }
}

export const bankLinkAccountVerify = async (
  data: BankLinkAccountVerifySchema
) => {
  const deviceId = await getDeviceId()
  const config = {
    headers: {
      ...bankConfig.headers,
      'x-client-device-id': deviceId
    }
  }
  const response = await apiPostCall(
    '/finance/partner/bank/link/verify',
    data,
    config
  )
  return response.data
}

export const bankLinkCardVerify = async (data: BankLinkCardVerifySchema) => {
  const deviceId = await getDeviceId()
  const config = {
    headers: {
      ...bankConfig.headers,
      'x-client-device-id': deviceId
    }
  }
  const response = await apiPostCall(
    '/finance/partner/bank/link/verify',
    data,
    config
  )
  return response.data
}

export const bankLinkConfirm = async (data: BankLinkConfirmSchema) => {
  const deviceId = await getDeviceId()
  const config = {
    headers: {
      ...bankConfig.headers,
      'x-client-device-id': deviceId
    }
  }
  const response = await apiPostCall(
    '/finance/partner/bank/link/confirm',
    data,
    config
  )
  return response.data
}

export const unlinkBank = async (data: string) => {
  const deviceId = await getDeviceId()
  const config = {
    headers: {
      ...bankConfig.headers,
      'x-client-device-id': deviceId
    }
  }
  const response = await apiPostCall(
    `/finance/partner/bank/${data}/unlink`,
    config
  )
  return response.data
}

export const getAllBanks = async () => {
  const deviceId = await getDeviceId()
  const config = {
    headers: {
      ...bankConfig.headers,
      'x-client-device-id': deviceId
    }
  }
  const response = await apiGetCall('/finance/bank', config)
  return response.data
}

export const getLinkedBanks = async () => {
  const deviceId = await getDeviceId()
  const config = {
    headers: {
      ...bankConfig.headers,
      'x-client-device-id': deviceId
    }
  }
  const response = await apiGetCall('/finance/account/link', config)
  return response.data
}

export const topupVerify = async (data: MoneyVerifySchema) => {
  const deviceId = await getDeviceId()
  const config = {
    headers: {
      ...bankConfig.headers,
      'x-client-device-id': deviceId
    }
  }
  const response = await apiPostCall(
    '/finance/partner/bank/topup/verify',
    data,
    config
  )
  return response.data
}

export const topupConfirm = async (data: MoneyConfirmSchema) => {
  const deviceId = await getDeviceId()
  const config = {
    headers: {
      ...bankConfig.headers,
      'x-client-device-id': deviceId
    }
  }
  const response = await apiPostCall(
    '/finance/partner/bank/topup/confirm',
    data,
    config
  )
  return response.data
}

export const withdrawVerify = async (data: MoneyVerifySchema) => {
  const deviceId = await getDeviceId()
  const config = {
    headers: {
      ...bankConfig.headers,
      'x-client-device-id': deviceId
    }
  }
  const response = await apiPostCall(
    '/finance/partner/bank/withdraw/verify',
    data,
    config
  )
  return response.data
}

export const withdrawConfirm = async (
  data: MoneyConfirmSchema,
  smartOTPTransactionId: string
) => {
  const deviceId = await getDeviceId()
  const response = await apiPostCall(
    '/finance/partner/bank/withdraw/confirm',
    data,
    {
      headers: {
        ...bankConfig.headers,
        'x-client-device-id': deviceId,
        'Content-Type': 'application/json',
        'x-sotp-device-id': deviceId,
        'x-sotp-version': Platform.Version.toString(),
        'x-sotp-transaction-id': smartOTPTransactionId
      }
    }
  )
  return response.data
}

export const getAccountBalance = async () => {
  const deviceId = await getDeviceId()
  const config = {
    headers: {
      ...bankConfig.headers,
      'x-client-device-id': deviceId
    }
  }
  const response = await apiGetCall('/finance/account/balance', config)
  return response.data
}
