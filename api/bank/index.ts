import { Platform } from 'react-native'
import { apiPostCall } from '..'
import {
  BankLinkVerifySchema,
  BankLinkConfirmSchema
} from '@/schemas/bank-schema'

const bankConfig = {
  headers: {
    'x-client-device-id': 'QEIERUEWHRBWEUIEFIDUQHWWUEHE',
    'x-client-platform': Platform.OS,
    'x-client-platform-version': Platform.Version.toString(),
    'x-client-source-app': 'fptupay'
  }
}

export const bankLinkVerify = async (data: BankLinkVerifySchema) => {
  const config = bankConfig
  const response = await apiPostCall(
    '/finance/partner/bank/link/verify',
    data,
    config
  )
  return response.data
}

export const bankLinkConfirm = async (data: BankLinkConfirmSchema) => {
  const config = bankConfig
  const response = await apiPostCall(
    '/finance/partner/bank/link/confirm',
    data,
    config
  )
  return response.data
}
