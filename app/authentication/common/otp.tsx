import { verifyOtp } from '@/api/authentication'
import { changePhoneNumberConfirm } from '@/api/profile'
import { Modal } from '@/components/Modal'
import { OtpInput } from '@/components/OtpInput'
import { MediumText, NormalText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { usePhoneStore } from '@/stores/phoneStore'
import { OtpInputRef } from '@/types/OtpInput.type'
import { successResponseStatus } from '@/utils/helper'
import { useMutation } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
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
  const otpInputRef = useRef<OtpInputRef>(null)
  const [otpCode, setOtpCode] = useState<string>('')
  const [isVisible, setIsVisible] = useState(false)
  const { phone } = usePhoneStore()

  const { type } = useLocalSearchParams()

  const handleClear = () => {
    otpInputRef.current?.clear()
    setOtpCode('')
  }

  const verifyOtpMutation = useMutation({
    mutationFn: (data: { otp: string }) => {
      if (type === 'change-phone') {
        return changePhoneNumberConfirm(data)
      } else {
        return verifyOtp(data)
      }
    },
    onSuccess: (data) => {
      if (!successResponseStatus) {
        Toast.show({
          type: 'error',
          text1: 'Đã có lỗi xảy ra',
          text2: data.message
        })
        return
      }
      if (type === 'change-phone') {
        setIsVisible(true)
      } else {
        router.push('/authentication/init/ekyc/ekyc-rule')
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

  const handleVerifyOtp = () => {
    verifyOtpMutation.mutate({ otp: otpCode })
  }

  return (
    <>
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
                  Vui lòng nhập mã 6 số vừa được gửi tới số điện thoại {phone}
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
                  disable={otpCode.length != 6 || verifyOtpMutation.isLoading}
                  loading={verifyOtpMutation.isLoading}
                  onPress={handleVerifyOtp}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <Modal isVisible={isVisible}>
        <Modal.Container>
          <Modal.Header title="Thông báo" />
          <Modal.Body>
            <NormalText className="text-tertiary">
              Bạn đã thay đổi số điện thoại thành công
            </NormalText>

            <View className="mt-6">
              <TextButton
                text="Hoàn thành"
                type="primary"
                href="/account/home"
              />
            </View>
          </Modal.Body>
        </Modal.Container>
      </Modal>
    </>
  )
}
