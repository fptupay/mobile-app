import Colors from '@/constants/Colors'
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

export const getLabelTextColor = (status: string) => {
  switch (status) {
    case 'pending':
      return Colors.label.pending.text
    case 'approved':
      return Colors.label.approved.text
    case 'closed':
      return Colors.label.closed.text
  }
}

export const getLabelBackgroundColor = (status: string) => {
  switch (status) {
    case 'pending':
      return Colors.label.pending.background
    case 'approved':
      return Colors.label.approved.background
    case 'closed':
      return Colors.label.closed.background
  }
}
