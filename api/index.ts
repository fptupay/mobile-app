import axios from 'axios'

axios.defaults.baseURL = 'https://gateway.fptupay.tech'
axios.defaults.headers.common['Content-Type'] = 'application/json'

export const loginConfig = {
  headers: {
    'x-client-device-id': 'QEIERUEWHRBWEUIEFIDUQHWWUEHE',
    'x-client-platform-version': 'IOS17.0.1',
    'x-client-platform': 'ios'
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
