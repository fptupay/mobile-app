import { View, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import { MediumText, NormalText } from '@/components/Themed'
import { OtpInput } from '@/components/OtpInput'
import { OtpInputRef } from '@/types/OtpInput.type'
import Colors from '@/constants/Colors'
import SharedLayout from '@/components/SharedLayout'
import TextButton from '@/components/buttons/TextButton'
import { useAccountStore } from '@/stores/accountStore'
import { router } from 'expo-router'
import Toast from 'react-native-toast-message'

export default function OldPINScreen() {
  const [pin, setPin] = useState('')
  const otpRef = useRef<OtpInputRef>(null)
  const { username } = useAccountStore((state) => state.details)

  const handleClearPIN = () => {
    otpRef.current?.clear()
    setPin('')
  }

  const handleVerifyOldPIN = async () => {
    const oldPIN = await SecureStore.getItemAsync(username)
    if (pin === oldPIN) {
      router.push('/smart-otp/new-pin')
    } else {
      Toast.show({
        type: 'error',
        text1: 'Mã PIN không đúng',
        text2: 'Vui lòng nhập lại'
      })
    }
  }

  return (
    <SharedLayout title="Thay đổi PIN OTP">
      <View className="flex space-y-4 mt-8">
        <MediumText className="text-center text-secondary mb-2">
          Nhâp mã PIN OTP hiện tại
        </MediumText>
        <OtpInput
          ref={otpRef}
          numberOfDigits={6}
          onTextChange={(text) => setPin(text)}
          focusColor={Colors.primary}
          type="covered"
        />
        <Pressable onPress={handleClearPIN}>
          <NormalText className="text-primary text-center">Xóa</NormalText>
        </Pressable>
      </View>
      <View className="mt-auto mb-4">
        <TextButton
          text="Tiếp tục"
          type="primary"
          disable={pin.length < 6}
          onPress={handleVerifyOldPIN}
        />
      </View>
    </SharedLayout>
  )
}
