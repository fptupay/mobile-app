import { Platform } from 'react-native'
import { apiGetCall, apiPostCall } from '..'
import {
  BankLinkVerifySchema,
  BankLinkConfirmSchema,
  MoneyVerifySchema,
  MoneyConfirmSchema
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

export const unlinkBank = async (data: string) => {
  const config = bankConfig
  const response = await apiPostCall(
    `/finance/partner/bank/${data}/unlink`,
    config
  )
  return response.data
}

export const getLinkedBanks = async () => {
  const config = bankConfig
  const response = await apiGetCall('/finance/account/link', config)
  return response.data
}

export const topupVerify = async (data: MoneyVerifySchema) => {
  const config = bankConfig
  const response = await apiPostCall(
    '/finance/partner/bank/topup/verify',
    data,
    config
  )
  return response.data
}

export const topupConfirm = async (data: MoneyConfirmSchema) => {
  const config = bankConfig
  const response = await apiPostCall(
    '/finance/partner/bank/topup/confirm',
    data,
    config
  )
  return response.data
}

export const withdrawVerify = async (data: MoneyVerifySchema) => {
  const config = bankConfig
  const response = await apiPostCall(
    '/finance/partner/bank/withdraw/verify',
    data,
    config
  )
  return response.data
}

export const withdrawConfirm = async (data: MoneyConfirmSchema) => {
  const response = await apiPostCall(
    '/finance/partner/bank/withdraw/confirm',
    data
  )
  return response.data
}

export const getAccountBalance = async () => {
  const config = bankConfig
  const response = await apiGetCall('/finance/account/balance', config)
  return response.data
}
