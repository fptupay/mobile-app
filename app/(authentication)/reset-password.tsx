import { StatusBar } from 'expo-status-bar'
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View
} from 'react-native'

import { MediumText, NormalText } from '@/components/Themed'
import BackButton from '@/components/buttons/BackButton'
import TextButton, { TextButtonType } from '@/components/buttons/TextButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextField from '@/components/TextField'
import { useState } from 'react'

export default function ResetPasswordScreen() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <SafeAreaView className="flex-1 px-4">
      <StatusBar style="auto" />

      <BackButton href="/(authentication)/forget-password" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 mt-10 justify-start">
            <Image
              source={require('@/assets/images/reset-password.png')}
              className="w-[225px] h-[225px] mx-auto"
            />
            <MediumText className="text-secondary text-3xl tracking-tighter text-left">
              Đặt lại mật khẩu
            </MediumText>
            <NormalText className="text-tertiary mt-1">
              Mật khẩu cần có ít nhất 8 ký tự, bao gồm cả chữ thường, chữ hoa và
              chữ số.
            </NormalText>
            <View className="w-full mt-8">
              <TextField
                className="w-full mb-5"
                label="Mật khẩu mới"
                value={newPassword}
                onChangeText={(value) => setNewPassword(value)}
                secureTextEntry={true}
                style={{ fontFamily: 'Inter' }}
              />
              <TextField
                className="w-full"
                label="Xác nhận mật khẩu"
                value={confirmPassword}
                onChangeText={(value) => setConfirmPassword(value)}
                secureTextEntry={true}
                style={{ fontFamily: 'Inter' }}
              />
            </View>
            <View className="w-full mt-8 space-y-2">
              <TextButton
                text="Xác nhận"
                disable={!newPassword || !confirmPassword}
                type={TextButtonType.PRIMARY}
                href="/(authentication)"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
