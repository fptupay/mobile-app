import { getToken } from '@/utils/helper'
import { apiPostCall } from '..'
import * as FileSystem from 'expo-file-system'

export const ekycFront = async (data: string) => {
  const token = await getToken('access_token')

  const imageUri = `${FileSystem.documentDirectory}myImage.jpg`

  try {
    await FileSystem.copyAsync({
      from: data,
      to: imageUri
    })

    const formData = new FormData()
    const file = new File([imageUri], 'myImage.jpg')
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
  } catch (err) {
    console.log('err', err)
  }
}
