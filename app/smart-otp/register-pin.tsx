import React, { useRef, useState } from 'react'
import { MediumText, NormalText, SafeAreaView, View } from '@/components/Themed'
import { OtpInput } from '@/components/OtpInput'
import TextButton from '@/components/buttons/TextButton'
import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import Toast from 'react-native-toast-message'
import { Pressable } from 'react-native'
import { OtpInputRef } from '@/types/OtpInput.type'
import { generateOTP } from '@/api/otp'
import Colors from '@/constants/Colors'

export default function RegisterPINScreen() {
  const [pin, setPin] = useState<string>('')
  const [confirmedPin, setConfirmedPin] = useState<string>('')
  const otpRef = useRef<OtpInputRef>(null)
  const confirmedOtpRef = useRef<OtpInputRef>(null)

  const handleClearPIN = () => {
    otpRef.current?.clear()
    setPin('')
  }

  const handleClearConfirmedPIN = () => {
    confirmedOtpRef.current?.clear()
    setConfirmedPin('')
  }

  const handleSetPIN = async () => {
    if (pin !== confirmedPin) {
      Toast.show({
        type: 'error',
        text1: 'Mã PIN không khớp',
        text2: 'Vui lòng nhập lại'
      })
      return
    }
    // save this pin to local storage
    await SecureStore.setItemAsync('pin', pin)
    await generateOTP()
    router.push('/smart-otp/smart-otp-confirmation')
  }

  return (
    <SafeAreaView className="flex-1 px-4">
      <View className="pt-8">
        <MediumText className="text-3xl tracking-tight text-secondary">
          Cài đặt Smart OTP
        </MediumText>
        <NormalText className="text-tertiary mt-1">
          Vui lòng cài đặt PIN cho cho Smart OTP
        </NormalText>
      </View>

      <View className="flex space-y-4 mt-8">
        <MediumText className="text-center mb-2">Nhâp mã PIN</MediumText>
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

      <View className="flex space-y-4 mt-8">
        <MediumText className="text-center mb-2">Nhập lại mã PIN</MediumText>
        <OtpInput
          ref={confirmedOtpRef}
          numberOfDigits={6}
          onTextChange={(text) => setConfirmedPin(text)}
          focusColor={Colors.primary}
          type="covered"
        />
        <Pressable onPress={handleClearConfirmedPIN}>
          <NormalText className="text-primary text-center">Xóa</NormalText>
        </Pressable>
      </View>

      <View className="mt-8">
        <TextButton
          type="primary"
          text="Tiếp tục"
          disable={pin.length < 6 || confirmedPin.length < 6}
          onPress={handleSetPIN}
        />
      </View>
    </SafeAreaView>
  )
}
