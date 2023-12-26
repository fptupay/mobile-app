import {
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Pressable,
  TouchableOpacity
} from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { NormalText, SemiText } from '@/components/Themed'
import { OtpInput } from '@/components/OtpInput'
import { OtpInputRef } from '@/types/OtpInput.type'
import TextButton from '@/components/buttons/TextButton'
import { useForgotPasswordStore } from '@/stores/accountStore'
import { useMutation } from '@tanstack/react-query'
import { confirmOtp } from '@/api/forgot-password'
import { successResponseStatus } from '@/utils/helper'
import { router } from 'expo-router'
import Toast from 'react-native-toast-message'
import { isAxiosError } from 'axios'

export default function OTPConfirmationScreen() {
  const otpInputRef = useRef<OtpInputRef>(null)
  const [otpCode, setOtpCode] = useState<string>('')

  const { credentials } = useForgotPasswordStore()

  const { mutate, isLoading } = useMutation({
    mutationFn: confirmOtp,
    onSuccess: (data) => {
      if (successResponseStatus(data)) {
        router.push('/authentication/forget-password/info-confirmation')
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
          text1: 'Đã có lỗi xảy ra',
          text2: error.message
        })
      }
    }
  })

  const handleClear = () => {
    otpInputRef.current?.clear()
    setOtpCode('')
  }

  const handleResendOTP = () => {
    console.log('resend otp')
  }

  const handleVerifyInfo = () => {
    mutate({
      ...credentials,
      otp: otpCode
    })
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
              <SemiText className="text-3xl text-left tracking-tighter text-secondary">
                Nhập mã OTP
              </SemiText>
              <NormalText className="text-tertiary mt-1">
                Vui lòng nhập mã OTP 6 số vừa được gửi tới số điện thoại đã đăng
                ký
              </NormalText>
            </View>

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
              <View className="flex flex-row justify-center">
                <NormalText className="text-tertiary mb-2 flex-row items-center">
                  Không nhận được mã?
                </NormalText>
                <TouchableOpacity onPress={handleResendOTP}>
                  <NormalText className="text-primary ml-1">
                    {' '}
                    Gửi lại
                  </NormalText>
                </TouchableOpacity>
              </View>

              <TextButton
                text="Xác nhận"
                type="primary"
                disable={otpCode.length != 6 || isLoading}
                loading={isLoading}
                onPress={handleVerifyInfo}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
