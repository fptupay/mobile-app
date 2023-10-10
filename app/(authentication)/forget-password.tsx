import TextField from '@/components/TextField'
import { MediumText, NormalText } from '@/components/Themed'
import BackButton from '@/components/buttons/BackButton'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ForgetPasswordScreen() {
  const [phoneNumber, setPhoneNumber] = useState('')
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="ml-4">
        <BackButton href="/" />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-4"
      >
        <StatusBar style="auto" />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 mt-20 items-center">
            <Image
              source={require('@/assets/images/forgot-mascot.png')}
              className="w-[160px] h-[145px] mx-auto"
            />
            <View>
              <MediumText className="text-3xl text-left tracking-tighter text-secondary mt-8">
                Bạn quên mật khẩu?
              </MediumText>
              <NormalText className="text-tertiary mt-1">
                Vui lòng nhập số điện thoại di động để tìm kiếm tài khoản của
                bạn
              </NormalText>
            </View>
            <TextField
              className="w-full mt-8"
              label="Số điện thoại"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={(value) => setPhoneNumber(value)}
              style={{ fontFamily: 'Inter' }}
            />
            <View className="w-full mt-8">
              <TextButton
                text="Xác nhận"
                disable={phoneNumber.length != 10}
                type={TextButtonType.PRIMARY}
                href="/(authentication)/otp"
                previousRoute="forget-password"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
