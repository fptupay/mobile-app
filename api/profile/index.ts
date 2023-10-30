import { apiGetCall } from '..'

export const getUserDetails = async () => {
  const response = await apiGetCall('/user/profile')
  return response.data
}
