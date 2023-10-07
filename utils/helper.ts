import { CameraCapturedPicture } from 'expo-camera'
import { manipulateAsync } from 'expo-image-manipulator'
import * as SecureStore from 'expo-secure-store'
import { Dimensions } from 'react-native'

export const formatMoney = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } =
  Dimensions.get('window')

export const saveToken = async ({
  key,
  value
}: {
  key: string
  value: string
}) => {
  await SecureStore.setItemAsync(key, value)
}

export const getToken = async (key: string) => {
  return await SecureStore.getItemAsync(key)
}

export const deleteToken = async (key: string) => {
  return await SecureStore.deleteItemAsync(key)
}

export const compressImg = async (data: CameraCapturedPicture) => {
  return await manipulateAsync(
    data.uri,
    [
      {
        resize: {
          width: 400,
          height: 300
        }
      }
    ],
    {
      compress: 0.5
    }
  )
}
