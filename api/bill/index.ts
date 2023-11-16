import { apiGetCall } from '..'

export const getDNGBillByFeeType = async (feeType: string) => {
  const response = await apiGetCall(`/merchant/bill/dng/fee-type/${feeType}`)
  return response.data
}
