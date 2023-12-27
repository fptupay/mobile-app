import { generateOTP } from '@/api/otp'
import { successResponseStatus } from '@/utils/helper'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import Toast from 'react-native-toast-message'
import useCountdown from './useCountdown'

export const useResendOTP = () => {
  const { start } = useCountdown()

  return useMutation({
    mutationFn: generateOTP,
    onSuccess: (data) => {
      if (successResponseStatus(data)) {
        Toast.show({
          type: 'success',
          text1: 'Đã gửi lại mã OTP'
        })
        start(60)
      } else {
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: data.message
        })
      }
    },
    onError: (error: Error) => {
      if (isAxiosError(error)) {
        Toast.show({
          type: 'error',
          text1: 'Lỗi',
          text2: error.response?.data?.message
        })
      }
    }
  })
}
