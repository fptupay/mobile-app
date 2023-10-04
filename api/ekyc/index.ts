import { getToken } from '@/utils/helper'
import { apiPostCall } from '..'
import base64 from 'react-native-base64'

export const ekycFront = async (data: string) => {
  const token = await getToken('access_token')

  const binaryData = base64.decode(data)
  const arrayBuffer = new ArrayBuffer(binaryData.length)
  const uint8Array = new Uint8Array(arrayBuffer)

  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i)
  }

  const file = new File([uint8Array], 'image.jpg', { type: 'image/jpg' })

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
