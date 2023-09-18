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

export const getItem = async (key: string) => {
  return await SecureStore.getItemAsync(key)
}
