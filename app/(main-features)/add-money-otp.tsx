import { OtpInput } from '@/components/OtpInput'
import SharedLayout from '@/components/SharedLayout'
import { NormalText } from '@/components/Themed'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { OtpInputRef } from '@/types/OtpInput.type'

import { useRouter } from 'expo-router'
import React, { useRef, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TouchableWithoutFeedback,
  View
} from 'react-native'

export default function AddMoneyOtpScreen() {
  const router = useRouter()

  const otpInputRef = useRef<OtpInputRef>(null)
  const [otpCode, setOtpCode] = useState<string>('')

  const handleClear = () => {
    otpInputRef.current?.clear()
    setOtpCode('')
  }

  return (
    <SharedLayout href="/(main-features)/load-money" title="Nhập mã OTP">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-4"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 pt-8 space-y-8">
            <View>
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
              <Pressable className="mb-3" onPress={handleClear}>
                <NormalText className="text-primary text-center">
                  Xóa
                </NormalText>
              </Pressable>
              <TextButton
                text="Xác nhận"
                type={TextButtonType.PRIMARY}
                disable={otpCode.length != 6}
                onPress={() => router.push('/add-bank-success')}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SharedLayout>
  )
}
