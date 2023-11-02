import { apiPostCall } from '..'

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
  const response = await apiPostCall('/finance/fund-transfer/confirm', data, {
    baseURL: 'https://gateway.fptupay.tech',
    headers: {
      'Content-Type': 'application/json'
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
