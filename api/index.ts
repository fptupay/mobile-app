import axios from 'axios'
import { Platform } from 'react-native'

axios.defaults.baseURL = 'https://gateway.fptupay.tech'
axios.defaults.headers.common['Content-Type'] = 'application/json'

export const loginConfig = {
  headers: {
    'x-client-device-id': 'QEIERUEWHRBWEUIEFIDUQHWWUEHE',
    'x-client-platform-version': Platform.Version.toString(),
    'x-client-platform': Platform.OS
  }
}

export const apiPostCall = async (
  url: string,
  data?: unknown,
  config?: any
) => {
  const response = await axios.post(url, data, config)
  return response
}
