import { OtpInput } from '@/components/OtpInput'
import { MediumText, NormalText } from '@/components/Themed'
import BackButton from '@/components/buttons/BackButton'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { OtpInputRef } from '@/types/OtpInput.type'
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

export default function SignUpOtpScreen() {
  const params: { previousRoute: string; nextRoute: string } =
    useLocalSearchParams()
  const previousRoute = `/(authentication)/${params.previousRoute}`
  const nextRoute: any = `/(authentication)/${params.nextRoute}`
  const router = useRouter()

  const otpInputRef = useRef<OtpInputRef>(null)
  const [otpCode, setOtpCode] = useState<string>('')

  const handleClear = () => {
    otpInputRef.current?.clear()
    setOtpCode('')
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="ml-4">
        <BackButton href={previousRoute} />
      </View>

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
                disable={otpCode.length != 6}
                onPress={() => router.push(nextRoute)}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
