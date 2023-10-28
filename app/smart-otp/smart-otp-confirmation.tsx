import { registerSmartOTP } from '@/api/otp'
import { OtpInput } from '@/components/OtpInput'
import { MediumText, NormalText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { OtpInputRef } from '@/types/OtpInput.type'
import {
  generateSharedKey,
  generateTransactionId,
  getDeviceId,
  successResponseStatus
} from '@/utils/helper'
import { useMutation } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import * as SecureStore from 'expo-secure-store'
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

export default function SmartOTPConfirmationScreen() {
  const otpInputRef = useRef<OtpInputRef>(null)
  const [otpCode, setOtpCode] = useState<string>('')

  const handleClear = () => {
    otpInputRef.current?.clear()
    setOtpCode('')
  }

  const registerOTPMutation = useMutation({
    mutationFn: (data: any) => registerSmartOTP(data),
    onSuccess: (data) => {
      console.log(data)
      if (successResponseStatus(data)) {
        console.log('success')
      } else {
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: data.message
        })
      }
    },
    onError: (error: Error) => {
      Toast.show({
        type: 'error',
        text1: 'Đã có lỗi xảy ra',
        text2: error.message
      })
    }
  })

  const handleVerifyOTP = async () => {
    const deviceId = await getDeviceId()
    const savedPin = await SecureStore.getItemAsync('pin')

    if (savedPin !== null) {
      registerOTPMutation.mutate({
        otp: otpCode,
        otp_pin: savedPin,
        device_id: deviceId,
        app_code: 'fptupay',
        version: Platform.Version.toString(),
        shared_key: await generateSharedKey(savedPin, deviceId),
        trans_id: generateTransactionId()
      })
    }
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
                Xác nhận đăng ký
              </MediumText>
              <NormalText className="text-tertiary mt-1">
                Vui lòng nhập mã OTP vừa được gửi tới số điện thoại của bạn
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
                disable={otpCode.length != 6}
                onPress={() => handleVerifyOTP()}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
