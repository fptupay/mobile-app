import { apiPostCall } from '..'

export const getTransactionsByAccountNumber = async (data: any) => {
  const response = await apiPostCall('/finance/transaction/account', data)
  return response.data
}

export const getTransactionReportByAccountNumber = async (data: any) => {
  const response = await apiPostCall(
    '/finance/transaction/account/report',
    data
  )
  return response.data
}
