import { getToken } from '@/utils/helper'
import { apiPostCall } from '..'

export const ekycFront = async (data) => {
  const token = await getToken('access_token')

  const file = {
    uri: data.uri.replace('file://', ''),
    type: 'image/jpeg',
    name: 'front.jpg'
  }

  const formData = new FormData()
  formData.append('image', file)

  const response = await apiPostCall(
    '/user/ekyc/recognition-id/front',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token
      }
    }
  )
  return response.data
}
