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
import { useAccountStore } from '@/stores/accountStore'

export default function TransactionOTPScreen() {
  const otpInputRef = useRef<OtpInputRef>(null)
  const [enteredOTP, setEnteredOTP] = useState('')

  const fundTransferId = useTransactionStore((state) => state.fundTransferId)
  const { username } = useAccountStore((state) => state.details)

  const handleClear = () => {
    otpInputRef.current?.clear()
  }

  const handleVerifyOTP = async () => {
    const savedOTP = await SecureStore.getItemAsync(username)
    if (enteredOTP === savedOTP) {
      router.push('/transfer/transaction-otp')
    } else {
      Toast.show({
        type: 'error',
        text1: 'Mã PIN không đúng',
        text2: 'Vui lòng nhập lại'
      })
    }
  }

  return (
    <SharedLayout backHref="/account/home" title="Nhập mã OTP">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 pt-8 space-y-8">
            <View>
              <NormalText className="text-tertiary mt-1">
                Vui lòng nhập mã PIN của bạn để tạo mã xác thực cho giao dịch
                này {fundTransferId && `Mã giao dịch: ${fundTransferId}`}
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
                text="Lấy mã OTP"
                type="primary"
                onPress={handleVerifyOTP}
                disable={enteredOTP.length < 6}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SharedLayout>
  )
}
