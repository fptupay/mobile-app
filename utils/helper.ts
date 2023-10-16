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
      return require('@/assets/images/icon-process.png')
    case 'approved':
      return require('@/assets/images/icon-success.png')
    case 'closed':
      return require('@/assets/images/icon-closed.png')
    default:
      return require('@/assets/images/icon-process.png')
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

const defaultNumbers = ' hai ba bốn năm sáu bảy tám chín'

const unitsPlace: string[] = ('1 một' + defaultNumbers).split(' ')
const tensPlace: string[] = ('lẻ mười' + defaultNumbers).split(' ')
const hundredsPlace: string[] = ('không một' + defaultNumbers).split(' ')

function convertBlockThree(number: string) {
  if (number === '000') return ''
  const _a = number + ''

  switch (_a.length) {
    case 0:
      return ''
    case 1:
      return unitsPlace[parseInt(_a[0])]
    case 2:
      return convertBlockTwo(_a)
    case 3: {
      let tens = ''
      if (_a.slice(1, 3) !== '00') {
        tens = convertBlockTwo(_a.slice(1, 3))
      }
      const tram = hundredsPlace[parseInt(_a[0])] + ' trăm'
      return tram + ' ' + tens
    }
  }
}

function convertBlockTwo(number: string) {
  let unit = unitsPlace[parseInt(number[1])]
  const teens = tensPlace[parseInt(number[0])]
  let append = ''

  if (number[0] > '0' && number[1] === '5') {
    unit = 'lăm'
  }

  if (number[0] > '1') {
    append = ' mươi'
    if (number[1] === '1') {
      unit = ' mốt'
    }
  }

  return teens + '' + append + ' ' + unit
}

export const convertNumberToVietnameseWords = (number: string) => {
  const unitBlock = '1 nghìn triệu tỷ'.split(' ')
  const str = parseInt(number) + ''
  let i = 0
  const arr = []
  let index = str.length
  const result = []
  let rsString = ''

  if (index === 0 || str === 'NaN') {
    return ''
  }

  while (index >= 0) {
    arr.push(str.substring(index, Math.max(index - 3, 0)))
    index -= 3
  }

  for (i = arr.length - 1; i >= 0; i--) {
    if (arr[i] !== '' && arr[i] !== '000') {
      result.push(convertBlockThree(arr[i]))

      if (unitBlock[i]) {
        result.push(unitBlock[i])
      }
    }
  }

  rsString = result.join(' ')

  return rsString.replace(/[0-9]/g, '').replace(/ /g, ' ') + ' đồng'
}

export const convertDateFormat = (inputDate: string) => {
  const date = new Date(inputDate)
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  return formattedDate
}

export const validResponseStatus = (status: any) => {
  if (!status.success || status.error) {
    return false
  }
  return true
}
