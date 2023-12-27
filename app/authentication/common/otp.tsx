import { verifyOtp } from '@/api/authentication'
import { changePhoneNumberConfirm } from '@/api/profile'
import { Modal } from '@/components/Modal'
import { OtpInput } from '@/components/OtpInput'
import { MediumText, NormalText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import useCountdown from '@/hooks/useCountdown'
import { useResendOTP } from '@/hooks/useResendOTP'
import { usePhoneStore } from '@/stores/phoneStore'
import { OtpInputRef } from '@/types/OtpInput.type'
import { successResponseStatus } from '@/utils/helper'
import { useMutation } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useRef, useState } from 'react'
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
  const otpInputRef = useRef<OtpInputRef>(null)
  const [otpCode, setOtpCode] = useState<string>('')
  const [isVisible, setIsVisible] = useState(false)
  const { phone } = usePhoneStore()

  const { secondsLeft, start } = useCountdown()

  const { type } = useLocalSearchParams()

  const handleClear = () => {
    otpInputRef.current?.clear()
    setOtpCode('')
  }

  useEffect(() => {
    start(60)
  }, [])

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

  const { mutate, isLoading } = useResendOTP()

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
                  Vui lòng nhập mã OTP 6 số vừa được gửi tới số điện thoại{' '}
                  {phone}
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

              <View>
                <View className="flex justify-center mb-4">
                  <TouchableOpacity
                    onPress={() => mutate()}
                    disabled={secondsLeft > 0}
                  >
                    {isLoading ? (
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
