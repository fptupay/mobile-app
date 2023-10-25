import { loginOtpUser } from '@/api/authentication'
import { OtpInput } from '@/components/OtpInput'
import { MediumText, NormalText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { LoginOtpFormSchema } from '@/schemas/auth-schema'
import { OtpInputRef } from '@/types/OtpInput.type'
import { saveToken, successResponseStatus } from '@/utils/helper'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useRef, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
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

  const handleClear = () => {
    otpInputRef.current?.clear()
    setOtpCode('')
  }

  const loginOtpMutation = useMutation({
    mutationFn: (data: LoginOtpFormSchema) => loginOtpUser(data),
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
                Vui lòng nhập mã 6 số vừa được gửi tới số điện thoại 0123456789
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
            </View>

            <View className="w-full mt-8 space-y-2">
              <Pressable className="mb-5" onPress={handleClear}>
                <NormalText className="text-primary text-center">
                  Xóa
                </NormalText>
              </Pressable>
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
