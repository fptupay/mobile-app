import { loginOtpUser, loginUser } from '@/api/authentication'
import { OtpInput } from '@/components/OtpInput'
import { MediumText, NormalText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import useCountdown from '@/hooks/useCountdown'
import { usePushNotifications } from '@/hooks/usePushNotification'
import { LoginOtpFormSchema } from '@/schemas/auth-schema'
import { useAccountStore } from '@/stores/accountStore'
import { OtpInputRef } from '@/types/OtpInput.type'
import { saveToken, successResponseStatus } from '@/utils/helper'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

export default function SignUpOtpScreen() {
  const router = useRouter()
  const params: { props: any } = useLocalSearchParams()

  const otpInputRef = useRef<OtpInputRef>(null)
  const [otpCode, setOtpCode] = useState<string>('')
  const { credentials } = useAccountStore()

  const { secondsLeft, start } = useCountdown()
  const { expoPushToken } = usePushNotifications()

  const handleClear = () => {
    otpInputRef.current?.clear()
    setOtpCode('')
  }

  useEffect(() => {
    start(60)
  }, [])

  const loginOtpMutation = useMutation({
    mutationFn: (data: LoginOtpFormSchema) => loginOtpUser(data, expoPushToken),
    onSuccess: async (data) => {
      try {
        if (successResponseStatus(data)) {
          await saveToken({
            key: 'access_token',
            value: data.data.access_token
          })
          await saveToken({
            key: 'refresh_token',
            value: data.data.refresh_token
          })
          router.push('/account/home')
        } else {
          Toast.show({
            type: 'error',
            text1: 'Đã có lỗi xảy ra',
            text2: data.message
          })
        }
      } catch (error) {
        console.error(error)
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

  const resendOTPMutation = useMutation({
    mutationFn: (data: LoginOtpFormSchema) => loginUser(data, expoPushToken),
    onSuccess: (data) => {
      try {
        if (successResponseStatus(data)) {
          Toast.show({
            type: 'success',
            text1: 'Đã gửi lại mã OTP'
          })
        } else {
          Toast.show({
            type: 'error',
            text1: 'Đã có lỗi xảy ra',
            text2: data.message
          })
        }
      } catch (error) {
        console.error(error)
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

  const handleResendOTP = () => {
    resendOTPMutation.mutate(credentials)
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-4"
      >
        <StatusBar style="auto" />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 pt-10 space-y-8">
            <View>
              <MediumText className="text-3xl text-left tracking-tighter text-secondary">
                Nhập mã OTP
              </MediumText>
              <NormalText className="text-tertiary mt-1">
                Vui lòng nhập mã OTP 6 số vừa được gửi tới số điện thoại đã đăng
                ký
              </NormalText>
            </View>

            {/* OTP 6 digits */}
            <View>
              <OtpInput
                ref={otpInputRef}
                numberOfDigits={6}
                focusColor="#F97316"
                onTextChange={(text: any) => setOtpCode(text)}
              />
              <Pressable className="mt-2" onPress={handleClear}>
                <NormalText className="text-primary text-center">
                  Xóa
                </NormalText>
              </Pressable>
            </View>

            <View className="w-full mt-8">
              <View className="flex justify-center mb-4">
                <TouchableOpacity
                  onPress={handleResendOTP}
                  disabled={secondsLeft > 0}
                >
                  {resendOTPMutation.isLoading ? (
                    <ActivityIndicator size="small" color="#F97316" />
                  ) : (
                    <NormalText
                      className={`text-center ${
                        secondsLeft > 0 ? 'text-tertiary' : 'text-primary'
                      }`}
                    >
                      {' '}
                      Gửi lại mã
                    </NormalText>
                  )}
                </TouchableOpacity>
                <NormalText
                  className={`text-center text-tertiary ${
                    secondsLeft > 0 ? 'block' : 'hidden'
                  }`}
                >
                  Còn lại {secondsLeft} giây
                </NormalText>
              </View>

              <TextButton
                text="Xác nhận"
                type={TextButtonType.PRIMARY}
                disable={otpCode.length != 6 || loginOtpMutation.isLoading}
                loading={loginOtpMutation.isLoading}
                onPress={() => {
                  loginOtpMutation.mutate({
                    username: JSON.parse(params.props).username,
                    password: JSON.parse(params.props).password,
                    otp: otpCode
                  })
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
