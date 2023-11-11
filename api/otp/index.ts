import { Platform } from 'react-native'
import { apiPostCall } from '..'
import { getDeviceId } from '@/utils/helper'

const headerConfig = {
  'x-client-device-id': '',
  'x-client-platform': Platform.OS,
  'x-client-platform-version': Platform.Version.toString(),
  'x-client-source-app': 'fptupay'
}

export const generateOTP = async () => {
  const response = await apiPostCall('/user/otp/generate', {})
  return response.data
}

export const registerSmartOTP = async (data: any) => {
  const deviceId = await getDeviceId()
  const config = {
    headers: {
      ...headerConfig,
      'x-client-device-id': deviceId
    }
  }
  const response = await apiPostCall('/user/sotp/register', data, config)
  return response.data
}
