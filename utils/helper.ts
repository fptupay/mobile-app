import { CameraCapturedPicture } from 'expo-camera'
import { manipulateAsync } from 'expo-image-manipulator'
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

export const getTitle = (status: string | string[]) => {
  switch (status) {
    case 'pending':
      return 'Đang xử lý'
    case 'approved':
      return 'Đã phê duyệt'
    case 'closed':
      return 'Đã đóng'
    default:
      return 'Đang xử lý'
  }
}

export const getImagePath = (status?: string | string[]) => {
  switch (status) {
    case 'pending':
      return require('../assets/images/icon-process.png')
    case 'approved':
      return require('../assets/images/icon-success.png')
    case 'closed':
      return require('../assets/images/icon-closed.png')
    default:
      return require('../assets/images/icon-process.png')
  }
}

export const getBackGroundColor = (status?: string | string[]) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-50'
    case 'approved':
      return 'bg-green-50'
    case 'closed':
      return 'bg-red-50'
    default:
      return 'bg-yellow-50'
  }
}
