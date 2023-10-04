import { getToken } from '@/utils/helper'
import { apiPostCall } from '..'
import base64 from 'react-native-base64'

export const ekycFront = async (data: string) => {
  const token = await getToken('access_token')

  const binaryData = base64.decode(data)
  let n = binaryData.length
  const uint8Array = new Uint8Array(n)

  while (n) {
    uint8Array[n - 1] = binaryData.charCodeAt(n - 1)
    n -= 1
  }

  // const file = new File([uint8Array], 'image.jpg', { type: 'image/jpg' })

  const formData = new FormData()
  formData.append('image', data)

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
