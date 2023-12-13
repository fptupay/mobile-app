import { changePINCode } from '@/api/otp'
import { OtpInput } from '@/components/OtpInput'
import { MediumText, NormalText, SafeAreaView } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { OtpInputRef } from '@/types/OtpInput.type'
import {
  generateSharedKey,
  getDeviceId,
  successResponseStatus
} from '@/utils/helper'
import { useMutation } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import * as SecureStore from 'expo-secure-store'
import React, { useRef, useState } from 'react'
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
import Toast from 'react-native-toast-message'
import { router } from 'expo-router'
import { useAccountStore } from '@/stores/accountStore'
import { useResendOTP } from '@/hooks/useResendOTP'

export default function ChangePINConfirmationScreen() {
  const otpInputRef = useRef<OtpInputRef>(null)
  const [otpCode, setOtpCode] = useState<string>('')

  const { username } = useAccountStore((state) => state.details)

  const handleClear = () => {
    otpInputRef.current?.clear()
    setOtpCode('')
  }

  const changeOTPMutation = useMutation({
    mutationFn: (data: any) => changePINCode(data),
    onSuccess: (data) => {
      if (successResponseStatus(data)) {
        Toast.show({
          type: 'success',
          text2: 'Thay đổi mã PIN thành công'
        })
        router.push('/account/my-wallet')
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

  const { mutate, isLoading } = useResendOTP()

  const handleVerifyOTP = async () => {
    const deviceId = await getDeviceId()
    const savedPin = (await SecureStore.getItemAsync(username)) as string
    const sharedKey = await generateSharedKey(savedPin, deviceId)
    const oldTransId = await SecureStore.getItemAsync(`${username}_transId`)

    if (savedPin !== null) {
      changeOTPMutation.mutate({
        otp: otpCode,
        new_otp_pin: savedPin,
        device_id: deviceId,
        version: Platform.Version.toString(),
        shared_key: sharedKey,
        trans_id: oldTransId
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
                Xác nhận thay đổi
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
              <Pressable className="mt-2" onPress={handleClear}>
                <NormalText className="text-primary text-center">
                  Xóa
                </NormalText>
              </Pressable>
            </View>

            <View className="w-full mt-8 space-y-2">
              <View className="flex flex-row justify-center">
                <NormalText className="text-tertiary mb-2 flex-row items-center">
                  Không nhận được mã?
                </NormalText>
                <TouchableOpacity onPress={() => mutate()}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#F97316" />
                  ) : (
                    <NormalText className="text-primary ml-1">
                      {' '}
                      Gửi lại
                    </NormalText>
                  )}
                </TouchableOpacity>
              </View>
              <TextButton
                text="Xác nhận"
                type={TextButtonType.PRIMARY}
                disable={otpCode.length != 6 || changeOTPMutation.isLoading}
                loading={changeOTPMutation.isLoading}
                onPress={() => handleVerifyOTP()}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
