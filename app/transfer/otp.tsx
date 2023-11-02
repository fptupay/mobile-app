import {
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
  Platform
} from 'react-native'
import React, { useRef, useState } from 'react'
import TextButton from '@/components/buttons/TextButton'
import SharedLayout from '@/components/SharedLayout'
import { NormalText } from '@/components/Themed'
import { OtpInput } from '@/components/OtpInput'
import { OtpInputRef } from '@/types/OtpInput.type'
import { useTransactionStore } from '@/stores/bankStore'
import * as SecureStore from 'expo-secure-store'
import Toast from 'react-native-toast-message'
import { router } from 'expo-router'

export default function TransactionOTPScreen() {
  const otpInputRef = useRef<OtpInputRef>(null)
  const [enteredOTP, setEnteredOTP] = useState('')

  const transactionId = useTransactionStore((state) => state.transactionId)

  const handleClear = () => {
    otpInputRef.current?.clear()
  }

  const handleVerifyOTP = async () => {
    const savedOTP = await SecureStore.getItemAsync('pin')
    if (enteredOTP === savedOTP) {
      router.push('/transfer/smart-otp')
    } else {
      Toast.show({
        type: 'error',
        text1: 'Mã OTP không đúng',
        text2: 'Vui lòng nhập lại'
      })
    }
  }

  return (
    <SharedLayout href="/account/home" title="Nhập mã OTP">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-4"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 pt-8 space-y-8">
            <View>
              <NormalText className="text-tertiary mt-1">
                Vui lòng PIN Smart OTP của bạn để tạo mã xác thực cho giao dịch
                này (Mã giao dịch: {transactionId})
              </NormalText>
            </View>

            {/* OTP 6 digits */}
            <View>
              <OtpInput
                ref={otpInputRef}
                numberOfDigits={6}
                focusColor="#F97316"
                onTextChange={(text: string) => setEnteredOTP(text)}
                type="covered"
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
                type="primary"
                onPress={handleVerifyOTP}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SharedLayout>
  )
}
