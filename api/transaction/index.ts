import { apiGetCall, apiPostCall } from '..'

export const getTransactionsByAccountNumber = async (
  accountNumber: string,
  fromDate: string,
  toDate: string
) => {
  const response = await apiGetCall(
    `/finance/transaction/account?account_no=${accountNumber}&from_date=${fromDate}&to_date=${toDate}`
  )
  return response.data
}

export const getTransactionReportByAccountNumber = async (data: any) => {
  const response = await apiPostCall(
    '/finance/transaction/account/report',
    data
  )
  return response.data
}

export const getTransactionDetails = async (id: string) => {
  const response = await apiGetCall(
    `/finance/transaction/account-transaction/${id}`
  )
  return response.data
}

export const getTransactionReportByList = async (data: any) => {
  const response = await apiPostCall(
    '/finance/transaction/account/report',
    data
  )
  return response.data
}

export const getTransactionReportByChart = async (data: any) => {
  const response = await apiPostCall(
    '/finance/transaction/account/report/statistic',
    data
  )
  return response.data
}
