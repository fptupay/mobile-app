import { apiGetCall, apiPostCall } from '..'

export const getDNGBillByFeeType = async (feeType: string) => {
  const response = await apiGetCall(`/merchant/bill/dng/fee-type/${feeType}`)
  return response.data
}

export const payBill = async (data: any) => {
  const response = await apiPostCall('/merchant/bill/dng/pay', data)
  return response.data
}
