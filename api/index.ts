import axios from 'axios'

axios.defaults.baseURL = 'https://gateway.fptupay.tech'
axios.defaults.headers.common['Content-Type'] = 'application/json'

export const apiPostCall = async (url: string, data?: unknown) => {
  const response = await axios.post(url, data)
  return response
}
